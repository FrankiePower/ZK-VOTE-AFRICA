"use-client"
import { frameOne } from "@/assets";
import Image from "next/image";

const ElectionComponent =() => {
    return (
      <div className="flex flex-col items-center bg-white h-screen p-4">
        
          <Image
            src={frameOne}
            alt="Nigeria Election 2024"
            objectFit="cover"
            className="" 
          />
        
        <h3 className="text-lg font-bold text-center text-black pt-4">Welcome to the 2024 Presidential Election</h3>
        <p className="text-center text-black">
          Select your preferred candidate and cast your vote securely
        </p>
        <button className="px-10 py-3 bg-primary-green text-white font-medium rounded-md hover:opacity-95 transition-colors w-full">
          Start Voting
        </button>
      </div>
    );
  }

  export default ElectionComponent;