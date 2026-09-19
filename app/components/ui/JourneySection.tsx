"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Target,
  BookOpen, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

const JOURNEY_MILESTONES = [
  {
    year: "2013",
    tag: "The Beginning",
    title: "A Small Room & Big Dreams",
    desc: "Established in 2013, KVI began its journey from a small classroom in Hari Nagar, Jaitpur with just a few students. Built on dedication, a passion for teaching, and a commitment to student success.",
    highlights: [
      "Started with a small classroom & individual student focus",
      "Foundation for Class 6th–10th Science & Maths"
    ],
    accent: "#F5BE18",
    icon: GraduationCap
  },
  {
    year: "2015",
    tag: "Academic Foundation",
    title: "Concept-Based Learning & Parent Trust",
    desc: "Developed KVI's core teaching philosophy — focusing on 100% conceptual clarity rather than rote memorization. Earned the continuous trust of students and parents.",
    highlights: [
      "100% focus on fundamental concepts",
      "Daily practice sheets & dedicated doubt resolution"
    ],
    accent: "#00A5EC",
    icon: BookOpen
  },
  {
    year: "2018",
    tag: "Stream Expansion",
    title: "Commerce & Humanities Specialization",
    desc: "Expanded Senior Faculty team to launch specialized batches for Class 11th & 12th Commerce (Accounts, Economics, BST) and Humanities (Arts), producing top board scorers.",
    highlights: [
      "Onboarded CS & Senior Subject Expert Faculty",
      "Class 11-12th Commerce & Arts stream launch"
    ],
    accent: "#10B981",
    icon: Target
  },
  {
    year: "2021",
    tag: "Hybrid Support",
    title: "Digital Material & Regular Testing",
    desc: "Integrated structured mock tests, digital study material hub, DPP assignments, and live faculty notifications to ensure constant academic support.",
    highlights: [
      "Board-pattern test series & regular assessments",
      "Instant faculty notifications & study resources"
    ],
    accent: "#8B5CF6",
    icon: TrendingUp
  },
  {
    year: "2023+",
    tag: "Growing Community",
    title: "Premier Institute & 3,000+ Alumni",
    desc: "Evolved into a leading educational platform in Hari Nagar, Jaitpur & Badarpur. Guided over 3,000+ successful students with toppers scoring 95%+ marks in CBSE boards.",
    highlights: [
      "Over 3,000+ successful students guided",
      "Full KV Talent Search Scholarship program"
    ],
    accent: "#F5BE18",
    icon: Award
  }
];

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-16 md:py-24 bg-[#071728] text-white border-t border-b border-gray-800/80 overflow-hidden">
      
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#F5BE18]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00A5EC]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5BE18]/10 border border-[#F5BE18]/30 text-[#F5BE18] text-xs font-black uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Our Journey (2013 — Present)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
            From a Small Classroom to a <span className="text-[#F5BE18]">Growing Educational Community</span>
          </h2>

          <p className="mt-4 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Established in <strong className="text-[#F5BE18]">2013</strong>, Knowledge Venture Institute (KVI) was built on a simple belief: <strong className="text-white">every student has the potential to succeed with the right guidance, strong concepts, and consistent support.</strong>
          </p>
        </motion.div>

        {/* ── MOTION SCROLL TIMELINE ── */}
        <div className="relative">
          
          {/* Central Vertical Stem Line (Desktop) */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#F5BE18] via-[#00A5EC] to-emerald-400 opacity-40 -translate-x-1/2 rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />

          {/* Left Stem Line (Mobile) */}
          <motion.div 
            className="md:hidden absolute left-5 top-4 bottom-4 w-1 bg-gradient-to-b from-[#F5BE18] via-[#00A5EC] to-emerald-400 opacity-40 rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />

          <div className="flex flex-col gap-10 md:gap-16">
            {JOURNEY_MILESTONES.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.year}
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  
                  {/* Timeline Card Container */}
                  <motion.div 
                    className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0"
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                  >
                    <div className="bg-[#0D2847] border border-gray-800 hover:border-[#F5BE18]/40 p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
                      
                      {/* Top Header: Tag & Year Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span 
                          className="text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-md text-[#0D2847] shadow-sm"
                          style={{ backgroundColor: item.accent }}
                        >
                          {item.tag}
                        </span>

                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                          <Clock className="w-3 h-3 text-[#F5BE18]" />
                          <span>{item.year}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#F5BE18] transition-colors leading-tight mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                        {item.desc}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
                        {item.highlights.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-200 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                  {/* Icon Node Center (Desktop: Center, Mobile: Left stem node) */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 top-1.5 md:top-auto -translate-x-0 md:-translate-x-1/2 z-20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 * index }}
                  >
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-[#0D2847] shadow-lg ring-4 ring-[#071728] transition duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.accent }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D2847]" />
                    </div>
                  </motion.div>

                  {/* Empty Spacer Column for Desktop Alternate Layout */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
