"use client";

import { useState, useEffect, useRef } from "react";
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
import { InfiniteMovingCardsDemo } from "./components/InfiniteMovingCardsDemo";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "motion/react";
import BakeatsNavbar from "@/components/ui/BakeatsNavbar";

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

// Replace these with your actual cookie image URLs
const mobileSliderImages = cookieVariants.map((c) => c.webpUrl);

const getInitialLang = (): LangCode => {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem("site_lang") as LangCode | null;
  return saved && LANG_OPTIONS.some((l) => l.value === saved) ? saved : 'en';
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lang, setLang] = useState<LangCode>(() => getInitialLang());
  const [translatedCookies, setTranslatedCookies] = useState(cookieVariants);
  const [showLangSelector, setShowLangSelector] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (docHeight * 0.5), 1);
      setScrollProgress(progress);

      const prev = lastScrollYRef.current;
      if (scrollTop < 80) {
        setShowLangSelector(true);
      } else if (scrollTop < prev) {
        setShowLangSelector(true);
      } else {
        setShowLangSelector(false);
      }
      lastScrollYRef.current = scrollTop;
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
    return () => { cancelled = true; };
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
    <main className="relative overflow-x-hidden bg-black">
      <BakeatsNavbar />

      {/* Lang selector */}
      <div
        className={`fixed right-2 top-16 z-[80] flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white/90 p-1 text-[10px] shadow-sm transition-all duration-200 md:right-8 md:top-8 ${
          showLangSelector ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <span className="font-medium text-neutral-700">ln</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LangCode)}
          className="rounded border border-neutral-300 px-1 py-0.5 text-[8px] text-neutral-800 appearance-none"
        >
          {LANG_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile only — Images Slider replaces HeroSection */}
      <div className="block md:hidden">
        <ImagesSlider className="h-[100svh]" images={mobileSliderImages}>
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-50 flex flex-col justify-end items-start px-6 pb-16 h-full w-full"
          >
            <motion.p className="font-serif font-bold text-4xl text-left text-white leading-tight mb-3">
              {translatedCookies[0]?.name ?? "Bakeats"}
            </motion.p>
            <p className="text-white/70 text-sm tracking-widest uppercase mb-6">
              {translatedCookies[0]?.subtitle ?? ""}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919266565336"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-black px-5 py-2.5 text-xs tracking-wide text-white transition hover:bg-black/80"
              >
                WhatsApp
              </a>
             
            </div>
          </motion.div>
        </ImagesSlider>
      </div>

      {/* Desktop only — original HeroSection */}
      <div className="hidden md:block">
        <HeroSection
          currentCookie={translatedCookies[currentIndex]}
          currentIndex={currentIndex}
          totalCookies={translatedCookies.length}
          onPrev={handlePrev}
          onNext={handleNext}
          scrollProgress={scrollProgress}
          isTransitioning={isTransitioning}
        />
      </div>

      <div className="relative -mt-20 md:-mt-24">
        <InfiniteMovingCardsDemo />
      </div>

      <NariyalProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <ChocolateProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <MaskaProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <AjwainProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <AttaProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <BadamProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <JeeraProductSection forcedLang={lang} />
      <div className="h-[50px] bg-white md:hidden" />

      <section className="relative">
        <DraggableCardDemo />
      </section>

    </main>
  );
}