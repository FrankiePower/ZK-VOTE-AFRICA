const main = async () => {
   require("dotenv").config();
   const { API_URL, PRIVATE_KEY } = process.env;
   const { ethers } = require("ethers");
   const { hashMessage } = require("@ethersproject/hash");
   const { Network, initializeAlchemy } = require("alchemy-sdk");
   const settings = {
       apiKey: API_URL,
       Network: Network.ETH_SEPOLIA,
   };
   const alchemy = new Alchemy(settings);
   const ethersAlchemyProvider = alchemy.config.getProvider();

   const message = "Let's verify the signature of this message!";
   const walletInst = new ethers.Wallet(PRIVATE_KEY, ethersAlchemyProvider);
   const signMessage = walletInst.signMessage(message);

   const messageSigner = signMessage.then((value) => {
       const verifySigner = ethers.utils.recoverAddress(hashMessage(message),value);
       return verifySigner;
     });

   try {
     console.log("Success! The message: " +message+" was signed with the signature: " +await signMessage);
     console.log("The signer was: " +await messageSigner);
   } catch (err) {
     console.log("Something went wrong while verifying your message signature: " + err);
   }
 };
 
 main();

To use your script, type the following command in your terminal:

Shell

node AlchemySDK-VerifyMsg.js

If successful, the message signature hash and signer address should return something like the following:

Shell

Success! The message: Let's verify the signature of this message! was signed with the signature: 0x16a08da8a50dc4ec2abf080528440821fc749323c69b6d38d88b8dedc03961772a7da6a2c74fcbde325085e552fcb197673e2a4741189bd6f9d9e1d07236c37c1b
The signer was: 0x5DAAC14781a5C4AF2B0673467364Cba46Da935dB

Awesome! You successfully signed a message and verified its signature!

You now know how to verify message signatures using Web3.js and Ethers.js. Check out part two to learn how to create a signature generator DApp and verify signatures using MetaMask!