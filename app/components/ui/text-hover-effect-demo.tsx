import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function TextHoverEffectDemo() {
  return (
    <div className="flex min-h-[40rem] flex-col items-center justify-start pt-2 md:justify-center md:pt-0">
      <TextHoverEffect text="PND" />
      <p className="mt-2.5 mb-2.5 w-[80%] bg-gradient-to-b from-zinc-200 via-white to-zinc-500 bg-clip-text text-center text-sm leading-relaxed text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] md:mt-2.5 md:mb-2.5 md:text-lg">
        PND Global Logistics provides reliable customs clearance and freight forwarding services, ensuring smooth import and export operations. With an experienced team and strong logistics network, PND delivers cost-effective, secure, and timely cargo transportation via air and ocean freight, helping businesses move goods efficiently and expand globally without logistics complications.
      </p>
    </div>
  );
}
