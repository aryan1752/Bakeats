import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Attendance, Schedule } from "@/lib/schemas";
import { getMaterialsAction } from "@/lib/coaching-actions";
import { 
  Calendar, 
  Download, 
  FileText, 
  LogOut, 
  CheckCircle, 
  Clock
} from "lucide-react";

// Offline Mock Fallbacks
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
  let materials: any[] = [];
  let schedules: any[] = [];

  // Fetch materials matching student stream dynamically (handles DB + live fallback)
  materials = await getMaterialsAction(session.stream || "foundations");

  try {
    await connectToDatabase();

    // 1. Fetch Student attendance stats from MongoDB
    const attendanceRecords = await Attendance.find({ student_id: session.id }).lean();
    if (attendanceRecords.length > 0) {
      totalClasses = attendanceRecords.length;
      presentClasses = attendanceRecords.filter((r: any) => r.status === "present" || r.status === "late").length;
    }

    // 2. Fetch schedules matching batch/stream from MongoDB
    const schedulesList = await Schedule.find({ batch: session.stream }).lean();
    schedules = schedulesList.map((s: any) => ({
      title: s.title,
      date: s.date,
      time: s.time,
      subject: s.subject,
      batch: s.batch
    }));

    if (schedules.length === 0) schedules = mockSchedulesFallback;

  } catch (err: any) {
    console.warn("MongoDB connection failed in Student Dashboard, using fallback schedules:", err.message);
    schedules = mockSchedulesFallback;
  }

  const attendanceRate = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 100;

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#071728] text-gray-800 dark:text-gray-100 py-4 sm:py-8 px-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#0D2847]/10 dark:bg-[#F5BE18]/20 flex items-center justify-center text-lg sm:text-xl font-bold text-[#0D2847] dark:text-[#F5BE18] shrink-0">
              {session.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider block">Logged in as Student</span>
              <h1 className="text-lg sm:text-xl font-black text-[#0D2847] dark:text-white truncate">{session.name}</h1>
              <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block mt-0.5 truncate">
                Stream: <span className="text-[#F5BE18] font-bold">{session.stream === "foundations" ? "Class 9-10th Foundations" : session.stream === "science" ? "Class 11-12th Science" : session.stream === "commerce" ? "Class 11-12th Commerce" : "Class 11-12th Arts"}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <a 
              href="/api/logout" 
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold transition w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </a>
          </div>
        </div>

        {/* Highlight Metric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Attendance Card */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Attendance Ratio</span>
              <span className="text-xl sm:text-2xl font-black text-[#0D2847] dark:text-white block mt-1">{attendanceRate}%</span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mt-1 truncate">Total classes tracked: {totalClasses}</span>
            </div>
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-green-500 border-t-transparent flex items-center justify-center text-xs font-bold text-green-600 shrink-0">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            </div>
          </div>

          {/* Current Batch Info */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Assigned Stream Batch</span>
              <span className="text-xs sm:text-sm font-black text-[#0D2847] dark:text-white block mt-1 uppercase truncate">{session.stream === "foundations" ? "Class 9-10th Foundations" : session.stream === "science" ? "Class 11-12th Science" : session.stream === "commerce" ? "Class 11-12th Commerce" : "Class 11-12th Arts"}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mt-1 truncate">Structured syllabus preparation</span>
            </div>
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#0D2847]/5 dark:bg-white/10 text-[#0D2847] dark:text-[#F5BE18] flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>
          </div>

        </div>

        {/* Dashboard Panels */}
        <div className="w-full">
          
          {/* Download Study Materials */}
          <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800/80 p-4 sm:p-6 rounded-2xl shadow-sm w-full">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0D2847] dark:text-white mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 leading-snug">
              <FileText className="h-5 w-5 text-[#F5BE18] shrink-0" />
              <span>Download Notes / DPP / Mock Test Papers ({session.stream === "foundations" ? "Class 9-10th" : session.stream === "science" ? "Science" : session.stream === "commerce" ? "Commerce" : "Arts"})</span>
            </h2>

            <div className="flex flex-col gap-3">
              {materials.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 dark:border-gray-800/90 p-3 sm:p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100/60 dark:hover:bg-white/10 transition text-xs">
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <div className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center text-sm font-bold shrink-0 shadow-sm mt-0.5 sm:mt-0">
                      {item.type === "notes" ? "📝" : item.type === "dpp" ? "📊" : "📄"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-[#0D2847] dark:text-white block text-xs sm:text-sm leading-tight break-words">{item.title}</span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
                        <span className="uppercase font-bold text-[#F5BE18]">{item.type === "dpp" ? "DPP / Assignment" : item.type === "notes" ? "Lecture Notes" : "Mock Test Paper"}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Subject: <strong className="text-gray-700 dark:text-gray-300">{item.subject}</strong></span>
                        <span>•</span>
                        <span>Uploaded: {new Date(item.uploaded_at).toISOString().split("T")[0]}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={item.file_url} 
                    className="flex items-center justify-center gap-1.5 bg-[#0D2847] dark:bg-[#F5BE18] hover:bg-[#0D2847]/90 dark:hover:bg-[#e0ac10] text-white dark:text-[#0D2847] px-3.5 py-2 rounded-lg text-[11px] font-bold transition shrink-0 self-stretch sm:self-center w-full sm:w-auto shadow-sm active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

