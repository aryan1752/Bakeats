"use client";

import { useState } from "react";
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

  return (
    <Navbar className="px-4 pt-3">
      <NavBody className="bg-black/60">
        <NavbarLogo />
        <NavItems items={navItems} className="text-white" />
        <div className="flex items-center gap-3">
          <NavbarButton href="/media" variant="secondary" className="text-white">
            Our Story
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
            <NavbarButton href="/media" variant="primary" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              Our Story
            </NavbarButton>
            <NavbarButton href="/" variant="dark" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              Shop Now
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
