const IPFS = require("ipfs-http-client");
const ipfs = IPFS.create({ url: "https://ipfs.infura.io:5001" });

async function uploadToIPFS(data) {
  const { cid } = await ipfs.add(JSON.stringify(data));
  return cid.toString();
}

const voterData = {
  id: "voter123",
  name: "Alice",
  age: 30,
  eligibility: true,
};

uploadToIPFS(voterData).then((cid) => {
  console.log(`IPFS CID: ${cid}`);
});
