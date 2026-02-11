"use client";

import { useState, useEffect } from "react";
import { DraggableCardDemo } from "@/components/ui/DraggableCardDemo";
import { HeroSection } from "@/components/ui/HeroSection";
import JeeraProductSection from "@/components/ui/JeeraProductSection";
import AjwainProductSection from "@/components/ui/AjwainProductSection";
import AttaProductSection from "@/components/ui/AttaProductSection";
import NariyalProductSection from "@/components/ui/NariyalProductSection";
import BadamProductSection from "./components/ui/BadamProductSection";
import MaskaProductSection from "./components/ui/MaskaProductSection";
import ChocolateProductSection from "./components/ui/ChoclateProductSection";
import { cookieVariants } from "@/data/cookies";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (docHeight * 0.5), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? cookieVariants.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 700);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === cookieVariants.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 700);
  };

  return (
    <main className="relative overflow-x-hidden bg-white">
      <HeroSection
        currentCookie={cookieVariants[currentIndex]}
        currentIndex={currentIndex}
        totalCookies={cookieVariants.length}
        onPrev={handlePrev}
        onNext={handleNext}
        scrollProgress={scrollProgress}
        isTransitioning={isTransitioning}
      />

      <JeeraProductSection />
      <AjwainProductSection />
      <AttaProductSection />
      <NariyalProductSection />
      <BadamProductSection />
      <MaskaProductSection />
      <ChocolateProductSection />
      <section className="relative">
        <DraggableCardDemo />
      </section>
    </main>
  );
}
