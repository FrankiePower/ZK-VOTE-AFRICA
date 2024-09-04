"use client";

import { Onboarding } from "@/components";
import { useEffect, useState } from "react";
import { AnimatedSplash } from "@/components";
import { voting } from "@/assets";
import Image from "next/image";

export default function Home() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 5000);
  });

  return (
    <div>
      {isSplashScreen ? (
        <AnimatedSplash/>
      ) : (
        <Onboarding/>
      )}
    </div>
  );
}
