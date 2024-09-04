"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerVoter } from "@/assets";
import { MotionWrapper, VerifiedModal } from "@/components";
import { verifyEns } from "@/lib";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [ensName, setEnsName] = useState('');
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
      description: "Please provide your ENS to complete the verification process",
      children: <RegisterForm verifyEns={verifyEns} setVerifiedData={setVerifiedData} setEnsName={setEnsName}/>,
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

      <VerifiedModal
        isOpen={!!verifiedData}
        onClose={() => setVerifiedData(null)}
        ethAddress={verifiedData?.address}
        details={verifiedData?.details}
        ensName={ensName}
      />

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

export function RegisterForm({
  verifyEns,
  setVerifiedData,
  setEnsName,
}: {
  verifyEns: (x: string) => void,
  setVerifiedData: Dispatch<SetStateAction<any>>,
  setEnsName: Dispatch<SetStateAction<string>>,
}) {
  const [formData, setFormData] = useState({
    ensName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form data submitted:", formData);

    const res = await verifyEns(formData.ensName);
    console.log(res);
    setVerifiedData(res);
    setEnsName(formData.ensName);
    setLoading(false);
    // You can add further form processing logic here (e.g., sending the data to a server)
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="w-full flex flex-col text-left">
        <label htmlFor="lastName" className="block mb-2 text-black">
          ENS Name
        </label>
        <input
          type="text"
          id="ensName"
          name="ensName"
          value={formData.ensName}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-green text-white px-4 py-2 rounded-md"
      >
        {loading ? <LoaderCircle className="animate-spin"/> : "Verify"}
      </button>
    </form>
  );
}

// type DocumentType = 'Passport' | 'Driver License' | 'ID Card';

// const documentImages: Record<DocumentType, string> = {
//   'Passport': '/images/passport.png',
//   'Driver License': '/images/driver-license.png',
//   'ID Card': '/images/id-card.png'
// };

// export function RegisterForm() {
//   const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string>('');

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//       // Here you might want to handle file upload logic
//     }
//   };

//   const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const type = event.target.value as DocumentType;
//     setSelectedDocumentType(type);
//     setPreviewImage(documentImages[type] || null);
//   };

//   return (
//     <div className="max-w-full">
//       <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
//       <form>
//         <div className="mb-4">
//           <label htmlFor="documentType" className="block text-black mb-2">Document Type</label>
//           <select
//             id="documentType"
//             className="form-select block w-full p-2 border border-black rounded-md"
//             onChange={handleDocumentTypeChange}
//           >
//             <option value="">Select Document Type</option>
//             <option value="Passport">Passport</option>
//             <option value="Driver License">Driver License</option>
//             <option value="ID Card">ID Card</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="fileUpload" className="block text-gray-700 mb-2">Upload File</label>
//           <div className="flex items-center">
//             <input
//               id="fileUpload"
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//             <button
//               type="button"
//               className="mr-2 px-4 py-2 bg-primary-green text-white rounded-md"
//               onClick={() => document.getElementById('fileUpload')?.click()}
//             >
//               Choose File
//             </button>
//             <span className="text-gray-700">{fileName || 'No file chosen'}</span>
//           </div>
//         </div>
//         {previewImage && (
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold mb-2">Document Type Image</h3>
//             <img src={previewImage} alt="Document Type" className="w-full h-auto border border-gray-300 rounded-md" />
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };
