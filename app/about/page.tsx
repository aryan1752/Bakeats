import { TimelineDemo } from "@/components/ui/TimelineDemo";
import AboutSection from '@/components/ui/AboutSection';

export default function about() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <AboutSection />
      <section className="relative">
       <TimelineDemo />
      </section>
                  
    </main>
  );
}
