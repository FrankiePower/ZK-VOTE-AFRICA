// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ImprovedAfricanElectoralSystemWithDiaspora is ReentrancyGuard, AccessControl {
    using ECDSA for bytes32;

    bytes32 public constant ELECTION_OFFICIAL = keccak256("ELECTION_OFFICIAL");
    bytes32 public constant DIASPORA_OFFICIAL = keccak256("DIASPORA_OFFICIAL");

    enum VoterType { Resident, Diaspora }

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

    event VoterRegistered(address indexed voter, VoterType voterType);
    event VoteCast(address indexed voter, VoterType voterType);
    event CandidateAdded(uint256 indexed candidateId, string name);
    event VotingPeriodSet(uint256 start, uint256 end);
    event ResultsReleased();

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ELECTION_OFFICIAL, msg.sender);
        _grantRole(DIASPORA_OFFICIAL, msg.sender);
    }

    // ... [Other functions remain the same] ...

    function castVote(uint256 _candidateId, bytes memory _signature) external nonReentrant {
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting is not active");
        require(voters[msg.sender].isRegistered, "Not registered to vote");
        require(!voters[msg.sender].hasVoted, "Already voted");

        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, _candidateId));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(_signature);

        require(signer == msg.sender, "Invalid signature");

        voters[msg.sender].hasVoted = true;
        votes[msg.sender] = Vote(_candidateId, _signature);

        emit VoteCast(msg.sender, voters[msg.sender].voterType);
    }

    function verifyVote(address _voter) external view returns (bool) {
    require(voters[_voter].hasVoted, "Voter has not cast a vote");
    Vote memory vote = votes[_voter];
    bytes32 messageHash = keccak256(abi.encodePacked(_voter, vote.candidateId));
    bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
    address signer = ethSignedMessageHash.recover(vote.signature);
    return signer == _voter;
}

    function tallyVote(address _voter) external onlyRole(ELECTION_OFFICIAL) {
        require(voters[_voter].hasVoted, "Voter has not cast a vote");
        require(!resultsReleased, "Results already released");
        require(verifyVote(_voter), "Vote verification failed");
        
        Vote memory vote = votes[_voter];
        
        if (voters[_voter].voterType == VoterType.Resident) {
            candidates[vote.candidateId].residentVotes++;
        } else {
            candidates[vote.candidateId].diasporaVotes++;
        }
        
        // Clear the vote to prevent double counting
        delete votes[_voter];
    }

    // ... [Rest of the contract remains the same] ...
}