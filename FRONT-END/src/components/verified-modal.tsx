"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BadgeCheck, BadgeX, LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useSendTransaction,
  useSignMessage,
  useAccount,
  useWaitForTransactionReceipt,
  useConnect,
  useVerifyMessage,
  useWriteContract,
} from "wagmi";
import { abi } from "@/lib/contract-abi";

interface IverifiedModal {
  onClose: () => void;
  name?: string;
  ethAddress?: string;
  details?: any;
  ensName?: string;
}

const zeroAddress = "0x0000000000000000000000000000000000000000";

const VerifiedModal = ({
  onClose,
  ethAddress,
  ensName,
  details,
}: IverifiedModal) => {
  const [verified, setVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [voterType, setVoterType] = useState(0);

  const { data: signMessageData, signMessage } = useSignMessage();

  const account = useAccount();
  const router = useRouter();
  const {
    data: contractHash,
    error: contractError,
    isPending: contractLoading,
    writeContract,
  } = useWriteContract();

  const { isLoading: isContractConfirming, isSuccess: isContractConfirmed } =
    useWaitForTransactionReceipt({ hash: contractHash });

  // useVerifyMessage should be used outside of useEffect
  const {
    data: verifyResult,
    isLoading: verifyLoading,
    isError: verifyError,
  } = useVerifyMessage({
    address: `${ethAddress as `0x${string}`}`,
    message: `Verify ownership of ${ensName}`,
    signature: signMessageData,
  });

  useEffect(() => {
    setVerificationLoading(true);
    if (signMessageData) {
      console.log(signMessageData);
      console.log(verifyResult);

      if (verifyResult) {
        writeContract({
          abi,
          address: "0xbA2DbEfAfA35B2881F4CbB0041133De9BB23785D",
          functionName: "registerVoter",
          args: [account.address, voterType],
        });
        console.log("contract called");
        console.log(contractLoading);

        setVerified(verifyResult);
      }
    }
    setVerificationLoading(false);
  }, [signMessageData, verifyResult]);

  const verifyOwnership = async (ensName: string) => {
    setVerificationLoading(true);
    const message = `Verify ownership of ${ensName}`;
    signMessage({ message });
  };

  useEffect(() => {
    if (contractLoading) console.log("contract loading");
    if (isContractConfirming) console.log("contract confirming");
    if (isContractConfirmed) console.log("contract confirmed");
    if (contractError) console.log("contract error");
  }, [isContractConfirming, isContractConfirmed, contractError]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen -mt-20 -top-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div>
              {!ethAddress || ethAddress === zeroAddress ? (
                <BadgeX className="text-red-500 w-6 h-6" />
              ) : (
                <BadgeCheck className="text-green-500 w-6 h-6" />
              )}
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              {!ethAddress || ethAddress === zeroAddress
                ? "Verification Failed"
                : "Verified"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!ethAddress || ethAddress === zeroAddress ? (
          <div className="mt-7 text-lg text-center text-red-500">
            Error: Failed to verify ENS
          </div>
        ) : (
          <div className="mt-7">
            {/* Display avatar image if available */}
            {details[2]?.key === "avatar" && details[2]?.value && (
              <div className="flex justify-center mb-4">
                <Image
                  src={details[2].value}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            )}

            {/* Additional Details */}
            <div className="space-y-2">
              {details &&
                details.map((detail: any, index: number) => (
                  <>
                    {detail.value && (
                      <div
                        key={index}
                        className="flex justify-start items-start p-2 rounded-xl bg-gray-50 border border-gray-300 w-auto cursor-pointer"
                      >
                        <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                          {detail.value}
                        </span>
                      </div>
                    )}
                  </>
                ))}
            </div>

            {/* Ethereum Address */}
            <div className="mt-4">
              <p className="text-sm text-left text-gray-600 mb-1">
                Ethereum Address:
              </p>
              <p className="text-sm font-medium text-gray-900 truncate flex justify-start items-start p-2 rounded-xl bg-gray-50 border border-gray-300 w-auto cursor-pointer">
                {ethAddress}
              </p>
            </div>
          </div>
        )}

        <div className="w-full mt-3">
          <label
            htmlFor="location"
            className="block text-sm text-left text-gray-600 font-medium"
          >
            Select Voter Location
          </label>
          <select
            id="location"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green sm:text-sm"
            onChange={({ target: { value } }) =>
              setVoterType(parseInt(value) ?? 0)
            }
          >
            <option value={0}>In the Country</option>
            <option value={1}>Diaspora</option>
          </select>
        </div>

        {signMessageData && (
          <p
            className={`text-sm text-left mt-2 ${
              verified ? "text-primary-green" : "text-red-500"
            } `}
          >
            {verified
              ? "Verification successful. Continue to proceed"
              : "Failed to verify ens, you are not the signer"}
          </p>
        )}

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={
              !ethAddress || ethAddress === zeroAddress
                ? onClose
                : verified
                ? () => router.push("/elections")
                : account.address && (() => verifyOwnership(ensName!))
            }
            className={`${
              account.address
                ? "bg-primary-green text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                : ""
            }`}
            disabled={verificationLoading}
          >
            {!ethAddress || ethAddress === zeroAddress ? (
              "Close"
            ) : !account.address ? (
              <ConnectButton />
            ) : verificationLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedModal;
