const { Web3 } = require("web3");
const { Chain, EnsPlugin } = require("@namespace-ens/web3-plugin-ens");

const web3 = new Web3("SEPOLIA_RPC_URL");

web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

web3.eth.accounts.wallet.add("PRIVATE_KEY");

//const name = "bellemere.eth";
//const recordKeys = 1;
//const address = "0xEC0078347037ca55c6AB8da620853aEc35D94483";

export async function verifyEns(ensName) {
  try {
    const address = await getAddress(ensName);
    const otherRecords = await getTextRecords(ensName);    
    return { address, ...otherRecords }
  } catch (error) {
    console.error("An error occured:", error)
    return { error }
  }

}


async function getAddress(ensName) {
  try {
    const address = await web3.ens.getAddress(ensName);
    console.log("getting address");
    console.log(address);
    return address
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getTextRecords(ensName) {
  try {
    const textRecords = await web3.ens.getTextRecords(ensName, ["email"]);
    console.log("getting records");
    console.log(textRecords);
    return textRecords;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}