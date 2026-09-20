"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Where is Knowledge Venture Institute (KVI) located in Hari Nagar?",
    answer: (
      <span>
        Our main head office is located at <strong>I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044</strong>. It is conveniently accessible from Hari Nagar Part 1 & 2, Jaitpur Extension, Badarpur Border, Ekta Vihar, and Mithapur.
      </span>
    )
  },
  {
    id: 2,
    question: "Which classes and subjects are taught at KVI Coaching Institute?",
    answer: (
      <span>
        We offer specialized coaching for:
        <br />• <strong>Class 6th–10th Foundations:</strong> Science, Mathematics & English Board Prep.
        <br />• <strong>Class 11th–12th Commerce:</strong> Accountancy, Economics & Business Studies by CS Sanjay Arya.
        <br />• <strong>Class 11th–12th Science & Maths:</strong> Physics, Chemistry & Mathematics by Er. Aditya Pratap Singh & Er. Saurabh Singh.
        <br />• <strong>Class 11th–12th Humanities (Arts):</strong> History, Political Science & Geography by Vimal Sharma (15+ Yrs Exp).
      </span>
    )
  },
  {
    id: 3,
    question: "How can I register for a Demo Class or Scholarship Test?",
    answer: (
      <span>
        You can register online through our website by clicking the <strong>"Register Now"</strong> button or applying via the <strong>KV Talent Search Scholarship</strong> page. You can also visit our office or call <strong>7011731649 / 8285575250</strong>.
      </span>
    )
  },
  {
    id: 4,
    question: "What are the office hours for admissions and student counseling?",
    answer: (
      <span>
        Our admissions helpline and counseling office are open all 7 days a week from <strong>08:00 AM to 08:00 PM (Monday through Sunday)</strong>.
      </span>
    )
  },
  {
    id: 5,
    question: "Why is KVI considered the best coaching center near Badarpur and Jaitpur Extension?",
    answer: (
      <span>
        KVI stands out due to its highly credentialed faculty (Qualified Company Secretaries & Engineers), strict batch limits for individual student focus, 100% board result track record with students scoring 95%+ marks, and affordable fee structures with scholarship options.
      </span>
    )
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white dark:bg-[#071728] border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        
        {/* Sub-label */}
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 block mb-2">
          FAQ
        </span>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0D2847] dark:text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>

        {/* Sub-description */}
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto font-medium leading-relaxed">
          Simple answers to common questions about batch timings, coaching fees, scholarships, and admissions.
        </p>

        {/* Accordion Container */}
        <div className="mt-12 text-left border-t border-gray-200 dark:border-gray-800/80">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className="border-b border-gray-200 dark:border-gray-800/80 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-[#0D2847] dark:text-gray-100 group-hover:text-[#00A5EC] dark:group-hover:text-[#00A5EC] transition-colors leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#00A5EC]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
