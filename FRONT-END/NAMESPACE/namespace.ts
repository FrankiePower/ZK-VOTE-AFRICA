const { Web3 } = require("web3");
const { Chain, EnsPlugin } = require("@namespace-ens/web3-plugin-ens");

// Initialize Web3 with a private connection
const web3 = new Web3(
  "https://sepolia.infura.io/v3/2c7f6d8116fd45adb63c13f00c776087"
);
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));
web3.eth.accounts.wallet.add(
  "0x375779fa4c55dacbab26e7315884a11e8404f31830a3afac7576bfdd568f608b"
);

// ENS domain and address to set
const ensName = "luffy.eth";
const newAddress = "0x7453C3F4122BF74BDf754eF2e01463d1A8B40a1E";

// Set ENS address
async function setAddress() {
  try {
    await web3.ens.setAddress(ensName, newAddress);
    console.log(`Address for ${ensName} set to ${newAddress}`);
  } catch (error) {
    console.error("Error setting address for ENS name:", error);
  }
}

// Get ENS address
async function getAddress() {
  try {
    const address = await web3.ens.getAddress(ensName);
    console.log(`Address resolved for ${ensName}: ${address}`);
  } catch (error) {
    console.error("Error getting address for ENS name:", error);
  }
}

// Example usage
(async () => {
  await setAddress();
  await getAddress();
})();
