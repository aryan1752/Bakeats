import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function TextHoverEffectDemo() {
  return (
    <div className="flex min-h-[28rem] flex-col items-center justify-start pt-2 md:min-h-[40rem] md:pt-0">
      <TextHoverEffect text="PND" />
      <p className="-mt-12 mb-4 w-[90%] bg-gradient-to-b from-zinc-200 via-white to-zinc-500 bg-clip-text text-center font-[cursive] text-[15px] leading-7 text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] md:-mt-16 md:mb-12 md:w-[90%] md:text-xl md:leading-relaxed">
        PND Global Logistics provides reliable customs clearance and freight forwarding services, ensuring smooth import and export operations. With an experienced team and strong logistics network, PND delivers cost-effective, secure, and timely cargo transportation via air and ocean freight, helping businesses move goods efficiently and expand globally without logistics complications.
      </p>
    </div>
  );
}
