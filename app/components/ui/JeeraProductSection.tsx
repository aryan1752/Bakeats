"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304407/jeera_uimjxy.png";
const ZEERA_BOWL_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770716655/zeera-img2-Photoroom_empg35.png";
const CUMIN_SEEDS_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770717772/Whisk_6aa4ebc70b272a4bf7341a39fddf973fdr-Photoroom_jttvum.png";

type LangCode = "en" | "hi" | "es" | "ar" | "fr-CA" | "de" | "nl-BE";

type CopyShape = {
  tagline1: string;
  tagline2: string;
  heroMain: string;
  heroSub: string;
  heroOne: string;
  descLine1: string;
  descLine2: string;
};

const EN_COPY: CopyShape = {
  tagline1: "Dumdaar, mazedaar and sabka yaar",
  tagline2: "Most popular, loved & has a crazy fan following",
  heroMain: "Hero",
  heroSub: "No.",
  heroOne: "1",
  descLine1: "Hamara jeeraaa cookie crunchy baked & tangy —",
  descLine2: "ye apna jalwa dikhata hai har jagah!",
};

const FALLBACK_COPY: Record<LangCode, CopyShape> = {
  en: EN_COPY,
  hi: {
    tagline1: "दमदार, मज़ेदार और सबका यार",
    tagline2: "सबका पसंदीदा, जिसे हर कोई चाहता है",
    heroMain: "हीरो",
    heroSub: "नं.",
    heroOne: "1",
    descLine1: "हमारी जीरा कुकी कुरकुरी, बेक्ड और टैंगी है —",
    descLine2: "ये हर जगह अपना जलवा दिखाती है!",
  },
  es: {
    tagline1: "Potente, sabroso y el favorito de todos",
    tagline2: "Muy popular, amado y con una gran base de fans",
    heroMain: "Héroe",
    heroSub: "N.º",
    heroOne: "1",
    descLine1: "Nuestra bebida de jeera es inteligente, divertida, gaseosa y ácida —",
    descLine2: "¡muestra su estilo en todas partes!",
  },
  ar: {
    tagline1: "قوي ولذيذ ومحبوب عند الجميع",
    tagline2: "الأكثر شعبية ومحبوب وله جمهور كبير",
    heroMain: "البطل",
    heroSub: "رقم",
    heroOne: "1",
    descLine1: "مشروب الجيرة الذكي والمرح والفوّار والمنعش —",
    descLine2: "يُظهر تميّزه في كل مكان!",
  },
  "fr-CA": {
    tagline1: "Puissant, savoureux et aimé de tous",
    tagline2: "Très populaire, adoré et suivi par de nombreux fans",
    heroMain: "Héros",
    heroSub: "No.",
    heroOne: "1",
    descLine1: "Notre boisson jeera est futée, fun, pétillante et relevée —",
    descLine2: "elle fait sensation partout!",
  },
  de: {
    tagline1: "Kräftig, lecker und von allen geliebt",
    tagline2: "Sehr beliebt, geliebt und mit einer starken Fanbasis",
    heroMain: "Held",
    heroSub: "Nr.",
    heroOne: "1",
    descLine1: "Unser Jeera-Keks ist knusprig, gebacken und würzig —",
    descLine2: "er zeigt überall seinen Glanz!",
  },
  "nl-BE": {
    tagline1: "Krachtig, lekker en ieders favoriet",
    tagline2: "Superpopulair, geliefd en met een grote fanbase",
    heroMain: "Held",
    heroSub: "Nr.",
    heroOne: "1",
    descLine1: "Onze jeera-drank is slim, fun, bruisend en pittig —",
    descLine2: "hij laat overal zijn klasse zien!",
  },
};

export default function JeeraProductSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [lang, setLang] = useState<LangCode>("en");
  const [copy, setCopy] = useState<CopyShape>(EN_COPY);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("site_lang") as LangCode | null;
    if (saved && ["en", "hi", "es", "ar", "fr-CA", "de", "nl-BE"].includes(saved)) {
      setLang(saved as LangCode);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      window.localStorage.setItem("site_lang", lang);

      if (lang === "en") {
        setCopy(EN_COPY);
        return;
      }

      setCopy(FALLBACK_COPY[lang]);
      setIsTranslating(true);

      try {
        const res = await fetch("/api/lingo-translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLang: lang, textMap: EN_COPY }),
        });

        if (!res.ok) throw new Error("Translation API failed");

        const data = (await res.json()) as { translated?: Partial<CopyShape> };
        if (!cancelled && data.translated) {
          setCopy((prev) => ({ ...prev, ...data.translated }));
        }
      } catch {
        // keep fallback silently
      } finally {
        if (!cancelled) setIsTranslating(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <section className="relative mt-0 overflow-visible bg-white px-3 py-1 md:-mt-32 md:overflow-hidden md:px-16 md:py-10">
      <div className="absolute right-6 top-4 z-30 flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/90 p-2 text-xs md:right-16">
        <span className="font-semibold text-neutral-700">Language</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LangCode)}
          className="rounded border border-neutral-300 px-2 py-1 text-neutral-800"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="ar">Arabic</option>
          <option value="fr-CA">Canada (French)</option>
          <option value="de">German</option>
          <option value="nl-BE">Belgium (Dutch)</option>
        </select>
        {isTranslating ? <span className="text-neutral-500">…</span> : null}
      </div>

      {Array.from({ length: 22 }).map((_, i) => {
        const left = 2 + ((i * 17) % 95);
        const delay = (i % 9) * 0.6;
        const duration = 5 + (i % 6);
        const size = 4 + (i % 5);

        return (
          <span
            key={i}
            className="absolute rounded-full bg-amber-500/45"
            style={{
              left: `${left}%`,
              bottom: "-30px",
              width: `${size}px`,
              height: `${size}px`,
              animation: `fizzUp ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      <div className="relative z-10 mx-auto grid min-h-0 max-w-7xl items-start gap-2 md:min-h-[720px] md:items-center md:gap-8 md:grid-cols-2">
        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="space-y-2 text-center md:space-y-6 md:text-left md:[transform:rotate(-4deg)] md:[transform-origin:left_center]"
        >
          <p
            className="text-[22px] leading-tight text-[#1f1b1a] md:text-[34px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {copy.tagline1}
          </p>

          <p
            className="text-[16px] leading-snug text-[#272120] md:text-[24px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {copy.tagline2}
          </p>

          <h2
            className="leading-none text-[#5f9f50]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 14px rgba(95,159,80,0.2)",
            }}
          >
            <span className="hero-no1 block text-[70px] md:text-[130px]">
              <span className="hero-chunk hero-main">{copy.heroMain}</span>
              <span className="hero-gap">&nbsp;</span>
              <span className="hero-chunk hero-sub">{copy.heroSub}</span>
              <span className="hero-chunk hero-one hero-digit">{copy.heroOne}</span>
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl text-[18px] leading-snug text-[#1f1b1a] md:mx-0 md:text-[30px]"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {copy.descLine1}
            <br />
            {copy.descLine2}
          </p>
        </div>

        <div className="relative flex justify-center">
          <div
            className="absolute h-[460px] w-[460px] rounded-full bg-gradient-to-b from-[#b8cf3f]/62 via-[#9fbe2f]/50 to-transparent blur-3xl"
            style={{ transform: `translate(${mouse.x * 15}px, ${mouse.y * 8}px)` }}
          />

          <div
            className="relative"
            style={{
              transform: `translate(${mouse.x * 10}px, ${mouse.y * 8}px) rotate(${mouse.x * 3.5}deg)`,
              transition: "transform 120ms linear",
            }}
          >
            <Image
              src={PRODUCT_IMAGE}
              alt="Jeera product"
              width={341}
              height={504}
              priority
              className="h-auto w-[50vw] md:w-[50vw] lg:w-[341px] max-w-[341px] drop-shadow-[0_26px_62px_rgba(159,190,47,0.42)]"
            />

            <Image
              src={ZEERA_BOWL_IMAGE}
              alt="Zeera bowl"
              width={144}
              height={144}
              className="zeera-bowl absolute bottom-[46px] left-[-60px] z-20 pointer-events-none"
            />

            <Image
              src={CUMIN_SEEDS_IMAGE}
              alt="Cumin seeds"
              width={116}
              height={116}
              className="zeera-seeds absolute right-[-69px] top-[126px] z-20 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fizzUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-108vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes heroTextBase {
          0%,
          100% {
            opacity: 1;
          }
        }

        @keyframes chunkRevealRTL {
          0% {
            opacity: 0;
            transform: translateX(80px) scale(0.75);
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

        .hero-no1 {
          display: inline-block;
          transform: skewX(-10deg);
          animation: heroTextBase 3.6s linear infinite;
          white-space: nowrap;
        }

        .hero-chunk {
          display: inline-block;
          opacity: 0;
          animation: chunkRevealRTL 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          will-change: transform, opacity, filter;
        }

        .hero-main {
          animation-delay: 0s;
        }

        .hero-sub {
          animation-delay: 0.45s;
        }

        .hero-one {
          animation-delay: 0.78s;
          margin-left: 0.08em;
        }

        .hero-gap {
          display: inline-block;
          width: 0.25em;
        }

        .hero-digit {
          font-family: Georgia, "Times New Roman", serif;
          font-style: normal;
          font-variant-numeric: lining-nums;
          font-feature-settings: "lnum" 1;
        }

        @keyframes bowlHover {
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

        .zeera-bowl {
          transform-origin: center;
          animation: bowlHover 2.2s ease-in-out infinite;
          filter: drop-shadow(0 8px 12px rgba(90, 120, 30, 0.25));
        }

        .zeera-seeds {
          transform-origin: center;
          animation: bowlHover 2.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 10px rgba(90, 120, 30, 0.2));
        }
      `}</style>
    </section>
  );
}
