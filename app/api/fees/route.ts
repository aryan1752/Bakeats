import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Fee } from "@/lib/schemas";
import { getLocalFees, saveLocalFees } from "@/lib/local-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stream = searchParams.get("stream") || undefined;

  let records = getLocalFees();

  try {
    await connectToDatabase();
    const dbFees = await Fee.find({}).lean();
    if (Array.isArray(dbFees) && dbFees.length > 0) {
      const merged = { ...records };
      for (const f of dbFees) {
        const studentId = String(f.student_id);
        merged[studentId] = {
          status: f.status as "paid" | "pending" | "overdue",
          amount: String(f.amount_due || f.amount_paid || "")
        };
      }
      records = merged;
    }
  } catch (err: any) {
    // MongoDB offline fallback
  }

  return NextResponse.json({ success: true, records });
}

export async function POST(request: Request) {
  try {
    const { stream, records } = await request.json();
    if (!records || typeof records !== "object") {
      return NextResponse.json({ success: false, error: "Invalid fee records payload." }, { status: 400 });
    }

    // Always save in persistent local database
    saveLocalFees(records);

    // Try saving in MongoDB as well if available
    try {
      await connectToDatabase();
      for (const [studentId, rec] of Object.entries(records as { [id: string]: { status: string; amount?: string } })) {
        const amountNum = parseFloat(rec.amount || "0") || 0;
        await Fee.findOneAndUpdate(
          { student_id: studentId },
          { 
            status: rec.status,
            amount_due: rec.status === "paid" ? 0 : amountNum,
            amount_paid: rec.status === "paid" ? amountNum : 0
          },
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ success: true, message: "Fee records saved successfully!", records });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
