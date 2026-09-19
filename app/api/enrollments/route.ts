import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Enrollment } from "@/lib/schemas";

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    try {
      await connectToDatabase();
      await Enrollment.findByIdAndUpdate(id, { status });
    } catch (err: any) {
      console.warn("MongoDB enrollment status update warning:", err.message);
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
