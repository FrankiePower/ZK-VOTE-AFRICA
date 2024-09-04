"use-client"
import { candidateOne } from "@/assets";
import Image from "next/image";

const ElectionContesant =() => {
    return (
        <div className="flex flex-col items-center bg-white h-screen p-4">
        <h1 className="text-xl font-bold text-center mb-2">Choose your Candidate</h1>
        <p className="text-center text-gray-700 mb-6">
          Select the candidate you wish to vote for. Your vote will be securely encrypted and anonymous.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <Image src={candidateOne} alt="Peter Obi" className="rounded-lg mb-2" />
            <h2 className="font-bold text-green-700">Name: Peter Obi</h2>
            <p>Party: Labour Party</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <Image src={candidateOne} alt="Kwankwaso" className="rounded-lg mb-2" />
            <h2 className="font-bold text-green-700">Name: Kwankwaso</h2>
            <p>Party: NNPP</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <Image src={candidateOne} alt="Atiku" className="rounded-lg mb-2" />
            <h2 className="font-bold text-green-700">Name: Atiku</h2>
            <p>Party: PDP</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <Image src={candidateOne} alt="Tinubu" className="rounded-lg mb-2" />
            <h2 className="font-bold text-green-700">Name: Tinubu</h2>
            <p>Party: APC</p>
          </div>
        </div>
        <button className="bg-green-600 text-white py-2 px-4 rounded-full w-full">
          Next
        </button>
      </div>
    );
  }

  export default ElectionContesant;