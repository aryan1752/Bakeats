"use client";

import { Phone, User, MapPin } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Centers", link: "/contact" },
  { name: "Courses", link: "#results" },
  { name: "Results", link: "#results", badge: "New" },
  { name: "Profile", link: "/login" },
];

export default function BakeatsNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] bg-[#F5BE18] dark:bg-[#E2AD07] border-b border-amber-400 dark:border-amber-600 shadow-sm transition-colors duration-200">
      
      {/* Top Mini Info Bar (Desktop only) */}
      <div className="bg-[#0D2847] dark:bg-[#071728] text-[11px] text-gray-200 py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-[#F5BE18]" />
            <a href="tel:7011731649" className="hover:text-white">7011731649</a>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-[#F5BE18]" />
            <a href="tel:8585575250" className="hover:text-white">8585575250</a>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#F5BE18]" />
          <span>I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* KV Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="h-11 aspect-[3/2] border border-[#F5BE18] rounded-lg p-1 bg-[#0D2847] shrink-0 shadow-sm flex items-center justify-center">
            <img
              src="/kvi_logo.png"
              alt="Knowledge Venture Institute Logo"
              className="h-full w-full object-contain select-none"
            />
          </div>
          <div className="ml-2.5 flex flex-col justify-center leading-none">
            <span className="text-[#0D2847] dark:text-[#0D2847] font-black text-sm md:text-base tracking-wide">KNOWLEDGE VENTURE</span>
            <span className="text-[#0D2847]/70 dark:text-[#0D2847]/70 text-[9px] md:text-[10px] tracking-[4px] font-bold mt-0.5">INSTITUTE</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-[#0D2847] uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="hover:text-white transition-colors relative flex items-center gap-1 font-extrabold"
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="bg-green-650 text-white bg-green-600 text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider -translate-y-1.5">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Handles */}
        <div className="hidden lg:flex items-center gap-3 relative">
          <ThemeToggle />

          <a
            href="tel:7011731649"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-gray-50 text-[#0D2847] text-xs font-bold transition cursor-pointer shadow-sm"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call Helpline</span>
          </a>
        </div>

        {/* Mobile Actions Header (Aakash Inspired Circular Buttons, No Hamburger) */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle />

          {/* Call Circle */}
          <a
            href="tel:7011731649"
            className="h-9 w-9 bg-white hover:bg-gray-50 text-[#0D2847] rounded-full flex items-center justify-center border border-amber-200/50 shadow-sm"
            aria-label="Call admissions helpline"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* Location Circle */}
          <Link
            href="/contact"
            className="h-9 w-9 bg-white hover:bg-gray-50 text-[#0D2847] rounded-full flex items-center justify-center border border-amber-200/50 shadow-sm"
            aria-label="Locate centers"
          >
            <MapPin className="h-4 w-4" />
          </Link>

          {/* User Profile Login Circle */}
          <Link
            href="/login"
            className="h-9 w-9 bg-white hover:bg-gray-50 text-[#0D2847] rounded-full flex items-center justify-center border border-amber-200/50 shadow-sm"
            aria-label="Log in to student portal"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>

      </div>

    </header>
  );
}