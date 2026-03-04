"use client";

import React, { useEffect, useMemo, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

type ReviewItem = {
  id: number;
  name: string;
  message: string;
};

const fallbackTestimonials = [
  { quote: "Great taste and premium quality cookies. Loved by our whole family.", name: "Riya", title: "Customer" },
  { quote: "Packaging is super clean and cookies are always fresh.", name: "Aman", title: "Customer" },
  { quote: "Bakeats has become my go-to snack with chai every evening.", name: "Nikhil", title: "Customer" },
];

export function InfiniteMovingCardsDemo() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/reviews/approved", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) {
          setReviews(Array.isArray(data?.items) ? data.items : []);
        }
      } catch {
        // silent fallback
      }
    };

    load();
    const timer = setInterval(load, 15000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const items = useMemo(() => {
    const dbItems = reviews.map((r) => ({
      quote: r.message,
      name: r.name,
      title: "Verified Review",
    }));

    return dbItems.length ? dbItems : fallbackTestimonials;
  }, [reviews]);

  return (
    <div className="relative flex w-full flex-col items-center justify-start overflow-hidden bg-black py-0 antialiased dark:bg-black dark:bg-grid-white/[0.05]">
      <InfiniteMovingCards items={items} direction="right" speed="slow" durationSeconds={40} />
    </div>
  );
}
