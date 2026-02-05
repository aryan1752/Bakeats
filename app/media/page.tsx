import { HeroParallaxDemo } from "@/components/ui/HeroParallaxDemo";
import { SpotlightNewDemo } from "@/components/ui/SpotlightNewDemo";

export default function Media() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <section className="relative">
        <SpotlightNewDemo />
      </section>
              
      <section className="relative mt-20">
        <HeroParallaxDemo />
      </section>
    </main>
  );
}
