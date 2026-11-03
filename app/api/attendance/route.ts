import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Attendance } from "@/lib/schemas";
import { getLocalAttendance, saveLocalAttendance } from "@/lib/local-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const stream = searchParams.get("stream") || undefined;

  let records = getLocalAttendance(date, stream);

  try {
    await connectToDatabase();
    const dbLogs = await Attendance.find({ date }).lean();
    if (Array.isArray(dbLogs) && dbLogs.length > 0) {
      const merged: { [key: string]: string } = { ...records };
      for (const log of dbLogs) {
        const studentId = String(log.student_id);
        merged[studentId] = log.status;
      }
      records = merged;
    }
  } catch (err: any) {
    // MongoDB offline fallback
  }

  return NextResponse.json({ success: true, date, records });
}

export async function POST(request: Request) {
  try {
    const { date, stream, records } = await request.json();
    if (!records || typeof records !== "object") {
      return NextResponse.json({ success: false, error: "Invalid attendance records payload." }, { status: 400 });
    }

    const targetDate = date || new Date().toISOString().split("T")[0];

    // Always save in persistent local database
    saveLocalAttendance(targetDate, records);

    // Try saving in MongoDB as well if available
    try {
      await connectToDatabase();
      for (const [studentId, status] of Object.entries(records)) {
        await Attendance.findOneAndUpdate(
          { student_id: studentId, date: targetDate },
          { status },
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ success: true, message: "Attendance saved successfully!", date: targetDate, records });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
