pragma solidity ^0.8.0;

contract VotingContract {
    mapping (address => uint256) public votes;
    mapping (string => uint256) public electionResults;

    function vote(string memory _ensName, uint256 _candidateId) public {
        // Authenticate user using ENS name
        // Record vote
        votes[msg.sender] = _candidateId;
    }

    function tallyVotes() public {
        // Tally votes
        for (uint256 i = 0; i < votes.length; i++) {
            electionResults[votes[i]] += 1;
        }
    }

    function getElectionResults() public view returns (mapping (string => uint256)) {
        return electionResults;
    }
}