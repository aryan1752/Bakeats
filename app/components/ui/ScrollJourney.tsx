"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollJourney.module.css";

export interface ScrollJourneyStep {
  image: string | string[];
  alt?: string;
  label: string;
  title: string;
}

interface ScrollJourneyProps {
  steps: ScrollJourneyStep[];
  colors?: string[];
}

const DEFAULT_COLORS = ["#14335F", "#1B4B8F", "#2158A8", "#3E86E0"];

export default function ScrollJourney({
  steps,
  colors = DEFAULT_COLORS,
}: ScrollJourneyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Register the plugin on the client only
    gsap.registerPlugin(ScrollTrigger);

    const n = steps.length;
    const panel = panelRef.current;
    const rays = raysRef.current;
    const counter = counterRef.current;
    if (!panel || !rays || !counter || n === 0) return;

    // Set initial render state for Step 1 immediately on component mount
    panel.style.background = colors[0];
    rays.style.transform = "rotate(0deg) scale(1.6)";
    counter.textContent = `01 / ${String(n).padStart(2, "0")}`;

    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px) scale(1)";
      } else {
        el.style.opacity = "0";
        el.style.transform = `translateY(${(0 - i) * 60}px) scale(1.12)`;
      }
    });

    textRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      } else {
        el.style.opacity = "0";
        el.style.transform = `translateY(${(0 - i) * 36}px)`;
      }
    });

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const active = i === 0;
      dot.style.transform = active ? "scale(1.4)" : "scale(1)";
      dot.style.opacity = active ? "1" : "0.35";
    });

    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress;
        const stepFloat = progress * (n - 1);
        const activeIndex = Math.min(Math.floor(stepFloat), n - 1);
        const localT = stepFloat - activeIndex;

        const colorA = colors[activeIndex] ?? colors[colors.length - 1];
        const colorB =
          colors[Math.min(activeIndex + 1, colors.length - 1)] ??
          colors[colors.length - 1];
        panel.style.background = gsap.utils.interpolate(
          colorA,
          colorB,
          localT
        );

        rays.style.transform = `rotate(${progress * 40}deg) scale(1.6)`;
        counter.textContent = `${String(activeIndex + 1).padStart(
          2,
          "0"
        )} / ${String(n).padStart(2, "0")}`;

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return;
          const active = i === activeIndex;
          dot.style.transform = active ? "scale(1.4)" : "scale(1)";
          dot.style.opacity = active ? "1" : "0.35";
        });

        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(stepFloat - i);
          const opacity = gsap.utils.clamp(0, 1, 1 - dist * 1.4);
          const scale = 1.12 - opacity * 0.12;
          const y = (stepFloat - i) * 60;
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${y}px) scale(${scale})`;
        });

        textRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(stepFloat - i);
          const opacity = gsap.utils.clamp(0, 1, 1 - dist * 1.6);
          const y = (stepFloat - i) * 36;
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${y}px)`;
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [steps, colors]);

  return (
    <>
      <div ref={wrapRef} className={styles.wrap}>
        <div ref={panelRef} className={styles.panel}>
          <div ref={raysRef} className={styles.rays} />
          <div ref={counterRef} className={styles.counter}>
            01 / {String(steps.length).padStart(2, "0")}
          </div>

          <div className={styles.imgstack}>
            <div className={styles.frame}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className={styles.imgItem}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {Array.isArray(step.image) ? (
                    <div className={styles.doubleImageContainer}>
                      <img src={step.image[0]} className={styles.doubleImgLeft} alt="" />
                      <img src={step.image[1]} className={styles.doubleImgRight} alt="" />
                    </div>
                  ) : step.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={step.image} alt={step.alt ?? ""} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.textstack}>
            <div className={styles.textFrame}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className={styles.textItem}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div className={styles.label}>{step.label}</div>
                  <h3>{step.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {steps.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                style={{ opacity: i === 0 ? 1 : 0.35 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.spacer} />
    </>
  );
}
