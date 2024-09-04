// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ZKVoting is AccessControl, ReentrancyGuard {
    error CandidateNotFound();
    error ElectionConcluded();
    error InvalidSignature();
    error InvalidVotingPeriod();
    error UnauthorizedVoterRegistration();
    error VoterAlreadyRegistered();
    error VoterAlreadyVoted();
    error VoterNotRegistered();
    error VotingPeriodActive();
    error VotingPeriodInactive();
    error ZeroAddressForbidden();

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
    address[] private voterAddresses; // Array to store voter addresses
    Candidate[] public candidates;

    uint256 public votingStart;
    uint256 public votingEnd;
    uint256 public totalResidentVoters;
    uint256 public totalDiasporaVoters;
    bool public resultsTallied;

    event CandidateAdded(uint256 indexed candidateId, string name);
    event VoterRegistered(address indexed voter, VoterType voterType);
    event VotingPeriodSet(uint256 start, uint256 end);
    event VoteCast(address indexed voter, VoterType voterType);
    event ResultsTallied(uint256 currentTime);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ELECTION_OFFICIAL, msg.sender);
        _grantRole(DIASPORA_OFFICIAL, msg.sender);
    }

    function registerVoter(address _voter, VoterType _voterType) external {
        if (
            !(hasRole(ELECTION_OFFICIAL, msg.sender) &&
                _voterType == VoterType.Resident) &&
            !(hasRole(DIASPORA_OFFICIAL, msg.sender) &&
                _voterType == VoterType.Diaspora)
        ) {
            revert UnauthorizedVoterRegistration();
        }

        if (msg.sender == address(0)) {
            revert ZeroAddressForbidden();
        }

        if (voters[_voter].isRegistered) {
            revert VoterAlreadyRegistered();
        }

        voters[_voter].isRegistered = true;
        voters[_voter].voterType = _voterType;
        voterAddresses.push(_voter);

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
        if (_start >= _end) {
            revert InvalidVotingPeriod();
        }

        votingStart = _start;
        votingEnd = _end;
        emit VotingPeriodSet(_start, _end);
    }

    function castVote(
        uint256 _candidateId,
        bytes memory _signature
    ) external nonReentrant {
        if (block.timestamp < votingStart || block.timestamp > votingEnd) {
            revert VotingPeriodInactive();
        }

        if (!voters[msg.sender].isRegistered) {
            revert VoterNotRegistered();
        }

        if (voters[msg.sender].hasVoted) {
            revert VoterAlreadyVoted();
        }

        if (_candidateId >= candidates.length) {
            revert CandidateNotFound();
        }

        // Verify the vote signature
        if (!verifyVote(msg.sender, _candidateId, _signature)) {
            revert InvalidSignature();
        }

        // Mark the voter as having voted
        voters[msg.sender].hasVoted = true;
        votes[msg.sender] = Vote(_candidateId, _signature);

        emit VoteCast(msg.sender, voters[msg.sender].voterType);
    }

    function verifyVote(
        address _voter,
        uint256 _candidateId,
        bytes memory _signature
    ) internal pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_voter, _candidateId));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);
        return signer == _voter;
    }

    function tallyVotes()
        external
        onlyRole(ELECTION_OFFICIAL)
        returns (Candidate[] memory)
    {
        if (block.timestamp <= votingEnd) {
            revert VotingPeriodActive();
        }

        if (resultsTallied) {
            revert ElectionConcluded();
        }

        // Reset candidate vote counts
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates[i].residentVotes = 0;
            candidates[i].diasporaVotes = 0;
        }

        // Tally votes for all voters
        for (uint256 i = 0; i < voterAddresses.length; i++) {
            address voter = voterAddresses[i];

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

        // Clear the voterAddresses array in a single operation
        delete voterAddresses;

        resultsTallied = true;
        emit ResultsTallied(block.timestamp);

        return candidates;
    }

    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }

    function getVoterCounts() external view returns (uint256, uint256) {
        return (totalResidentVoters, totalDiasporaVoters);
    }
}
