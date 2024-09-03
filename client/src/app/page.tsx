"use client";
import React, {useState,useEffect} from "react";
import Image from "next/image";
import { AppProps } from "next/app";
import AnimatedSplash from "@/components/AnimatedSplash";

export default function Home( pageProps:any ) {
  const [showSplash, setShowSplash] = useState(true);
  // useEffect(() => {
  //   if (!loading) {
  //     document.body.style.overflow = 'auto'; // Enable scrolling once the splash screen is gone
  //   }
  // }, [loading]);

  return (
    <div className="h-screen">
    {showSplash ? (
      <AnimatedSplash onEnd={() => setShowSplash(false)} />
    ) : (
      <main className="flex items-center justify-center h-screen bg-[#1B7339] text-white">
        <h1 className="text-3xl font-bold">Welcome to Zkapp</h1>
      </main>
    )}
  </div>
  );
}
