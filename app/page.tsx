"use client";

import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft,
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
import LiveNotificationSection from "./components/ui/LiveNotificationSection";
import FAQSection from "./components/ui/FAQSection";

// Mock data for Branch Locator
const branches = {
  Delhi: [
    {
      name: "Hari Nagar Head Center",
      address: "I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044",
      phone1: "7011731649",
      phone2: "8285575250",
      hours: "08:00 AM - 08:00 PM"
    },
    {
      name: "Jaitpur Extension Center",
      address: "H-24, Main Road, Jaitpur Extension Part-2, Badarpur, New Delhi 110044",
      phone1: "7011731649",
      phone2: "8285575250",
      hours: "09:00 AM - 07:30 PM"
    }
  ],
  Noida: [
    {
      name: "Sector 62 Associate Center",
      address: "A-15, Near Metro Station, Sector 62, Noida, Uttar Pradesh 201301",
      phone1: "7011731649",
      phone2: "8285575250",
      hours: "10:00 AM - 07:00 PM"
    }
  ]
};

// Toppers Data
const toppersRow1 = [
  { name: "NAINA", school: "SKV", subject: "POL. SCI", score: "97", image: "/topper_naina.png" },
  { name: "AAKASH", school: "DAV", subject: "ECONOMICS", score: "97", image: "/topper_aakash.png" },
  { name: "PRIYANKA", school: "KV", subject: "ECONOMICS", score: "99", image: "/topper_kavita.png" },
  { name: "PIYUSH", school: "RPVV", subject: "CHEMISTRY", score: "98", image: "/topper_karan.png" },
  { name: "SHRUTI", school: "SKV", subject: "B. STUDIES", score: "96", image: "/topper_naina.png" },
  { name: "ABHISHEK", school: "GBSSS", subject: "ACCOUNTS", score: "97", image: "/topper_aakash.png" }
];

const toppersRow2 = [
  { name: "KARAN", school: "GBSSS", subject: "HISTORY", score: "98", image: "/topper_karan.png" },
  { name: "KAVITA", school: "SKV", subject: "POL. SCI", score: "98", image: "/topper_kavita.png" },
  { name: "SNEHA", school: "DPS", subject: "MATHEMATICS", score: "97", image: "/topper_naina.png" },
  { name: "HARSH", school: "RYAN", subject: "PHYSICS", score: "99", image: "/topper_aakash.png" },
  { name: "ANJALI", school: "KV", subject: "ENGLISH", score: "98", image: "/topper_kavita.png" },
  { name: "ROHAN", school: "DAV", subject: "ECONOMICS", score: "96", image: "/topper_karan.png" }
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
    name: "Er. Aditya Pratap Singh",
    designation: "Class 11th & 12th Maths & Physics Faculty",
    subject: "Expert of 11-12th Maths, Physics & 9-10th Boards",
    exp: "5+ Yrs",
    quote: "Building strong analytical foundations & board-scoring problem solving skills",
    highlights: [
      "5+ years of dedicated teaching experience",
      "Specialist in Class 11th & 12th Maths & Physics",
      "Taught 1,000+ Class 9th & 10th board students",
      "Conceptual clarity & interactive problem solving"
    ],
    specialties: ["11-12th Maths", "11-12th Physics", "9-10th Boards"],
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
  },
  {
    name: "Er. Saurabh Singh",
    designation: "Class 11th & 12th Chemistry Specialist",
    subject: "Expert of Class 11-12th Chemistry & 9-10th Boards",
    exp: "B.Tech",
    quote: "Mastering Chemistry & Science concepts with B.Tech analytical approach",
    highlights: [
      "Completed B.Tech Engineering Degree",
      "Class 9th & 10th Boards Specialist",
      "Specialist in Class 11th & 12th Chemistry",
      "Taught 2,000+ students successfully"
    ],
    specialties: ["11-12th Chemistry", "9-10th Boards", "Science"],
    photo: "/er saurabh.png"
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

// Dynamic Typing Text Component
function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-[#F5BE18]">|</span>
    </span>
  );
}

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeFaculty, setActiveFaculty] = useState(0);

  const bannerImages = [
    "/0e2f5377-dae3-4d7f-8232-1f2e7bfd559d.png",
    "/image.png",
    "/252eab2d-d802-4ff2-9d53-4cd46c1c7b3d.png",
    "/8b37fb82-84f4-4e2e-86f3-2a33cfc1a58d.png",
    "/hero_banner_5.jpg",
    "/hero_banner_6.jpg"
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
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -300) {
                  setActiveBanner((prev) => (prev + 1) % bannerImages.length);
                } else if (info.offset.x > 50 || info.velocity.x > 300) {
                  setActiveBanner((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
                }
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#071728] touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <img
                src={bannerImages[activeBanner]}
                alt={`KVI Hero Slide ${activeBanner + 1}`}
                className={`w-full h-full select-none pointer-events-none ${
                  activeBanner >= 4 ? "object-contain bg-[#071728]" : "object-fill object-center"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button
            onClick={() => setActiveBanner((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-[#00A5EC] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => setActiveBanner((prev) => (prev + 1) % bannerImages.length)}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-[#00A5EC] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

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

      {/* ── 1.5 ABOUT KNOWLEDGE VENTURE SECTION (Full-Width + Typing & Left-to-Right Entrance Animations) ── */}
      <section className="py-20 bg-[#071728] border-b border-gray-800 text-white overflow-hidden relative">
        {/* Subtle radial background glows */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#00A5EC]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F5BE18]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
          
          {/* Animated Squiggly Header with Left-to-Right Entrance Motion */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur –{" "}
              <SquigglyText stepDuration={70} scale={[4, 6]} className="text-[#E2AD07]">
                Knowledge Venture Institute
              </SquigglyText>
            </h1>

            {/* Interactive Typing Effect Sub-badge */}
            <div className="mt-4 flex justify-center items-center">
              <p className="text-[#0D2847] dark:text-amber-400 font-extrabold text-xs md:text-sm tracking-widest uppercase mt-2">
                <TypingText text="#1 TUITION CENTER FOR CLASS 6-10TH FOUNDATIONS, 11-12TH SCIENCE, COMMERCE, ARTS & CA/CS CLASSES IN JAITPUR BADARPUR DELHI 110044" />
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Side: Unboxed Text block with Typing Effect on Last Lines */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 text-left flex flex-col justify-center"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-700 dark:text-gray-200 leading-relaxed">
                At <span className="text-[#E2AD07] dark:text-[#F5BE18] font-black">Knowledge Venture Institute (KVI)</span>, Hari Nagar, Jaitpur Badarpur, we deliver top board examination results with 100% conceptual clarity. As the leading coaching institute in South East Delhi for Class 6th-10th Foundations (Science & Maths), Class 11th-12th Science (Physics, Chemistry, Maths), Class 11th-12th Commerce (Accounts, Economics, Business Studies), Humanities (Arts), and CA/CS Classes,{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  <TypingText text="our senior faculty equips every student to excel." />
                </span>
              </p>
            </motion.div>

            {/* Right Side: Larger Animated Floating Logo with Scale & Glow */}
            <motion.div 
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center items-center mt-4 lg:mt-0"
            >
              <motion.div
                animate={{ y: [0, -18, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="w-full flex justify-center relative cursor-pointer"
              >
                <img 
                  src="/newlogo.png" 
                  alt="Knowledge Venture Institute Logo" 
                  className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] h-auto object-contain select-none transition duration-500 hover:scale-105"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>





      {/* ── STREAM GOAL SELECTION SECTION (Custom Illustration Stream Cards) ── */}
      <section className="py-16 bg-[#071728] border-b border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Select your <span className="text-[#00A5EC]">goal</span> to explore our courses
          </h2>
          <p className="text-amber-400 text-xs md:text-sm font-extrabold uppercase tracking-widest mt-3">
            CHOOSE A CUSTOMIZED STREAM FOR BOARD & PROFESSIONAL PREP SUCCESS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 max-w-7xl mx-auto">
            
            {/* Card 1: 6-10th Foundations */}
            <Link
              href="/enrollment?stream=foundations"
              className="group bg-[#0d2036] border-2 border-gray-800 rounded-3xl p-5 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#00A5EC] hover:ring-4 hover:ring-[#00A5EC]/20 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer text-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 group-hover:scale-102 transition duration-300 shadow-md">
                  <img 
                    src="/stream_foundations.jpg" 
                    alt="6-10th Foundations" 
                    className="w-full h-full object-cover object-center select-none"
                  />
                </div>
                <h3 className="font-black text-base md:text-lg text-white group-hover:text-[#00A5EC] transition uppercase tracking-wide">
                  6-10TH FOUNDATIONS
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                  Mathematics, Science & School Board Conceptual Base
                </p>
              </div>
              <span className="mt-5 w-full py-2.5 rounded-xl bg-[#00A5EC] text-white font-extrabold text-xs uppercase tracking-wider group-hover:bg-[#00A5EC]/90 transition shadow-md flex items-center justify-center gap-1.5">
                <span>Explore Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 2: 11-12th Science Stream */}
            <Link
              href="/enrollment?stream=science"
              className="group bg-[#0d2036] border-2 border-gray-800 rounded-3xl p-5 overflow-hidden shadow-xl hover:shadow-2xl hover:border-emerald-400 hover:ring-4 hover:ring-emerald-400/20 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer text-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 group-hover:scale-102 transition duration-300 shadow-md">
                  <img 
                    src="/stream_science.jpg" 
                    alt="11-12th Science Stream" 
                    className="w-full h-full object-cover object-center select-none"
                  />
                </div>
                <h3 className="font-black text-base md:text-lg text-white group-hover:text-emerald-400 transition uppercase tracking-wide">
                  11-12TH SCIENCE
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                  Physics, Chemistry & Maths Board Prep
                </p>
              </div>
              <span className="mt-5 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider group-hover:bg-emerald-500 transition shadow-md flex items-center justify-center gap-1.5">
                <span>Explore Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 3: Commerce Stream */}
            <Link
              href="/enrollment?stream=commerce"
              className="group bg-[#0d2036] border-2 border-gray-800 rounded-3xl p-5 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#F5BE18] hover:ring-4 hover:ring-[#F5BE18]/20 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer text-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 group-hover:scale-102 transition duration-300 shadow-md">
                  <img 
                    src="/stream_commerce.jpg" 
                    alt="Commerce Stream" 
                    className="w-full h-full object-cover object-center select-none"
                  />
                </div>
                <h3 className="font-black text-base md:text-lg text-white group-hover:text-[#F5BE18] transition uppercase tracking-wide">
                  COMMERCE STREAM
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                  Accountancy, Economics & Business Studies
                </p>
              </div>
              <span className="mt-5 w-full py-2.5 rounded-xl bg-[#F5BE18] text-[#0D2847] font-black text-xs uppercase tracking-wider group-hover:bg-amber-300 transition shadow-md flex items-center justify-center gap-1.5">
                <span>Explore Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 4: Humanities / Arts */}
            <Link
              href="/enrollment?stream=arts"
              className="group bg-[#0d2036] border-2 border-gray-800 rounded-3xl p-5 overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-400 hover:ring-4 hover:ring-purple-400/20 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer text-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 group-hover:scale-102 transition duration-300 shadow-md">
                  <img 
                    src="/stream_arts.jpg" 
                    alt="Humanities / Arts" 
                    className="w-full h-full object-cover object-center select-none"
                  />
                </div>
                <h3 className="font-black text-base md:text-lg text-white group-hover:text-purple-400 transition uppercase tracking-wide">
                  HUMANITIES / ARTS
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                  History, Political Science & Geography
                </p>
              </div>
              <span className="mt-5 w-full py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider group-hover:bg-purple-500 transition shadow-md flex items-center justify-center gap-1.5">
                <span>Explore Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 5: CA & CS Professional Classes */}
            <Link
              href="/enrollment?stream=cacs"
              className="group bg-[#0d2036] border-2 border-gray-800 rounded-3xl p-5 overflow-hidden shadow-xl hover:shadow-2xl hover:border-sky-400 hover:ring-4 hover:ring-sky-400/20 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer text-center"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-800 group-hover:scale-102 transition duration-300 shadow-md">
                  <img 
                    src="/stream_cacs.jpg" 
                    alt="CA & CS Classes" 
                    className="w-full h-full object-cover object-center select-none"
                  />
                </div>
                <h3 className="font-black text-base md:text-lg text-white group-hover:text-sky-400 transition uppercase tracking-wide">
                  CA & CS CLASSES
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                  CA Foundation & CS Executive Professional Guidance
                </p>
              </div>
              <span className="mt-5 w-full py-2.5 rounded-xl bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider group-hover:bg-sky-500 transition shadow-md flex items-center justify-center gap-1.5">
                <span>Explore Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── LIVE FACULTY BROADCAST ANNOUNCEMENTS ── */}
      <LiveNotificationSection />

      {/* ── 4.5 YOUR JOURNEY AT KNOWLEDGE VENTURE INSTITUTE (5-STEP SCROLL ANIMATION) ── */}
      <ScrollJourney steps={journeySteps} />

      {/* ── 5. RESULTS OF CONSISTENT EXCELLENCE (BOARD TOPPERS SHOWCASE) ── */}
      <section id="results" className="py-16 w-full text-center overflow-hidden bg-gray-50/50 dark:bg-slate-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#0D2847] dark:text-white">A Record of Consistent Excellence</h2>
          <p className="text-gray-500 text-sm mt-2">Our students consistently secure top scores in Board Examinations</p>
        </div>

        {/* Row 1: Left to Right Marquee */}
        <div className="relative w-full overflow-hidden py-4 mt-10">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-[#071728] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-[#071728] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-right flex gap-6">
            {[...toppersRow1, ...toppersRow1].map((topper, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-xl p-3.5 flex items-center gap-4 shadow-sm min-w-[260px] md:min-w-[300px] transition duration-300 hover:scale-102 hover:shadow-md select-none">
                {/* Photo with clean thin border */}
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-gray-100 dark:border-sky-500/20 shadow-sm flex-shrink-0">
                  <img src={topper.image} alt={topper.name} className="h-full w-full object-cover" />
                </div>
                {/* Student Details */}
                <div className="text-left flex-1 min-w-0 flex flex-col justify-between h-16">
                  <div>
                    <span className="inline-block font-black text-[9px] uppercase tracking-wider text-[#00A5EC] dark:text-sky-400">
                      {topper.subject}
                    </span>
                    <h4 className="font-extrabold text-[#0D2847] dark:text-white text-xs truncate mt-0.5">{topper.name}</h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-1">
                    <span className="text-gray-600 dark:text-gray-300 font-bold">({topper.school})</span>
                    <span className="font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded-md text-[10px]">
                      {topper.score} Marks
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="relative w-full overflow-hidden py-4 mt-6">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-[#071728] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-[#071728] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-left flex gap-6">
            {[...toppersRow2, ...toppersRow2].map((topper, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-xl p-3.5 flex items-center gap-4 shadow-sm min-w-[260px] md:min-w-[300px] transition duration-300 hover:scale-102 hover:shadow-md select-none">
                {/* Photo with clean thin border */}
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-gray-100 dark:border-sky-500/20 shadow-sm flex-shrink-0">
                  <img src={topper.image} alt={topper.name} className="h-full w-full object-cover" />
                </div>
                {/* Student Details */}
                <div className="text-left flex-1 min-w-0 flex flex-col justify-between h-16">
                  <div>
                    <span className="inline-block font-black text-[9px] uppercase tracking-wider text-[#00A5EC] dark:text-sky-400">
                      {topper.subject}
                    </span>
                    <h4 className="font-extrabold text-[#0D2847] dark:text-white text-xs truncate mt-0.5">{topper.name}</h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-1">
                    <span className="text-gray-600 dark:text-gray-300 font-bold">({topper.school})</span>
                    <span className="font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded-md text-[10px]">
                      {topper.score} Marks
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FACULTY & TEACHERS SECTION (Premium Slider Card Layout) ── */}
      <section id="faculty" className="bg-white border-b border-gray-100 dark:bg-[#071728] dark:border-gray-800 py-16 w-full transition-colors duration-200">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 text-center relative">
          
          <h2 className="text-2xl md:text-4xl font-black text-[#0D2847] dark:text-white leading-tight">Our Experienced Faculty</h2>
          <p className="text-gray-400 text-xs tracking-wide uppercase font-bold mt-2">
            Classes are taught by highly qualified board specialists and senior professionals
          </p>

          {/* Main Slider Card Frame - Expanded to ~75% Desktop Screen Width */}
          <div className="relative mt-12 bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-[32px] p-6 md:p-12 shadow-2xl w-full lg:w-[85%] xl:w-[75%] max-w-6xl mx-auto text-left">
            
            {/* Left Hover Button */}
            <button
              onClick={() => setActiveFaculty((prev) => (prev === 0 ? facultyList.length - 1 : prev - 1))}
              className="absolute top-1/2 -translate-y-1/2 -left-6 z-20 h-13 w-13 rounded-full bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white flex items-center justify-center transition shadow-xl cursor-pointer focus:outline-none hidden md:flex"
              aria-label="Previous faculty"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Hover Button */}
            <button
              onClick={() => setActiveFaculty((prev) => (prev === facultyList.length - 1 ? 0 : prev + 1))}
              className="absolute top-1/2 -translate-y-1/2 -right-6 z-20 h-13 w-13 rounded-full bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white flex items-center justify-center transition shadow-xl cursor-pointer focus:outline-none hidden md:flex"
              aria-label="Next faculty"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                  {/* Photo Section */}
                  <div className="lg:col-span-5 flex justify-center w-full">
                    <div className="relative w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden border-2 border-sky-100 dark:border-gray-800 shadow-xl">
                      <img 
                        src={facultyList[activeFaculty].photo} 
                        alt={facultyList[activeFaculty].name} 
                        className="w-full h-full object-cover object-center select-none"
                      />
                    </div>
                  </div>

                  {/* Copy Details Section */}
                  <div className="lg:col-span-7 flex flex-col justify-start">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                      Exp: {facultyList[activeFaculty].exp}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0D2847] dark:text-white mt-1 leading-tight">
                      {facultyList[activeFaculty].name}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider block mt-0.5">
                      {facultyList[activeFaculty].designation}
                    </span>

                    <p className="text-sm italic text-gray-700 dark:text-gray-200 mt-3 border-l-2 border-emerald-500 pl-3 leading-relaxed">
                      "{facultyList[activeFaculty].quote}"
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4">
                      <span className="text-[9px] text-gray-700 dark:text-gray-300 font-black uppercase tracking-wider block">Key Highlights</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                        {facultyList[activeFaculty].highlights.map((h, hidx) => (
                          <div key={hidx} className="flex items-center gap-2 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-900/30 p-2 rounded-lg text-[10px] font-bold text-gray-700 dark:text-gray-200">
                            <span className="text-emerald-500 dark:text-emerald-400 text-xs">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-4">
                      <span className="text-[9px] text-gray-700 dark:text-gray-300 font-black uppercase tracking-wider block">Specialties</span>
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

      {/* ── 7. DEMO LECTURES & OFFICIAL YOUTUBE CHANNELS ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#0D2847] dark:text-white">Watch Official YouTube Channel Lectures</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Explore conceptual lectures & professional board prep guidance on our official channels</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
          
          {/* Card 1: CS Sanjay Arya Official Channel */}
          <a 
            href="https://youtube.com/@sanjayaryacs?si=nlsrgYXQRBZHGq3X"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-2xl hover:border-[#F5BE18] transition-all duration-300"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
              <img 
                src="https://img.youtube.com/vi/CtMkfZMHUuM/hqdefault.jpg"
                alt="CS Sanjay Arya YouTube Channel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 fill-current ml-0.5 text-white" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-[#FF0000] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                YouTube Channel
              </span>
            </div>
            <div className="p-6 text-left flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#F5BE18] uppercase tracking-wider block">@sanjayaryacs</span>
                <h4 className="font-black text-[#0D2847] dark:text-white text-base md:text-lg mt-1 leading-snug">
                  CS Sanjay Arya – Economics & Business Studies
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mt-2 leading-relaxed">
                  Subscribe for Class 11th & 12th Economics, Business Studies, and Board Exam conceptual lectures by CS Sanjay Arya.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-bold text-[#00A5EC]">
                <span>Visit YouTube Channel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Card 2: Company Law Classes */}
          <a 
            href="https://youtube.com/@companylawclasses?si=os5mXQz9_mRflMvg"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0d2036] border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-2xl hover:border-sky-400 transition-all duration-300"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
              <img 
                src="https://img.youtube.com/vi/A1C-Q2sydxM/hqdefault.jpg"
                alt="Company Law Classes YouTube Channel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 fill-current ml-0.5 text-white" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-[#FF0000] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                YouTube Channel
              </span>
            </div>
            <div className="p-6 text-left flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-sky-400 uppercase tracking-wider block">@companylawclasses</span>
                <h4 className="font-black text-[#0D2847] dark:text-white text-base md:text-lg mt-1 leading-snug">
                  Company Law Classes – CA & CS Professional Prep
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mt-2 leading-relaxed">
                  In-depth Corporate Laws, CA Foundation & CS Executive professional prep masterclasses.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-bold text-sky-400">
                <span>Visit YouTube Channel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

        </div>
      </section>

      {/* ── 8. ADMISSION ENROLLMENT BANNER ── */}
      <section className="bg-gradient-to-r from-[#F5BE18] via-[#E2AD07] to-[#E2AD07] py-12 text-[#0D2847] transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#0D2847]">Admissions Open - Limited Seats per Batch!</h2>
            <p className="text-xs text-[#0D2847]/85 mt-1 leading-relaxed max-w-xl font-bold">
              Join Knowledge Venture Institute today and experience conceptual clarity with professional guidance in Hari Nagar, Jaitpur & Badarpur.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/scholarship" className="px-5 py-2.5 bg-[#0D2847] hover:bg-[#071728] text-white font-black text-xs rounded-lg transition shadow-md">
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. LOCAL SEO RICH CONTENT & LOCAL FAQS SECTION ── */}
      <section className="py-16 bg-[#071728] text-white border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#00A5EC] font-black text-xs uppercase tracking-widest block mb-2">
              Top Rated Local Coaching Institute
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Why Knowledge Venture Institute (KVI) is #1 in Hari Nagar, Jaitpur & Badarpur
            </h2>
            <p className="text-gray-300 text-xs md:text-sm font-medium mt-3 leading-relaxed">
              Empowering students of South East Delhi (PIN 110044) with structured concept building, senior faculty mentorship, and consistent 95%+ board exam scores.
            </p>
          </div>

          {/* 4 Feature Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#0d2036] border border-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-[#00A5EC]/20 text-[#00A5EC] flex items-center justify-center font-black text-lg mb-4">
                01
              </div>
              <h3 className="font-black text-base text-white mb-2">Board Exam Specialists</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Comprehensive CBSE & State Board syllabus coverage for Class 9, 10, 11 & 12 with past 10-year sample paper practice.
              </p>
            </div>

            <div className="bg-[#0d2036] border border-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-[#F5BE18]/20 text-[#F5BE18] flex items-center justify-center font-black text-lg mb-4">
                02
              </div>
              <h3 className="font-black text-base text-white mb-2">Qualified Senior Faculty</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Classes conducted by CS Sanjay Arya (Qualified Company Secretary), Er. Aditya Pratap Singh, Vimal Sharma (15+ Yrs Exp) & Er. Saurabh Singh (B.Tech).
              </p>
            </div>

            <div className="bg-[#0d2036] border border-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-lg mb-4">
                03
              </div>
              <h3 className="font-black text-base text-white mb-2">Individual Care & Small Batches</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Personalized attention with small batch sizes, regular performance tracking, and weekly doubt clearance sessions.
              </p>
            </div>

            <div className="bg-[#0d2036] border border-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg mb-4">
                04
              </div>
              <h3 className="font-black text-base text-white mb-2">Prime Accessible Location</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Located above Dabra Medical Center, Hari Nagar, easily accessible for students from Jaitpur Extension, Badarpur, Ekta Vihar & Mithapur.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🎨 CLEAN ACCORDION FAQ SECTION MATCHING DESIGN SPECIFICATION 🎨 */}
      <FAQSection />

    </div>
  );
}