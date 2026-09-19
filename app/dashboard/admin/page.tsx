import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User, Contact, Scholarship, Enrollment } from "@/lib/schemas";
import AdminDashboardClient from "./AdminDashboardClient";
import { LogOut } from "lucide-react";

// Offline Mock Fallbacks
const mockStudentsFallback: any[] = [];

const mockContactsFallback = [
  {
    name: "Rajesh Sharma",
    email: "rajesh@gmail.com",
    message: "Kindly share the morning batch fee schedule for class 9 foundational course.",
    created_at: new Date()
  }
];

const mockScholarshipsFallback = [
  {
    student_name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "9876543210",
    grade: "Class 10",
    score: 92,
    status: "approved",
    age: 15,
    academic_achievements: "School topper in 9th grade Science olympiad.",
    why_join: "Want strong conceptual base for 10th boards.",
    preferred_stream: "foundations"
  }
];

const mockEnrollmentsFallback = [
  {
    student_name: "Aakash Malhotra",
    phone: "9811223344",
    email: "aakash@gmail.com",
    stream: "Class 11-12th Science",
    school_or_city: "DPS Mathura Road / Delhi",
    status: "pending",
    created_at: new Date()
  },
  {
    student_name: "Sneha Kapoor",
    phone: "9877665544",
    email: "sneha@gmail.com",
    stream: "Class 9-10th Foundations",
    school_or_city: "KV Andrews Ganj / Delhi",
    status: "contacted",
    created_at: new Date()
  }
];

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("kvi_session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let session: any = null;
  try {
    session = JSON.parse(sessionCookie);
    if (session.role !== "admin") {
      redirect("/login");
    }
  } catch (err) {
    redirect("/login");
  }

  let dbStudents: any[] = [];
  let dbContacts: any[] = [];
  let dbScholarships: any[] = [];
  let dbEnrollments: any[] = [];

  try {
    await connectToDatabase();
    
    // Fetch students
    const users = await User.find({ role: "student" }).lean();
    dbStudents = users.map((u: any) => ({
      _id: u._id.toString(),
      name: u.name,
      email: u.email || "",
      phone: u.phone || "",
      stream: u.stream || "foundations",
      parentPhone: u.parentPhone || ""
    }));

    // Fetch Contacts
    const contactsList = await Contact.find({}).sort({ created_at: -1 }).limit(15).lean();
    dbContacts = contactsList.map((c: any) => ({
      name: c.name,
      email: c.email,
      message: c.message,
      created_at: c.created_at
    }));

    // Fetch Scholarships (Form 2 Reports)
    const scholarshipsList = await Scholarship.find({}).sort({ created_at: -1 }).limit(20).lean();
    dbScholarships = scholarshipsList.map((s: any) => ({
      student_name: s.student_name,
      email: s.email,
      phone: s.phone,
      grade: s.grade,
      score: s.score,
      status: s.status,
      age: s.age || null,
      academic_achievements: s.academic_achievements || null,
      why_join: s.why_join || null,
      preferred_stream: s.preferred_stream || null
    }));

    // Fetch Direct Enrollments (Form 1 Reports)
    const enrollmentsList = await Enrollment.find({}).sort({ created_at: -1 }).limit(20).lean();
    dbEnrollments = enrollmentsList.map((e: any) => ({
      student_name: e.student_name,
      phone: e.phone,
      email: e.email,
      stream: e.stream,
      school_or_city: e.school_or_city,
      status: e.status,
      created_at: e.created_at
    }));

  } catch (err: any) {
    console.warn("MongoDB connection failed in Admin Page, falling back to mock lists:", err.message);
    dbStudents = mockStudentsFallback;
    dbContacts = mockContactsFallback;
    dbScholarships = mockScholarshipsFallback;
    dbEnrollments = mockEnrollmentsFallback;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 pt-0 md:pt-4 p-0 m-0">
      {/* Client workspace tab controller */}
      <AdminDashboardClient 
        students={dbStudents} 
        contacts={dbContacts} 
        scholarships={dbScholarships}
        enrollments={dbEnrollments}
      />
    </div>
  );
}
