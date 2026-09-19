"use client";

import { useState, useEffect } from "react";
import { Home, BookOpen, Bell, GraduationCap, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotifications } from "./NotificationContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { hasUnread: rawHasUnread, unreadCount: rawUnreadCount, markAllAsSeen } = useNotifications();

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasUnread = mounted ? rawHasUnread : false;
  const unreadCount = mounted ? rawUnreadCount : 0;

  const navTabs = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Courses", icon: BookOpen, link: "/enrollment" },
    { name: "Notifications", icon: Bell, link: "/notifications", isNotification: true },
    { name: "Journey", icon: GraduationCap, link: "/journey" },
    { name: "Profile", icon: User, link: "/dashboard/student" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0d2036] border-t border-gray-100 dark:border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-2 sm:px-4 flex justify-between items-center transition-colors duration-200">
      {navTabs.map((tab) => {
        const Icon = tab.icon;

        if (tab.isNotification) {
          const isActive = pathname === "/notifications";

          return (
            <Link
              key={tab.name}
              href="/notifications"
              onClick={markAllAsSeen}
              className="flex-1 flex flex-col items-center justify-center relative py-1 text-gray-400 hover:text-[#E2AD07] transition duration-200 cursor-pointer"
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    hasUnread
                      ? "text-red-600 fill-red-600 animate-bounce"
                      : isActive
                      ? "text-[#E2AD07]"
                      : "text-gray-400 dark:text-gray-400 hover:text-gray-600"
                  }`}
                />

                {hasUnread && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-bold mt-1 tracking-wide ${
                  hasUnread
                    ? "text-red-600 font-extrabold"
                    : isActive
                    ? "text-[#E2AD07]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        }

        const isActive = pathname === tab.link;

        return (
          <Link
            key={tab.name}
            href={tab.link || "#"}
            className="flex-1 flex flex-col items-center justify-center relative py-1 text-gray-400 hover:text-[#E2AD07] transition duration-200"
          >
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive ? "text-[#E2AD07]" : "text-gray-400 dark:text-gray-400 hover:text-gray-600"}`} />
            </div>
            <span className={`text-[9px] font-bold mt-1 tracking-wide ${isActive ? "text-[#E2AD07] font-extrabold" : "text-gray-500 dark:text-gray-400"}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
