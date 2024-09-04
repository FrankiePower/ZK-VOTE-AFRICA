"use-client"
import Image from "next/image";
import { candidateOne } from "@/assets";

const  ConfirmVote=()=> {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl text-black font-bold mb-6">Confirm your Vote</h1>
        
        <div className="w-full max-w-sm p-6 rounded-lg  text-center">
          <div className="flex flex-col items-center mb-4">
          <div className="border rounded-lg p-2 text-left  bg-primary-green text-white cursor-pointer transition duration-200">
              <Image src={candidateOne} alt="Peter Obi" className="rounded-lg" />
              <h3 className="font-bold">Name: Peter Obi</h3>
              <p>Party: Labour Party</p>
            </div>
          </div>
  
          <p className="text-sm text-black mb-6">
            Please review your selected candidate. Once confirmed, your vote will be encrypted and submitted.
          </p>
  
          <button className="bg-green-700 text-white py-2 px-4 rounded-lg w-full mb-4">
            Confirm
          </button>
  
          <button className="border border-green-700 text-green-700 py-2 px-4 rounded-lg w-full">
            Go Back
          </button>
        </div>
      </div>
    );
  }

export default ConfirmVote;