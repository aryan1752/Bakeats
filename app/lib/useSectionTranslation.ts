"use client";

import { useEffect, useState } from "react";

export type LangCode = "en" | "hi" | "es" | "ar" | "fr-CA" | "de" | "nl-BE";

const ALLOWED: LangCode[] = ["en", "hi", "es", "ar", "fr-CA", "de", "nl-BE"];

export function useSectionTranslation<T extends Record<string, string>>(
  enCopy: T,
  forcedLang?: LangCode,
  fallbackMap?: Partial<Record<LangCode, Partial<T>>>,
) {
  const [lang, setLang] = useState<LangCode>(forcedLang ?? "en");
  const [copy, setCopy] = useState<T>(enCopy);

  useEffect(() => {
    if (forcedLang) {
      setLang(forcedLang);
      return;
    }

    const saved = window.localStorage.getItem("site_lang") as LangCode | null;
    if (saved && ALLOWED.includes(saved)) setLang(saved);
  }, [forcedLang]);

  useEffect(() => {
    let cancelled = false;
    window.localStorage.setItem("site_lang", lang);

    const run = async () => {
      if (lang === "en") {
        setCopy(enCopy);
        return;
      }

      if (fallbackMap?.[lang]) {
        setCopy({ ...enCopy, ...(fallbackMap[lang] as Partial<T>) });
      }

      try {
        const res = await fetch("/api/lingo-translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLang: lang, textMap: enCopy }),
        });

        const data = (await res.json()) as { translated?: Partial<T> };
        if (!cancelled && data.translated) {
          setCopy({ ...enCopy, ...data.translated });
        }
      } catch {
        if (!cancelled) setCopy(enCopy);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [lang, enCopy]);

  return { lang, copy };
}
