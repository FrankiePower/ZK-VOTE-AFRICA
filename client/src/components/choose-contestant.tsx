"use-client"
import { candidateOne,  candidateTwo, candidateThree, candidateFour } from "@/assets";
import Image from "next/image";

const ElectionContesant =() => {
  const handleClick = (candidate: string) => {
    console.log(`You selected ${candidate}`);
    // You can add routing or other logic here
  };
    return (
        <div className="flex flex-col items-center bg-white h-screen p-4 overflow-y-scroll">
          <h3 className="text-xl font-bold text-center text-black">Choose your Candidate</h3>
          <p className="text-center text-gray-700">
            Select the candidate you wish to vote for. Your vote will be securely encrypted and anonymous.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => handleClick('Peter Obi')}
             className="border rounded-lg p-2 text-left text-black hover:bg-primary-green hover:text-white cursor-pointer transition duration-200">
              <Image src={candidateOne} alt="Peter Obi" className="rounded-lg" />
              <h3 className="font-bold">Name: Peter Obi</h3>
              <p>Party: Labour Party</p>
            </div>
            <div 
              onClick={() => handleClick('Kwankwaso')}
             className="border rounded-lg p-2 text-left text-black hover:bg-primary-green hover:text-white cursor-pointer transition duration-200">
              <Image src={candidateTwo} alt="Kwankwaso" className="rounded-lg" />
              <h3 className="font-bold">Name: Kwankwaso</h3>
              <p>Party: NNPP</p>
            </div>
            <div 
               onClick={() => handleClick('Kobe')}
             className="border rounded-lg p-2 text-left text-black hover:bg-primary-green hover:text-white cursor-pointer transition duration-200">
              <Image src={candidateThree} alt="Atiku" className="rounded-lg" />
              <h3 className="font-bold">Name: Atiku</h3>
              <p>Party: PDP</p>
            </div>
            <div 
            onClick={() => handleClick('Kobe')}
             className="border rounded-lg p-2 text-left text-black hover:bg-primary-green hover:text-white cursor-pointer transition duration-200">
              <Image src={candidateFour} alt="Tinubu" className="rounded-lg" />
              <h3 className="font-bold">Name: Tinubu</h3>
              <p>Party: APC</p>
            </div>
          </div>
          <button className="px-10 py-3 bg-primary-green text-white mt-3  font-medium rounded-md hover:opacity-95  transition-colors w-full">
            Next
          </button>
      </div>
    );
  }

  export default ElectionContesant;