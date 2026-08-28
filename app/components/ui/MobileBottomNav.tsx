"use client";

import { Home, MapPin, BookOpen, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navTabs = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Centers", icon: MapPin, link: "/contact" },
    { name: "Courses", icon: BookOpen, link: "#results" },
    { name: "Results", icon: Star, link: "#results", badge: "New" },
    { name: "Profile", icon: User, link: "/login" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0d2036] border-t border-gray-100 dark:border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-2 px-4 flex justify-between items-center transition-colors duration-200">
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.link;

        return (
          <Link
            key={tab.name}
            href={tab.link}
            className="flex-1 flex flex-col items-center justify-center relative py-1 text-gray-400 hover:text-[#E2AD07] transition duration-200"
          >
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive ? "text-[#E2AD07]" : "text-gray-400 dark:text-gray-400 hover:text-gray-600"}`} />
              
              {/* "New" Badge overlay */}
              {tab.badge && (
                <span className="absolute -top-2.5 -right-3.5 bg-green-500 text-white text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-wider animate-bounce">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold mt-1 tracking-wide text-gray-500 dark:text-gray-400">
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
