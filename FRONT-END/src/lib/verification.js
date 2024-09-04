const { ethers } = require("ethers");
const { getAddress } = require('./index')

export async function verifyOwnership(_ensName) {
  // Connect to the Ethereum network using a provider
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Resolve the ENS name to an Ethereum address
  // const address = await provider.resolveName(_ensName);
  const address = getAddress(_ensName);
  console.log(address);
  if (!address) {
    throw new Error(`ENS name ${_ensName} could not be resolved.`);
  }

  // Generate a unique message or nonce
  const message = `Verify ownership of ${_ensName} at ${new Date().getTime()}`;

  // Create a signature request
  const signatureRequest = {
    message,
    address: address,
  };

  // Send the signature request to the user
  const userSignature = await getUserSignature(signatureRequest);

  // Verify the signature
  const isValid = await ethers.verifyMessage(
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
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer.signMessage(signatureRequest.message);
  return signature;
}