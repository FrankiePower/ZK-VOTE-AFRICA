import React, {FC, useEffect} from 'react'
import { motion , useAnimation} from 'framer-motion';


const splashScreens = [
  { id: 'SS1', scale: 1, rotate: 0,width: 'w-full', height: 'h-full'},
  { id: 'SS2', scale: 0.5, rotate: 0,width: 'w-full', height: 'h-full'},
  { id: 'SS3', scale: 1, rotate: 45 ,width: 'w-full', height: 'h-full'},
  { id: 'SS4', scale: 0.1, rotate: 0 , width: 'w-full', height: 'h-full'},
  { id: 'SS5', scale: 0.1, rotate: 0, text: 'Zkapp',width:'w-full', height: 'h-full'},
  { id: 'SS6', scale: 1, rotate: 0, text: 'Zkapp', width: 'w-full', height: 'h-full' },
];

interface AnimatedSplashProps {
  onEnd: () => void;
}
  
const AnimatedSplash: React.FC<AnimatedSplashProps> = ({ onEnd }) => {
  return (
    <div className='flex items-center justify-center h-screen bg-[#1B7339] text-white'>
      <motion.div
        className="box"
        animate={{
          scale: [0.2, 1, 1, 1, 0.2],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["5%", "5%", "5%", "5%", "5%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

    </div>
  );
};

export default AnimatedSplash;