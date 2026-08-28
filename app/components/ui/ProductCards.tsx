"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, MessageCircle, ShoppingCart, Minus, Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  whatsappNumber: string;
  buyNowUrl?: string;
  badge?: string; // e.g. "IPL Special", "New", "Sale"
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function ProductDetailPage({ product, onClose }: { product: Product; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const waMessage = encodeURIComponent(
    `Hi! I'd like to order:\n\n*${product.name}*\nQty: ${quantity}\nPrice: ₹${product.price} × ${quantity} = ₹${product.price * quantity}\n\nPlease confirm! 🍪`
  );
  const waUrl = `https://wa.me/${product.whatsappNumber}?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/8 hover:bg-black/15 transition"
        >
          <X className="h-5 w-5 text-black" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* ── LEFT: Image ── */}
          <div className="relative bg-[#f5f0eb] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden min-h-[320px] md:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={product.images[imgIndex]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 w-full h-full object-contain p-10"
              />
            </AnimatePresence>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                {product.badge}
              </div>
            )}

            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition"
                >
                  <ChevronLeft className="h-4 w-4 text-black" />
                </button>
                <button
                  onClick={() => setImgIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition"
                >
                  <ChevronRight className="h-4 w-4 text-black" />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`h-12 w-12 rounded-lg overflow-hidden border-2 transition ${
                      i === imgIndex ? "border-orange-500" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="flex flex-col justify-between p-7 md:p-10">
            <div>
              {/* Brand */}
              <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase mb-2">Bakeats</p>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight mb-2">
                {product.name}
              </h1>

              {/* Subtitle */}
              {product.subtitle && (
                <p className="text-sm tracking-widest text-neutral-400 uppercase mb-5">
                  {product.subtitle}
                </p>
              )}

              {/* Price row */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl font-bold text-neutral-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-neutral-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-600 mb-8">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs tracking-widest text-neutral-400 uppercase mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 items-center justify-center hover:bg-neutral-100 transition"
                    >
                      <Minus className="h-3.5 w-3.5 text-neutral-700" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-10 w-10 items-center justify-center hover:bg-neutral-100 transition"
                    >
                      <Plus className="h-3.5 w-3.5 text-neutral-700" />
                    </button>
                  </div>
                  <span className="text-sm text-neutral-500">
                    Total: <span className="font-semibold text-neutral-900">₹{(product.price * quantity).toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition"
              >
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp · ₹{(product.price * quantity).toLocaleString()}
              </a>
              {product.buyNowUrl && (
                <a
                  href={product.buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-neutral-900 px-6 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now on Blinkit
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="cursor-pointer group flex-shrink-0 w-[240px] md:w-auto"
    >
      {/* Image box */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f5f0eb] mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
            {product.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <p className="text-sm font-medium text-neutral-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors">
        {product.name}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-800 font-semibold">₹{product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ProductCardsSection() {
  const [selected, setSelected] = useState<Product | null>(null);

  // 👇 Replace placeholder images with your actual URLs
  const products: Product[] = [
    {
      id: 1,
      name: "Naaariyal Cookie Pack",
      subtitle: "Coconut Crunch",
      description: "Delicious coconut cookies packed with tropical flavor and a light, crunchy texture in every bite.",
      price: 299,
      originalPrice: 399,
      badge: "IPL Special 🏏",
      images: [
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304473/nariyal_m4bdko.png",
        // add more images
      ],
      whatsappNumber: "919266565336",
      buyNowUrl: "https://blinkit.com/prn/x/prid/735252",
    },
    {
      id: 2,
      name: "Jeera Cookie Pack",
      subtitle: "Cumin Crisp",
      description: "A savory-sweet cookie with the bold aroma of roasted jeera — uniquely Indian, utterly addictive.",
      price: 249,
      originalPrice: 329,
      badge: "Fan Favourite",
      images: [
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304473/nariyal_m4bdko.png",
        // add more images
      ],
      whatsappNumber: "919266565336",
      buyNowUrl: "https://blinkit.com/prn/x/prid/735252",
    },
    {
      id: 3,
      name: "Ajwain Cookie Pack",
      subtitle: "Carom Crunch",
      description: "Light, flaky cookies infused with ajwain for a distinct flavor that lingers long after the last bite.",
      price: 249,
      originalPrice: 329,
      images: [
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304473/nariyal_m4bdko.png",
      ],
      whatsappNumber: "919266565336",
      buyNowUrl: "https://blinkit.com/prn/x/prid/735252",
    },
    {
      id: 4,
      name: "Combo Pack (All 3)",
      subtitle: "Best Value",
      description: "Get all three signature flavors in one box — Naaariyal, Jeera, and Ajwain. Perfect for sharing during match nights!",
      price: 699,
      originalPrice: 999,
      badge: "Best Value 🔥",
      images: [
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770304473/nariyal_m4bdko.png",
      ],
      whatsappNumber: "919266565336",
      buyNowUrl: "https://blinkit.com/prn/x/prid/735252",
    },
  ];

  return (
    <>
      <section className="bg-[#f8f4f0] py-16 px-6 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-0">

            {/* Left heading */}
            <div className="md:w-[280px] flex-shrink-0 md:sticky md:top-24">
              <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight uppercase tracking-tight">
                Bakeats
                <br />
                Special
                <br />
                Combos
              </h2>
              <p className="mt-4 text-sm text-neutral-500 max-w-[200px]">
                Handcrafted for the IPL season. Click any pack to order.
              </p>
            </div>

            {/* Cards — horizontal scroll on mobile, grid on desktop */}
            <div className="flex-1 overflow-x-auto md:overflow-visible">
              <div className="flex md:grid md:grid-cols-4 gap-6 pb-4 md:pb-0 min-w-max md:min-w-0">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Detail overlay */}
      <AnimatePresence>
        {selected && (
          <ProductDetailPage product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}