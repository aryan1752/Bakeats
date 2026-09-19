import { Metadata } from "next";
import JourneySection from "@/components/ui/JourneySection";

export const metadata: Metadata = {
  title: "Our Journey | Knowledge Venture Institute (KVI)",
  description: "Explore the chronological story of Knowledge Venture Institute (KVI) from a single small classroom in 2013 to a leading academic coaching institute in Hari Nagar, Jaitpur & Badarpur.",
  keywords: [
    "KVI Journey",
    "Knowledge Venture Institute history",
    "Coaching center Hari Nagar Jaitpur",
    "Best coaching institute Badarpur Delhi",
    "KVI 2013 foundation"
  ]
};

export default function JourneyPage() {
  const videoUrl = "https://res.cloudinary.com/jdqwmh0l/video/upload/v1789661568/Animated_coaching_institute_video_20260917214219.mp4";

  return (
    <main className="w-full min-h-screen bg-[#071728] text-white flex flex-col">
      
      {/* 🎬 Cloudinary Animated Video Hero Section - Exact Home Hero Format, Aspect Ratio & Responsiveness */}
      <section className="relative w-full overflow-hidden bg-[#071728] border-b border-gray-800">
        <div className="relative w-full aspect-[1.8/1] sm:aspect-[2.1/1] md:aspect-[2.4/1] lg:aspect-[2.6/1]">
          
          {/* High-Definition Silent Cloudinary Video Hero */}
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover select-none"
          />
        </div>
      </section>

      {/* Dedicated Journey Scroll Timeline Section */}
      <JourneySection />
    </main>
  );
}
