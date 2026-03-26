"use client";
import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.12,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1200,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 28.6139, lng: 77.209 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const ends = [
    { lat: 40.7128,  lng: -74.006  },
    { lat: 51.5072,  lng: -0.1276  },
    { lat: 35.6762,  lng: 139.6503 },
    { lat: -33.8688, lng: 151.2093 },
    { lat: 1.3521,   lng: 103.8198 },
    { lat: 48.8566,  lng: 2.3522   },
    { lat: 52.52,    lng: 13.405   },
    { lat: 22.3193,  lng: 114.1694 },
  ];

  const sampleArcs = ends.map((end, i) => ({
    order: i + 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: end.lat,
    endLng: end.lng,
    arcAlt: 0.2 + (i % 3) * 0.15,
    color: colors[i % colors.length],
  }));

  return (
    <div className="relative w-full bg-black py-4 md:flex md:h-[40rem] md:flex-row md:items-center md:justify-center md:py-12">
      <div className="relative mx-auto h-[28rem] w-full max-w-7xl overflow-hidden px-4 md:h-[40rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-center font-[cursive] text-xl md:text-4xl font-bold text-white">
            Connected from India
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center font-[cursive] text-base font-normal text-neutral-300 md:text-lg">
            Real-time global reach visualized on the PND global logistics network globe.
          </p>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-24 select-none bg-gradient-to-b from-transparent to-black md:h-40" />
        <div className="relative mt-2 h-[19rem] w-full md:absolute md:-bottom-20 md:mt-0 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}