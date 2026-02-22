"use client";

import { useRef, useState } from "react";
import AddReviewModal from "@/components/ui/AddReviewModal";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              <NavbarButton href="/" variant="primary">
                Shop Now
              </NavbarButton>
            </div>
          </NavBody>

          <MobileNav className="bg-black/60">
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-700 dark:text-neutral-200"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-3">
                <NavbarButton
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsReviewOpen(true);
                  }}
                >
                  Add Review
                </NavbarButton>
                <NavbarButton href="/" variant="dark" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Shop Now
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </motion.div>

      <AddReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  );
}
