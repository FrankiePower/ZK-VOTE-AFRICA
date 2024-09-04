const main = async () => {
    require("dotenv").config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { ethers } = require("ethers");
    const { hashMessage } = require("@ethersproject/hash");
    const provider = new ethers.AlchemyProvider("sepolia", API_URL);

    const message = "Hello";
    const walletInst = new ethers.Wallet(PRIVATE_KEY, provider);
    const signMessage = walletInst.signMessage(message);

    const messageSigner = signMessage.then((value) => {
        const verifySigner = ethers.recoverAddress(hashMessage(message), value);
        return verifySigner;
    });

    try {
        console.log("Success! The message: " + message + " was signed with the signature: " + await signMessage);
        console.log("The signer was: " + await messageSigner);
    } catch (err) {
        console.log("Something went wrong while verifying your message signature: " + err);
    }
};

main();
