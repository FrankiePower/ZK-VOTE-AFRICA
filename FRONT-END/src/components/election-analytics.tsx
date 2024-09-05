"use client";

import { abi } from "@/lib/contract-abi";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

interface Candidate {
  diasporaVotes: bigint;
  id: bigint;
  name: string;
  residentVotes: bigint;
}

interface ElectionResults {
  totalVotes: bigint;
  totalResidentVotes: bigint;
  totalDiasporaVotes: bigint;
  candidateVotes: { candidate: string; numberOfVotes: bigint }[];
}

const ElectionAnalytics = () => {
  const [metrics, setMetrics] = useState<ElectionResults | undefined>(undefined);
  const { data: candidates } = useReadContract({
    abi,
    address: "0xbA2DbEfAfA35B2881F4CbB0041133De9BB23785D",
    functionName: "getCandidates",
  });

  // Function to analyze the election data
  function analyzeElectionData(candidates: Candidate[]) {
    if (!candidates) return;
    let totalResidentVotes = BigInt(0);
    let totalDiasporaVotes = BigInt(0);
    const candidateVotes: { candidate: string; numberOfVotes: bigint }[] = [];

    candidates.forEach((candidate) => {
      const totalVotesForCandidate =
        candidate.residentVotes + candidate.diasporaVotes;

      // Add up resident and diaspora votes for the total calculation
      totalResidentVotes += candidate.residentVotes;
      totalDiasporaVotes += candidate.diasporaVotes;

      // Add each candidate's name and total votes to the result array
      candidateVotes.push({
        candidate: candidate.name,
        numberOfVotes: totalVotesForCandidate,
      });
    });

    const totalVotes = totalResidentVotes + totalDiasporaVotes;

    return {
      totalVotes,
      totalResidentVotes,
      totalDiasporaVotes,
      candidateVotes,
    };
  }

  useEffect(() => {
    setMetrics(analyzeElectionData(candidates as Candidate[]));
    console.log("Candidates", candidates);
  }, [candidates])

  return (
    <div className="flex flex-col">
      <header className="">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">
            <span className="text-light-green">Nigeria</span>{" "}
            <span className="text-primary-green">Election</span>
          </h1>
          <div className="flex items-center gap-2 my-4">
            <div className="h-[0.5px] w-2/3 bg-black"></div>
            <p className="text-lg text-gray-600">2024</p>
            <div className="h-[0.5px] w-2/3 bg-black"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-center text-xl font-bold text-primary-green">
            Total Votes
          </h2>
          <p className="text-center text-3xl font-bold  mt-4">{metrics?.totalVotes}</p>
        </div>

        <section className="">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Votes by Candidate
            </h3>
            {metrics?.candidateVotes &&
              metrics?.candidateVotes.length > 0 &&
              metrics?.candidateVotes.map((candidate: any) => (
                <li className="flex justify-between bg-white pt-4" key={candidate?.name}>
                  <span className="text-black">
                    {candidate?.name}{" "}
                    {/* <span className="text-xs text-gray-500">(Labour Party)</span> */}
                  </span>
                  <span className="font-bold text-black">
                    {candidate?.numberOfVotes}
                  </span>
                </li>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ElectionAnalytics;
