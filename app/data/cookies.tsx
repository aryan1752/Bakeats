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
    name: "COCONUT COOKIE",
    subtitle: "Coconut Crunch",
    description: "Delicious coconut cookies packed with tropical flavor and a light, crunchy texture in every bite.",
    accentColor: "hsl(40, 55%, 55%)",
    accentClass: "accent-butter-gold",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/coconut/nariyal.gif",
    frameCount: 220,
  },
   {
    id: 2,
    name: "CHOCO CHASKAAA",
    subtitle: "Chocolate Loaded",
    description: "Chocolate chip cookies filled with rich cocoa chunks for a soft, indulgent bite and full-on chocolate satisfaction.",
    accentColor: "hsl(350, 65%, 50%)",
    accentClass: "accent-cranberry-red",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/coco/Product_ingredient_burst_202603260041.gif",
    frameCount: 240,
  },
   {
    id: 3,
    name: "MASKAAA COOKIE",
    subtitle: "Buttery & Classic",
    description: "Classic maska cookies with rich buttery flavor and a satisfying crisp bite for everyday munching.",
    accentColor: "hsl(28, 55%, 40%)",
    accentClass: "accent-peanut-brown",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/maskaaa/Product_ingredient_burst_202603252130.gif",
    frameCount: 220,
  },
  {
    id: 4,
    name: "JEERAAA COOKIE",
    subtitle: "Savoury & Crunchy",
    description: "Crispy jeera cookies infused with aromatic cumin for a bold, savoury crunch. A perfect companion for your tea-time cravings.",
    accentColor: "hsl(42, 75%, 55%)",
    accentClass: "accent-butter-gold",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/zeera/Product_with_ingredient_202603252137.gif",
    frameCount: 240,
  },
  {
    id: 5,
    name: "BAADAM COOKIE",
    subtitle: "Nutty & Rich",
    description: "Premium badam cookies packed with roasted almond goodness for a smooth texture and satisfying nutty crunch.",
    accentColor: "hsl(20, 40%, 25%)",
    accentClass: "accent-dark-cocoa",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/almond/Product_mid-spin_ingredient_202603252015.gif",
    frameCount: 240,
  },
  {
    id: 6,
    name: "AAATTA COOKIE",
    subtitle: "Wholesome & Balanced",
    description: "Atta cookies made with whole wheat flour for a light, balanced crunch and an everyday feel-good snack.",
    accentColor: "hsl(35, 45%, 60%)",
    accentClass: "accent-oat-beige",
    webpUrl: "https://sljnhwsjrelakssuvwie.supabase.co/storage/v1/object/public/atta/Product_ingredient_burst_202603252019.gif",
    frameCount: 220,
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

