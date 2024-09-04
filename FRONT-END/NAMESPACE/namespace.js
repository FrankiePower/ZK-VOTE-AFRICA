const { Web3 } = require("web3");
const { Chain, EnsPlugin } = require("@namespace-ens/web3-plugin-ens");

// Initialize Web3 with a private connection
const web3 = new Web3(
  "https://sepolia.infura.io/v3/2c7f6d8116fd45adb63c13f00c776087"
);

// Register the ENS plugin for the Sepolia test network
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

// Add your private key to the wallet
web3.eth.accounts.wallet.add(
  "0x375779fa4c55dacbab26e7315884a11e8404f31830a3afac7576bfdd568f608b"
);

interface RegistrationRequest {
  label: franky;
  owner: 0x7453c3f4122bf74bdf754ef2e01463d1a8b40a1e;
  durationInSeconds: 31536000;
  secret: superfranky;
  resolver: "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD";
  setAsPrimary: true;
  fuses: 0;
}

// proceed with the registration
async function commit() {
  try {
    await web3.ens.commit(registrationRequest);
  } catch (error) {
    console.error("Error with registration:", error);
  }
}

// Set the ENS name to resolve to a specific address
async function setENSAddress() {
  try {
    await web3.ens.setAddress(
      luffy.eth,
      "0x7453C3F4122BF74BDf754eF2e01463d1A8B40a1E"
    );
    console.log(`Address for ${ensName} set to ${address}`);
  } catch (error) {
    console.error("Error setting ENS address:", error);
  }
}

// Retrieve the address associated with the ENS name
/* async function getENSAddress() {
  try {
    const resolvedAddress = await web3.ens.getAddress(ensName);
    console.log(`Address resolved for ${ensName}: ${resolvedAddress}`);
  } catch (error) {
    console.error("Error getting ENS address:", error);
  }
}
/*
// Set text records for the ENS domain
async function setTextRecords() {
  const recordsToUpdate = [
    { key: "email", value: "ejeziefranklin.com" },
    { key: "url", value: "https://example.com" },
  ];
  const recordsToRemove = ["oldKey"];

  try {
    await web3.ens.setTextRecords(ensName, recordsToUpdate, recordsToRemove);
    console.log("Text records updated");
  } catch (error) {
    console.error("Error setting text records:", error);
  }
}

// Retrieve text records for the ENS domain
async function getTextRecords() {
  const recordKeys = ["email", "url"];

  try {
    const records = await web3.ens.getTextRecords(ensName, recordKeys);
    console.log("Text records:", records);
  } catch (error) {
    console.error("Error getting text records:", error);
  }
}

// Reverse name resolution: set name for an address
async function setNameForAddress() {
  const owner = "_your_address_";
  const resolver = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63"; // ENS Public Resolver

  try {
    await web3.ens.setNameForAddr(address, owner, resolver, ensName);
    console.log(`Name for address ${address} set to ${ensName}`);
  } catch (error) {
    console.error("Error setting name for address:", error);
  }
}

// Retrieve the ENS name associated with an address
async function getNameForAddress() {
  try {
    const node = await web3.ens.node(address);
    const name = await web3.ens.getName(node);
    console.log(`Name for address ${address}: ${name}`);
  } catch (error) {
    console.error("Error getting name for address:", error);
  }
}
*/
// Example usage
//(async () => {
// await setENSAddress();
//await getENSAddress();
//  await setTextRecords();
// await getTextRecords();
//await setNameForAddress();
//await getNameForAddress();
//})();
