const { Web3 } = require("web3");

const web3 = new Web3(
  "https://sepolia.infura.io/v3/32149ccf1f49493e9050605abb679cfe"
);

//const ensName = "bellemere.eth";

async function getBalanceForENS(ensName) {
  try {
    const ownerAddress = await web3.eth.ens.getAddress(ensName);
    if (
      !ownerAddress ||
      ownerAddress === "0x0000000000000000000000000000000000000000"
    ) {
      console.error("Invalid ENS owner address.");
      return;
    }

    const balance = await web3.eth.getBalance(ownerAddress);
    console.log(
      `Balance for address ${ownerAddress}: ${web3.utils.fromWei(
        balance,
        "ether"
      )} ETH`
    );
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

/* async function verifyAddress(_address) {
  const message = "Hello, world!";
  const signature = await web3.eth.sign(message, _address);
  // Verify the signature
  if (web3.eth.verifySignature(_address, signature, message)) {
    // User has control over the address
    return true;
  } else {
    // User does not have control over the address
    return false;
  }
} */

getBalanceForENS("bellemere.eth");
//verifyAddress("0x7453c3f4122bf74bdf754ef2e01463d1a8b40a1e");
