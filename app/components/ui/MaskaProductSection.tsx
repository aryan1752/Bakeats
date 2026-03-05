"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LangCode, useSectionTranslation } from "@/lib/useSectionTranslation";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304510/maska_ht9ri9.png";
const ATTA_BOWL_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770739279/stock-photo-butter-curls-Photoroom_klkwdt.png";

const EN_COPY = {
  line1: "Teekha tadka, crispy swag and full-on mazza",
  line2: "Chatpata favorite, loved by every crunchy-snack fan",
  heroMain: "Maskaaa",
  heroSub: "Magic",
  heroOne: "",
  desc1: "Hamara Maska cookie flavourful, tasty, crispy & aromatic —",
  desc2: "har bite mein full desi punch!",
};

const FALLBACK_COPY = {
  hi: {
    line1: "मसालेदार तड़का, क्रिस्पी स्वैग और मज़ा",
    line2: "चटपटा फ़ेवरिट, हर स्नैक लवर की पसंद",
    heroMain: "मस्के",
    heroSub: "का जादू",
    heroOne: "",
    desc1: "हमारी मस्का कुकी स्वादिष्ट, कुरकुरी और खुशबूदार —",
    desc2: "हर बाइट में फुल देसी पंच!",
  },

  es: {
    line1: "Toque sabroso, crujiente y divertido",
    line2: "Favorito picante para todos",
    heroMain: "Magia",
    heroSub: "Maskaaa",
    heroOne: "",
    desc1: "Nuestra galleta Maskaaa es sabrosa, crujiente y aromática —",
    desc2: "¡cada bocado tiene un toque especial!",
  },

  ar: {
    line1: "نكهة قوية وقرمشة ممتعة",
    line2: "المفضل لدى كل محبي السناك",
    heroMain: "ماسكـا",
    heroSub: "ماجيك",
    heroOne: "",
    desc1: "بسكويت ماسكا لدينا لذيذ ومقرمش وعطري —",
    desc2: "كل قضمة بنكهة مميزة!",
  },

  "fr-CA": {
    line1: "Touche savoureuse, croustillante et fun",
    line2: "Favori de tous les amateurs de snack",
    heroMain: "Magie",
    heroSub: "Maskaaa",
    heroOne: "",
    desc1: "Notre biscuit Maskaaa est savoureux, croustillant et aromatique —",
    desc2: "chaque bouchée apporte une touche unique!",
  },

  de: {
    line1: "Würziger Kick, knusprig und voller Spaß",
    line2: "Favorit für jeden Snack-Fan",
    heroMain: "Maskaaa",
    heroSub: "Magie",
    heroOne: "",
    desc1: "Unser Maskaaa-Keks ist lecker, knusprig und aromatisch —",
    desc2: "jeder Bissen hat seinen besonderen Kick!",
  },

  "nl-BE": {
    line1: "Pittige kick, crispy en fun",
    line2: "Favoriet voor elke snackfan",
    heroMain: "Maskaaa",
    heroSub: "Magie",
    heroOne: "",
    desc1: "Onze Maskaaa koek is smakelijk, knapperig en aromatisch —",
    desc2: "elke hap heeft een unieke punch!",
  },
} as const;
export default function MaskaProductSection({ forcedLang }: { forcedLang?: LangCode } = {}) {
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
            className="absolute rounded-full bg-amber-500/30"
            style={{
              left: `${left}%`,
              bottom: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              animation: `fizzUpAtta ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      <div className="relative z-10 mx-auto grid min-h-0 max-w-7xl items-start gap-2 md:min-h-[620px] md:items-center md:gap-8 md:grid-cols-2">
        {/* text left */}
        <div className="space-y-2 text-center md:space-y-6 md:text-left md:[transform:rotate(-4deg)] md:[transform-origin:left_center]">
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
            className="leading-none text-[#8c6a2f]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 14px rgba(140,106,47,0.22)",
            }}
          >
            <span className="hero-no1-atta block text-[64px] md:text-[118px]">
              <span className="hero-chunk-at hero-main-at">{copy.heroMain}</span>
              <span className="hero-gap-at">&nbsp;</span>
              <span className="hero-chunk-at hero-sub-at">{copy.heroSub}</span>
              <span className="hero-chunk-at hero-one-at hero-digit-at">{copy.heroOne}</span>
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

        {/* packet right */}
        <div className="relative flex justify-center">
          <div
            className="absolute h-[430px] w-[430px] rounded-full bg-gradient-to-b from-[#b896d9]/58 via-[#a67ccc]/48 to-transparent blur-3xl"
            style={{ transform: `translate(${mouse.x * 14}px, ${mouse.y * 7}px)` }}
          />

          <div
            className="relative"
            style={{
              transform: `translate(${mouse.x * 9}px, ${mouse.y * 7}px) rotate(${mouse.x * 3 + 10}deg)`,
              transition: "transform 120ms linear",
            }}
          >
            <Image
              src={PRODUCT_IMAGE}
              alt="Atta product"
              width={340}
              height={500}
              priority
              className="h-auto w-[70vw] md:w-[50vw] lg:w-[378px] max-w-[378px] drop-shadow-[0_24px_58px_rgba(140,106,47,0.35)]"
            />

            <Image
              src={ATTA_BOWL_IMAGE}
              alt="Atta bowl"
              width={200}
              height={200}
              className="atta-bowl absolute bottom-[36px] left-[-74px] z-20 pointer-events-none"
            />

           
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fizzUpAtta {
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

        @keyframes heroTextBaseAt {
          0%,
          100% {
            opacity: 1;
          }
        }

        @keyframes chunkRevealRTLAt {
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

        .hero-no1-atta {
          display: inline-block;
          transform: skewX(-9deg);
          animation: heroTextBaseAt 3.6s linear infinite;
          white-space: nowrap;
        }

        .hero-chunk-at {
          display: inline-block;
          opacity: 0;
          animation: chunkRevealRTLAt 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          will-change: transform, opacity, filter;
        }

        .hero-main-at {
          animation-delay: 0s;
        }

        .hero-sub-at {
          animation-delay: 0.45s;
        }

        .hero-one-at {
          animation-delay: 0.78s;
          margin-left: 0.08em;
        }

        .hero-gap-at {
          display: inline-block;
          width: 0.25em;
        }

        .hero-digit-at {
          font-family: Georgia, "Times New Roman", serif;
          font-style: normal;
          font-variant-numeric: lining-nums;
          font-feature-settings: "lnum" 1;
        }

        @keyframes attaBowlFloat {
          0% {
            transform: rotate(-10deg) translateY(0px);
          }
          50% {
            transform: rotate(-10deg) translateY(-8px);
          }
          100% {
            transform: rotate(-10deg) translateY(0px);
          }
        }

        @keyframes attaWheatFloat {
          0% {
            transform: rotate(8deg) translateY(0px);
          }
          50% {
            transform: rotate(8deg) translateY(-6px);
          }
          100% {
            transform: rotate(8deg) translateY(0px);
          }
        }

        .atta-bowl {
          animation: attaBowlFloat 2.2s ease-in-out infinite;
          filter: drop-shadow(0 8px 12px rgba(140, 106, 47, 0.25));
        }

        .atta-wheat {
          animation: attaWheatFloat 2s ease-in-out infinite;
          filter: drop-shadow(0 6px 10px rgba(140, 106, 47, 0.2));
        }
      `}</style>
    </section>
  );
}
