"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Start like first frame, end like full-width centered frame.
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section className="bg-black text-white">
      {/* Desktop */}
      <div ref={sectionRef} className="relative hidden h-[240vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="pointer-events-none absolute -right-40 top-1/2 z-0 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,58,0.30)_0%,rgba(255,94,58,0.06)_35%,rgba(0,0,0,0)_72%)]" />

          <div className="relative z-10 mx-auto h-full w-full max-w-[1700px] px-8 pt-16 lg:px-10">
            <div className="max-w-5xl">
              <h2 className="text-6xl leading-[1.02] font-medium text-white lg:text-7xl">
                The People Who Make
                <br />
                Us A Team
              </h2>
              <p className="mt-5 max-w-5xl text-[40px] leading-8 text-white/65 lg:text-[38px]">
                Behind every Bakeats pack is a passionate team that crafts, checks, and delivers with care.
                We believe great products come from people who move together with one purpose.
              </p>
            </div>

            <motion.div
              style={{ y: imgY, scale: imgScale, transformOrigin: "top center" }}
              className="mx-auto mt-8 w-[88vw] rounded-2xl border border-white/10 bg-black p-1"
            >
              <img
                src="/team/bakeats-team.jpg"
                alt="Bakeats team"
                className="block h-auto w-full rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile (as requested: simple non-sticky) */}
      <div className="mx-auto block max-w-3xl px-6 py-14 md:hidden">
        <h2 className="text-center text-5xl leading-[1.08] text-white">
          The People Who Make
          <br />
          Us A Team
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-9 text-white/70">
          Behind every Bakeats pack is a passionate team that crafts, checks, and delivers with care.
          We believe great products come from people who move together with one purpose.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black p-1">
          <img
            src="/team/bakeats-team.jpg"
            alt="Bakeats team"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
