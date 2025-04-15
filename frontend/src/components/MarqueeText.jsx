import React from "react";

const MarqueeText = () => {
  return (
    <div className="overflow-hidden   bg-blue-500 flex h-10 mb-2 text-white ">
      {/* Fixed Container for Latest Update */}
      <div className="bg-pink-700 z-10 text-white text-sm w-40 h-full flex items-center justify-center px-2">
        N.B. 
      </div>
      {/* Scrolling Marquee */}
      <div
        className="whitespace-nowrap animate-marquee flex items-center"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        <span className="mx-4 letterspace-12">    We are only providing consultancy services legally  and not  recruitment company !</span>
       
      </div>
    </div>

  );
};

export default MarqueeText;
