const { Web3 } = require("web3");
const { Chain, EnsPlugin } = require("@namespace-ens/web3-plugin-ens");

const web3 = new Web3(
  "https://sepolia.infura.io/v3/2c7f6d8116fd45adb63c13f00c776087"
);

web3.registerPlugin(new EnsPlugin(Chain.Sepolia));

web3.eth.accounts.wallet.add("PRIVATE_KEY");

//const name = "bellemere.eth";
//const recordKeys = 1;
//const address = "0xEC0078347037ca55c6AB8da620853aEc35D94483";

async function getAddress() {
  try {
    // getting text records
    //await web3.ens.getTextRecords(name, recordKeys);
    const response = await web3.ens.getAddress("bellemere.eth");
    console.log("getting address");
    console.log(response);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getTextRecords() {
  try {
    const response2 = await web3.ens.getTextRecords("bellemere.eth", ["email"]);
    console.log("getting records");
    console.log(response2);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

getAddress();
getTextRecords();
