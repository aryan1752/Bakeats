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
          channelName=""
          description="Listen to our founder discuss the journey of building Bakeats and the strategy behind our products and growth."
        />
      </section>
    </main>
  );
}
