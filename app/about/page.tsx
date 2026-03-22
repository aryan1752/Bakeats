import { TimelineDemo } from "@/components/ui/TimelineDemo";
import AboutSection from "@/components/ui/AboutSection";
import TeamSection from "@/components/ui/TeamSection";
import  FoundersSection  from "@/components/ui/Founderssection";  
import AboutVideo from "@/components/ui/AboutVideo";

export default function about() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <AboutVideo />
      <AboutSection />
      
      <section className="relative">
        <TimelineDemo />
      </section>
      <TeamSection />
      <FoundersSection />
    </main>
  );
}
