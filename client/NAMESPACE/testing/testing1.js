// Setup
const Web3 = require("web3");
const { EnsPlugin, Chain } = require("@namespace-ens/web3-plugin-ens");

// Connect to Sepolia
const web3 = new Web3("YOUR_SEPOLIA_RPC_URL");
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

// Voting Smart Contract
const votingContractABI = [
  {
    inputs: [{ internalType: "string", name: "ensName", type: "string" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "ensName", type: "string" }],
    name: "getVoteCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const votingContractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const votingContract = new web3.eth.Contract(
  votingContractABI,
  votingContractAddress
);

// Function to vote
async function vote(ensName) {
  const accounts = await web3.eth.getAccounts();
  await votingContract.methods.vote(ensName).send({ from: accounts[0] });
}

// Function to get vote count
async function getVoteCount(ensName) {
  return await votingContract.methods.getVoteCount(ensName).call();
}
