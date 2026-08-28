"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Centers", href: "/contact" },
  { name: "Courses", href: "#results" },
  { name: "Results", href: "#results" },
  { name: "Login Portal", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#0d2036] text-gray-800 dark:text-gray-100 border-t-2 border-[#F5BE18] mt-auto transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="h-10 aspect-[3/2] border border-[#F5BE18] rounded-lg p-1 bg-[#0D2847] shrink-0 shadow-sm flex items-center justify-center">
                <img
                  src="/kvi_logo.png"
                  alt="Knowledge Venture Institute Logo"
                  className="h-full w-full object-contain select-none"
                />
              </div>
              <div className="ml-3 flex flex-col justify-center leading-none">
                <span className="text-[#E2AD07] dark:text-[#F5BE18] font-black text-sm tracking-wider">KNOWLEDGE VENTURE</span>
                <span className="text-gray-400 dark:text-white text-[9px] tracking-[4px] font-bold mt-0.5">INSTITUTE</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed max-w-sm mt-2">
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
                  className="text-gray-500 hover:text-[#E2AD07] dark:text-gray-400 dark:hover:text-[#F5BE18] text-xs transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3 text-xs text-gray-600 dark:text-gray-400">
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
              <a href="tel:8585575250" className="hover:text-[#E2AD07] dark:hover:text-[#F5BE18]">8585575250</a>
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 dark:border-gray-800 my-6" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} Knowledge Venture Institute. All rights reserved.
          </p>
          <p className="italic text-[10px]">
            Where Concepts Become Clear
          </p>
        </div>
      </div>
    </footer>
  );
}