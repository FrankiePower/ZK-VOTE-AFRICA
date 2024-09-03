'use client';

import Image from "next/image";
import { Onboarding } from "@/components";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Loader } from 'lucide-react';

export default function Home() {
  const searchParams = useSearchParams();
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 8000);
  }, [])

  return (
    <div className="w-full text-light-green">
      <div className="">
        {isSplashScreen ? (
          <Loader className='w-11 h-11 animate-spin text-primary-green'/>
        ) : (
          <Onboarding/>
        )}
      </div>
    </div>
  );
}
