"use client";

import { useRef, useState } from "react";
import AddReviewModal from "@/components/ui/AddReviewModal";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  MobileNav,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Media", link: "/media" },
  { name: "Export", link: "/export" },
];

export default function BakeatsNavbar() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;

    if (latest < 80) {
      setIsVisible(true);
    } else if (latest < prev) {
      // scrolling up
      setIsVisible(true);
    } else {
      // scrolling down
      setIsVisible(false);
    }

    lastY.current = latest;
  });

  return (
    <>
      <motion.div
        animate={{ y: isVisible ? 0 : -110, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <Navbar className="px-4 pt-3">
          <NavBody className="bg-black/60">
            <NavbarLogo />
            <NavItems items={navItems} className="text-white" />
            <div className="flex items-center gap-3">
              <NavbarButton variant="secondary" className="text-white" onClick={() => setIsReviewOpen(true)}>
                Add Review
              </NavbarButton>
             <NavbarButton href="https://blinkit.com/prn/x/prid/735252" variant="primary">
  Shop Now
</NavbarButton>
            </div>
          </NavBody>

          <MobileNav className="bg-black/60">
            <div className="flex w-full items-center gap-3 overflow-x-auto px-2 py-1 [&::-webkit-scrollbar]:hidden">
              <NavbarLogo />
              <div className="flex min-w-max items-center gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="rounded-full px-2 py-1 text-xs font-medium text-white/90"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="ml-auto flex min-w-max items-center gap-2">
                <NavbarButton
                  variant="secondary"
                  className="px-2 py-1 text-xs text-white"
                  onClick={() => setIsReviewOpen(true)}
                >
                  Add Review
                </NavbarButton>
              <NavbarButton href="https://blinkit.com/prn/x/prid/735252" variant="primary" className="px-3 py-1 text-xs">
  Shop Now
</NavbarButton>
              </div>
            </div>
          </MobileNav>
        </Navbar>
      </motion.div>

      <AddReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  );
}
