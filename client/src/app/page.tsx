"use client";

import { Onboarding } from "@/components";
import { useEffect, useState } from "react";
import { AnimatedSplash } from "@/components";
import { zkApp } from "@/assets";
import Image from "next/image";

export default function Home() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsSplashScreen(false);
    // }, 4500);
  });

  return (
    <div className="w-full">
      <div className="">
        {isSplashScreen ? (
          <div className="">
            <AnimatedSplash />
          </div>
        ) : (
          <Onboarding />
        )}
      </div>
    </div>
  );
}
