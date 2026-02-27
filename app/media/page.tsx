import { HeroParallaxDemo } from "@/components/ui/HeroParallaxDemo";
import { SpotlightNewDemo } from "@/components/ui/SpotlightNewDemo";
import VideoShowcaseCard from "@/components/ui/Videoshowcasecard";

export default function Media() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <section className="relative">
        <SpotlightNewDemo />
      </section>
              
      <section className="relative mt-10">
        <HeroParallaxDemo />
      </section>
      <section className="relative -mt-12 md:-mt-24">
        <VideoShowcaseCard
          videoUrl="https://youtu.be/02ACrF3vHas?si=Ws1dt2sB-iV68d7F"
          channelName="Raj Talks Tech"
          description="talks about how Aceternity UI can help you build awesome landing pages with speed"
        />
      </section>
    </main>
  );
}
