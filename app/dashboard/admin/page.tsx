import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User, Contact, Scholarship, Enrollment } from "@/lib/schemas";
import { 
  getLocalStudents, 
  getLocalContacts, 
  getLocalScholarships, 
  getLocalEnrollments,
  getLocalAttendance,
  getLocalFees
} from "@/lib/local-db";
import AdminDashboardClient from "./AdminDashboardClient";

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

  // Load from persistent local database as primary reliable baseline
  let dbStudents: any[] = getLocalStudents();
  let dbContacts: any[] = getLocalContacts();
  let dbScholarships: any[] = getLocalScholarships();
  let dbEnrollments: any[] = getLocalEnrollments();
  let dbAttendance = getLocalAttendance();
  let dbFees = getLocalFees();

  // If MongoDB is reachable, merge latest records
  try {
    await connectToDatabase();
    
    // Fetch students from DB
    const users = await User.find({ role: "student" }).lean();
    if (Array.isArray(users) && users.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const u of [...users, ...dbStudents]) {
        const id = u._id ? u._id.toString() : u.id;
        if (!seen.has(id)) {
          seen.add(id);
          merged.push({
            _id: id,
            id: id,
            name: u.name,
            email: u.email || "",
            phone: u.phone || "",
            stream: u.stream || "foundations",
            grade: u.grade || "",
            address: u.address || "",
            parentPhone: u.parentPhone || ""
          });
        }
      }
      dbStudents = merged;
    }

    // Fetch Contacts from DB
    const contactsList = await Contact.find({}).sort({ created_at: -1 }).limit(20).lean();
    if (Array.isArray(contactsList) && contactsList.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const c of [...contactsList, ...dbContacts]) {
        const id = c._id ? c._id.toString() : c.email + c.created_at;
        if (!seen.has(id)) {
          seen.add(id);
          merged.push({
            _id: id,
            name: c.name,
            email: c.email,
            message: c.message,
            created_at: c.created_at
          });
        }
      }
      dbContacts = merged;
    }

    // Fetch Scholarships from DB
    const scholarshipsList = await Scholarship.find({}).sort({ created_at: -1 }).limit(25).lean();
    if (Array.isArray(scholarshipsList) && scholarshipsList.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const s of [...scholarshipsList, ...dbScholarships]) {
        const id = s._id ? s._id.toString() : s.email + s.phone;
        if (!seen.has(id)) {
          seen.add(id);
          merged.push({
            _id: id,
            student_name: s.student_name,
            email: s.email,
            phone: s.phone,
            grade: s.grade,
            score: s.score,
            status: s.status,
            age: s.age || null,
            academic_achievements: s.academic_achievements || null,
            why_join: s.why_join || null,
            preferred_stream: s.preferred_stream || null,
            created_at: s.created_at
          });
        }
      }
      dbScholarships = merged;
    }

    // Fetch Direct Enrollments from DB
    const enrollmentsList = await Enrollment.find({}).sort({ created_at: -1 }).limit(25).lean();
    if (Array.isArray(enrollmentsList) && enrollmentsList.length > 0) {
      const seen = new Set();
      const merged: any[] = [];
      for (const e of [...enrollmentsList, ...dbEnrollments]) {
        const id = e._id ? e._id.toString() : e.phone + e.stream;
        if (!seen.has(id)) {
          seen.add(id);
          merged.push({
            _id: id,
            student_name: e.student_name,
            phone: e.phone,
            email: e.email,
            stream: e.stream,
            school_or_city: e.school_or_city,
            status: e.status,
            created_at: e.created_at
          });
        }
      }
      dbEnrollments = merged;
    }

  } catch (err: any) {
    console.warn("MongoDB connection offline in Admin Page, using persistent local DB:", err.message);
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 pt-0 md:pt-4 p-0 m-0">
      {/* Client workspace tab controller */}
      <AdminDashboardClient 
        students={dbStudents} 
        contacts={dbContacts} 
        scholarships={dbScholarships}
        enrollments={dbEnrollments}
        initialAttendance={dbAttendance}
        initialFees={dbFees}
      />
    </div>
  );
}
