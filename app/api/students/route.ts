import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/schemas";

let inMemoryStudents: any[] = [];

export async function GET(request: Request) {
  let dbStudents: any[] = [];
  try {
    await connectToDatabase();
    const result = await User.find({ role: "student" }).lean();
    if (Array.isArray(result)) {
      dbStudents = result;
    }
  } catch (err: any) {
    console.warn("GET students DB fetch warning:", err.message);
  }

  const combined = [...inMemoryStudents, ...dbStudents];
  const seen = new Set();
  const students: any[] = [];
  for (const s of combined) {
    const key = String(s._id || s.id);
    if (!seen.has(key)) {
      seen.add(key);
      students.push(s);
    }
  }

  return NextResponse.json({ success: true, students });
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
      _id: "student_" + Date.now(),
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

    inMemoryStudents.unshift(newStudentData);

    try {
      await connectToDatabase();
      await User.create(newStudentData);
    } catch (dbErr) {
      console.warn("MongoDB student create warning:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Student added successfully!", student: newStudentData });
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

    inMemoryStudents = inMemoryStudents.filter(s => String(s._id) !== String(id) && String(s.id) !== String(id));

    try {
      await connectToDatabase();
      await User.findByIdAndDelete(id);
    } catch (dbErr) {
      console.warn("MongoDB student delete warning:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
