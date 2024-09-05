"use client";
import Image from "next/image";
import Link from "next/link";

const ElectionAnalytics = () => {
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
          <p className="text-center text-3xl font-bold  mt-4">
            40,343,255,536
          </p>
        </div>

        <section className="">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Votes by Candidate
            </h3>

            <li className="flex justify-between bg-white pt-4">
              <span className="text-black">
                Peter Obi{" "}
                <span className="text-xs text-gray-500">(Labour Party)</span>
              </span>
              <span className="font-bold text-black">12,454,464,388</span>
            </li>

            <li className="flex justify-between bg-white pt-4">
              <span className="text-black">
                Atiku Abubakar{" "}
                <span className="text-xs text-gray-500">(PDP)</span>
              </span>
              <span className="font-bold text-black">454,464,388</span>
            </li>

            <li className="flex justify-between bg-white pt-4">
              <span className="text-black">
                Rabiu Musa Kwankwaso{" "}
                <span className="text-xs text-gray-500">(NNPP)</span>
              </span>
              <span className="font-bold text-black">22,454,464,388</span>
            </li>

            <li className="flex justify-between bg-white pt-4 ">
              <span className="text-black">
                Ahmed Bola Tinubu{" "}
                <span className="text-xs text-gray-500">(APC)</span>
              </span>
              <span className="font-bold text-black">22,454,464,388</span>
            </li>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ElectionAnalytics;
