"use client";

import { Onboarding } from "@/components";
import { useEffect, useState } from "react";
import { AnimatedSplash } from "@/components";

export default function Home() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 5000);
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
