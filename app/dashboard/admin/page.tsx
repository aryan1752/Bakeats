import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User, Contact, Scholarship } from "@/lib/schemas";
import AdminDashboardClient from "./AdminDashboardClient";
import { LogOut } from "lucide-react";

// Offline Mock Fallbacks
const mockStudentsFallback = [
  {
    _id: "65c3b1a20a1dd7228f2d0002",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "7011731649",
    stream: "foundations",
    parentPhone: "9876543210"
  },
  {
    _id: "65c3b1a20a1dd7228f2d0004",
    name: "Diya Verma",
    email: "diya@gmail.com",
    phone: "8585575250",
    stream: "commerce",
    parentPhone: "8765432109"
  },
  {
    _id: "65c3b1a20a1dd7228f2d0006",
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "9999999999",
    stream: "arts",
    parentPhone: "8888888888"
  }
];

const mockContactsFallback = [
  {
    name: "Rajesh Sharma",
    email: "rajesh@gmail.com",
    message: "Kindly share the morning batch fee schedule for class 9 foundational course.",
    created_at: new Date()
  },
  {
    name: "Sunita Kapoor",
    email: "sunita@gmail.com",
    message: "Does the class 11-12 commerce batch cover business study doubts?",
    created_at: new Date()
  }
];

const mockScholarshipsFallback = [
  {
    student_name: "Aman Gupta",
    email: "aman@gmail.com",
    phone: "9911223344",
    grade: "Class 10th",
    score: 94.2,
    status: "pending"
  },
  {
    student_name: "Ritu Sen",
    email: "ritu@gmail.com",
    phone: "8822334455",
    grade: "Class 12th Commerce",
    score: 89.5,
    status: "pending"
  }
];

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("kvi_session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let session: { id: string; username: string; role: string; name: string };
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

    // Fetch Scholarships
    const scholarshipsList = await Scholarship.find({}).sort({ created_at: -1 }).limit(15).lean();
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

  } catch (err: any) {
    console.warn("MongoDB connection failed in Admin Page, falling back to mock lists:", err.message);
    dbStudents = mockStudentsFallback;
    dbContacts = mockContactsFallback;
    dbScholarships = mockScholarshipsFallback;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#0D2847]/10 flex items-center justify-center text-xl font-bold text-[#0D2847]">
              A
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">KVI Administration Panel</span>
              <h1 className="text-xl font-black text-[#0D2847]">{session.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/api/logout" 
              className="flex items-center gap-2 px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </a>
          </div>
        </div>

        {/* Client workspace tab controller */}
        <AdminDashboardClient 
          students={dbStudents} 
          contacts={dbContacts} 
          scholarships={dbScholarships} 
        />

      </div>
    </div>
  );
}
