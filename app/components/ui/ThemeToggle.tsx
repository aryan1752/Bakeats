"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch (e) {}
  }, []);

  return null;
}
