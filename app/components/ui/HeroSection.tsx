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

  // Control video playback based on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      // Set video time based on scroll progress
      const targetTime = scrollProgress * video.duration;
      video.currentTime = targetTime;
    }
  }, [scrollProgress]);

  useEffect(() => {
    setMediaLoaded(false);
  }, [currentCookie.webpUrl]);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      video.pause(); // Ensure video doesn't autoplay
      video.currentTime = 0;
      setMediaLoaded(true);
    }
  };

  return (
    <section className="relative min-h-screen">
      {/* Fixed Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-overlay z-10" />
        <div className="absolute inset-0 bg-gradient-hero z-10" />

        {/* Cookie Animation - Scroll Controlled */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={currentCookie.webpUrl}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              className={`w-[150vw] h-auto min-h-screen object-cover drop-shadow-2xl transition-opacity duration-500 ${
                mediaLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ pointerEvents: 'none' }}
            />
            {/* Fallback for browsers that don't support WebP video */}
            {!mediaLoaded && (
              <img
                src={currentCookie.webpUrl}
                alt={currentCookie.name}
                className="absolute w-[150vw] h-auto min-h-screen object-cover drop-shadow-2xl"
              />
            )}
          </div>
        </div>

        {/* Left Text Overlay */}
        <div 
          className={`absolute left-6 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Logo Mark */}
          <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="text-sm tracking-[0.4em] text-muted-foreground font-body uppercase">
              Bakeats
            </span>
          </div>

          {/* Cookie Name */}
          <h1 
            className="hero-title animate-fade-in-up opacity-0" 
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {currentCookie.name}
          </h1>

          {/* Subtitle */}
          <p 
            className="hero-subtitle mt-4 text-muted-foreground animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            {currentCookie.subtitle}
          </p>

          {/* Description */}
          <p 
            className="hero-description mt-6 text-foreground/80 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            {currentCookie.description}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 mt-10 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <button className="btn-hero-outline">
              Add to Cart
            </button>
            <button className="btn-hero-solid">
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Side Navigator */}
        <div 
          className={`absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20 flex items-center gap-6 transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Large Number */}
          <div className="variant-number font-display animate-slide-in-right opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {String(currentIndex + 1).padStart(2, '0')}
          </div>

          {/* Vertical Navigation */}
          <div className="flex flex-col items-center gap-4 animate-slide-in-right opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <button 
              onClick={onPrev}
              className="variant-nav-btn flex flex-col items-center gap-1 group"
              aria-label="Previous cookie"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span>PREV</span>
            </button>

            <div className="w-px h-8 bg-foreground/20" />

            <button 
              onClick={onNext}
              className="variant-nav-btn flex flex-col items-center gap-1 group"
              aria-label="Next cookie"
            >
              <span>NEXT</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Social Icons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="X">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 right-8 z-20 transition-opacity duration-500 ${
            scrollProgress > 0.1 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="scroll-indicator">
            <div className="scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
};