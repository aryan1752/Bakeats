import { NextResponse } from "next/server";
import { getApprovedReviews } from "@/lib/reviews-db";

export async function GET() {
  try {
    const rows = getApprovedReviews(50);
    const items = rows.map((r) => ({
      id: r.id,
      name: r.name,
      message: r.message,
      createdAt: r.created_at,
      approvedAt: r.approved_at,
    }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
