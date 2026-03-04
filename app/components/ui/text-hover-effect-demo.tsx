import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function TextHoverEffectDemo() {
  return (
    <div className="flex min-h-[18rem] flex-col items-center justify-start pt-2 md:min-h-[26rem] md:pt-0">
      <div className="h-[7rem] w-full md:h-[10rem]">
        <TextHoverEffect text="PND" />
      </div>
      <p className="mt-1 mb-4 w-[90%] bg-gradient-to-b from-zinc-200 via-white to-zinc-500 bg-clip-text text-center font-[cursive] text-[13px] leading-6 text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] md:mb-12 md:mt-1 md:w-[80%] md:text-lg md:leading-relaxed">
        PND Global Logistics provides reliable customs clearance and freight forwarding services, ensuring smooth import and export operations. With an experienced team and strong logistics network, PND delivers cost-effective, secure, and timely cargo transportation via air and ocean freight, helping businesses move goods efficiently and expand globally without logistics complications.
      </p>
    </div>
  );
}
