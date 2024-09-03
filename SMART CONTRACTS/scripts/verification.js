const { ethers } = require("ethers");

async function verifyOwnership(_ensName) {
  // Generate a unique message or nonce
  const message = `Verify ownership of ${_ensName} at ${new Date().getTime()}`;

  // Create a signature request
  const signatureRequest = {
    message,
    address: await ens.resolve(_ensName),
  };

  // Send the signature request to the user
  const userSignature = await getUserSignature(signatureRequest);

  // Verify the signature
  const isValid = await ethers.utils.verifyMessage(
    message,
    userSignature,
    signatureRequest.address
  );
  if (isValid) {
    // User owns the ENS name
    return true;
  } else {
    // User does not own the ENS name
    return false;
  }
}

async function getUserSignature(signatureRequest) {
  // Implement a function to get the user's signature
  // This can be done using a wallet library or a custom implementation
  // For example, using MetaMask:
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer.signMessage(signatureRequest.message);
  return signature;
}

verifyOwnership("bellemere.eth");
