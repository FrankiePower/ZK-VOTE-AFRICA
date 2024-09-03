"use client";

import React from "react";
import { motion } from "framer-motion";

const logoTexts = [
  "Z",
  "k",
  "V",
  "o",
  "t",
  "e",
  "A",
  "f",
  "r",
  "i",
  "c",
  "a",
];

const AnimatedSplash = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-end">
        {logoTexts.map((letter, index) => (
          <motion.h1
            initial={{
              x: 100,
              opacity: 0,
              display: "none",
            }}
            animate={{
              x: 0,
              opacity: 1,
              display: "block",
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
              delay: 2.2 + (index + 1) / 10,
            }}
            className="text-4xl font-space-grotesk"
            key={index}
          >
            {letter}
          </motion.h1>
        ))}
        <motion.div
          className="bg-primary-green w-16 h-16"
          animate={{
            scale: [0.15, 1.5, 1.8, 1.5, 0.15],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["5%", "5%", "5%", "5%", "5%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeatDelay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedSplash;
