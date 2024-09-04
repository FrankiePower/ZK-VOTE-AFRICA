// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ZKVoting is ReentrancyGuard, AccessControl {
    using ECDSA for bytes32;

    bytes32 public constant ELECTION_OFFICIAL = keccak256("ELECTION_OFFICIAL");
    bytes32 public constant DIASPORA_OFFICIAL = keccak256("DIASPORA_OFFICIAL");

    enum VoterType {
        Resident,
        Diaspora
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        VoterType voterType;
    }

    struct Vote {
        uint256 candidateId;
        bytes signature;
    }

    struct Candidate {
        uint256 id;
        string name;
        uint256 residentVotes;
        uint256 diasporaVotes;
    }

    mapping(address => Voter) private voters;
    mapping(address => Vote) private votes;
    Candidate[] public candidates;

    uint256 public votingStart;
    uint256 public votingEnd;
    uint256 public totalResidentVoters;
    uint256 public totalDiasporaVoters;
    bool public resultsReleased;

    event CandidateAdded(uint256 indexed candidateId, string name);
    event VoteCast(address indexed voter, VoterType voterType);
    event VoterRegistered(address indexed voter, VoterType voterType);
    event VotingPeriodSet(uint256 start, uint256 end);
    event ResultsReleased();

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ELECTION_OFFICIAL, msg.sender);
        _grantRole(DIASPORA_OFFICIAL, msg.sender);
    }

    function registerVoter(address _voter, VoterType _voterType) external {
        require(
            (hasRole(ELECTION_OFFICIAL, msg.sender) &&
                _voterType == VoterType.Resident) ||
                (hasRole(DIASPORA_OFFICIAL, msg.sender) &&
                    _voterType == VoterType.Diaspora),
            "Unauthorized to register this voter type"
        );

        require(msg.sender != address(0), "Cannot register from Zero address");
        require(!voters[_voter].isRegistered, "Voter already registered");

        voters[_voter].isRegistered = true;
        voters[_voter].voterType = _voterType;

        if (_voterType == VoterType.Resident) {
            totalResidentVoters++;
        } else {
            totalDiasporaVoters++;
        }

        emit VoterRegistered(_voter, _voterType);
    }

    function addCandidate(
        string memory _name
    ) external onlyRole(ELECTION_OFFICIAL) {
        uint256 candidateId = candidates.length;

        candidates.push(
            Candidate({
                id: candidateId,
                name: _name,
                residentVotes: 0,
                diasporaVotes: 0
            })
        );

        emit CandidateAdded(candidateId, _name);
    }

    function setVotingPeriod(
        uint256 _start,
        uint256 _end
    ) external onlyRole(ELECTION_OFFICIAL) {
        require(_start > 0 && _end > 0, "Cannot set time period to zero");
        require(_start < _end, "Invalid voting period");

        votingStart = _start;
        votingEnd = _end;

        emit VotingPeriodSet(_start, _end);
    }

    function castVote(
        uint256 _candidateId,
        bytes memory _signature
    ) external nonReentrant {
        require(
            block.timestamp >= votingStart && block.timestamp <= votingEnd,
            "Voting is not active"
        );
        require(voters[msg.sender].isRegistered, "Not registered to vote");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        // Verify the vote signature
        require(
            verifyVote(msg.sender, _candidateId, _signature),
            "Invalid signature"
        );

        voters[msg.sender].hasVoted = true;
        votes[msg.sender] = Vote(_candidateId, _signature);

        emit VoteCast(msg.sender, voters[msg.sender].voterType);
    }

    function verifyVote(
        address _voter,
        uint256 _candidateId,
        bytes memory _signature
    ) internal view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_voter, _candidateId));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);
        return signer == _voter;
    }

    function tallyVotes() external onlyRole(ELECTION_OFFICIAL) {
        require(block.timestamp > votingEnd, "Voting is still active");
        require(!resultsReleased, "Results already released");

        // Tally votes for all voters
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates[i].residentVotes = 0;
            candidates[i].diasporaVotes = 0;
        }

        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            if (voters[voter].hasVoted) {
                Vote memory vote = votes[voter];

                if (voters[voter].voterType == VoterType.Resident) {
                    candidates[vote.candidateId].residentVotes++;
                } else {
                    candidates[vote.candidateId].diasporaVotes++;
                }

                // Clear the vote to prevent double counting
                delete votes[voter];
            }
        }

        resultsReleased = true;
        emit ResultsReleased();
    }

    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }

    function getVoterCounts() external view returns (uint256, uint256) {
        return (totalResidentVoters, totalDiasporaVoters);
    }
}
