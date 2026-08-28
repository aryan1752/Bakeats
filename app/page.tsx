"use client";

import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  BookOpen, 
  Award, 
  Calendar, 
  UserCheck, 
  Users, 
  FileText,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SquigglyText } from "./components/ui/squiggly-text";
import ScrollJourney from "./components/ui/ScrollJourney";

// Mock data for Branch Locator
const branches = {
  Delhi: [
    {
      name: "Hari Nagar Head Center",
      address: "I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044",
      phone1: "7011731649",
      phone2: "8585575250",
      hours: "08:00 AM - 08:00 PM"
    },
    {
      name: "Jaitpur Extension Center",
      address: "H-24, Main Road, Jaitpur Extension Part-2, Badarpur, New Delhi 110044",
      phone1: "7011731649",
      phone2: "8585575250",
      hours: "09:00 AM - 07:30 PM"
    }
  ],
  Noida: [
    {
      name: "Sector 62 Associate Center",
      address: "A-15, Near Metro Station, Sector 62, Noida, Uttar Pradesh 201301",
      phone1: "7011731649",
      phone2: "8585575250",
      hours: "10:00 AM - 07:00 PM"
    }
  ]
};

// Toppers Data
const toppers = [
  { name: "Aarav Sharma", score: "98.2%", exam: "Class 10 Board", category: "Foundations", year: "2025", rank: "School Rank 1" },
  { name: "Diya Verma", score: "96.4%", exam: "Class 9 Final", category: "Foundations", year: "2025", rank: "Top Percentile" },
  { name: "Rahul Gupta", score: "97.8%", exam: "Class 12 Boards (Commerce)", category: "Commerce", year: "2025", rank: "District Rank 3" },
  { name: "Neha Singh", score: "95.6%", exam: "Class 12 Boards (Arts)", category: "Arts", year: "2025", rank: "Top in Humanities" },
  { name: "Sahil Khan", score: "95.2%", exam: "Class 10 Board", category: "Foundations", year: "2025", rank: "School Rank 4" },
  { name: "Sneha Goel", score: "96.8%", exam: "Class 12 Boards (Commerce)", category: "Commerce", year: "2025", rank: "School Rank 2" }
];

// Faculty Data matching flyers
const facultyList = [
  {
    name: "CS Sanjay Arya",
    designation: "Qualified Company Secretary",
    subject: "Expert of Economics & Business",
    exp: "12+ Yrs",
    quote: "Expert of economics and business studies",
    highlights: [
      "12+ years of teaching experience",
      "Company Secretary professional credentials",
      "Taught 3,000+ board students successfully",
      "Focus on core clarity & case study prep"
    ],
    specialties: ["Economics", "Business Studies", "Commerce Lead"],
    photo: "/cs sanjay arya.png"
  },
  {
    name: "CA Ankur Lakhiwall",
    designation: "Qualified Chartered Accountant",
    subject: "Expert of Accountancy Studies",
    exp: "12+ Yrs",
    quote: "Expert of Accountancy & Corporate Finance",
    highlights: [
      "12+ years of accountancy teaching",
      "Qualified Chartered Accountant (CA) expert",
      "Step-by-step balance sheet shortcuts",
      "Interactive boards-prep score strategies"
    ],
    specialties: ["Accountancy", "Corporate Tax", "Board Scoring"],
    photo: "/aditya.png"
  },
  {
    name: "Vimal Sharma",
    designation: "Senior Humanities Lecturer",
    subject: "Expert of Humanities & Arts",
    exp: "15+ Yrs",
    quote: "Have taught more than 5,000+ students.",
    highlights: [
      "Have taught more than 5,000+ students",
      "15+ years board prep teaching experience",
      "History & Political Science conceptual lead",
      "Friendly & exam-centric study approach"
    ],
    specialties: ["History", "Political Science", "Geography"],
    photo: "/vimal.png"
  }
];

const journeySteps = [
  {
    image: "/orientation_illus.png",
    label: "Step 1",
    title: "Orientation",
  },
  {
    image: "/step2_cartoon.png",
    label: "Step 2",
    title: "Get study material and begin your prep.",
  },
  {
    image: "/step3_teacher.jpg",
    label: "Step 3",
    title: "Interactive classes and personalised attention",
  },
  {
    image: "/step4_tests.jpg",
    label: "Step 4",
    title: "Give regular tests and assignments",
  },
  {
    image: "/step5_impressive.png",
    label: "Step 5",
    title: "Ace your exam with flying colours",
  },
];

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [selectedCity, setSelectedCity] = useState<"Delhi" | "Noida">("Delhi");
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [resultsFilter, setResultsFilter] = useState("All");

  const bannerImages = [
    "/0e2f5377-dae3-4d7f-8232-1f2e7bfd559d.png",
    "/image.png",
    "/252eab2d-d802-4ff2-9d53-4cd46c1c7b3d.png",
    "/8b37fb82-84f4-4e2e-86f3-2a33cfc1a58d.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFaculty((prev) => (prev + 1) % facultyList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentBranch = branches[selectedCity][selectedBranch] || branches[selectedCity][0];

  const handleCityChange = (city: "Delhi" | "Noida") => {
    setSelectedCity(city);
    setSelectedBranch(0);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#071728] text-gray-800 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* ── 1. HERO SLIDER BANNER SECTION (Full Width Edge-to-Edge Image Carousel) ── */}
      <section className="relative w-full overflow-hidden bg-white border-b border-gray-100 dark:border-gray-800">
        <div className="relative w-full aspect-[1.8/1] sm:aspect-[2.1/1] md:aspect-[2.4/1] lg:aspect-[2.6/1]">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeBanner}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={bannerImages[activeBanner]}
                alt={`KVI Hero Slide ${activeBanner + 1}`}
                className="w-full h-full object-fill object-center select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Pill navigation dots overlaid on the bottom center of the banner */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBanner(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeBanner === idx ? "w-8 bg-[#00A5EC]" : "w-3 bg-white/60 shadow"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 1.5 ABOUT KNOWLEDGE VENTURE SECTION (Concept C: Clean Details & Larger Floating Logo) ── */}
      <section className="py-16 bg-white dark:bg-[#071728] border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Animated Squiggly Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#0D2847] dark:text-white leading-tight">
              About{" "}
              <SquigglyText stepDuration={70} scale={[4, 6]} className="text-[#E2AD07]">
                Knowledge Venture Institute
              </SquigglyText>
            </h2>
            <p className="text-[#0D2847] dark:text-amber-400 font-extrabold text-xs md:text-sm tracking-widest uppercase mt-3">
              where{" "}
              <SquigglyText scale={3} className="text-emerald-600 dark:text-emerald-400">
                concepts
              </SquigglyText>{" "}
              become clear
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
            
            {/* Left Side: Large Description Text block (No Box, No Border) */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center">
              <p className="text-base md:text-lg lg:text-xl font-bold text-gray-700 leading-relaxed dark:text-gray-300">
                At <span className="text-[#E2AD07] dark:text-[#F5BE18] font-black">Knowledge Venture Institute</span>, we believe that education should empower the mind, not test memory capacity. Our core mission is to steer students away from rote memorization and guide them towards conceptual clarity that lasts a lifetime.
              </p>
            </div>

            {/* Right Side: Larger Floating Logo Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center mt-8 lg:mt-0">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="w-full flex justify-center"
              >
                <img 
                  src="/kvi_logo.png" 
                  alt="Knowledge Venture Institute Logo" 
                  className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] h-auto object-contain select-none filter drop-shadow-lg"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 1.7 SCROLL JOURNEY TIMELINE ANIMATION ── */}
      <ScrollJourney 
        steps={journeySteps} 
        colors={["#14335F", "#1B4B8F", "#2158A8", "#3E86E0", "#0B1F3A"]}
      />

      {/* ── 2. GOAL / COURSE SELECTOR GRID (Aakash Screenshot Style) ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full text-center">
        {/* Sky-Blue Integrated Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D2847] dark:text-white leading-tight">
          Select your goal <span className="text-[#00A5EC] dark:text-sky-400 block sm:inline">to explore our courses</span>
        </h2>
        <p className="text-gray-400 text-[11px] mt-2 tracking-wide uppercase font-bold">Choose a customized stream for board prep success</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          
          {/* Card 1: 6-10th Foundations */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center border-b-4 hover:border-b-[#00A5EC]">
            <div className="h-16 w-16 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#00A5EC] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 2.5s1.24-.5 2.5-2Z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6.05 11.05A22 22 0 0 1 12 15Z"/>
                <path d="M9 15v3.5a1.5 1.5 0 0 0 3 0V15"/>
                <path d="M15 9h-3.5a1.5 1.5 0 0 0 0 3H15"/>
              </svg>
            </div>
            <h3 className="font-extrabold text-xs text-[#0D2847] dark:text-white uppercase tracking-wider">6-10th Foundations</h3>
          </div>

          {/* Card 2: Commerce Stream */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center border-b-4 hover:border-b-[#F5BE18]">
            <div className="h-16 w-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#F5BE18] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h3 className="font-extrabold text-xs text-[#0D2847] dark:text-white uppercase tracking-wider">Commerce Stream</h3>
          </div>

          {/* Card 3: Arts Stream */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center border-b-4 hover:border-b-purple-500">
            <div className="h-16 w-16 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
            <h3 className="font-extrabold text-xs text-[#0D2847] dark:text-white uppercase tracking-wider">Humanities / Arts</h3>
          </div>

        </div>
      </section>

      {/* ── 3. INTERACTIVE CENTER LOCATOR WIDGET ── */}
      <section className="bg-white border-b border-gray-100 dark:bg-[#071728] dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 text-left">
            <h2 className="text-2xl md:text-3xl font-black text-[#0D2847]">Locate Our Centers</h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Find the nearest Knowledge Venture Institute study centers offering classes for your chosen stream.
            </p>
            
            <div className="flex gap-4 mt-6">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Select State/City</label>
                <select 
                  className="bg-white border border-gray-200 rounded-md p-2.5 text-xs text-gray-700 outline-none focus:border-[#F5BE18] w-full"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value as "Delhi" | "Noida")}
                >
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Noida">Noida (UP)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Select Branch Center</label>
                <select 
                  className="bg-white border border-gray-200 rounded-md p-2.5 text-xs text-gray-700 outline-none focus:border-[#F5BE18] w-full"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(Number(e.target.value))}
                >
                  {branches[selectedCity].map((branch, idx) => (
                    <option key={idx} value={idx}>{branch.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-8 flex flex-col gap-3">
              <span className="text-[#F5BE18] text-xs font-bold uppercase tracking-wider block">Currently Selected Branch</span>
              <h3 className="font-extrabold text-[#0D2847] text-lg">{currentBranch.name}</h3>
              <p className="text-xs text-gray-500 flex items-start gap-1">
                <MapPin className="h-4 w-4 text-[#F5BE18] shrink-0 mt-0.5" />
                <span>{currentBranch.address}</span>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-[#F5BE18]" />
                  <a href={`tel:${currentBranch.phone1}`} className="hover:underline">{currentBranch.phone1}</a>
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-[#F5BE18]" />
                  <a href={`tel:${currentBranch.phone2}`} className="hover:underline">{currentBranch.phone2}</a>
                </span>
              </div>
            </div>
            <div className="sm:col-span-4 flex flex-col gap-3 justify-center">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(currentBranch.address)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white py-2 rounded-lg text-xs font-bold text-center transition"
              >
                Directions
              </a>
              <Link 
                href="/contact" 
                className="w-full border border-gray-200 hover:border-[#F5BE18] hover:text-[#0D2847] py-2 rounded-lg text-xs font-bold text-center text-gray-500 transition"
              >
                Book Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. RESULTS OF CONSISTENT EXCELLENCE (TOPPERS GRID) ── */}
      <section id="results" className="py-16 max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#0D2847]">A Record of Consistent Excellence</h2>
        <p className="text-gray-500 text-sm mt-2">See the exceptional percentages secured by our students</p>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
          {["All", "Foundations", "Commerce", "Arts"].map((filter) => (
            <button
              key={filter}
              onClick={() => setResultsFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${resultsFilter === filter ? "bg-[#0D2847] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {toppers
            .filter((t) => resultsFilter === "All" || t.category === resultsFilter)
            .map((topper, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col items-center">
                {/* Vector Avatar */}
                <div className="h-16 w-16 rounded-full bg-[#0D2847]/10 flex items-center justify-center text-2xl font-bold text-[#0D2847] mb-3">
                  {topper.name.charAt(0)}
                </div>
                <h4 className="font-extrabold text-[#0D2847] text-xs text-center line-clamp-1">{topper.name}</h4>
                <span className="text-xs font-black text-[#F5BE18] mt-1">{topper.score}</span>
                <span className="text-[10px] text-gray-400 mt-0.5 block text-center line-clamp-1">{topper.exam}</span>
                <span className="text-[9px] bg-gray-100 px-2 py-0.5 text-gray-500 rounded-full font-bold mt-2">
                  {topper.rank}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* ── 6. FACULTY & TEACHERS SECTION (Premium Slider Card Layout) ── */}
      <section id="faculty" className="bg-white border-b border-gray-100 dark:bg-[#071728] dark:border-gray-800 py-16 w-full transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D2847] dark:text-white leading-tight">Our Experienced Faculty</h2>
          <p className="text-gray-400 text-[10px] tracking-wide uppercase font-bold mt-1">
            Classes are taught by highly qualified board specialists and senior professionals
          </p>

          {/* Main Slider Card Frame */}
          <div className="relative mt-12 bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-[28px] p-6 md:p-10 shadow-xl max-w-3xl mx-auto text-left">
            
            {/* Left Hover Button */}
            <button
              onClick={() => setActiveFaculty((prev) => (prev === 0 ? facultyList.length - 1 : prev - 1))}
              className="absolute top-1/2 -translate-y-1/2 -left-6 z-20 h-12 w-12 rounded-full bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white flex items-center justify-center transition shadow-lg cursor-pointer focus:outline-none hidden md:flex"
              aria-label="Previous faculty"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Hover Button */}
            <button
              onClick={() => setActiveFaculty((prev) => (prev === facultyList.length - 1 ? 0 : prev + 1))}
              className="absolute top-1/2 -translate-y-1/2 -right-6 z-20 h-12 w-12 rounded-full bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white flex items-center justify-center transition shadow-lg cursor-pointer focus:outline-none hidden md:flex"
              aria-label="Next faculty"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Inner Details Container with AnimatePresence */}
            <div className="min-h-[380px] lg:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFaculty}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Photo Section */}
                  <div className="lg:col-span-5 flex justify-center w-full">
                    <div className="relative w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden border-2 border-sky-100 dark:border-gray-800 shadow-md">
                      <img 
                        src={facultyList[activeFaculty].photo} 
                        alt={facultyList[activeFaculty].name} 
                        className="w-full h-full object-cover object-center select-none"
                      />
                    </div>
                  </div>

                  {/* Copy Details Section */}
                  <div className="lg:col-span-7 flex flex-col justify-start">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                      Exp: {facultyList[activeFaculty].exp}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0D2847] dark:text-white mt-1 leading-tight">
                      {facultyList[activeFaculty].name}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mt-0.5">
                      {facultyList[activeFaculty].designation}
                    </span>

                    <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-3 border-l-2 border-emerald-500 pl-3 leading-relaxed">
                      "{facultyList[activeFaculty].quote}"
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4">
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider block">Key Highlights</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                        {facultyList[activeFaculty].highlights.map((h, hidx) => (
                          <div key={hidx} className="flex items-center gap-2 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-900/30 p-2 rounded-lg text-[10px] font-bold text-gray-600 dark:text-gray-300">
                            <span className="text-emerald-500 dark:text-emerald-400 text-xs">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-4">
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider block">Specialties</span>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {facultyList[activeFaculty].specialties.map((s, sidx) => (
                          <span key={sidx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/20 border border-emerald-100/50 text-emerald-600 dark:text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-wider">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Dots Indicator below the slider */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {facultyList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFaculty(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeFaculty === idx ? "w-6 bg-[#00A5EC]" : "w-1.5 bg-gray-300 dark:bg-gray-700"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Fraction Page Indicator */}
          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-black mt-2 tracking-widest">
            {`0${activeFaculty + 1} / 0${facultyList.length}`}
          </div>

        </div>
      </section>

      {/* ── 7. DEMO LECTURES & VIDEOS SHOWCASE ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#0D2847]">Watch Demo Lecture Videos</h2>
        <p className="text-gray-500 text-sm mt-2">Get a sneak peek into KVI's clear conceptual teaching methodology</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {/* Card 1: Money & Banking */}
          <a 
            href="https://www.youtube.com/watch?v=CtMkfZMHUuM"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
              <img 
                src="https://img.youtube.com/vi/CtMkfZMHUuM/hqdefault.jpg"
                alt="Money & Banking Lecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-[#0D2847] group-hover:bg-[#F5BE18] text-white group-hover:text-[#0D2847] flex items-center justify-center shadow-lg transition-colors duration-300">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4 text-left">
              <span className="text-xs font-bold text-[#F5BE18] uppercase">Class 12 Economics</span>
              <h4 className="font-extrabold text-[#0D2847] text-sm mt-1">Money & Banking: CDR, VCR, CRR & SLR</h4>
              <p className="text-xs text-gray-500 mt-1">By CS Sanjay Arya (Company Secretary)</p>
            </div>
          </a>

          {/* Card 2: Management as a Profession */}
          <a 
            href="https://www.youtube.com/watch?v=A1C-Q2sydxM"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
              <img 
                src="https://img.youtube.com/vi/A1C-Q2sydxM/hqdefault.jpg"
                alt="Management as a Profession Lecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-[#0D2847] group-hover:bg-[#F5BE18] text-white group-hover:text-[#0D2847] flex items-center justify-center shadow-lg transition-colors duration-300">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4 text-left">
              <span className="text-xs font-bold text-[#F5BE18] uppercase">Class 12 Business Studies</span>
              <h4 className="font-extrabold text-[#0D2847] text-sm mt-1">Management as a Profession & Professionalism</h4>
              <p className="text-xs text-gray-500 mt-1">By CS Sanjay Arya (Company Secretary)</p>
            </div>
          </a>

          {/* Card 3: National Income */}
          <a 
            href="https://www.youtube.com/watch?v=bt8HaQctuAk"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
              <img 
                src="https://img.youtube.com/vi/bt8HaQctuAk/hqdefault.jpg"
                alt="National Income Lecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-[#0D2847] group-hover:bg-[#F5BE18] text-white group-hover:text-[#0D2847] flex items-center justify-center shadow-lg transition-colors duration-300">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4 text-left">
              <span className="text-xs font-bold text-[#F5BE18] uppercase">Class 12 Economics</span>
              <h4 className="font-extrabold text-[#0D2847] text-sm mt-1">National Income: Normal Resident Concept</h4>
              <p className="text-xs text-gray-500 mt-1">By CS Sanjay Arya (Company Secretary)</p>
            </div>
          </a>

        </div>
      </section>

      {/* ── 8. ADMISSION ENROLLMENT BANNER (Yellow & White Theme) ── */}
      <section className="bg-gradient-to-r from-[#F5BE18] via-[#E2AD07] to-[#E2AD07] py-12 text-[#0D2847] transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#0D2847]">Admissions Open - Limited Seats per Batch!</h2>
            <p className="text-xs text-[#0D2847]/85 mt-1 leading-relaxed max-w-xl font-bold">
              Join Knowledge Venture Institute today and experience conceptual clarity with professional guidance.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/scholarship" className="px-5 py-2.5 bg-white hover:bg-gray-50 text-[#0D2847] font-black text-xs rounded-md transition shadow-md">
              Eligibility Calculator
            </Link>
            <Link href="/contact" className="px-5 py-2.5 bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold text-xs rounded-md transition shadow-md">
              Find Our Center
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}