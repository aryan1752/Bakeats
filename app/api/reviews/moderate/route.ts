import { NextRequest, NextResponse } from "next/server";
import { moderateReviewByToken } from "@/lib/reviews-db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const action = req.nextUrl.searchParams.get("action");

  if (!token || (action !== "approve" && action !== "reject")) {
    return new NextResponse("Invalid moderation link", { status: 400 });
  }

  const ok = moderateReviewByToken({ token, action });
  if (!ok) {
    return new NextResponse("Review not found or already handled", { status: 404 });
  }

  return new NextResponse(
    `<html><body style="font-family:Arial;padding:24px"><h2>Review ${action}d successfully.</h2><p>You can close this tab.</p></body></html>`,
    { headers: { "content-type": "text/html" } },
  );
}
