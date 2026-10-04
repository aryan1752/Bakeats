"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Sparkles, Award, GraduationCap } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function FounderSection() {
  const founderTitleWords = [
    {
      text: "CS",
      className: "text-[#F5BE18] dark:text-[#F5BE18]",
    },
    {
      text: "Sanjay",
      className: "text-white dark:text-white",
    },
    {
      text: "Arya",
      className: "text-white dark:text-white",
    },
  ];

  return (
    <section id="founder" className="relative py-12 sm:py-16 md:py-20 bg-[#071728] text-white border-t border-gray-800 overflow-hidden">
      {/* Subtle Radial Glows */}
      <div className="absolute top-1/2 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#F5BE18]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#00A5EC]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Founder Photo Card */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] group">
              {/* Outer Decorative Gradient Border Card */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#F5BE18] via-[#00A5EC] to-emerald-400 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
              
              <div className="relative bg-[#0D2847] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src="/sanjay_founder.jpg"
                    alt="CS Sanjay Arya - Founder of Knowledge Venture Institute (KVI)"
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  
                  {/* Floating Overlay Badge - Hidden by default, reveals on hover/touch with frosted glass */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-400 ease-out pointer-events-none group-hover:pointer-events-auto">
                    <div>
                      <h4 className="font-black text-sm sm:text-base text-white drop-shadow-sm">CS Sanjay Arya</h4>
                      <span className="text-[11px] sm:text-xs text-[#F5BE18] font-bold block">Founder & Lead Mentor</span>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F5BE18]/90 backdrop-blur-sm text-[#0D2847] font-black flex items-center justify-center shadow-md">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D2847]" />
                    </div>
                  </div>
                </div>

                {/* Sub-bar highlights */}
                <div className="p-3 sm:p-4 bg-[#091a2e] border-t border-white/10 flex items-center justify-around text-xs sm:text-sm font-bold text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F5BE18]" />
                    <span>12+ Yrs Exp</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Company Secretary</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details & Message with Typewriter Effect */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Top Label Text */}
            <div className="text-[#F5BE18] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-2">
              Founder's Message
            </div>

            {/* Smooth Typewriter Effect for Founder Name / Header */}
            <TypewriterEffectSmooth words={founderTitleWords} />

            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed mt-2 font-normal">
              <p className="border-l-4 border-[#F5BE18] pl-4 italic text-white/90 font-medium">
                My journey with Knowledge Venture Institute (KVI) began in 2013, when I started teaching a few students in a small room with limited resources. What began with a simple belief in education, hard work, and dedication gradually grew through quality teaching, personal attention, conceptual learning, and the trust of students and parents.
              </p>

              <p className="text-gray-300">
                Over the years, KVI has evolved into an institute focused on building strong foundations, confidence, and the right guidance for students. Their success continues to inspire us every day.
              </p>

              <p className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 text-gray-100">
                Our vision is simple: <strong className="text-[#F5BE18] font-bold">make quality education accessible and help every student achieve their true potential.</strong>
              </p>
            </div>

            {/* Signature & Credentials */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-1">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">CS Sanjay Arya</h3>
              <span className="text-xs sm:text-sm font-extrabold text-[#F5BE18] uppercase tracking-wider">
                Founder, Knowledge Venture Institute (KVI)
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
