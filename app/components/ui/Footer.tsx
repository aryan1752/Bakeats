"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Direct Admission Form 1", href: "/enrollment" },
  { name: "Scholarship Test Form 2", href: "/scholarship" },
  { name: "Centers", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#0d2036] text-gray-800 dark:text-gray-100 border-t-2 border-[#F5BE18] mt-auto transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <img
                src="/newlogo.png"
                alt="Knowledge Venture Institute Logo"
                className="h-10 sm:h-11 w-auto object-contain select-none shrink-0"
              />
              <div className="ml-3 flex flex-col justify-center leading-none">
                <span className="text-[#E2AD07] dark:text-[#F5BE18] font-black text-sm tracking-wider">KNOWLEDGE VENTURE</span>
                <span className="text-gray-700 dark:text-white text-[9px] tracking-[4px] font-bold mt-0.5">INSTITUTE</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-xs leading-relaxed max-w-sm mt-2 font-medium">
              Building a strong academic foundation. We focus on conceptual clarity, small batches for personalized attention, and regular test-based evaluations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#E2AD07] dark:text-[#F5BE18] uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-[#E2AD07] dark:text-gray-200 dark:hover:text-[#F5BE18] text-xs transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3 text-xs text-gray-700 dark:text-gray-200 font-medium">
            <h4 className="text-sm font-bold text-[#E2AD07] dark:text-[#F5BE18] uppercase tracking-wider">Contact Us</h4>
            <span className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-[#E2AD07] dark:text-[#F5BE18] shrink-0 mt-0.5" />
              <span>I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044</span>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#E2AD07] dark:text-[#F5BE18] shrink-0" />
              <a href="tel:7011731649" className="hover:text-[#E2AD07] dark:hover:text-[#F5BE18]">7011731649</a>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#E2AD07] dark:text-[#F5BE18] shrink-0" />
              <a href="tel:8285575250" className="hover:text-[#E2AD07] dark:hover:text-[#F5BE18]">8285575250</a>
            </span>
          </div>

        </div>

        {/* Local SEO Keywords Bar */}
        <div className="text-[10px] text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800/60 pt-4 mt-2">
          <p className="font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider text-[9px]">Top Rated Coaching in Hari Nagar, Jaitpur & Badarpur, New Delhi:</p>
          <p className="leading-relaxed">
            Class 6th-10th Foundations (Science & Maths Tuition) • Class 11th & 12th Commerce (Accountancy, Economics, Business Studies) • Class 11th & 12th Humanities / Arts (History, Political Science, Geography) • Senior CS & CA Faculty • Small Batches & Individual Care • Hari Nagar, Jaitpur Extension, Badarpur, New Delhi 110044.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-300 font-medium mt-4">
          <p>
            © {new Date().getFullYear()} Knowledge Venture Institute. All rights reserved.
          </p>
          <p className="italic text-[10px] font-bold">
            Where Concepts Become Clear
          </p>
        </div>
      </div>
    </footer>
  );
}