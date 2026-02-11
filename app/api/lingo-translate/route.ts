import { NextResponse } from "next/server";

type TranslateBody = {
  targetLang?: string;
  textMap?: Record<string, string>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TranslateBody;
    const targetLang = body.targetLang;
    const textMap = body.textMap;

    if (!targetLang || !textMap || typeof textMap !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const apiKey = process.env.LINGO_API_KEY;
    if (!apiKey) {
      // graceful fallback: caller keeps local translations
      return NextResponse.json({ translated: null, warning: "LINGO_API_KEY missing" });
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
      const errorText = await response.text();
      return NextResponse.json(
        { translated: null, warning: `Lingo API failed: ${errorText}` },
        { status: 200 },
      );
    }

    const result = (await response.json()) as {
      output?: Record<string, string>;
      translated?: Record<string, string>;
    };

    const translated = result.output ?? result.translated ?? null;
    return NextResponse.json({ translated });
  } catch (error) {
    return NextResponse.json(
      { translated: null, warning: "Translation route error", details: String(error) },
      { status: 200 },
    );
  }
}
