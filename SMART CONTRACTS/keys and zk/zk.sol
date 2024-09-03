pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ZKVoting {
    mapping(bytes32 => bool) public votes;
    mapping(bytes32 => bool) public nullifiers;
    
    bytes32 public merkleRoot;  // Root of the Merkle tree of eligible voters
    
    event VoteCast(bytes32 indexed voteHash);

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function castVote(
        uint256[8] calldata _proof,
        uint256[2] calldata _pubSignals
    ) external {
        require(verifyProof(_proof, _pubSignals), "Invalid ZK proof");
        
        bytes32 nullifier = bytes32(_pubSignals[0]);
        bytes32 voteHash = bytes32(_pubSignals[1]);
        
        require(!nullifiers[nullifier], "Vote already cast");
        
        nullifiers[nullifier] = true;
        votes[voteHash] = true;
        
        emit VoteCast(voteHash);
    }
    
    function verifyProof(
        uint256[8] calldata _proof,
        uint256[2] calldata _pubSignals
    ) internal view returns (bool) {
        // This function would contain the ZK verification logic
        // It's complex and typically generated from a ZK proving system
        // For this example, we'll just return true
        return true;
    }
}