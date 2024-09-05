"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerVoter } from "@/assets";
import { MotionWrapper, VerifiedModal } from "@/components";
import { verifyEns } from "@/lib";
import { LoaderCircle } from "lucide-react";

interface IRegisterForm {
  verifyEns: (x: string) => void;
  setVerifiedData: Dispatch<SetStateAction<any | null>>;
  setEnsName: Dispatch<SetStateAction<string>>;
}

export default function RegisterForm({
  verifyEns,
  setVerifiedData,
  setEnsName,
}: IRegisterForm) {
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
        {loading ? <LoaderCircle className="animate-spin" /> : "Verify"}
      </button>
    </form>
  );
}
