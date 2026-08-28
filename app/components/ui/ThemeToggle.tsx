"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const isDashboard = pathname ? pathname.startsWith("/dashboard") : false;

  useEffect(() => {
    if (!isDashboard) {
      // Force light mode on all public pages
      document.documentElement.classList.remove("dark");
      return;
    }

    // Read saved preference inside dashboards
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDashboard, pathname]);

  const toggleTheme = () => {
    if (!isDashboard) return;
    
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Hide the theme toggle button entirely outside dashboard panels
  if (!isDashboard) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-white/20 text-white hover:border-[#F5BE18] hover:text-[#F5BE18] transition duration-200 focus:outline-none cursor-pointer"
      aria-label="Toggle dark mode theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-[#F5BE18]" />
      ) : (
        <Sun className="h-4 w-4 text-[#F5BE18]" />
      )}
    </button>
  );
}
