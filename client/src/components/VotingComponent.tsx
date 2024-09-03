import React, { useState } from 'react';
import { ethers } from 'ethers';

const VotingComponent = () => {
  const [candidateId, setCandidateId] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const signVote = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed!');
      return;
    }

    try {
      console.log("something starts.........")
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(res);
      console.log("something starts.........")

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("something starts.........")

      // Create the message to sign (voter's address + candidate ID)
      const message = ethers.solidityPacked(
        ['address', 'uint256'],
        [address, candidateId]
      );

      // Hash the message
      const messageHash = ethers.keccak256(message);

      // Sign the hashed message
      const signature = await signer.signMessage(ethers.arrayify(messageHash));

      setSignature(signature);
      setError('');
    } catch (err) {
      setError('Error signing vote: ' + err.message);
      console.log('Error signing vote: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
      <div className="mb-4">
        <label className="block mb-2">Candidate ID:</label>
        <input
          type="number"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button
        onClick={signVote}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Sign Vote
      </button>
      {signature && (
        <div className="mt-4">
          <h3 className="font-bold">Signature:</h3>
          <p className="break-all">{signature}</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default VotingComponent;