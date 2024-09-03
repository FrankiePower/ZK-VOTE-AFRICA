const { Web3 } = require("web3");
const { EnsPlugin, Chain } = require("@namespace-ens/web3-plugin-ens");
require("dotenv").config();

// Setup
const web3 = new Web3(
  "https://sepolia.infura.io/v3/32149ccf1f49493e9050605abb679cfe"
);
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

// Add your account
const account = web3.eth.accounts.privateKeyToAccount(
  "0xa20ca6c555f231c801e23f0d359a24cb7d3637c51cb02c5b3be75faef8e4dee3"
);
web3.eth.accounts.wallet.add(account);

async function registerENS(name, owner) {
  console.log(`Attempting to register ${name}.eth for ${owner}`);

  try {
    // Check if the name is available
    /* const isAvailable = await web3.ens.isAvailable(name);
    if (!isAvailable) {
      console.log(`${name}.eth is not available.`);
      return;
    } */

    // Prepare registration request
    const registrationRequest = {
      label: "porchechan",
      owner: "0xEC0078347037ca55c6AB8da620853aEc35D94483",
      durationInSeconds: 31536000, // 1 year
      secret: web3.utils.randomHex(32),
      resolver: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63", // Official ENS PublicResolver
      setAsPrimary: true,
      fuses: 0,
    };

    // Submit commitment
    console.log("Submitting commitment...");
    await web3.ens.commit(registrationRequest);

    // Wait for commitment to be mined (usually 1 minute on mainnet, but we'll use 15 seconds for Sepolia)
    console.log("Waiting for commitment to be mined...");
    await new Promise((resolve) => setTimeout(resolve, 15000));

    // Register the name
    console.log("Registering the name...");
    await web3.ens.web3.ens.registerEnsDomain(registrationRequest);

    console.log(`Successfully registered ${name}.eth!`);

    // Set an address for the newly registered name
    console.log("Setting address for the new name...");
    await web3.ens.setAddress(name + ".eth", owner);

    console.log(`Address set for ${name}.eth: ${owner}`);
  } catch (error) {
    console.error("Error during registration:", error);
  }
}
