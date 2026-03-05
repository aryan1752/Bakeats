import { StickyBanner } from "./sticky-banner";
 
export function StickyBannerDemo() {
  return (
    <div className="relative flex w-full flex-col">
      <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          Simplifying Global Trade Through Strategic Logistics.{" "}
          <a href="https://www.pdgl.in/" className="transition duration-200 hover:underline">
            PND
          </a>
        </p>
      </StickyBanner>
      
    </div>
  );
}
 
