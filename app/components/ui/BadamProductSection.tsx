"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LangCode, useSectionTranslation } from "@/lib/useSectionTranslation";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304489/baadam_jd8ykx.png";
const AJWAIN_BOWL_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770737939/organic-almond-nut-isolated-white-background_299651-2983-Photoroom_pll7hs.png";

const EN_COPY = {
  line1: "Every bite full of almond goodness",
  line2: "Nutty delight, loved by every cookie lover",
  heroMain: "badami",
  heroSub: "punch",
  desc1: "Hamara badam cookie tasty,real badam,crispy & aromatic —",
  desc2: "har bite mein full desi punch!",
};

const FALLBACK_COPY = {
  hi: { line1: "हर बाइट में बादाम की अच्छाई", line2: "नट्टी डिलाइट, हर कुकी लवर की पसंद", heroMain: "बदामी", heroSub: "पंच" },
  es: { line1: "Cada bocado lleno de bondad de almendra", line2: "Delicia de nuez, amada por todos", heroSub: "toque" },
  ar: { line1: "كل قضمة مليئة بخير اللوز", line2: "متعة بالمكسرات يحبها الجميع", heroSub: "نكهة" },
  "fr-CA": { line1: "Chaque bouchée pleine de bonté d'amande", line2: "Délice aux noix, aimé de tous", heroSub: "punch" },
  de: { line1: "Jeder Biss voller Mandel-Genuss", line2: "Nussige Freude, von allen geliebt", heroSub: "Punch" },
  "nl-BE": { line1: "Elke hap vol amandelgoedheid", line2: "Nootachtige delight, geliefd door iedereen", heroSub: "punch" },
} as const;

export default function BadamProductSection({ forcedLang }: { forcedLang?: LangCode } = {}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { copy } = useSectionTranslation(EN_COPY, forcedLang, FALLBACK_COPY);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative overflow-visible bg-white px-3 py-1 md:overflow-hidden md:px-16 md:py-14">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = 4 + ((i * 19) % 92);
        const delay = (i % 8) * 0.55;
        const duration = 5 + (i % 5);
        const size = 3 + (i % 5);

        return (
          <span
            key={i}
            className="absolute rounded-full bg-amber-400/35"
            style={{
              left: `${left}%`,
              bottom: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              animation: `fizzUpAjwain ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      <div className="relative z-10 mx-auto grid min-h-0 max-w-7xl items-start gap-2 md:min-h-[620px] md:items-center md:gap-8 md:grid-cols-2">
        {/* packet left */}
        <div className="relative flex justify-center md:order-1">
          <div
            className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-b from-[#e6d84a]/55 via-[#d4c23a]/45 to-transparent blur-3xl"
            style={{ transform: `translate(${mouse.x * 14}px, ${mouse.y * 7}px)` }}
          />

          <div
            className="relative"
            style={{
              transform: `translate(${mouse.x * 9}px, ${mouse.y * 7}px) rotate(${mouse.x * 3 - 10}deg)`,
              transition: "transform 120ms linear",
            }}
          >
            <Image
              src={PRODUCT_IMAGE}
              alt="Ajwain product"
              width={341}
              height={504}
              priority
              className="h-auto w-[50vw] md:w-[50vw] lg:w-[341px] max-w-[341px] drop-shadow-[0_24px_58px_rgba(140,170,60,0.4)]"
            />

            <Image
              src={AJWAIN_BOWL_IMAGE}
              alt="Ajwain bowl"
              width={144}
              height={144}
              className="ajwain-bowl absolute bottom-[80px] right-[-84px] z-20 pointer-events-none"
            />
          </div>
        </div>

        {/* text right - same format as jeera */}
        <div className="space-y-2 text-center md:order-2 md:space-y-6 md:text-left md:[transform:rotate(-4deg)] md:[transform-origin:left_center]">
          <p
            className="text-[20px] leading-tight text-[#1f1b1a] md:text-[32px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
           {copy.line1}
          </p>

          <p
            className="text-[15px] leading-snug text-[#272120] md:text-[22px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {copy.line2}
          </p>

          <h2
            className="leading-none text-[#76962d]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 14px rgba(118,150,45,0.22)",
            }}
          >
            <span className="hero-no1-ajwain block text-[64px] md:text-[118px]">
              <span className="hero-chunk-aj hero-main-aj">{copy.heroMain}</span>
              <span className="hero-gap-aj">&nbsp;</span>
              <span className="hero-chunk-aj hero-sub-aj">{copy.heroSub}</span>
              <span className="hero-chunk-aj hero-one-aj hero-digit-aj"></span>
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl text-[17px] leading-snug text-[#1f1b1a] md:mx-0 md:text-[28px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {copy.desc1}
            <br />
            {copy.desc2}
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fizzUpAjwain {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-102vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes heroTextBaseAj {
          0%,
          100% {
            opacity: 1;
          }
        }

        @keyframes chunkRevealRTLAj {
          0% {
            opacity: 0;
            transform: translateX(72px) scale(0.78);
            filter: blur(4px);
          }
          16% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .hero-no1-ajwain {
          display: inline-block;
          transform: skewX(-9deg);
          animation: heroTextBaseAj 3.6s linear infinite;
          white-space: nowrap;
        }

        .hero-chunk-aj {
          display: inline-block;
          opacity: 0;
          animation: chunkRevealRTLAj 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          will-change: transform, opacity, filter;
        }

        .hero-main-aj {
          animation-delay: 0s;
        }

        .hero-sub-aj {
          animation-delay: 0.45s;
        }

        .hero-one-aj {
          animation-delay: 0.78s;
          margin-left: 0.08em;
        }

        .hero-gap-aj {
          display: inline-block;
          width: 0.25em;
        }

        .hero-digit-aj {
          font-family: Georgia, "Times New Roman", serif;
          font-style: normal;
          font-variant-numeric: lining-nums;
          font-feature-settings: "lnum" 1;
        }

        @keyframes bowlHoverAjwain {
          0% {
            transform: rotate(0deg) translateY(0px);
          }
          50% {
            transform: rotate(0deg) translateY(-8px);
          }
          100% {
            transform: rotate(0deg) translateY(0px);
          }
        }

        .ajwain-bowl {
          transform-origin: center;
          animation: bowlHoverAjwain 2.2s ease-in-out infinite;
          filter: drop-shadow(0 8px 12px rgba(120, 130, 45, 0.26));
        }
      `}</style>
    </section>
  );
}
