"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section className="bg-[#071728] text-white border-b border-gray-800">
      {/* Desktop */}
      <div ref={sectionRef} className="relative hidden h-[200vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#071728] flex flex-col justify-center">
          <div className="pointer-events-none absolute -right-40 top-1/2 z-0 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,165,236,0.25)_0%,rgba(0,165,236,0.05)_35%,rgba(0,0,0,0)_72%)]" />

          <div className="relative z-10 mx-auto h-full w-full max-w-[1700px] px-8 pt-16 lg:px-10 flex flex-col justify-center">
            <div className="max-w-5xl">
              <span className="text-[#00A5EC] font-black text-xs uppercase tracking-widest block mb-2">
                Knowledge Venture Institute Team
              </span>
              <h2 className="text-5xl leading-[1.05] font-black text-white lg:text-6xl">
                The Dedicated Faculty & Mentors
                <br />
                Guiding Board Aspirants
              </h2>
              <p className="font-semibold mt-4 max-w-4xl text-lg text-gray-300 lg:text-xl leading-relaxed">
                Our experienced teachers in Hari Nagar, Jaitpur & Badarpur are committed to conceptual clarity, personalized care, and top academic scores.
              </p>
            </div>

            <motion.div
              style={{ y: imgY, scale: imgScale, transformOrigin: "top center" }}
              className="mx-auto mt-8 w-[85vw] max-w-5xl rounded-3xl border border-sky-500/20 bg-[#0d2036] p-2 shadow-2xl overflow-hidden"
            >
              <img
                src="/er saurabh.png"
                alt="Knowledge Venture Institute KVI Team"
                className="block h-auto w-full max-h-[480px] object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto block max-w-3xl px-6 py-14 md:hidden">
        <span className="text-[#00A5EC] font-black text-xs uppercase tracking-widest block text-center mb-2">
          Knowledge Venture Institute Team
        </span>
        <h2 className="text-center text-3xl font-black leading-snug text-white">
          The Dedicated Faculty & Mentors Guiding Board Aspirants
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-gray-300 font-medium">
          Our experienced teachers in Hari Nagar, Jaitpur & Badarpur are committed to conceptual clarity, personalized care, and top academic scores.
        </p>

        <div className="mt-8 rounded-2xl border border-sky-500/20 bg-[#0d2036] p-2 shadow-xl overflow-hidden">
          <img
            src="/er saurabh.png"
            alt="Knowledge Venture Institute KVI Team"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

