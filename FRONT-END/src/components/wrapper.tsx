import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen text-black bg-white/50">
      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-sm md:text-lg opacity-75 text-black/90">
        Powered by Lisk
      </div>
      <div className="min-h-screen w-full sm:max-w-[480px] mx-auto bg-white overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
