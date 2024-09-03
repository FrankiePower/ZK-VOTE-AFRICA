"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { onboardFour, onboardOne, onboardThree, onboardTwo } from "@/assets";
import { useRouter } from "next/navigation";
import MotionWrapper from "./motion-wrapper";

const onboardingSteps = [
  {
    image: onboardOne,
    title: "Welcome Voter 👋",
    description:
      "Experience a new era of voting. ZkVote Africa empowers you to participate in elections securely and anonymously",
  },
  {
    image: onboardTwo,
    title: "Your Vote, Your Privacy",
    description:
      "Your vote is your secret. With zero-knowledge technology, we ensure your identity remains anonymous, while your vote is securely counted.",
  },
  {
    image: onboardThree,
    title: "Simple and Secure Voting",
    description:
      "Register, verify, and cast your vote with ease. Our platform guides you through each step, making secure voting accessible for everyone.",
  },
  {
    image: onboardFour,
    title: "Vote from Anywhere",
    description:
      "No matter where you are in the world, your voice matters. Our system enables you to participate in elections from abroad, securely and conveniently.",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1 && currentStep >= 0) {
      setCurrentStep(currentStep + 1);
    } else {
        router.push('/register');
        setIsLoading(true);
    }
  };

  const getButtonText = () => {
    return currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next";
  };

  return (
    <div className="flex flex-col items-start justify-center text-center">
     <MotionWrapper motionKey={currentStep}>
        <h2 className="text-2xl md:text-4xl font-extrabold text-left mb-4 text-black">
          {onboardingSteps[currentStep].title}
        </h2>
        <p className="mb-8 text-black text-left md:text-lg">{onboardingSteps[currentStep].description}</p>
      </MotionWrapper>

      <div className="flex space-x-2 mb-8">
        {onboardingSteps.map((_, index) => (
          <span
            key={index}
            className={`${currentStep === index ? 'w-6' : 'w-2'} h-2 rounded-full transition-colors ${
              currentStep === index ? "bg-primary-green" : "bg-light-green"
            }`}
          />
        ))}
      </div>

      <button
        onClick={nextStep}
        className="px-10 py-3 bg-primary-green text-white font-medium rounded-md hover:opacity-95 transition-colors"
        disabled={isLoading}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default Onboarding;
