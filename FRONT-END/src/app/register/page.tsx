"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerVoter } from "@/assets";
import { MotionWrapper, VerifiedModal } from "@/components";
import { verifyEns } from "@/lib";
import RegisterForm from "@/components/register-form";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [ensName, setEnsName] = useState("");
  const router = useRouter();

  const registrationSteps = [
    {
      title: "Voter Verification",
      description:
        "Securely verify your identity and get ready to cast your vote.",
      children: (
        <Image src={registerVoter} alt="voter-registration-illustration" />
      ),
      buttonText: "Verify ENS",
      ver: false,
    },
    {
      title: "Fill in your details",
      description:
        "Please provide your ENS to complete the verification process",
      children: (
        <RegisterForm
          verifyEns={verifyEns}
          setVerifiedData={setVerifiedData}
          setEnsName={setEnsName}
        />
      ),
      buttonText: "Finish",
      ver: true,
    },
  ];

  const nextStep = () => {
    if (currentStep < registrationSteps.length - 1 && currentStep >= 0) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/elections");
      setIsLoading(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-10">
      <MotionWrapper motionKey={currentStep}>
        <div className="max-w-4/5">
          <h2 className="text-2xl font-bold mb-4 text-black">
            {registrationSteps[currentStep].title}
          </h2>
          <p className="mb-8 text-black text-center">
            {registrationSteps[currentStep].description}
          </p>
        </div>
      </MotionWrapper>
      {!!verifiedData && (
        <VerifiedModal
          onClose={() => setVerifiedData(null)}
          ethAddress={verifiedData?.address}
          details={verifiedData?.details}
          ensName={ensName}
        />
      )}

      <div className="max-w-4/5">{registrationSteps[currentStep].children}</div>

      {!registrationSteps[currentStep].ver && (
        <button
          onClick={nextStep}
          className={`px-10 py-3 mt-8 bg-primary-green text-white font-medium rounded-md hover:opacity-95 transition-colors`}
          disabled={isLoading}
        >
          {registrationSteps[currentStep].buttonText}
        </button>
      )}
    </div>
  );
};

export default Page;
