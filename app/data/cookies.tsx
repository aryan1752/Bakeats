export interface CookieVariant {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  accentClass: string;
  webpUrl: string;
  frameCount: number;
}

export const cookieVariants: CookieVariant[] = [
  {
    id: 1,
    name: "JEERAAA COOKIE",
    subtitle: "Classic Cookie",
    description: "Golden butter cookie with roasted almond crunch and a smooth, melt-in-mouth texture.",
    accentColor: "hsl(42, 75%, 55%)",
    accentClass: "accent-butter-gold",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/atta/ezgif-49b57048039d155f.webp",
    frameCount: 240,
  },
  {
    id: 2,
    name: "BAADAM COOKIE",
    subtitle: "Indulgent Cookie",
    description: "Soft-baked chocolate cookie loaded with molten chocolate pieces for maximum indulgence.",
    accentColor: "hsl(20, 40%, 25%)",
    accentClass: "accent-dark-cocoa",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/atta/ezgif-49b57048039d155f.webp",
    frameCount: 240,
  },
  {
    id: 3,
    name: "AAATTA COOKIE",
    subtitle: "Wholesome Cookie",
    description: "Chewy oats blended with juicy raisins and subtle spice for a balanced, comforting bite.",
    accentColor: "hsl(35, 45%, 60%)",
    accentClass: "accent-oat-beige",
    webpUrl: "",
    frameCount: 220,
  },
  {
    id: 4,
    name: "MAST JAAAM COOKIE",
    subtitle: "Nutty Cookie",
    description: "Rich peanut butter cookie with a cracked surface and deep roasted nut flavor.",
    accentColor: "hsl(28, 55%, 40%)",
    accentClass: "accent-peanut-brown",
    webpUrl: "",
    frameCount: 220,
  },
  {
    id: 5,
    name: "CHOCO CHASKAAA",
    subtitle: "Gourmet Cookie",
    description: "Creamy white chocolate balanced with tangy cranberry bursts for a premium, festive taste.",
    accentColor: "hsl(350, 65%, 50%)",
    accentClass: "accent-cranberry-red",
    webpUrl: "",
    frameCount: 240,
  },
];

export const navigationLinks = [
  { name: "Cookies", href: "#cookies" },
  { name: "Ingredients", href: "#ingredients" },
  { name: "Our Process", href: "#process" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

