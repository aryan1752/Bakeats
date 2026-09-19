import { Metadata } from "next";
import AboutSection from "@/components/ui/AboutSection";
import JourneySection from "@/components/ui/JourneySection";
import TeamSection from "@/components/ui/TeamSection";
import FoundersSection from "@/components/ui/Founderssection";  

export const metadata: Metadata = {
  title: "About Us | Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur",
  description: "Learn about Knowledge Venture Institute (KVI) in Hari Nagar, Jaitpur Badarpur 110044. Our mission, qualified faculty, teaching methodology & board preparation excellence for Class 6-12th.",
  keywords: [
    "About Knowledge Venture Institute",
    "Best coaching center in Hari Nagar Jaitpur",
    "Tuition institute in Badarpur Delhi",
    "KVI Faculty Hari Nagar",
    "CS Sanjay Arya Economics",
    "Er Aditya Pratap Singh Maths Physics"
  ]
};

export default function About() {
  return (
    <main className="w-full min-h-screen bg-[#071728] flex flex-col">
      <AboutSection />
      <JourneySection />
      <TeamSection />
      <FoundersSection />
    </main>
  );
}

