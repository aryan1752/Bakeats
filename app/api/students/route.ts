import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/schemas";
import { getLocalStudents, addLocalStudent, deleteLocalStudent } from "@/lib/local-db";

export async function GET(request: Request) {
  let localList = getLocalStudents();

  try {
    await connectToDatabase();
    const result = await User.find({ role: "student" }).lean();
    if (Array.isArray(result) && result.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const s of [...localList, ...result]) {
        const key = String(s._id || s.id);
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(s);
        }
      }
      return NextResponse.json({ success: true, students: merged });
    }
  } catch (err: any) {
    // Offline fallback
  }

  return NextResponse.json({ success: true, students: localList });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, parentPhone, address, grade, stream } = body;

    if (!name || !stream) {
      return NextResponse.json({ success: false, error: "Student name and stream are required." }, { status: 400 });
    }

    const username = email || "student_" + Date.now();
    const newStudentData = {
      _id: body._id || body.id || "student_" + Date.now(),
      id: body.id || body._id || "student_" + Date.now(),
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
      phone: phone || parentPhone || "9876543210",
      parentPhone: parentPhone || phone || "9876543210",
      address: address || "N/A",
      grade: grade || (stream === "foundations" ? "Class 9th" : "Class 11th"),
      stream: stream || "foundations",
      role: "student",
      username,
      password: "password123"
    };

    // Save in persistent local database
    const saved = addLocalStudent(newStudentData);

    // Try saving in MongoDB
    try {
      await connectToDatabase();
      await User.create(newStudentData);
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ success: true, message: "Student added successfully!", student: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing student id" }, { status: 400 });
    }

    deleteLocalStudent(id);

    try {
      await connectToDatabase();
      await User.findByIdAndDelete(id);
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
