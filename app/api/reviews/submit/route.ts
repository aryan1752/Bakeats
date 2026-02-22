import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createPendingReview, findRecentPendingByIp } from "@/lib/reviews-db";
import { sendReviewModerationMail } from "@/lib/review-mail";

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const message = String(body?.message || "").trim();
    const honeypot = String(body?.website || "").trim();

    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !message) {
      return NextResponse.json({ error: "Name and review are required" }, { status: 400 });
    }

    if (name.length > 80) {
      return NextResponse.json({ error: "Name too long" }, { status: 400 });
    }

    const words = wordCount(message);
    if (words > 30) {
      return NextResponse.json({ error: "Review must be 30 words or less" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (ip !== "unknown" && findRecentPendingByIp(ip, 60)) {
      return NextResponse.json({ error: "Too many submissions. Please wait a minute." }, { status: 429 });
    }

    const token = randomUUID();
    createPendingReview({
      name,
      message,
      submitIp: ip,
      moderationToken: token,
    });

    const baseUrl = process.env.REVIEW_BASE_URL || req.nextUrl.origin;
    const approveUrl = `${baseUrl}/api/reviews/moderate?token=${token}&action=approve`;
    const rejectUrl = `${baseUrl}/api/reviews/moderate?token=${token}&action=reject`;

    await sendReviewModerationMail({ name, message, approveUrl, rejectUrl });

    return NextResponse.json({ ok: true, status: "pending" });
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
