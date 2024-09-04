// import pkg from "hardhat";
// const { ethers } = pkg;
const { ethers } = require("hardhat");
require("dotenv").config();

// Load environment variables
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.LISK_RPC_URL;

async function main() {
    // Set up provider and wallet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const ZKVotingContractAddress = "0x2DB86C37BE1bb9257EAf7429d4891E045c9d9689";
    const zkVoteAfrica = await ethers.getContractAt("ZKVoting", ZKVotingContractAddress);

    // Example interactions:
    const electionOfficial = wallet.address;  // Assuming deployer is the election official
    const voterAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

    // Register a voter (1 = Resident, 2 = Diaspora)
    let tx = await zkVoteAfrica.registerVoter(voterAddress, 0);
    await tx.wait();
    console.log("Voter registered.");
    console.log(tx);

    // Add a candidate
    tx = await zkVoteAfrica.addCandidate("Peter Obi");
    await tx.wait();
    console.log("Candidate added.");

    // Set the voting period (start and end timestamps)
    const start = Math.floor(Date.now() / 1000); // Now
    const end = start + 7 * 24 * 60 * 60; // 1 week from now
    tx = await zkVoteAfrica.setVotingPeriod(start, end);
    await tx.wait();
    console.log("Voting period set.");

    // Cast a vote (make sure to sign the message off-chain)
    const candidateId = 0;  // Assuming candidate ID 0
    const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256"],
        [voterAddress, candidateId]
    );
    const signature = await wallet.signMessage(ethers.toBeArray(messageHash));

    tx = await zkVoteAfrica.castVote(candidateId, signature);
    await tx.wait();
    console.log("Vote cast.");

    // Tally the vote for a voter
    tx = await zkVoteAfrica.tallyVote(voterAddress);
    await tx.wait();
    console.log("Vote tallied.");

    // Release results after voting ends
    tx = await zkVoteAfrica.releaseResults();
    await tx.wait();
    console.log("Results released.");

    // Get the total candidate count
    const candidateCount = await zkVoteAfrica.getCandidateCount();
    console.log("Total candidates:", candidateCount.toString());

    // Get voter counts
    const [residentVoters, diasporaVoters] = await zkVoteAfrica.getVoterCounts();
    console.log("Resident Voters:", residentVoters.toString());
    console.log("Diaspora Voters:", diasporaVoters.toString());
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
