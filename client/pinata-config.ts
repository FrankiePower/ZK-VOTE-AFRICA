import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

// Upload a file to pinaata ipfs
async function uploadFile() {
  try {
    const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
    const upload = await pinata.upload.file(file);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}

uploadFile();

// retrieve a file from ipfs pinata
async function retrieveFile(ipfsHash: string) {
  try {
    const data = await pinata.gateways.get(ipfsHash);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

retrieveFile("bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq");
