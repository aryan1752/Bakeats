"use client";

// Force Turbopack HMR cache refresh

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  ChevronRight,
  MessageCircle,
  Send
} from "lucide-react";
import Link from "next/link";
import { submitEnrollment } from "@/lib/coaching-actions";

export interface BatchItem {
  id: string;
  title: string;
  grade: string;
  stream: "foundations" | "commerce" | "arts" | "morning";
  streamLabel: string;
  target: string;
  scheduleSummary: string;
  mode: string;
  duration: string;
  image_url?: string; // Support Cloudinary Image URL
  features: string[];
  schedules: { subject: string; timing: string; days: string }[];
  teachers: { name: string; role: string; exp: string }[];
}

export const batchList: BatchItem[] = [
  {
    id: "class-5-8",
    title: "Class 5th-8th",
    grade: "Class 5th-8th",
    stream: "foundations",
    streamLabel: "Class 5th-8th",
    target: "MWF: 5-6 PM | TTS: 4-5 PM",
    scheduleSummary: "MWF: 5:00 PM - 6:00 PM | TTS: 4:00 PM - 5:00 PM",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Small Batch Size for Personal Attention",
      "NCERT & Advanced Concept Coverage",
      "Weekly Chapter Tests & Progress Reports",
      "Interactive Doubt Clearing Sessions"
    ],
    schedules: [
      { subject: "MWF Session", timing: "5:00 PM - 6:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "TTS Session", timing: "4:00 PM - 5:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" }
    ],
    teachers: [
      { name: "Pankaj Mishra Sir", role: "Director & Senior Mentor", exp: "12+ Yrs Exp" }
    ]
  },
  {
    id: "class-9",
    title: "Class 9th",
    grade: "Class 9th",
    stream: "foundations",
    streamLabel: "Class 9th",
    target: "5pm daily",
    scheduleSummary: "5:00 PM Daily",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Daily Structured 5 PM Sessions",
      "Science & Mathematics Numericals",
      "Regular Test Series & Homework Tracker",
      "Special Guidance for 10th Prep Base"
    ],
    schedules: [
      { subject: "Class 9th Sessions", timing: "5:00 PM Daily", days: "Daily (Monday to Saturday)" }
    ],
    teachers: [
      { name: "Er. Aditya Pratap Singh", role: "11-12th Maths & Physics / 9-10th Boards", exp: "5+ Yrs Exp (1000+ Students)" },
      { name: "Er. Shaurav Singh", role: "11-12th Chemistry & 9-10th Specialist", exp: "B.Tech (2000+ Students)" }
    ]
  },
  {
    id: "class-10",
    title: "Class 10th",
    grade: "Class 10th",
    stream: "foundations",
    streamLabel: "Class 10th",
    target: "4pm daily",
    scheduleSummary: "4:00 PM Daily",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Daily Board Level Intensive Lectures",
      "Complete PYQ & Sample Paper Solutions",
      "Dedicated Board Answer Writing Practice",
      "1-on-1 Doubt Clearance & Parent Feedback"
    ],
    schedules: [
      { subject: "Class 10th Sessions", timing: "4:00 PM Daily", days: "Daily (Monday to Saturday)" }
    ],
    teachers: [
      { name: "Er. Aditya Pratap Singh", role: "11-12th Maths & Physics / 9-10th Boards", exp: "5+ Yrs Exp (1000+ Students)" },
      { name: "Er. Shaurav Singh", role: "11-12th Chemistry & 9-10th Specialist", exp: "B.Tech (2000+ Students)" }
    ]
  },
  {
    id: "class-11-commerce",
    title: "Class 11th Commerce stream",
    grade: "Class 11th Commerce stream",
    stream: "commerce",
    streamLabel: "Class 11th Commerce",
    target: "MWF (BS: 4-5 PM, Eco: 5-6 PM) | TTS (Accounts: 6-7 PM)",
    scheduleSummary: "MWF: BS (4-5 PM), Eco (5-6 PM) | TTS: Accounts (6-7 PM)",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Business Studies, Economics & Accountancy",
      "Micro-Economics & Statistics Practice",
      "Real-World Business Case Studies",
      "Regular Unit Tests"
    ],
    schedules: [
      { subject: "Business Studies", timing: "4:00 PM - 5:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "Economics", timing: "5:00 PM - 6:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "Accounts", timing: "6:00 PM - 7:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" }
    ],
    teachers: [
      { name: "Commerce Senior Faculty", role: "Accountancy Specialist", exp: "10+ Yrs Exp" },
      { name: "Pankaj Mishra Sir", role: "Economics & Business Studies", exp: "12+ Yrs Exp" }
    ]
  },
  {
    id: "class-11-arts",
    title: "Class 11th Art's stream",
    grade: "Class 11th Art's stream",
    stream: "arts",
    streamLabel: "Class 11th Art's",
    target: "MWF (4-5 PM) | TTS (5-6 PM)",
    scheduleSummary: "MWF: 4:00 PM - 5:00 PM | TTS: 5:00 PM - 6:00 PM",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Deep Analytical Learning & Map Work",
      "Structured Long Answer Writing Techniques",
      "NCERT Line-by-Line Revision",
      "Regular MCQ & Subjective Tests"
    ],
    schedules: [
      { subject: "MWF Session", timing: "4:00 PM - 5:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "TTS Session", timing: "5:00 PM - 6:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" }
    ],
    teachers: [
      { name: "Senior Humanities Faculty", role: "Arts Stream Lead", exp: "11+ Yrs Exp" }
    ]
  },
  {
    id: "class-12-commerce",
    title: "Class 12th Commerce stream",
    grade: "Class 12th Commerce stream",
    stream: "commerce",
    streamLabel: "Class 12th Commerce",
    target: "MWF (Eco: 6-7 PM) | TTS (Accountancy: 5-6 PM, BS: 6-7 PM)",
    scheduleSummary: "MWF: Eco (6-7 PM) | TTS: Accountancy (5-6 PM), BS (6-7 PM)",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Accountancy, Economics & Business Studies",
      "Macro Economics & Indian Economic Development",
      "CBSE Sample Papers & Board Answer Key Drills",
      "Speed & Accuracy Enhancement Tests"
    ],
    schedules: [
      { subject: "Economics", timing: "6:00 PM - 7:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "Accountancy", timing: "5:00 PM - 6:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" },
      { subject: "Business studies", timing: "6:00 PM - 7:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" }
    ],
    teachers: [
      { name: "Senior Accountancy Master", role: "Board Paper Evaluator", exp: "15+ Yrs Exp" },
      { name: "Pankaj Mishra Sir", role: "Economics Lead", exp: "12+ Yrs Exp" }
    ]
  },
  {
    id: "class-12-arts",
    title: "Class 12th Arts stream",
    grade: "Class 12th Arts stream",
    stream: "arts",
    streamLabel: "Class 12th Arts",
    target: "MWF (4pm) | TTS (5pm)",
    scheduleSummary: "MWF: 4:00 PM | TTS: 5:00 PM",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Comprehensive Board Syllabus Coverage",
      "Answer Structuring for Maximum Marks",
      "Complete Map & Diagram Practice",
      "Board Revision & Fast-Track Tests"
    ],
    schedules: [
      { subject: "MWF Session", timing: "4:00 PM", days: "Monday, Wednesday, Friday (MWF)" },
      { subject: "TTS Session", timing: "5:00 PM", days: "Tuesday, Thursday, Saturday (TTS)" }
    ],
    teachers: [
      { name: "Senior Humanities Faculty", role: "Arts Board Mentor", exp: "12+ Yrs Exp" }
    ]
  },
  {
    id: "morning-batch-8-10",
    title: "Morning batch class 8th - 10th",
    grade: "Morning batch class 8th - 10th",
    stream: "morning",
    streamLabel: "Morning batch",
    target: "10am- 11am daily",
    scheduleSummary: "10:00 AM - 11:00 AM Daily",
    mode: "OFFLINE (HINGLISH)",
    duration: "Academic Session 2026-27",
    image_url: "", // User can insert Cloudinary URL here
    features: [
      "Fresh Morning Learning Atmosphere",
      "10:00 AM - 11:00 AM Daily Schedule",
      "Maths & Science Problem Solving",
      "Small Group Focused Mentorship"
    ],
    schedules: [
      { subject: "Morning Batch Session", timing: "10:00 AM - 11:00 AM Daily", days: "Daily (Monday to Saturday)" }
    ],
    teachers: [
      { name: "Pankaj Mishra Sir", role: "Senior Faculty & Director", exp: "12+ Yrs Exp" }
    ]
  }
];

export default function BatchCoursesExplorer({ title = "Explore Our Academic Batches" }: { title?: string }) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeBatchModal, setActiveBatchModal] = useState<BatchItem | null>(null);
  const [activeTab, setActiveTab] = useState<"schedule" | "features" | "teachers">("schedule");
  
  const [registeringBatch, setRegisteringBatch] = useState<BatchItem | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [formSuccessMsg, setFormSuccessMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const streamParam = params.get("stream") || params.get("filter");
      if (streamParam && ["foundations", "commerce", "arts", "morning"].includes(streamParam)) {
        setSelectedFilter(streamParam);
      }
    }
  }, []);

  const filteredBatches = batchList.filter((b) => {
    if (selectedFilter === "all") return true;
    return b.stream === selectedFilter;
  });

  return (
    <section id="courses" className="py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/10 text-[#0D2847] dark:text-[#F5BE18] px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#F5BE18]" />
            <span>Classroom Batches & Timings</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0D2847] dark:text-white leading-tight">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium">
            Select your customized stream or academic batch to view complete subject-wise class schedules & timings.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-bold">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
              selectedFilter === "all"
                ? "bg-[#0D2847] text-white shadow-md ring-2 ring-[#F5BE18]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            All Batches ({batchList.length})
          </button>
          <button
            onClick={() => setSelectedFilter("foundations")}
            className={`px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
              selectedFilter === "foundations"
                ? "bg-[#0D2847] text-white shadow-md ring-2 ring-[#F5BE18]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            Class 5th - 10th
          </button>
          <button
            onClick={() => setSelectedFilter("commerce")}
            className={`px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
              selectedFilter === "commerce"
                ? "bg-[#0D2847] text-white shadow-md ring-2 ring-[#F5BE18]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            Class 11th & 12th Commerce
          </button>
          <button
            onClick={() => setSelectedFilter("arts")}
            className={`px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
              selectedFilter === "arts"
                ? "bg-[#0D2847] text-white shadow-md ring-2 ring-[#F5BE18]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            Class 11th & 12th Arts
          </button>
          <button
            onClick={() => setSelectedFilter("morning")}
            className={`px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
              selectedFilter === "morning"
                ? "bg-[#0D2847] text-white shadow-md ring-2 ring-[#F5BE18]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            Morning Batches
          </button>
        </div>

        {/* 🚀 EXACT PHYSICSWALLAH (PW) STYLE BATCH CARDS GRID 🚀 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white dark:bg-[#0d2036] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* 1. PW Poster Image Header / Banner (Cloudinary Ready) */}
              <div className="relative w-full aspect-[16/9] bg-gradient-to-tr from-[#0B1F3A] via-[#0D2847] to-[#164175] p-3 flex flex-col justify-between overflow-hidden select-none">
                
                {/* Floating Exact PW-Style WhatsApp Icon Button */}
                <a
                  href={`https://wa.me/917011731649?text=Hi%20KVI,%20I%20want%20information%20about%20${encodeURIComponent(batch.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-[#061426]/90 p-[2px] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer border border-white/20"
                  title="Inquire on WhatsApp"
                >
                  <svg className="w-full h-full rounded-full" viewBox="0 0 32 32" fill="none">
                    {/* Green Outer Circle */}
                    <circle cx="16" cy="16" r="16" fill="#25D366" />
                    {/* White Speech Bubble */}
                    <path d="M16 6C10.48 6 6 10.48 6 16c0 2.17.69 4.18 1.87 5.82L6.5 26.5l4.83-1.32A9.94 9.94 0 0 0 16 26c5.52 0 10-4.48 10-10S21.52 6 16 6z" fill="#FFFFFF" />
                    {/* Green Phone Handset Icon inside White Bubble */}
                    <path d="M20.73 18.73c-.24.68-1.4 1.3-1.95 1.34-.52.04-1.19.19-3.87-.92-3.42-1.41-5.61-4.9-5.78-5.13-.17-.23-1.39-1.85-1.39-3.53 0-1.68.88-2.51 1.19-2.85.31-.34.68-.43.91-.43.23 0 .45.01.65.01.21 0 .5-.08.78.6.28.68.96 2.35 1.04 2.52.08.17.14.37.03.57-.1.21-.17.34-.32.53-.16.19-.33.42-.48.56-.16.16-.31.32-.14.63.18.3.8 1.33 1.72 2.14 1.18 1.04 2.17 1.37 2.47 1.52.3.16.48.14.66-.07.18-.21.76-.89.96-1.19.2-.3.4-.25.67-.16.27.09 1.72.81 2.01.96.29.15.49.22.56.34.07.13.07.73-.17 1.41z" fill="#25D366" />
                  </svg>
                </a>

                {/* Cloudinary Image Render if image_url provided */}
                {batch.image_url ? (
                  <img
                    src={batch.image_url}
                    alt={batch.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  /* Fallback PW-style Banner Graphics until Cloudinary URL is passed */
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D2847] via-[#12365e] to-[#071728] p-3.5 flex flex-col justify-between z-0">
                    <div className="flex justify-between items-start">
                      <div className="h-5.5 aspect-[3/2] border border-[#F5BE18] rounded p-0.5 bg-[#0D2847] shrink-0 shadow-sm flex items-center justify-center">
                        <img src="/kvi_logo.png" alt="KVI Logo" className="h-full w-full object-contain" />
                      </div>
                    </div>

                    <div className="my-auto pr-8">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#F5BE18] block">
                        KVI BATCH 2026-27
                      </span>
                      <h4 className="text-lg font-black text-white leading-tight uppercase drop-shadow-sm">
                        {batch.title}
                      </h4>
                    </div>
                  </div>
                )}



              </div>

              {/* 2. PW Card Content Details */}
              <div className="p-4 md:p-5 flex-1 flex flex-col justify-between gap-3 text-xs">
                
                {/* Class Category Tag & Language Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    {batch.title}
                  </span>
                  <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md uppercase bg-gray-50 dark:bg-slate-800">
                    HINGLISH
                  </span>
                </div>

                {/* Batch Title Heading */}
                <h3 className="font-black text-sm md:text-base text-[#0D2847] dark:text-white leading-snug">
                  {batch.title}
                </h3>

                {/* Audience Subtitle Line */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium">
                  <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">For Board Aspirants & School Prep</span>
                </div>

                {/* Schedule & Timing Line */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">Timings: {batch.scheduleSummary}</span>
                </div>

                {/* Features List bullets */}
                <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-gray-800/80">
                  {batch.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* 3. PW Bottom Action Bar */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => {
                      setRegisteringBatch(batch);
                      setFormErrorMsg("");
                      setFormSuccessMsg("");
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#1A1D23] dark:bg-black hover:bg-black text-white font-black text-xs text-center rounded-xl transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Register Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBatchModal(batch);
                      setActiveTab("schedule");
                    }}
                    className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 text-[#0D2847] dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
                    title="View Batch Details & Schedule"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ── PW-STYLE BATCH DETAILS FULL MODAL ── */}
      {activeBatchModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveBatchModal(null)}
        >
          <div
            className="bg-white dark:bg-[#0D2847] text-gray-800 dark:text-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-amber-400/30 flex flex-col my-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="bg-gradient-to-r from-[#0D2847] via-[#091a2e] to-[#0D2847] text-white p-6 relative border-b border-white/10">
              <button
                onClick={() => setActiveBatchModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#F5BE18] text-[#0D2847] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeBatchModal.grade}
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Batch Session 2026-27
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white pr-8">
                {activeBatchModal.title}
              </h2>
              <p className="text-xs text-amber-300 mt-1 font-semibold">
                {activeBatchModal.target}
              </p>

              {/* Mode & Duration Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-200 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#F5BE18]" />
                  <span>Duration: <strong>{activeBatchModal.duration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mode: <strong>{activeBatchModal.mode}</strong></span>
                </div>
              </div>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#071728] px-6">
              <button
                onClick={() => setActiveTab("schedule")}
                className={`py-3 px-5 font-black text-xs transition border-b-2 cursor-pointer ${
                  activeTab === "schedule"
                    ? "border-[#F5BE18] text-[#F5BE18]"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-white"
                }`}
              >
                📅 Class Schedules & Timings
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`py-3 px-5 font-black text-xs transition border-b-2 cursor-pointer ${
                  activeTab === "features"
                    ? "border-[#F5BE18] text-[#F5BE18]"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-white"
                }`}
              >
                ✨ Batch Features
              </button>
              <button
                onClick={() => setActiveTab("teachers")}
                className={`py-3 px-5 font-black text-xs transition border-b-2 cursor-pointer ${
                  activeTab === "teachers"
                    ? "border-[#F5BE18] text-[#F5BE18]"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-white"
                }`}
              >
                👨‍🏫 Faculty Team
              </button>
            </div>

            {/* Modal Tab Contents (Scrollable Body) */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              
              {/* TAB 1: SCHEDULES */}
              {activeTab === "schedule" && (
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-[#0D2847] dark:text-amber-300 tracking-wider">
                    Subject-Wise Class Timings
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-[#071728] text-[#0D2847] dark:text-white font-black border-b border-gray-200 dark:border-white/10 uppercase text-[10px]">
                          <th className="p-3">Subject / Module</th>
                          <th className="p-3">Days</th>
                          <th className="p-3">Exact Timing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                        {activeBatchModal.schedules.map((sch, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5">
                            <td className="p-3 font-bold text-[#0D2847] dark:text-white">{sch.subject}</td>
                            <td className="p-3 font-semibold text-amber-500">{sch.days}</td>
                            <td className="p-3 font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg">{sch.timing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 bg-amber-500/10 border border-amber-400/30 p-3 rounded-2xl text-amber-200 font-medium text-[11px] leading-relaxed">
                    💡 <strong>Note:</strong> All classes are conducted at Knowledge Venture Institute premises with personal doubt support after class hours.
                  </div>
                </div>
              )}

              {/* TAB 2: FEATURES */}
              {activeTab === "features" && (
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-[#0D2847] dark:text-amber-300 tracking-wider">
                    What is Included in this Batch?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeBatchModal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 dark:bg-[#071728] p-3.5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-gray-800 dark:text-gray-200 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TEACHERS */}
              {activeTab === "teachers" && (
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-[#0D2847] dark:text-amber-300 tracking-wider">
                    Learn from Senior Board Experts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeBatchModal.teachers.map((teach, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-[#071728] p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-[#F5BE18] text-[#0D2847] font-black flex items-center justify-center text-lg shadow-md shrink-0">
                          {teach.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-black text-sm text-[#0D2847] dark:text-white">{teach.name}</h5>
                          <span className="text-[11px] text-amber-400 font-bold block">{teach.role}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{teach.exp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Sticky CTA */}
            <div className="p-4 bg-gray-100 dark:bg-[#071728] border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Admissions Open</span>
                <span className="text-xs font-black text-[#0D2847] dark:text-amber-300">Limited Seats Per Batch</span>
              </div>

              <button
                onClick={() => {
                  setRegisteringBatch(activeBatchModal);
                  setActiveBatchModal(null);
                  setFormErrorMsg("");
                  setFormSuccessMsg("");
                }}
                className="py-3 px-6 rounded-xl bg-[#F5BE18] text-[#0D2847] font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🚀 REGISTRATION FORM POPUP MODAL (Triggered by 'Register Now') 🚀 */}
      {registeringBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0d2036] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-[#0B1F3A] to-[#0D2847] text-white flex items-center justify-between border-b border-gray-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5BE18]/20 flex items-center justify-center border border-[#F5BE18]/40">
                  <GraduationCap className="h-5 w-5 text-[#F5BE18]" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide text-white">Direct Course Enrollment</h3>
                  <span className="text-[11px] text-amber-300 font-bold block">{registeringBatch.title}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setRegisteringBatch(null);
                  setFormErrorMsg("");
                  setFormSuccessMsg("");
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex flex-col gap-4 text-xs">
              <div className="text-center mb-1">
                <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/10 text-[#0D2847] dark:text-[#F5BE18] px-3.5 py-1.5 rounded-full text-[11px] font-bold mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#F5BE18]" />
                  <span>Form 1: Direct Batch Admission</span>
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                  Fill out this simple form to reserve your seat in KVI's small-batch conceptual learning programs.
                </p>
              </div>

              {formErrorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-bold border border-red-200">
                  {formErrorMsg}
                </div>
              )}

              {formSuccessMsg ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 rounded-2xl text-center flex flex-col items-center gap-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  <h3 className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm">Enrollment Submitted!</h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">{formSuccessMsg}</p>
                  <button
                    onClick={() => {
                      setRegisteringBatch(null);
                      setFormSuccessMsg("");
                    }}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-[#0D2847] text-white font-extrabold text-xs hover:bg-[#164175] transition shadow-md cursor-pointer"
                  >
                    Done / Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmittingForm(true);
                    setFormErrorMsg("");
                    setFormSuccessMsg("");
                    const formData = new FormData(e.currentTarget);
                    try {
                      const res = await submitEnrollment(null, formData);
                      setIsSubmittingForm(false);
                      if (res.success) {
                        setFormSuccessMsg(res.message || "Enrollment application submitted successfully!");
                      } else {
                        setFormErrorMsg(res.error || "Failed to submit application.");
                      }
                    } catch (err: any) {
                      setIsSubmittingForm(false);
                      setFormErrorMsg("An unexpected error occurred. Please try again.");
                    }
                  }}
                  className="flex flex-col gap-4 text-xs"
                >
                  {/* Student Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="student_name"
                      required
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-gray-50 dark:bg-[#091a2e] border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:border-[#F5BE18] text-xs font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 7011731649"
                        className="w-full bg-gray-50 dark:bg-[#091a2e] border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:border-[#F5BE18] text-xs font-medium text-gray-800 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. aarav@gmail.com"
                        className="w-full bg-gray-50 dark:bg-[#091a2e] border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:border-[#F5BE18] text-xs font-medium text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Preferred Stream */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                      Preferred Class / Stream *
                    </label>
                    <select
                      name="stream"
                      defaultValue={registeringBatch.title}
                      required
                      className="w-full bg-gray-50 dark:bg-[#091a2e] border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:border-[#F5BE18] text-xs font-bold text-gray-800 dark:text-white"
                    >
                      {batchList.map((b) => (
                        <option key={b.id} value={b.title}>
                          {b.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* School / City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                      School Name / City
                    </label>
                    <input
                      type="text"
                      name="school_or_city"
                      placeholder="e.g. GBSSS / Delhi"
                      className="w-full bg-gray-50 dark:bg-[#091a2e] border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:border-[#F5BE18] text-xs font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-full py-3.5 mt-2 bg-[#0D2847] hover:bg-[#164175] text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-amber-400/30"
                  >
                    <Send className="h-4 w-4 text-[#F5BE18]" />
                    <span>{isSubmittingForm ? "Submitting Application..." : "Submit Enrollment Application"}</span>
                  </button>
                </form>
              )}

              <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3 text-center text-[11px] text-gray-500">
                <span className="text-[#F5BE18] italic font-bold">"Where Concepts Become Clear"</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
