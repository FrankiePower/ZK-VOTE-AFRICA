"use client";

import {
  frameOne,
  candidateOne,
  avatarCandidate,
} from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { ethers } from "ethers";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useSignMessage,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "@/lib/contract-abi";

const ElectionComponent = () => {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [selectedCandidateImage, setSelectedCandidateImage] = useState<
    any | null
  >(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    data: contractHash,
    error: contractError,
    isPending: contractLoading,
    writeContract,
  } = useWriteContract();

  const { isLoading: isContractConfirming, isSuccess: isContractConfirmed } =
    useWaitForTransactionReceipt({ hash: contractHash });

  const {
    data: signMessageData,
    error,
    signMessage,
    signMessageAsync,
    variables,
  } = useSignMessage();

  const { data: candidates } = useReadContract({
    abi,
    address: "0x499Ba5983D885e5647163801BD03C2Bd9095b8E3",
    functionName: "getCandidates",
  });

  const account = useAccount();

  const handleCandidateSelect = (candidate: string, img: any, id: number) => {
    setSelectedCandidate(candidate);
    setSelectedCandidateImage(img);
    setSelectedCandidateId(id);
    setStep(3);
  };

  const castVote = async () => {
    setLoading(true);
    const message = ethers.solidityPackedKeccak256(
      ["address", "uint256"],
      [account.address, selectedCandidateId]
    );
    const signedMessage = await signMessageAsync({ message: message });
    console.log(signedMessage);
    try {
      if (signedMessage) {
          writeContract({
            abi,
            address: "0x499Ba5983D885e5647163801BD03C2Bd9095b8E3",
            functionName: "castVote",
            args: [0, signedMessage],
          });
          console.log(contractError, contractLoading);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleVoteSubmit = async () => {
    // interact with smart contract and call voting function interaction with contract
    castVote();
    console.log(`Vote submitted for ${selectedCandidate}`);

    if (isContractConfirmed) setStep(4);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  return (
    <div className="flex items-center justify-center bg-white">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full max-w-md"
        >
          <Image
            src={frameOne}
            alt="Nigeria Election 2024"
            objectFit="cover"
            className="h-[300px] md:h-[420px]"
          />
          <h3 className="mt-8 text-2xl font-bold text-center text-black">
            Welcome to the 2024 Presidential Election
          </h3>
          <p className="my-3 text-sm md:text-lg text-center text-black">
            Select your preferred candidate and cast your vote securely
          </p>
          <button
            onClick={() => setStep(2)}
            className="px-10 py-3 bg-primary-green text-white font-medium rounded-md hover:opacity-95 transition-colors w-full"
          >
            Start Voting
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full max-w-md"
        >
          <h3 className="text-xl font-bold text-center text-black">
            Choose your Candidate
          </h3>
          <p className="text-center text-gray-700 mb-4">
            Select the candidate you wish to vote for. Your vote will be
            securely encrypted and anonymous.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            {candidates ? (
              (candidates as any[]).map((candidate: any, idx: number) => (
                <div
                  onClick={() =>
                    handleCandidateSelect(candidate.name, avatarCandidate, idx)
                  }
                  key={`${candidate.name}-${idx}`}
                  className={`border rounded-lg p-2 text-left cursor-pointer transition duration-200 ${
                    selectedCandidate === candidate.name
                      ? "bg-primary-green text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Image
                    src={avatarCandidate}
                    alt="avatar"
                    className="rounded-lg max-h-[200px] "
                  />
                  <h3 className="font-bold mt-3 text-lg p-4 truncate">Name: {candidate.name}</h3>
                </div>
              ))
            ) : (
              <>No candidates to show</>
            )}
          </div>
          <button
            onClick={() => setStep(3)}
            className="px-10 py-3 bg-primary-green text-white mt-3 font-medium rounded-md hover:opacity-95 transition-colors w-full"
          >
            Next
          </button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full max-w-md"
        >
          <h1 className="text-2xl text-black font-bold mb-6">
            Confirm your Vote
          </h1>
          <div className="w-full p-6 rounded-lg text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="border rounded-lg p-2 text-left bg-primary-green text-white">
                <Image
                  src={selectedCandidateImage ?? candidateOne}
                  alt={"selectedCandidate"}
                  className="rounded-lg"
                />
                <h3 className="font-bold">Name: {selectedCandidate}</h3>
                <p>
                  Party:
                  {selectedCandidate === "Peter Obi"
                    ? "Labour Party"
                    : selectedCandidate === "Kwankwaso"
                    ? "NNPP"
                    : selectedCandidate === "Atiku"
                    ? "PDP"
                    : "APC"}
                </p>
              </div>
            </div>
            <p className="text-sm text-black mb-6">
              Please review your selected candidate. Once confirmed, your vote
              will be encrypted and submitted.
            </p>
            <button
              onClick={handleVoteSubmit}
              className="bg-primary-green text-white py-2 px-4 rounded-lg w-full mb-4"
            >
              Confirm
            </button>
            <button
              onClick={goBack}
              className="border border-primary-green text-primary-green py-2 px-4 rounded-lg w-full"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-xl p-6 w-4/5 max-w-sm shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Vote Successful
            </h2>
            <div className="flex justify-center mb-4">
              <BadgeCheck className="text-green-500 w-12 h-12" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-4">
              Your vote has been submitted successfully!
            </p>
            <Link
              href={"/elections/results"}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mb-6"
            >
              Monitor Election Progress →
            </Link>
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ElectionComponent;
