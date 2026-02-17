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

type LangCode = "en" | "hi" | "es" | "ar" | "fr-CA" | "de" | "nl-BE";

const LANG_OPTIONS: { value: LangCode; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
  { value: "fr-CA", label: "French (CA)" },
  { value: "de", label: "German" },
  { value: "nl-BE", label: "Dutch (BE)" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const [translatedCookies, setTranslatedCookies] = useState(cookieVariants);

  useEffect(() => {
    const saved = window.localStorage.getItem("site_lang") as LangCode | null;
    if (saved && LANG_OPTIONS.some((l) => l.value === saved)) {
      setLang(saved);
    }
  }, []);

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

  useEffect(() => {
    let cancelled = false;
    window.localStorage.setItem("site_lang", lang);

    const run = async () => {
      if (lang === "en") {
        setTranslatedCookies(cookieVariants);
        return;
      }

      try {
        const textMap = cookieVariants.reduce<Record<string, string>>((acc, c, i) => {
          acc[`name_${i}`] = c.name;
          acc[`subtitle_${i}`] = c.subtitle;
          acc[`description_${i}`] = c.description;
          return acc;
        }, {});

        const res = await fetch("/api/lingo-translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLang: lang, textMap }),
        });

        const data = (await res.json()) as { translated?: Record<string, string> };
        if (!cancelled && data.translated) {
          const next = cookieVariants.map((c, i) => ({
            ...c,
            name: data.translated?.[`name_${i}`] ?? c.name,
            subtitle: data.translated?.[`subtitle_${i}`] ?? c.subtitle,
            description: data.translated?.[`description_${i}`] ?? c.description,
          }));
          setTranslatedCookies(next);
        }
      } catch {
        if (!cancelled) setTranslatedCookies(cookieVariants);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [lang]);

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
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/90 p-2 text-xs shadow-sm md:right-8 md:top-6">
        <span className="font-semibold text-neutral-700">Language</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LangCode)}
          className="rounded border border-neutral-300 px-2 py-1 text-neutral-800"
        >
          {LANG_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <HeroSection
        currentCookie={translatedCookies[currentIndex]}
        currentIndex={currentIndex}
        totalCookies={translatedCookies.length}
        onPrev={handlePrev}
        onNext={handleNext}
        scrollProgress={scrollProgress}
        isTransitioning={isTransitioning}
      />

      <NariyalProductSection forcedLang={lang} />
      <ChocolateProductSection forcedLang={lang} />
      <MaskaProductSection forcedLang={lang} />
      <AjwainProductSection forcedLang={lang} />
      <AttaProductSection forcedLang={lang} />
      <JeeraProductSection forcedLang={lang} />
      <BadamProductSection forcedLang={lang} />
      <section className="relative">
        <DraggableCardDemo />
      </section>
    </main>
  );
}
