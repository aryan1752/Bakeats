"use client";

import { useRef, useState } from "react";
import AddReviewModal from "@/components/ui/AddReviewModal";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;

    if (latest < 80) {
      setIsVisible(true);
    } else if (latest < prev) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsMobileMenuOpen(false); // close menu on scroll down
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
        {/* ── Desktop navbar ── */}
        <Navbar className="px-4 pt-3">
          <NavBody className="bg-black/60">
            <NavbarLogo />
            <NavItems items={navItems} className="text-white" />
            <div className="flex items-center gap-3">
              <NavbarButton
                variant="secondary"
                className="text-white"
                onClick={() => setIsReviewOpen(true)}
              >
                Feedback
              </NavbarButton>
              <NavbarButton
                href="https://blinkit.com/prn/x/prid/735252"
                variant="primary"
              >
                Shop Now
              </NavbarButton>
            </div>
          </NavBody>
        </Navbar>

        {/* ── Mobile navbar ── */}
        <div className="lg:hidden">
          {/* Top bar */}
          <div className="flex w-full items-center justify-between bg-black/70 px-4 py-3 backdrop-blur-md">
            <NavbarLogo />

            {/* Hamburger / Close button */}
            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[2px] w-[22px] bg-white origin-center rounded-full"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-[22px] bg-white origin-center rounded-full"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[2px] w-[22px] bg-white origin-center rounded-full"
              />
            </button>
          </div>

          {/* Slide-down menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden bg-black/90 backdrop-blur-md"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
                  }}
                  className="flex flex-col px-6 pb-6 pt-2"
                >
                  {/* Nav links */}
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.link}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="border-b border-white/10 py-4 text-lg font-semibold tracking-wide text-white/90 transition-colors hover:text-white"
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* CTA buttons */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 flex flex-col gap-3"
                  >
                    <NavbarButton
                      variant="secondary"
                      className="w-full justify-center border border-white/30 text-white"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsReviewOpen(true);
                      }}
                    >
                      Feedback
                    </NavbarButton>
                    <NavbarButton
                      href="https://blinkit.com/prn/x/prid/735252"
                      variant="primary"
                      className="w-full justify-center"
                    >
                      Shop Now
                    </NavbarButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AddReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  );
}