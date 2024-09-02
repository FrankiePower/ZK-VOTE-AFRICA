// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VoterRegistration is Ownable {

    // IPFS hash where the voter data is stored
    string public ipfsHash;


    // Mapping to keep track of registered voters
    mapping (address => bool) private registeredVoters;


    // Event to emit when IPFS hash is updated
    event IPFSHashUpdated(string newIpfsHash);

    // Event emitted when a voter is registered
    event VoterRegistered(address indexed voter);

      // Event emitted when a voter is removed
    event VoterRemoved(address indexed voter);

    // Modifier to ensure only registered voters can call certain functions
    modifier onlyRegisteredVoters() {
        require(registeredVoters[msg.sender], "Not a registered voter");
        _;
    }

    // Register a new voter
    function registerVoter(address _voter) external onlyOwner {
        require(_voter != address(0), "Invalid address");
        require(!registeredVoters[_voter], "Voter already registered");

        registeredVoters[_voter] = true;
        emit VoterRegistered(_voter);
    }

     // Set the IPFS hash when deploying or updating it
    function setIPFSHash(string calldata _ipfsHash) external onlyOwner {
        ipfsHash = _ipfsHash;
        emit IPFSHashUpdated(_ipfsHash);
    }

    // Function to check if an address is registered
    function isRegistered(address _voter) external view returns (bool) {
        // This function does not directly check registration; you would
        // need to implement off-chain logic to query IPFS and verify
        // This is a placeholder function to show intent
        return false;
    }

    
   // Check if an address is registered
    function isRegistered(address _voter) external view returns (bool) {
        return registeredVoters[_voter];
    }

    event IPFSHashUpdated(string newIpfsHash);
    event VoteCasted(address indexed voter);

    // Update the IPFS hash
    function setIPFSHash(string calldata _ipfsHash) external onlyOwner {
        ipfsHash = _ipfsHash;
        emit IPFSHashUpdated(_ipfsHash);
    }

    // Function to cast a vote
    function vote() external {
        // Placeholder for vote casting logic
        // You need to ensure the address is registered before calling this function
        emit VoteCasted(msg.sender);
    }


contract VoterRegistration {
    mapping(string => bool) public registeredVoters;
    mapping(string => address) public voterAddresses;

    function registerVoter(string memory voterHash, address voterAddress) public {
        registeredVoters[voterHash] = true;
        voterAddresses[voterHash] = voterAddress;
    }

    function isRegistered(string memory voterHash) public view returns (bool) {
        return registeredVoters[voterHash];
    }
}

}