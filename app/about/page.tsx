import { TimelineDemo } from "@/components/ui/TimelineDemo";
import AboutSection from "@/components/ui/AboutSection";
import TeamSection from "@/components/ui/TeamSection";

export default function about() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <AboutSection />
      
      <section className="relative">
        <TimelineDemo />
      </section>
      <TeamSection />
    </main>
  );
}
