"use client";

import Image from "next/image";
import { LangCode, useSectionTranslation } from "@/lib/useSectionTranslation";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304473/nariyal_m4bdko.png";

const EN_COPY = {
  starMain: "Star",
  starSub: "Performer",
  demand: "on Popular Demand",
  line1: "Delight & Coco Crunch are all about that snazzy punch",
  line2: "unique flavourful & so much fun at times. thoda khatta thoda meetha, yaaron",
};

const FALLBACK_COPY = {
  hi: {
    starMain: "स्टार",
    starSub: "परफ़ॉर्मर",
    demand: "पॉपुलर डिमांड पर",
    line1: "Delight और Coco Crunch का अंदाज़ है बड़ा धमाकेदार",
    line2: "यूनिक फ्लेवर, फुल फन — थोड़ा खट्टा थोड़ा मीठा, बहुत मज़ेदार!",
  },
  es: { starMain: "Estrella", starSub: "Artista", demand: "por demanda popular" },
  ar: { starMain: "النجم", starSub: "المؤدي", demand: "بطلب جماهيري" },
  "fr-CA": { starMain: "Vedette", starSub: "Interprète", demand: "sur demande populaire" },
  de: { starMain: "Star", starSub: "Performer", demand: "auf beliebte Nachfrage" },
  "nl-BE": { starMain: "Ster", starSub: "Performer", demand: "op populaire vraag" },
} as const;

export default function NariyalProductSection({ forcedLang }: { forcedLang?: LangCode } = {}) {
  const { copy } = useSectionTranslation(EN_COPY, forcedLang, FALLBACK_COPY);

  return (
    <section className="relative overflow-visible bg-white px-3 pb-0 pt-1 md:overflow-hidden md:px-16 md:pb-10 md:pt-14">
      <div className="mx-auto max-w-7xl text-center">
        <div className="relative mx-auto h-[270px] w-full max-w-[1100px] sm:h-[260px] md:h-[500px]">
          <svg
            viewBox="0 0 1200 620"
            className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 origin-top scale-[0.98] sm:scale-[0.88] md:scale-100"
            fill="none"
            aria-hidden
          >
            <defs>
  <path id="nariyalArcTop"   d="M 150 236 Q 600 30  1050 236" />
  <path id="nariyalArcMid"   d="M 180 290 Q 600 150  1020 290" />
  <path id="nariyalArcBody1" d="M 80  360 Q 600 245  1120 360" />
  <path id="nariyalArcBody2" d="M 60  425 Q 600 300  1140 425" />
</defs>

            <text
              className="nariyal-star-chunk nariyal-star-main"
              fill="#8f1f8d"
              fontSize="88"
              fontStyle="italic"
              fontWeight="500"
              letterSpacing="1"
              style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
            >
              <textPath href="#nariyalArcTop" startOffset="32%" textAnchor="middle">
                {copy.starMain}
              </textPath>
            </text>

            <text
              className="nariyal-star-chunk nariyal-star-sub"
              fill="#8f1f8d"
              fontSize="88"
              fontStyle="italic"
              fontWeight="500"
              letterSpacing="1"
              style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
            >
              <textPath href="#nariyalArcTop" startOffset="68%" textAnchor="middle">
                {copy.starSub}
              </textPath>
            </text>

            <text
              fill="#101010"
              fontSize="62"
              fontStyle="italic"
              fontWeight="700"
              style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
            >
              <textPath href="#nariyalArcMid" startOffset="50%" textAnchor="middle">
                {copy.demand}
              </textPath>
            </text>

            <text
              fill="#111"
              fontSize="38"
              fontStyle="italic"
              fontWeight="700"
              style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
            >
              <textPath href="#nariyalArcBody1" startOffset="50%" textAnchor="middle">
                {copy.line1}
              </textPath>
            </text>

            <text
              fill="#111"
              fontSize="42"
              fontStyle="italic"
              fontWeight="700"
              style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
            >
              <textPath href="#nariyalArcBody2" startOffset="50%" textAnchor="middle">
                {copy.line2}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative mx-auto -mt-20 flex justify-center sm:-mt-24 md:-mt-28">
          <div className="absolute h-[430px] w-[430px] rounded-full bg-gradient-to-b from-[#86e8f7]/60 via-[#46cde2]/45 to-transparent blur-3xl" />
          <Image
            src={PRODUCT_IMAGE}
            alt="Nariyal product"
            width={324}
            height={479}
            priority
            className="nariyal-packet-auto-hover relative z-10 h-auto w-[80vw] md:w-[50vw] lg:w-[324px] max-w-[324px] drop-shadow-[0_26px_60px_rgba(28,144,168,0.35)]"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes nariyalChunkReveal {
          0% {
            opacity: 0;
            transform: scale(0.9);
            filter: blur(3px);
          }
          16% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        .nariyal-star-chunk {
          opacity: 0;
          animation: nariyalChunkReveal 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          transform-origin: center;
          will-change: transform, opacity, filter;
        }

        .nariyal-star-main {
          animation-delay: 0s;
        }

        .nariyal-star-sub {
          animation-delay: 0.48s;
        }

        @keyframes nariyalPacketAutoHover {
          0% {
            transform: translateY(0px) rotate(-1deg) scale(1);
          }
          50% {
            transform: translateY(-10px) rotate(1.2deg) scale(1.02);
          }
          100% {
            transform: translateY(0px) rotate(-1deg) scale(1);
          }
        }

        .nariyal-packet-auto-hover {
          animation: nariyalPacketAutoHover 2.8s ease-in-out infinite;
          transform-origin: center bottom;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
