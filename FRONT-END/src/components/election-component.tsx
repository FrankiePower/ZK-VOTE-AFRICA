"use client";

import { frameOne, candidateOne, candidateTwo, candidateThree, candidateFour } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { abi } from '@/lib/contract-abi';

const ElectionComponent = () => {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [selectedCandidateImage, setSelectedCandidateImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const { writeContract } = useWriteContract();
  const account = useAccount();

  const handleCandidateSelect = (candidate: string, img: any) => {
    setSelectedCandidate(candidate);
    setSelectedCandidateImage(img);
    setStep(3);
  };

  const castVote = async () => {
    writeContract({ 
      abi,
      address: account.address!,
      functionName: 'transferFrom',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
      ],
   })

  }


  const handleVoteSubmit = async () => {
    // interact with smart contract and call voting function interaction with contract

    console.log(`Vote submitted for ${selectedCandidate}`);
    setStep(4);
  };

  const goBack = () => {
    setStep(step - 1);
  };

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
          <h3 className="text-xl font-bold text-center text-black">Choose your Candidate</h3>
          <p className="text-center text-gray-700 mb-4">
            Select the candidate you wish to vote for. Your vote will be securely encrypted and anonymous.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div
              onClick={() => handleCandidateSelect('Peter Obi', candidateOne)}
              className={`border rounded-lg p-2 text-left cursor-pointer transition duration-200 ${
                selectedCandidate === 'Peter Obi' ? 'bg-primary-green text-white' : 'bg-white text-black'
              }`}
            >
              <Image src={candidateOne} alt="Peter Obi" className="rounded-lg" />
              <h3 className="font-bold">Name: Peter Obi</h3>
              <p>Party: Labour Party</p>
            </div>
            <div
              onClick={() => handleCandidateSelect('Kwankwaso', candidateTwo)}
              className={`border rounded-lg p-2 text-left cursor-pointer transition duration-200 ${
                selectedCandidate === 'Kwankwaso' ? 'bg-primary-green text-white' : 'bg-white text-black'
              }`}
            >
              <Image src={candidateTwo} alt="Kwankwaso" className="rounded-lg" />
              <h3 className="font-bold">Name: Kwankwaso</h3>
              <p>Party: NNPP</p>
            </div>
            <div
              onClick={() => handleCandidateSelect('Atiku', candidateThree)}
              className={`border rounded-lg p-2 text-left cursor-pointer transition duration-200 ${
                selectedCandidate === 'Atiku' ? 'bg-primary-green text-white' : 'bg-white text-black'
              }`}
            >
              <Image src={candidateThree} alt="Atiku" className="rounded-lg" />
              <h3 className="font-bold">Name: Atiku</h3>
              <p>Party: PDP</p>
            </div>
            <div
              onClick={() => handleCandidateSelect('Tinubu', candidateFour)}
              className={`border rounded-lg p-2 text-left cursor-pointer transition duration-200 ${
                selectedCandidate === 'Tinubu' ? 'bg-primary-green text-white' : 'bg-white text-black'
              }`}
            >
              <Image src={candidateFour} alt="Tinubu" className="rounded-lg" />
              <h3 className="font-bold">Name: Tinubu</h3>
              <p>Party: APC</p>
            </div>
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
          <h1 className="text-2xl text-black font-bold mb-6">Confirm your Vote</h1>
          <div className="w-full p-6 rounded-lg text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="border rounded-lg p-2 text-left bg-primary-green text-white">
                <Image src={selectedCandidateImage ?? candidateOne} alt={'selectedCandidate'} className="rounded-lg" />
                <h3 className="font-bold">Name: {selectedCandidate}</h3>
                <p>Party: 
                  {selectedCandidate === 'Peter Obi' ? 'Labour Party' : 
                  selectedCandidate === 'Kwankwaso' ? 'NNPP' : 
                  selectedCandidate === 'Atiku' ? 'PDP' : 'APC'}
                </p>
              </div>
            </div>
            <p className="text-sm text-black mb-6">
              Please review your selected candidate. Once confirmed, your vote will be encrypted and submitted.
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Vote Successful</h2>
            <div className="flex justify-center mb-4">
              <BadgeCheck className="text-green-500 w-12 h-12" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-4">Your vote has been submitted successfully!</p>
            <Link
              href={'/elections/results'}
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