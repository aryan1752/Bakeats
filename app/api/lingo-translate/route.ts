import { NextResponse } from "next/server";

type TranslateBody = {
  targetLang?: string;
  textMap?: Record<string, string>;
};

async function translateWithGoogleFallback(
  targetLang: string,
  textMap: Record<string, string>,
): Promise<Record<string, string>> {
  const entries = Object.entries(textMap);

  const translatedEntries = await Promise.all(
    entries.map(async ([k, v]) => {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
          targetLang,
        )}&dt=t&q=${encodeURIComponent(v)}`;

        const res = await fetch(url, { method: "GET" });
        if (!res.ok) return [k, v] as const;

        const raw = (await res.json()) as unknown;
        // format: [[ ["translated", "original", ...], ...], ...]
        const parts = Array.isArray(raw) && Array.isArray(raw[0]) ? (raw[0] as unknown[]) : [];
        const out = parts
          .map((p) => (Array.isArray(p) && typeof p[0] === "string" ? p[0] : ""))
          .join("")
          .trim();

        return [k, out || v] as const;
      } catch {
        return [k, v] as const;
      }
    }),
  );

  return Object.fromEntries(translatedEntries);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TranslateBody;
    const targetLang = body.targetLang;
    const textMap = body.textMap;

    if (!targetLang || !textMap || typeof textMap !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const apiKey = process.env.LINGO_API_KEY;

    // If no key, immediately use fallback translator
    if (!apiKey) {
      const translated = await translateWithGoogleFallback(targetLang, textMap);
      return NextResponse.json({ translated, warning: "LINGO_API_KEY missing; used fallback" });
    }

    // Lingo.dev API call (keep this isolated server-side)
    const response = await fetch("https://api.lingo.dev/v1/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        target_language: targetLang,
        source_language: "en",
        input: textMap,
      }),
    });

    if (!response.ok) {
      // Fallback path if Lingo endpoint/schema/key fails
      const translated = await translateWithGoogleFallback(targetLang, textMap);
      const errorText = await response.text();
      return NextResponse.json(
        { translated, warning: `Lingo API failed; used fallback. Details: ${errorText}` },
        { status: 200 },
      );
    }

    const result = (await response.json()) as {
      output?: Record<string, string>;
      translated?: Record<string, string>;
    };

    const translated = result.output ?? result.translated ?? null;
    if (!translated) {
      const fallback = await translateWithGoogleFallback(targetLang, textMap);
      return NextResponse.json({ translated: fallback, warning: "Lingo empty output; used fallback" });
    }

    return NextResponse.json({ translated });
  } catch (error) {
    try {
      // Best effort: fallback if request body can still be parsed via clone path in caller retries
      return NextResponse.json(
        { translated: null, warning: "Translation route error", details: String(error) },
        { status: 200 },
      );
    } catch {
      return NextResponse.json({ translated: null, warning: "Translation route fatal error" }, { status: 200 });
    }
  }
}
