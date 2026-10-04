"use client";

import { useEffect, useState, useRef } from "react";
import { Phone, User, MapPin, ChevronDown, LogOut, ShieldCheck, GraduationCap, Bell, Home, BookOpen, Award, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useNotifications } from "./NotificationContext";

export default function BakeatsNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [userSession, setUserSession] = useState<{ loggedIn: boolean; user: any } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const { hasUnread: rawHasUnread, unreadCount: rawUnreadCount, markAllAsSeen } = useNotifications();

  useEffect(() => {
    setMounted(true);
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.loggedIn) {
          setUserSession(data);
        } else {
          setUserSession({ loggedIn: false, user: null });
        }
      })
      .catch(() => setUserSession({ loggedIn: false, user: null }));
  }, []);

  const hasUnread = mounted ? rawHasUnread : false;
  const unreadCount = mounted ? rawUnreadCount : 0;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const insideDesktop = desktopDropdownRef.current?.contains(target);
      const insideMobile = mobileDropdownRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDropdownOpen(false);
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.warn("Logout error:", err);
    }
    document.cookie = "kvi_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  const getRolePanelDetails = () => {
    const role = userSession?.user?.role;
    if (role === "admin") {
      return { label: "Admin Panel", link: "/dashboard/admin", icon: ShieldCheck };
    }
    return { label: "Student Panel", link: "/dashboard/student", icon: GraduationCap };
  };

  const panelDetails = getRolePanelDetails();

  // Get initial for avatar badge
  const displayName = userSession?.user?.name || "Admin Host";
  const initial = displayName.charAt(0).toUpperCase() || "A";

  const isUserLoggedIn = mounted && Boolean(userSession?.loggedIn);
  const profileLink = isUserLoggedIn ? panelDetails.link : "/login";

  const navItems = [
    { name: "Home", link: "/", icon: Home },
    { name: "Courses", link: "/enrollment", icon: BookOpen },
    { name: "Notifications", link: "/notifications", icon: Bell, isNotification: true },
    { name: "Journey", link: "/journey", icon: GraduationCap },
    { name: "Profile", link: profileLink, icon: User },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[60] bg-[#F5BE18] dark:bg-[#E2AD07] border-b border-amber-400 dark:border-amber-600 shadow-sm transition-colors duration-200">
      
      {/* Desktop Top Announcement Banner */}
      {showBanner && (
        <div className="hidden md:flex bg-[#1865F2] text-white text-xs sm:text-sm py-2 px-3 sm:px-4 items-center justify-between border-b border-blue-400/30 shadow-inner relative z-10">
          <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
            <span className="bg-amber-400 text-[#0D2847] font-black px-2 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider shrink-0 shadow-sm">
              ANNOUNCEMENT
            </span>
            <span className="font-extrabold tracking-wide">
              CSEET Feb 2027 — Classes will start from October
            </span>
            <span className="hidden sm:inline text-white/50">•</span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="text-blue-100">Contact:</span>
              <a href="tel:7011731649" className="underline hover:text-amber-300 font-black">7011731649</a>
              <span>,</span>
              <a href="tel:8285575250" className="underline hover:text-amber-300 font-black">8285575250</a>
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white shrink-0 ml-2 cursor-pointer"
            aria-label="Close announcement banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* KV Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/newlogo.png"
            alt="Knowledge Venture Institute Logo"
            className="h-10 sm:h-12 w-auto object-contain select-none shrink-0"
          />
          <div className="ml-2.5 flex flex-col justify-center leading-none">
            <span className="text-[#0D2847] dark:text-[#0D2847] font-black text-sm md:text-base tracking-wide">KNOWLEDGE VENTURE</span>
            <span className="text-[#0D2847] dark:text-[#0D2847] text-[9px] md:text-[10px] tracking-[4px] font-black mt-0.5">INSTITUTE</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-black uppercase tracking-wider">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === "Profile" 
              ? (pathname.startsWith("/dashboard") || pathname === "/login") 
              : pathname === item.link;

            if (item.isNotification) {
              return (
                <Link
                  key={item.name}
                  href="/notifications"
                  onClick={markAllAsSeen}
                  className={`hover:text-white transition-colors relative flex items-center gap-1.5 font-extrabold cursor-pointer ${
                    isActive ? "text-white font-black" : "text-[#0D2847]"
                  } ${hasUnread ? "text-red-600 font-black animate-pulse" : ""}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${hasUnread ? "text-red-600 fill-red-600" : isActive ? "text-white" : "text-[#0D2847]"}`} />
                  <span>{item.name}</span>
                  {hasUnread ? (
                    <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider -translate-y-1 shadow-sm">
                      {unreadCount}
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-emerald-600/80 inline-block -translate-y-0.5"></span>
                  )}
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.link}
                className={`hover:text-white transition-colors relative flex items-center gap-1.5 font-extrabold ${
                  isActive ? "text-white font-black" : "text-[#0D2847]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#0D2847]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Handles & Profile Dropdown */}
        <div className="hidden lg:flex items-center gap-3.5 relative">
          <ThemeToggle />

          {/* User Profile Dropdown Component matching screenshot format */}
          {isUserLoggedIn ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-black/5 transition cursor-pointer select-none"
                aria-label="User Menu"
              >
                {/* Blue Circular Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center font-black text-sm shadow-sm ring-2 ring-blue-500/20">
                  {initial}
                </div>
                {/* Name */}
                <span className="font-bold text-sm text-[#0D2847] tracking-tight">
                  {displayName}
                </span>
                {/* Chevron */}
                <ChevronDown className={`w-4 h-4 text-[#0D2847] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Floating Dropdown Card */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#0D2847] text-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.3)] border border-white/20 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href={panelDetails.link}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span>{panelDetails.label}</span>
                  </Link>

                  <a
                    href="/api/logout"
                    onClick={(e) => handleLogout(e)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Log Out</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D2847] text-white hover:bg-[#071728] text-xs font-bold transition shadow-sm"
            >
              <User className="h-3.5 w-3.5 text-[#F5BE18]" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Actions Header with Profile Dropdown */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle />

          {/* Mobile User Profile Circle / Dropdown */}
          {isUserLoggedIn ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#1865F2] text-white flex items-center justify-center font-black text-sm shadow-sm ring-2 ring-blue-500/20 cursor-pointer"
                aria-label="User Menu"
              >
                {initial}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#0D2847] text-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.3)] border border-white/20 p-2 z-50">
                  <div className="px-3.5 py-2 border-b border-white/10 mb-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Logged in as</p>
                    <p className="text-sm font-bold text-white truncate">{displayName}</p>
                  </div>

                  <Link
                    href={panelDetails.link}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span>{panelDetails.label}</span>
                  </Link>

                  <a
                    href="/api/logout"
                    onClick={(e) => handleLogout(e)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Log Out</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="h-9 w-9 bg-white hover:bg-gray-50 text-[#0D2847] rounded-full flex items-center justify-center border border-amber-200/50 shadow-sm"
              aria-label="Log in to student portal"
            >
              <User className="h-4 w-4" />
            </Link>
          )}
        </div>

      </div>

      {/* Mobile Announcement Banner (Ultra-thin Micro Strip) */}
      {showBanner && (
        <div className="md:hidden bg-[#1865F2] text-white py-[2px] px-2 flex items-center justify-between border-t border-blue-400/30 text-[9px] leading-none font-extrabold shadow-inner">
          <div className="flex-1 flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis pr-1">
            <span className="bg-amber-400 text-[#0D2847] font-black px-1 py-[1px] rounded text-[8px] uppercase tracking-wider shrink-0">
              CSEET
            </span>
            <span>Feb 27 — Starts Oct •</span>
            <span className="inline-flex items-center gap-1 font-bold">
              <span className="text-blue-100">Call:</span>
              <a href="tel:7011731649" className="underline font-black text-amber-300">7011731649</a>
              <span>,</span>
              <a href="tel:8285575250" className="underline font-black text-amber-300">8285575250</a>
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-0.5 hover:bg-white/20 rounded-full transition-colors text-white/90 shrink-0 cursor-pointer"
            aria-label="Close announcement banner"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

    </header>
  );
}