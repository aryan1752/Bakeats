import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { User, Material, Attendance, Schedule, Performance } from "@/lib/schemas";
import { 
  Calendar, 
  Download, 
  FileText, 
  LogOut, 
  Award, 
  CheckCircle, 
  Clock 
} from "lucide-react";

// Offline Mock Fallbacks
const mockGradesFallback = [
  { testName: "Weekly Algebra Test 1", maxMarks: 50, marksObtained: 42, remarks: "Good conceptual understanding." },
  { testName: "Monthly General Science Test 1", maxMarks: 100, marksObtained: 81, remarks: "Active participator in Sunday doubt class." }
];

const mockMaterialsFallback = [
  { title: "Class 10 Quadratic Equations Practice Sheet", type: "dpp", subject: "Maths", file_url: "#", uploaded_at: new Date() },
  { title: "Class 9 Science Gravitation Chapter Notes", type: "notes", subject: "Science", file_url: "#", uploaded_at: new Date() },
  { title: "Class 10 CBSE Math Mock Test Paper 2026", type: "test_paper", subject: "Maths", file_url: "#", uploaded_at: new Date() }
];

const mockSchedulesFallback = [
  { title: "Morning Batch Foundation Maths", date: "Monday - Saturday", time: "08:30 AM - 10:00 AM", subject: "Maths", batch: "foundations" },
  { title: "Special Science Conceptual Batch", date: "Sunday", time: "09:00 AM - 11:30 AM", subject: "Science", batch: "foundations" }
];

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("kvi_session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let session: { id: string; username: string; role: string; name: string; stream: string; email: string; phone: string };
  try {
    session = JSON.parse(sessionCookie);
    if (session.role !== "student") {
      redirect("/login");
    }
  } catch (err) {
    redirect("/login");
  }

  let totalClasses = 10;
  let presentClasses = 9;
  let grades: any[] = [];
  let materials: any[] = [];
  let schedules: any[] = [];

  try {
    await connectToDatabase();

    // 1. Fetch Student attendance stats from MongoDB
    const attendanceRecords = await Attendance.find({ student_id: session.id }).lean();
    if (attendanceRecords.length > 0) {
      totalClasses = attendanceRecords.length;
      presentClasses = attendanceRecords.filter((r: any) => r.status === "present" || r.status === "late").length;
    }

    // 2. Fetch Grades from MongoDB
    const gradesList = await Performance.find({ student_id: session.id }).sort({ _id: -1 }).lean();
    grades = gradesList.map((g: any) => ({
      testName: g.testName,
      maxMarks: g.maxMarks,
      marksObtained: g.marksObtained,
      remarks: g.remarks
    }));

    // 3. Fetch Materials for the student's stream from MongoDB
    const materialsList = await Material.find({ stream: session.stream }).sort({ _id: -1 }).lean();
    materials = materialsList.map((m: any) => ({
      title: m.title,
      type: m.type,
      subject: m.subject,
      file_url: m.file_url,
      uploaded_at: m.uploaded_at
    }));

    // 4. Fetch schedules matching batch/stream from MongoDB
    const schedulesList = await Schedule.find({ batch: session.stream }).lean();
    schedules = schedulesList.map((s: any) => ({
      title: s.title,
      date: s.date,
      time: s.time,
      subject: s.subject,
      batch: s.batch
    }));

    // Fallbacks if MongoDB is connected but returned empty
    if (grades.length === 0) grades = mockGradesFallback;
    if (materials.length === 0) materials = mockMaterialsFallback;
    if (schedules.length === 0) schedules = mockSchedulesFallback;

  } catch (err: any) {
    console.warn("MongoDB connection failed in Student Dashboard, falling back to mock data:", err.message);
    grades = mockGradesFallback;
    materials = mockMaterialsFallback;
    schedules = mockSchedulesFallback;
  }

  const attendanceRate = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 100;

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#0D2847]/10 flex items-center justify-center text-xl font-bold text-[#0D2847]">
              {session.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Logged in as Student</span>
              <h1 className="text-xl font-black text-[#0D2847]">{session.name}</h1>
              <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">Stream: <span className="text-[#F5BE18]">{session.stream}</span></span>
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

        {/* Highlight Metric Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Attendance Card */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Attendance Ratio</span>
              <span className="text-2xl font-black text-[#0D2847] block mt-1">{attendanceRate}%</span>
              <span className="text-[10px] text-gray-500 block mt-1">Total classes tracked: {totalClasses}</span>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-green-500 border-t-transparent flex items-center justify-center text-xs font-bold text-green-600">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>

          {/* Test Performance Card */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Latest Test Performance</span>
              <span className="text-2xl font-black text-[#0D2847] block mt-1">
                {grades.length > 0 ? `${grades[0].marksObtained}/${grades[0].maxMarks}` : "N/A"}
              </span>
              <span className="text-[10px] text-gray-500 block mt-1">
                {grades.length > 0 ? grades[0].testName : "No tests evaluated yet"}
              </span>
            </div>
            <div className="h-16 w-16 rounded-full bg-[#F5BE18]/10 text-[#0D2847] flex items-center justify-center">
              <Award className="h-7 w-7 text-[#F5BE18]" />
            </div>
          </div>

          {/* Current Batch Info */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Assigned Stream Batch</span>
              <span className="text-lg font-black text-[#0D2847] block mt-1 uppercase">{session.stream}</span>
              <span className="text-[10px] text-gray-500 block mt-1">Structured syllabus preparation</span>
            </div>
            <div className="h-16 w-16 rounded-full bg-[#0D2847]/5 text-[#0D2847] flex items-center justify-center">
              <Clock className="h-7 w-7" />
            </div>
          </div>

        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Notes & Test Materials Left (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Download Study Materials */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="h-5 w-5 text-[#F5BE18]" />
                <span>Download Notes / DPP / Mock Test Papers</span>
              </h2>

              <div className="flex flex-col gap-3">
                {materials.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border border-gray-100 p-3.5 rounded-xl hover:bg-gray-50 transition text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-gray-100 text-gray-500 flex items-center justify-center font-bold">
                        {item.type === "notes" ? "📝" : item.type === "dpp" ? "📊" : "📄"}
                      </div>
                      <div>
                        <span className="font-bold text-[#0D2847] block">{item.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                          <span className="uppercase font-bold text-[#F5BE18]">{item.type}</span>
                          <span>•</span>
                          <span>Subject: {item.subject}</span>
                          <span>•</span>
                          <span>Uploaded: {new Date(item.uploaded_at).toISOString().split("T")[0]}</span>
                        </div>
                      </div>
                    </div>

                    <a 
                      href={item.file_url} 
                      className="flex items-center gap-1 bg-[#0D2847] hover:bg-[#0D2847]/90 text-white px-3 py-1.5 rounded text-[10px] font-bold transition font-semibold"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Report cards */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Award className="h-5 w-5 text-[#F5BE18]" />
                <span>Performance Report Cards</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="pb-2">Test Name</th>
                      <th className="pb-2">Max Marks</th>
                      <th className="pb-2">Marks Obtained</th>
                      <th className="pb-2">Percentage</th>
                      <th className="pb-2">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-700">
                    {grades.map((grade, idx) => {
                      const pct = Math.round((grade.marksObtained / grade.maxMarks) * 100);
                      return (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="py-3 font-bold text-[#0D2847]">{grade.testName}</td>
                          <td className="py-3">{grade.maxMarks}</td>
                          <td className="py-3 font-extrabold">{grade.marksObtained}</td>
                          <td className="py-3 text-[#F5BE18] font-black">{pct}%</td>
                          <td className="py-3 text-gray-500 italic">{grade.remarks || "No remarks."}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Schedules Calendar Right (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0D2847] text-white p-6 rounded-2xl shadow-sm border border-[#F5BE18]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#F5BE18]/5 rounded-full filter blur-xl" />
              <h2 className="text-base font-extrabold text-[#F5BE18] mb-4 flex items-center gap-2 border-b border-white/10 pb-3 relative z-10">
                <Calendar className="h-5 w-5" />
                <span>Weekly Lecture Schedule</span>
              </h2>

              <div className="flex flex-col gap-4 relative z-10 text-xs">
                {schedules.map((schedule, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition">
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">{schedule.batch} Stream</span>
                    <span className="font-extrabold text-white block mt-1">{schedule.title}</span>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2">
                      <span>{schedule.date}</span>
                      <span className="text-[#F5BE18] font-bold">{schedule.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
