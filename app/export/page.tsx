import { StickyBannerDemo } from "@/components/ui/StickyBannerDemo";
import { GlobeDemo } from "@/components/ui/GlobeDemo";
import TextHoverEffectDemo from "@/components/ui/text-hover-effect-demo";
export default function Export() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <section className="relative">
        <StickyBannerDemo />
        <TextHoverEffectDemo />
        <GlobeDemo />
      </section>
    </main>
  );
}
