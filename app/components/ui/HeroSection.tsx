'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CookieVariant } from '@/data/cookies';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  currentCookie: CookieVariant;
  currentIndex: number;
  totalCookies: number;
  onPrev: () => void;
  onNext: () => void;
  scrollProgress: number;
  isTransitioning: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCookie,
  currentIndex,
  totalCookies,
  onPrev,
  onNext,
  scrollProgress,
  isTransitioning,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      const targetTime = scrollProgress * video.duration;
      video.currentTime = targetTime;
    }
  }, [scrollProgress]);

  useEffect(() => {
    setMediaLoaded(false);
  }, [currentCookie.webpUrl]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setMediaLoaded(true);
    }
  };

  const headingBase = currentCookie.name.replace(/\s*cookie\s*/i, '').trim();

  return (
    <section className="relative min-h-[78vh] bg-black sm:min-h-[88vh] md:min-h-[130vh]">
      <div className="sticky top-0 h-[78vh] w-full overflow-hidden bg-black sm:h-[88vh] md:h-screen">
        <div className="absolute right-0 top-0 z-10 h-full w-[10vw] bg-black" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.45)_58%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.25)_38%,rgba(0,0,0,0.55)_100%)]" />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative h-full w-full overflow-hidden">
            <video
              ref={videoRef}
              src={currentCookie.webpUrl}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              className={`absolute left-1/2 top-1/2 z-0 w-[125vw] h-auto -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-500 md:h-[95vh] md:w-auto ${
                mediaLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ pointerEvents: 'none' }}
            />
            {!mediaLoaded && (
              <img
                src={currentCookie.webpUrl}
                alt={currentCookie.name}
                className="absolute left-1/2 top-1/2 z-0 w-[125vw] h-auto -translate-x-1/2 -translate-y-1/2 object-contain md:h-[95vh] md:w-auto"
              />
            )}
          </div>
        </div>

        <div
          className={`absolute left-4 top-1/2 z-20 max-w-[72vw] -translate-y-1/2 transition-all duration-700 md:left-16 md:max-w-[560px] lg:left-24 ${
            isTransitioning ? 'translate-x-[-20px] opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="mb-3 text-[10px] tracking-[0.35em] text-white/60 uppercase md:mb-7 md:text-[12px] md:tracking-[0.5em]">Bakeats</div>

          <h1 className="font-serif text-[50px] leading-[0.92] font-semibold tracking-tight text-white md:text-[112px]">
            {headingBase}
            <br />
            COOKIE
          </h1>

          <p className="mt-3 text-[11px] tracking-[0.22em] text-white/65 uppercase md:mt-7 md:text-[33px] md:tracking-[0.28em]">
            {currentCookie.subtitle}
          </p>

          <p className="mt-3 max-w-[90vw] text-[14px] leading-[1.45] text-white/90 md:mt-6 md:max-w-[560px] md:text-[35px]">
            {currentCookie.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-11 md:gap-4">
            <button className="rounded-full border border-white/60 px-4 py-2 text-[11px] tracking-wide text-white transition hover:bg-white/10 md:px-9 md:py-4 md:text-sm">
              ADD TO CART
            </button>
            <button className="rounded-full bg-white px-4 py-2 text-[11px] tracking-wide text-black transition hover:bg-white/90 md:px-9 md:py-4 md:text-sm">
              BUY NOW
            </button>
          </div>
        </div>

        <div
          className={`absolute right-[8vw] top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 transition-all duration-700 md:right-16 md:gap-6 lg:right-24 ${
            isTransitioning ? 'translate-x-[20px] opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="font-serif text-[52px] leading-none font-semibold text-white md:text-[112px]">
            {String(currentIndex + 1).padStart(2, '0')}
          </div>

          <div className="flex flex-col items-center gap-2 text-white/85 md:gap-4">
            <button onClick={onPrev} className="group flex flex-col items-center gap-0.5 text-[9px] tracking-[0.16em] md:gap-1 md:text-[11px] md:tracking-[0.2em]" aria-label="Previous cookie">
              <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              <span>PREV</span>
            </button>

            <div className="h-5 w-px bg-white/30 md:h-8" />

            <button onClick={onNext} className="group flex flex-col items-center gap-0.5 text-[9px] tracking-[0.16em] md:gap-1 md:text-[11px] md:tracking-[0.2em]" aria-label="Next cookie">
              <span>NEXT</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>

            <div className="mt-2 text-[10px] text-white/45">{String(totalCookies).padStart(2, '0')}</div>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 text-white/85 sm:bottom-4 md:bottom-8 md:gap-5">
          <a href="#" aria-label="Instagram" className="transition hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" /></svg>
          </a>
          <a href="#" aria-label="WhatsApp" className="transition hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.92 11.92 0 0012.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.6 5.95L0 24l6.35-1.67a11.88 11.88 0 005.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.44-8.4zM12.07 21.7h-.01a9.8 9.8 0 01-4.99-1.36l-.36-.21-3.77.99 1-3.67-.23-.38a9.77 9.77 0 01-1.5-5.18c0-5.4 4.39-9.8 9.8-9.8 2.61 0 5.06 1.02 6.9 2.87a9.7 9.7 0 012.86 6.92c0 5.4-4.4 9.81-9.8 9.81zm5.37-7.37c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14-.19.29-.76.95-.93 1.14-.17.2-.34.22-.63.08-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.31.43-.46.14-.16.19-.27.29-.46.1-.2.05-.37-.02-.51-.07-.14-.66-1.59-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.08-.78.37-.27.29-1.02 1-1.02 2.44 0 1.43 1.05 2.82 1.2 3.01.14.2 2.06 3.15 4.98 4.42.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.72-.7 1.97-1.37.24-.68.24-1.25.17-1.37-.07-.12-.27-.2-.56-.34z"/></svg>
          </a>
          <a href="#" aria-label="Facebook" className="transition hover:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};
