import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Scholarship } from "@/lib/schemas";
import { getLocalScholarships, updateLocalScholarshipStatus, addLocalScholarship } from "@/lib/local-db";

export async function GET() {
  let list = getLocalScholarships();
  try {
    await connectToDatabase();
    const dbList = await Scholarship.find({}).sort({ created_at: -1 }).lean();
    if (Array.isArray(dbList) && dbList.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const item of [...list, ...dbList]) {
        const key = String(item._id || item.id);
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      }
      list = merged;
    }
  } catch (err: any) {
    // Offline fallback
  }
  return NextResponse.json({ success: true, scholarships: list });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = addLocalScholarship(body);
    try {
      await connectToDatabase();
      await Scholarship.create(body);
    } catch (dbErr) {
      // Offline fallback
    }
    return NextResponse.json({ success: true, scholarship: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    // Always update in persistent local database
    updateLocalScholarshipStatus(id, status);

    try {
      await connectToDatabase();
      await Scholarship.findByIdAndUpdate(id, { status });
    } catch (err: any) {
      console.warn("MongoDB scholarship status update warning:", err.message);
    }

    return NextResponse.json({ success: true, message: "Status updated successfully", id, status });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
