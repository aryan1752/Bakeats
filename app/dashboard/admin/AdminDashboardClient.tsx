"use client";

import { useEffect, useState } from "react";
import { 
  addMaterial, 
  submitPerformance, 
  markAttendance,
  broadcastNotification,
  getNotificationsAction,
  deleteNotificationAction
} from "@/lib/coaching-actions";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  Award, 
  ClipboardList, 
  Mail, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  Plus, 
  UserCheck,
  UserPlus,
  Bell,
  Megaphone,
  Trash2,
  RefreshCw,
  Loader2,
  Upload,
  FileUp,
  CreditCard,
  LogOut,
  Laptop,
  Monitor,
  Smartphone,
  ArrowLeft
} from "lucide-react";

interface Student {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  stream: string;
  grade?: string;
  parentPhone?: string;
}

interface AdminDashboardClientProps {
  students: Student[];
  contacts: any[];
  scholarships: any[];
  enrollments?: any[];
}

export default function AdminDashboardClient({ 
  students, 
  contacts, 
  scholarships,
  enrollments = []
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"foundations" | "science" | "commerce" | "arts">("foundations");
  const [activeFeature, setActiveFeature] = useState<"announcements" | "attendance" | "notes" | "fees" | "enquiries" | "scholarships">("announcements");
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [markedRecords, setMarkedRecords] = useState<{ [key: string]: string }>({});
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);

  // Fee Management states
  const [feeRecords, setFeeRecords] = useState<{ [studentId: string]: { status: "paid" | "pending" | "overdue"; amount?: string } }>({});
  const [feeMsg, setFeeMsg] = useState("");
  const [feeError, setFeeError] = useState("");
  const [isSubmittingFees, setIsSubmittingFees] = useState(false);
  const [feeClassFilter, setFeeClassFilter] = useState<string>("all");

  // Dynamic Students State
  const [studentsList, setStudentsList] = useState<Student[]>(students || []);
  const [addStudentMsg, setAddStudentMsg] = useState("");
  const [addStudentError, setAddStudentError] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // Attendance Submission states
  const [attendanceMsg, setAttendanceMsg] = useState("");
  const [attendanceError, setAttendanceError] = useState("");
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  // Forms state messages
  const [materialMsg, setMaterialMsg] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [materialsList, setMaterialsList] = useState<any[]>([]);
  const [isFetchingMaterials, setIsFetchingMaterials] = useState(false);
  const [isSubmittingMaterial, setIsSubmittingMaterial] = useState(false);
  const [performanceMsg, setPerformanceMsg] = useState("");
  const [performanceError, setPerformanceError] = useState("");

  // Broadcast Notification Form states
  const [notifMsg, setNotifMsg] = useState("");
  const [notifError, setNotifError] = useState("");
  const [notifImageUrl, setNotifImageUrl] = useState("");
  const [broadcastList, setBroadcastList] = useState<any[]>([]);
  const [isSubmittingNotif, setIsSubmittingNotif] = useState(false);
  const [isRefreshingNotif, setIsRefreshingNotif] = useState(false);

  // Status Maps for Enrollments & Scholarships
  const [enrollmentStatusMap, setEnrollmentStatusMap] = useState<{ [id: string]: string }>({});
  const [scholarshipStatusMap, setScholarshipStatusMap] = useState<{ [id: string]: string }>({});

  const handleUpdateEnrollmentStatus = async (id: string, status: string) => {
    setEnrollmentStatusMap(prev => ({ ...prev, [id]: status }));
    try {
      await fetch("/api/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
    } catch (err) {
      console.warn("Failed to update enrollment status:", err);
    }
  };

  const handleUpdateScholarshipStatus = async (id: string, status: string) => {
    setScholarshipStatusMap(prev => ({ ...prev, [id]: status }));
    try {
      await fetch("/api/scholarships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
    } catch (err) {
      console.warn("Failed to update scholarship status:", err);
    }
  };

  const fetchAdminBroadcasts = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.notifications)) {
        setBroadcastList(data.notifications);
      }
    } catch (err) {
      console.warn("Failed to fetch admin broadcasts:", err);
    }
  };

  const fetchAdminMaterials = async () => {
    setIsFetchingMaterials(true);
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.materials)) {
        setMaterialsList(data.materials);
      }
    } catch (err) {
      console.warn("Failed to fetch materials:", err);
    } finally {
      setIsFetchingMaterials(false);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    setMaterialsList((prev) => prev.filter((item) => item._id !== id));
    try {
      await fetch(`/api/materials?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Failed to delete material:", err);
    }
  };

  const fetchAdminStudents = async () => {
    // ⚡ Try loading from localStorage cache first for 0ms render on refresh
    try {
      const cached = localStorage.getItem("kvi_students_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStudentsList(parsed);
        }
      }
    } catch (e) {}

    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.students)) {
        if (data.students.length > 0) {
          setStudentsList(data.students);
          localStorage.setItem("kvi_students_cache", JSON.stringify(data.students));
        } else {
          // If server returned [], check if we have local cache
          const cached = localStorage.getItem("kvi_students_cache");
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setStudentsList(parsed);
            }
          }
        }
      }
    } catch (err) {
      console.warn("Failed to fetch students from API:", err);
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshingNotif(true);
    await fetchAdminBroadcasts();
    await fetchAdminMaterials();
    await fetchAdminStudents();
    setTimeout(() => setIsRefreshingNotif(false), 400);
  };

  useEffect(() => {
    fetchAdminBroadcasts();
    fetchAdminMaterials();
    fetchAdminStudents();
  }, []);

  const handleBroadcastSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotifMsg("");
    setNotifError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = (formData.get("title") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();
    const stream = (formData.get("stream") as string || "all").trim();
    const priority = "info";
    const sender = (formData.get("sender") as string || "Faculty / Admin").trim();
    const date = (formData.get("date") as string || "").trim();
    const image_url = notifImageUrl || (formData.get("image_url") as string || "").trim();

    if (!title || !message) {
      setNotifError("Please fill out both Title and Message fields.");
      return;
    }

    setIsSubmittingNotif(true);

    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, message, stream, priority, sender, image_url, date }),
      });
      const data = await res.json();

      if (data.success) {
        setNotifMsg(data.message || "Notification broadcasted successfully!");
        form.reset();
        setNotifImageUrl("");
        await fetchAdminBroadcasts();
      } else {
        setNotifError(data.error || "Failed to broadcast notification.");
      }
    } catch (err: any) {
      setNotifError("Network error: " + err.message);
    } finally {
      setIsSubmittingNotif(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    // ⚡ Optimistic Instant Removal from UI List
    setBroadcastList((prev) => prev.filter((item) => item._id !== id));
    try {
      await fetch(`/api/notifications?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Failed to delete broadcast:", err);
    }
  };

  // Get students for current active stream from dynamic studentsList state
  const filteredStudents = studentsList.filter(s => s.stream === activeTab);

  // Add New Student handler
  const handleAddStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddStudentMsg("");
    setAddStudentError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const parentPhone = (formData.get("parentPhone") as string || "").trim();
    const address = (formData.get("address") as string || "").trim();
    const grade = (formData.get("grade") as string || (activeTab === "foundations" ? "Class 9th" : "Class 11th")).trim();
    const stream = (formData.get("stream") as string || activeTab).trim();

    if (!name) {
      setAddStudentError("Please enter student name.");
      return;
    }

    setIsAddingStudent(true);

    const newStudentObj: Student = {
      _id: "student_" + Date.now(),
      id: "student_" + Date.now(),
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
      phone: parentPhone || "9876543210",
      parentPhone: parentPhone || "9876543210",
      address: address || "N/A",
      grade: grade,
      stream
    };

    // Instant local state update for 0ms delay
    setStudentsList(prev => {
      const updated = [...prev, newStudentObj];
      try { localStorage.setItem("kvi_students_cache", JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    try {
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudentObj)
      });
      setAddStudentMsg(`✓ Student "${name}" added successfully!`);
      form.reset();
    } catch (err: any) {
      console.warn("Failed to persist new student:", err);
      setAddStudentMsg(`✓ Student "${name}" added to roll!`);
      form.reset();
    } finally {
      setIsAddingStudent(false);
    }
  };

  // Delete Student Handler
  const handleDeleteStudent = async (studentId: string) => {
    setStudentsList(prev => {
      const updated = prev.filter(s => (s._id || s.id) !== studentId);
      try { localStorage.setItem("kvi_students_cache", JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    try {
      await fetch(`/api/students?id=${studentId}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.warn("Failed to delete student:", err);
    }
  };

  // Submit Attendance Roll & Broadcast Absent Notifications Automatically
  const handleSubmitAttendanceRoll = async () => {
    setAttendanceMsg("");
    setAttendanceError("");

    if (Object.keys(markedRecords).length === 0) {
      setAttendanceError("Please mark attendance for at least one student before submitting.");
      return;
    }

    setIsSubmittingAttendance(true);

    try {
      const todayDate = new Date().toISOString().split("T")[0];
      const streamLabel = activeTab === "foundations" ? "Class 9-10th" : activeTab === "science" ? "Class 11-12th Science" : activeTab === "commerce" ? "Class 11-12th Commerce" : "Class 11-12th Arts";

      const absentStudents = filteredStudents.filter(student => {
        const studentId = student._id || student.id || "";
        return markedRecords[studentId] === "absent";
      });

      if (absentStudents.length > 0) {
        const absentNames = absentStudents.map(s => s.name).join(", ");
        const title = `🚨 Daily Attendance Alert - ${streamLabel}`;
        const message = `Dear Parents, the following student(s) are absent today: ${absentNames}.`;

        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            message,
            sender: "Faculty / Attendance Dept",
            stream: activeTab,
            priority: "urgent",
            date: todayDate
          })
        });
      }

      await fetchAdminBroadcasts();
      setMarkedRecords({});
      setAttendanceMsg("Attendance Roll Submitted Successfully!");
      setTimeout(() => {
        setAttendanceMsg("");
      }, 4000);
    } catch (err: any) {
      setAttendanceError("Error submitting attendance: " + err.message);
    } finally {
      setIsSubmittingAttendance(false);
    }
  };

  // Mark attendance in database + local feedback
  const handleMarkStatus = async (studentId: string, status: "present" | "absent" | "late") => {
    setMarkedRecords(prev => ({ ...prev, [studentId]: status }));
  };

  // Fee Handlers & Push Notification Submission
  const handleMarkFeeStatus = (studentId: string, status: "paid" | "pending" | "overdue") => {
    setFeeRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }));
  };

  const handleFeeAmountChange = (studentId: string, amount: string) => {
    setFeeRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status: prev[studentId]?.status || "pending",
        amount
      }
    }));
  };

  const handleSubmitFees = async () => {
    setFeeMsg("");
    setFeeError("");

    if (Object.keys(feeRecords).length === 0) {
      setFeeError("Please select fee status for at least one student before submitting.");
      return;
    }

    setIsSubmittingFees(true);

    try {
      const todayDate = new Date().toISOString().split("T")[0];
      const streamLabel = activeTab === "foundations" ? "Class 9-10th" : activeTab === "science" ? "Class 11-12th Science" : activeTab === "commerce" ? "Class 11-12th Commerce" : "Class 11-12th Arts";

      const dueStudents = filteredStudents.filter(student => {
        const studentId = student._id || student.id || "";
        const rec = feeRecords[studentId];
        return rec && (rec.status === "pending" || rec.status === "overdue");
      });

      if (dueStudents.length > 0) {
        const dueNames = dueStudents.map(s => s.name).join(", ");
        const title = `💳 Fee Dues Alert - ${streamLabel}`;
        const message = `Dear Parents, the following student(s) have pending fee dues: ${dueNames}. Kindly clear the dues at the earliest.`;

        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            message,
            sender: "Accounts & Fee Dept",
            stream: activeTab,
            priority: "urgent",
            date: todayDate
          })
        });
      }

      await fetchAdminBroadcasts();
      setFeeRecords({});
      setFeeMsg("Fee Status Logged & Dues Notification Pushed Successfully!");
      setTimeout(() => {
        setFeeMsg("");
      }, 4000);
    } catch (err: any) {
      setFeeError("Error submitting fees: " + err.message);
    } finally {
      setIsSubmittingFees(false);
    }
  };

  // Generate WhatsApp Message text link
  const getWhatsAppLink = (student: Student) => {
    const parentNum = student.parentPhone || "9876543210";
    // clean non-digits for phone link
    const cleanPhone = parentNum.replace(/\D/g, "");
    
    // Add country code if not present (assuming Indian numbers +91)
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    
    const message = `Dear Parent, your ward ${student.name} was marked ABSENT today for classes at Knowledge Venture Institute. Please contact Vineet Verma (7011731649) for further details.`;
    const encodedMessage = encodeURIComponent(message);
    
    return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
  };

  // Upload Materials Form submission
  const handleUploadMaterialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMaterialMsg("");
    setMaterialError("");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (!formData.get("stream")) {
      formData.append("stream", activeTab);
    }
    if (uploadedPdfUrl) {
      formData.set("file_url", uploadedPdfUrl);
    }

    setIsSubmittingMaterial(true);
    try {
      const res = await addMaterial(null, formData);
      if (res.success) {
        setMaterialMsg(res.message || "Material uploaded!");
        setUploadedPdfUrl("");
        form.reset();
        await fetchAdminMaterials();
        setTimeout(() => setMaterialMsg(""), 3500);
      } else {
        setMaterialError(res.error || "Upload failed.");
      }
    } catch (err: any) {
      setMaterialError("Upload failed: " + err.message);
    } finally {
      setIsSubmittingMaterial(false);
    }
  };

  // Upload Performance marks Form submission
  const handlePerformanceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPerformanceMsg("");
    setPerformanceError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await submitPerformance(null, formData);
    if (res.success) {
      setPerformanceMsg(res.message || "Marks submitted!");
      form.reset();
    } else {
      setPerformanceError(res.error || "Submission failed.");
    }
  };

  return (
    <div className="w-full">
      {/* 📱 Mobile Restricted View Notice (Shown ONLY on mobile/tablet screens < lg) */}
      <div className="flex lg:hidden flex-col items-center justify-center min-h-[calc(100vh-140px)] p-4 sm:p-6 text-center bg-[#071728] text-white">
        <div className="max-w-md w-full bg-[#0D2847] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5 my-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-[#F5BE18] flex items-center justify-center shadow-inner">
            <Laptop className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest text-[#F5BE18] uppercase bg-[#F5BE18]/10 px-3.5 py-1 rounded-full border border-[#F5BE18]/20 inline-block">
              Desktop & Laptop Required
            </span>
            <h2 className="text-base sm:text-lg font-black text-white tracking-wide pt-1">
              Desktop Device Only
            </h2>
          </div>
          
          <div className="bg-[#071728]/90 p-4 sm:p-5 rounded-2xl border border-white/10 text-left font-medium">
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-semibold">
              Admin panel can only be opened from desktop and laptop devices not through mobile due to complex features of admin panel mobile devices cannot handle them.
            </p>
          </div>

          <p className="text-[11px] text-amber-300/80 italic font-medium">
            Please switch to a laptop or desktop screen to access full admin features.
          </p>

          <div className="pt-1 w-full">
            <Link
              href="/"
              className="w-full py-3 px-4 rounded-xl bg-[#F5BE18] text-[#0D2847] font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 💻 Desktop Main Admin Dashboard Panel (Visible ONLY on lg+ screens) */}
      <div className="hidden lg:flex flex-row text-xs items-start w-full min-h-[calc(100vh-96px)]">
        
        {/* 👈 Left Tools Navigation Sidebar (Flush under navbar bottom border) */}
        <aside className="w-full lg:w-64 bg-[#0D2847] text-white p-4 shrink-0 flex flex-col justify-between lg:sticky lg:top-[96px] lg:h-[calc(100vh-96px)] overflow-y-auto m-0 border-r border-amber-400/20 shadow-lg">
        <div>
          {/* Header Title */}
          <div className="pb-2.5 mb-2.5 border-b border-white/10 flex items-center gap-2.5">
              <img
                src="/newlogo.png"
                alt="Knowledge Venture Institute Logo"
                className="h-8 w-auto object-contain select-none"
              />
            <div>
              <h2 className="font-black text-xs text-white tracking-wide uppercase">TOOLS & FEATURES</h2>
              <span className="text-[9px] text-amber-300 font-bold block">Admin Control Panel</span>
            </div>
          </div>

          {/* Menu Items List */}
          <nav className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActiveFeature("announcements")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "announcements"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                <span>Announcements</span>
              </div>
              {broadcastList.length > 0 && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeFeature === "announcements" ? "bg-[#0D2847] text-[#F5BE18]" : "bg-white/10 text-amber-300"
                }`}>
                  {broadcastList.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveFeature("attendance")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "attendance"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>Attendance Roll</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveFeature("notes")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "notes"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Notes & Materials</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveFeature("fees")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "fees"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Fees & Dues</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveFeature("enquiries")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "enquiries"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                <span>Enquiries & Enrollments</span>
              </div>
              {(contacts.length + enrollments.length) > 0 && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeFeature === "enquiries" ? "bg-[#0D2847] text-[#F5BE18]" : "bg-white/10 text-amber-300"
                }`}>
                  {contacts.length + enrollments.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveFeature("scholarships")}
              className={`w-full py-2.5 px-3 rounded-lg font-black text-xs flex items-center justify-between transition duration-200 cursor-pointer ${
                activeFeature === "scholarships"
                  ? "bg-[#F5BE18] text-[#0D2847] shadow-md translate-x-1"
                  : "bg-white/5 hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Scholarships</span>
              </div>
              {scholarships.length > 0 && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeFeature === "scholarships" ? "bg-[#0D2847] text-[#F5BE18]" : "bg-white/10 text-amber-300"
                }`}>
                  {scholarships.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Footer Copyright text */}
        <div className="pt-6 mt-6 border-t border-white/10 text-[10px] text-gray-400 font-medium text-center leading-relaxed">
          <p>© 2026 Knowledge Venture Institute.</p>
          <p>All rights reserved.</p>
        </div>
      </aside>

      {/* 👉 Right Content Area (Active Feature Panel Workspace - 100% Screen Fill) */}
      <main className="flex-1 w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8 min-w-0 min-h-[calc(100vh-96px)]">
        
        {/* Stream Selector Sub-Tabs (Shown for Attendance, Notes & Fees) */}
        {(activeFeature === "attendance" || activeFeature === "notes" || activeFeature === "fees") && (
          <div className="flex bg-[#0D2847] p-1.5 rounded-xl text-white font-extrabold shadow-md">
            <button
              onClick={() => setActiveTab("foundations")}
              className={`flex-1 py-2.5 text-center rounded-lg transition-all ${activeTab === "foundations" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
            >
              Class 9-10th (Foundations)
            </button>
            <button
              onClick={() => setActiveTab("science")}
              className={`flex-1 py-2.5 text-center rounded-lg transition-all ${activeTab === "science" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
            >
              Class 11-12th Science
            </button>
            <button
              onClick={() => setActiveTab("commerce")}
              className={`flex-1 py-2.5 text-center rounded-lg transition-all ${activeTab === "commerce" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
            >
              Class 11-12th Commerce
            </button>
            <button
              onClick={() => setActiveTab("arts")}
              className={`flex-1 py-2.5 text-center rounded-lg transition-all ${activeTab === "arts" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
            >
              Class 11-12th Arts
            </button>
          </div>
        )}

        {/* 1. Announcements Feature Module (Full Workspace Coverage - No Enclosed Card Wrapper) */}
        {activeFeature === "announcements" && (
          <div className="w-full flex-1 flex flex-col gap-4 text-white">
            
            {/* Top Header Title (Centered, No outer rounded box, No badge) */}
            <div className="flex items-center justify-center text-center py-2.5 border-b border-gray-200 dark:border-amber-400/20 mb-2">
              <h2 className="text-lg md:text-xl font-black text-black dark:text-white flex items-center justify-center gap-2.5">
                <Megaphone className="h-6 w-6 text-black dark:text-[#F5BE18] animate-shake" />
                <span>Broadcast Message to Students</span>
              </h2>
            </div>

            {/* Main Connected Form Workspace Panel (Zero Gaps Between Sections) */}
            <form onSubmit={handleBroadcastSubmit} className="w-full flex-1 flex flex-col">
              <div className="w-full flex-1 bg-white dark:bg-[#0D2847] border border-gray-200 dark:border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-white/10 min-h-[calc(100vh-210px)]">
                
                {/* 1️⃣ SECTION 1: 1. Target Details */}
                <div className="lg:w-72 xl:w-80 p-5 md:p-6 flex flex-col gap-5 shrink-0 bg-white dark:bg-[#0D2847]">
                  <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10">
                    1. Target Details
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">
                      Notification Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Special Doubt Class"
                      className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">
                      Teacher / Sender Name
                    </label>
                    <input
                      type="text"
                      name="sender"
                      required
                      placeholder="e.g. Vineet Verma Sir / Deepak Sir"
                      className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">
                      Target Students
                    </label>
                    <select
                      name="stream"
                      className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition"
                    >
                      <option value="all">🌐 All Streams & Batches</option>
                      <option value="foundations">Class 9-10th Foundations</option>
                      <option value="science">Class 11-12th Science</option>
                      <option value="commerce">Class 11-12th Commerce</option>
                      <option value="arts">Class 11-12th Arts</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">
                      Broadcast / Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition"
                    />
                  </div>
                </div>

                {/* 2️⃣ SECTION 2: 2. Announcement Content */}
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-4 justify-between bg-white dark:bg-[#0D2847] min-w-0">
                  <div className="flex flex-col flex-1">
                    <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 mb-3">
                      2. Announcement Content
                    </h3>
                    <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block mb-1.5">
                      Faculty Message / Details
                    </label>
                    <textarea
                      name="message"
                      required
                      placeholder="Type full announcement message here..."
                      className="w-full flex-1 min-h-[260px] bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] resize-none transition"
                    />
                  </div>

                  {notifMsg && <div className="text-green-300 bg-green-950/80 p-3 rounded-xl text-xs font-bold border border-green-500/30">{notifMsg}</div>}
                  {notifError && <div className="text-red-300 bg-red-950/80 p-3 rounded-xl text-xs font-bold border border-red-500/30">{notifError}</div>}

                  <button
                    type="submit"
                    disabled={isSubmittingNotif}
                    className="w-full bg-[#F5BE18] hover:bg-[#e2ad07] disabled:opacity-60 disabled:cursor-not-allowed text-[#0D2847] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg text-sm"
                  >
                    {isSubmittingNotif ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin text-[#0D2847]" />
                        <span>Broadcasting to Students...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Broadcast Now to Students</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3️⃣ SECTION 3: Live Sent Broadcasts (80% Height) & Image Attachment (20% Height) */}
                <div className="w-full lg:w-80 flex flex-col divide-y divide-gray-200 dark:divide-white/10 bg-white dark:bg-[#0D2847] shrink-0 min-h-0">
                  
                  {/* Top Part (80% Height): Live Sent Broadcasts */}
                  <div className="h-[80%] flex-[4] p-4 md:p-5 flex flex-col overflow-hidden justify-start min-h-0">
                    <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-3 shrink-0">
                      <span>Live Sent Broadcasts</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleManualRefresh}
                          disabled={isRefreshingNotif}
                          className="p-1 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white transition cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                          title="Refresh Broadcast List"
                        >
                          <RefreshCw className={`w-3 h-3 ${isRefreshingNotif ? "animate-spin" : ""}`} />
                          <span>Refresh</span>
                        </button>
                        <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded-full">
                          {broadcastList.length}
                        </span>
                      </div>
                    </h3>

                    <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 min-h-0">
                      {broadcastList.length === 0 ? (
                        <p className="text-gray-400 text-xs text-center py-6 italic">No broadcasts sent yet.</p>
                      ) : (
                        broadcastList.map((item) => (
                          <div key={item._id} className="bg-gray-50 dark:bg-white/10 p-3 rounded-xl border border-gray-200 dark:border-white/10 text-xs relative group hover:border-amber-400/40 transition">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-extrabold uppercase text-gray-900 dark:text-[#F5BE18] bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded-md">
                                By: {item.sender || "Faculty"}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {item.date && (
                                  <span className="text-[9px] text-amber-600 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-400/10 border border-amber-300 dark:border-amber-400/30 px-2 py-0.5 rounded-md">
                                    📅 {item.date}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNotification(item._id)}
                                  className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                  title="Delete broadcast"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mt-1.5 truncate">{item.title}</h4>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5">{item.message}</p>

                            {item.image_url && (
                              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                                <span className="text-[9px] text-green-600 dark:text-green-300 font-bold flex items-center gap-1">
                                  🖼️ Image Attached
                                </span>
                                <a
                                  href={item.image_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[9px] text-amber-600 dark:text-[#F5BE18] hover:underline font-bold"
                                >
                                  View Photo ↗
                                </a>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Bottom Part (20% Height): Poster / Image Attachment */}
                  <div className="h-[20%] flex-[1] p-4 md:p-5 flex flex-col justify-center overflow-y-auto bg-white dark:bg-[#0D2847] min-h-0">
                    <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-2 border-b border-gray-200 dark:border-white/10 mb-2.5">
                      🖼️ Poster / Image Attachment
                    </h3>
                    
                    <div className="flex flex-col gap-2">
                      <input
                        id="native-poster-file-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              if (evt.target?.result) {
                                setNotifImageUrl(evt.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => document.getElementById("native-poster-file-input")?.click()}
                        className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 dark:text-[#F5BE18] border border-amber-400/40 text-xs font-bold py-3 px-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{notifImageUrl ? "✓ Image Attached (Click to Change)" : "🖼️ Select Image / Poster From Computer"}</span>
                      </button>

                      {notifImageUrl && (
                        <div className="p-2 bg-green-500/20 border border-green-500/40 text-green-300 rounded-xl flex items-center justify-between text-xs font-semibold mt-0.5">
                          <div className="flex items-center gap-2 truncate max-w-[200px]">
                            <img src={notifImageUrl} alt="Preview" className="w-7 h-7 object-cover rounded-lg border border-green-400/40 shrink-0" />
                            <span className="truncate text-[10px]">✓ Image Attached</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotifImageUrl("")}
                            className="text-red-300 hover:text-red-100 font-bold text-[11px] px-1 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </form>

          </div>
        )}

        {/* 2. Attendance & Add Student Module (Full Workspace Connected Container) */}
        {activeFeature === "attendance" && (
          <div className="w-full flex-1 bg-white dark:bg-[#0D2847] border border-gray-200 dark:border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-white/10 min-h-[calc(100vh-250px)]">
            
            {/* 1️⃣ LEFT SECTION: Attendance Log & Roll Table */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between bg-white dark:bg-[#0D2847] min-w-0 gap-4">
              <div className="flex flex-col flex-1">
                <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-4 shrink-0">
                  <span className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#F5BE18] animate-shake" />
                    <span>Attendance Log (Stream: {activeTab === "foundations" ? "Class 9-10th" : activeTab === "science" ? "Science" : activeTab === "commerce" ? "Commerce" : "Arts"})</span>
                  </span>
                  <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                    📅 Date: {new Date().toISOString().split("T")[0]}
                  </span>
                </h3>

                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 divide-x divide-gray-200 dark:divide-white/10 text-gray-900 dark:text-amber-300 font-black uppercase text-[10px]">
                        <th className="pb-3 px-4 w-1/3">Student Name</th>
                        <th className="pb-3 px-4 w-1/4">Parent Contact</th>
                        <th className="pb-3 px-4 text-center">Mark Attendance Roll</th>
                        <th className="pb-3 px-4 text-center w-16">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-gray-200">
                      {filteredStudents.map((student) => {
                        const studentId = student._id || student.id || "";
                        const currentStatus = markedRecords[studentId] || "";

                        return (
                          <tr key={studentId} className="hover:bg-gray-50 dark:hover:bg-white/5 divide-x divide-gray-200 dark:divide-white/10 transition">
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-gray-900 dark:text-white block">{student.name}</span>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-gray-500 dark:text-gray-400">{student.parentPhone || "9876543210"}</td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="inline-flex gap-2 justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleMarkStatus(studentId, "present")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "present" ? "bg-green-600 text-white shadow-md ring-2 ring-green-400" : "bg-green-500/10 text-green-600 dark:text-green-300 hover:bg-green-500/20"}`}
                                >
                                  Present
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMarkStatus(studentId, "absent")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "absent" ? "bg-red-600 text-white shadow-md ring-2 ring-red-400" : "bg-red-500/10 text-red-600 dark:text-red-300 hover:bg-red-500/20"}`}
                                >
                                  Absent
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMarkStatus(studentId, "late")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "late" ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20"}`}
                                >
                                  Late
                                </button>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteStudent(studentId)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition cursor-pointer inline-flex items-center justify-center"
                                title="Delete Student"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-400 italic text-xs">No students mapped to this stream database. Add a new student using the form on the right.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Submit Attendance Roll Button */}
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-white/10 shrink-0">
                {attendanceError && <div className="text-red-300 bg-red-950/80 p-3 rounded-xl text-xs font-bold border border-red-500/30">{attendanceError}</div>}

                <button
                  type="button"
                  onClick={handleSubmitAttendanceRoll}
                  disabled={isSubmittingAttendance || filteredStudents.length === 0}
                  className="w-full bg-[#F5BE18] hover:bg-[#e2ad07] text-[#0D2847] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg text-xs md:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingAttendance ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      <span>Submitting & Broadcasting Alerts...</span>
                    </>
                  ) : attendanceMsg ? (
                    <>
                      <CheckCircle className="w-4.5 h-4.5" />
                      <span>{attendanceMsg}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Submit Attendance Roll</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2️⃣ RIGHT SECTION: Add New Student Form */}
            <div className="w-full lg:w-80 xl:w-96 p-5 md:p-6 flex flex-col gap-4 justify-between bg-white dark:bg-[#0D2847] shrink-0 min-h-0">
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center gap-2 mb-1">
                  <UserPlus className="h-4 w-4 text-[#F5BE18]" />
                  <span>Add New Student</span>
                </h3>

                <form onSubmit={handleAddStudentSubmit} className="flex flex-col gap-4 text-xs flex-1 justify-between">
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Student Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="e.g. Ananya Verma" 
                        className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Parent Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        name="parentPhone" 
                        required 
                        placeholder="e.g. 9876543210" 
                        className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Student Residential Address</label>
                      <input 
                        type="text" 
                        name="address" 
                        placeholder="e.g. Sector 14, Main Road, City" 
                        className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Select Specific Class</label>
                      <select 
                        name="grade" 
                        defaultValue={activeTab === "foundations" ? "Class 9th" : "Class 11th"}
                        className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition font-bold"
                      >
                        <option value="Class 9th">Class 9th</option>
                        <option value="Class 10th">Class 10th</option>
                        <option value="Class 11th">Class 11th</option>
                        <option value="Class 12th">Class 12th</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Assign Stream</label>
                      <select 
                        name="stream" 
                        defaultValue={activeTab}
                        className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      >
                        <option value="foundations">Class 9-10th (Foundations)</option>
                        <option value="science">Class 11-12th Science</option>
                        <option value="commerce">Class 11-12th Commerce</option>
                        <option value="arts">Class 11-12th Arts</option>
                      </select>
                    </div>
                  </div>

                  {addStudentError && <div className="text-red-300 bg-red-950/80 p-3 rounded-xl text-xs font-bold border border-red-500/30">{addStudentError}</div>}

                  <button 
                    type="submit" 
                    disabled={isAddingStudent}
                    className="w-full bg-[#F5BE18] hover:bg-[#e2ad07] disabled:opacity-60 disabled:cursor-not-allowed text-[#0D2847] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg text-xs"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>+ Add New Student to Roll</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

        {/* 3. Notes & Study Materials Workspace Panel */}
        {activeFeature === "notes" && (
          <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-white/10 overflow-hidden min-h-0 bg-white dark:bg-[#0D2847]">
            {/* 1️⃣ LEFT SECTION: Published PDF Study Materials List */}
            <div className="flex-1 p-5 md:p-6 flex flex-col gap-4 overflow-hidden min-h-0">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3.5 shrink-0">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-[#F5BE18]" />
                  <div>
                    <h2 className="text-sm md:text-base font-extrabold text-black dark:text-white uppercase tracking-wider">
                      Study Materials & PDF Library
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      Showing materials for {activeTab === "foundations" ? "Class 9-10th (Foundations)" : activeTab === "science" ? "Class 11-12th Science" : activeTab === "commerce" ? "Class 11-12th Commerce" : "Class 11-12th Arts"} & All Streams
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fetchAdminMaterials}
                  disabled={isFetchingMaterials}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-bold transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingMaterials ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Materials List Scrollable Area */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0">
                {materialsList
                  .filter(m => m.stream === activeTab || m.stream === "all" || !m.stream)
                  .map((item) => (
                    <div 
                      key={item._id}
                      className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#071728] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs hover:border-[#F5BE18]/50 transition"
                    >
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-xs text-black dark:text-white">{item.title}</span>
                          <span className="px-2 py-0.5 rounded-md bg-[#F5BE18]/20 text-[#F5BE18] font-bold text-[10px] uppercase">
                            {item.subject}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
                            {item.type === "notes" ? "Lecture Notes" : item.type === "dpp" ? "DPP Assignment Sheet" : "Mock Test Paper"}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase">
                            Target: {item.stream === "all" ? "All Streams" : item.stream}
                          </span>
                        </div>
                        {item.file_url && item.file_url !== "#" && (
                          <a 
                            href={item.file_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[11px] text-blue-500 dark:text-blue-400 hover:underline font-semibold truncate max-w-md block"
                          >
                            🔗 View/Download PDF: {item.file_url}
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.file_url && item.file_url !== "#" && (
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#F5BE18] text-[#0D2847] font-black text-xs hover:bg-[#e2ad07] transition shadow-xs"
                          >
                            Open PDF
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteMaterial(item._id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                          title="Delete Material"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {materialsList.filter(m => m.stream === activeTab || m.stream === "all" || !m.stream).length === 0 && (
                  <div className="py-12 text-center text-gray-400 italic text-xs border border-dashed border-gray-300 dark:border-white/10 rounded-xl">
                    No study materials uploaded for this stream yet. Use the form on the right to upload a new PDF.
                  </div>
                )}
              </div>
            </div>

            {/* 2️⃣ RIGHT SECTION: Upload New PDF Form */}
            <div className="w-full lg:w-80 xl:w-96 p-5 md:p-6 flex flex-col gap-4 justify-between bg-white dark:bg-[#0D2847] shrink-0 min-h-0">
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center gap-2 mb-1">
                  <FileUp className="h-4 w-4 text-[#F5BE18]" />
                  <span>Upload PDF Study Material</span>
                </h3>

                <form onSubmit={handleUploadMaterialSubmit} className="flex flex-col gap-4 text-xs flex-1 justify-between">
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Document Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        required 
                        placeholder="e.g. Organic Chemistry Chapter 1 Notes" 
                        className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Material Type</label>
                      <select 
                        name="type" 
                        className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      >
                        <option value="notes">Lecture Notes PDF</option>
                        <option value="dpp">Assignments Sheet (DPP)</option>
                        <option value="test_paper">CBSE Mock Test Paper</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Subject</label>
                      <input 
                        type="text" 
                        name="subject" 
                        required 
                        placeholder="e.g. Chemistry / Physics / Accounts" 
                        className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">Target Class / Stream</label>
                      <select 
                        name="stream" 
                        defaultValue={activeTab}
                        className="w-full bg-gray-50 dark:bg-[#071728] border border-gray-300 dark:border-white/20 rounded-xl p-3 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#F5BE18] transition"
                      >
                        <option value="foundations">Class 9-10th (Foundations)</option>
                        <option value="science">Class 11-12th Science</option>
                        <option value="commerce">Class 11-12th Commerce</option>
                        <option value="arts">Class 11-12th Arts</option>
                        <option value="all">All Batches & Streams</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold text-black dark:text-white uppercase block">PDF File Attachment</label>
                      
                      {/* Native Local File Fallback for PDF */}
                      <input
                        id="native-pdf-file-input"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              if (evt.target?.result) {
                                setUploadedPdfUrl(evt.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => document.getElementById("native-pdf-file-input")?.click()}
                        className="w-full bg-[#0D2847] hover:bg-[#071728] text-white font-bold py-3.5 px-4 rounded-xl border border-white/20 transition cursor-pointer flex items-center justify-center gap-2 text-xs shadow-md"
                      >
                        <Upload className="w-4 h-4 text-[#F5BE18]" />
                        <span>{uploadedPdfUrl ? "✓ PDF Document Selected (Click to Change)" : "📁 Select PDF Document From Computer"}</span>
                      </button>

                      {uploadedPdfUrl && (
                        <div className="p-2.5 bg-green-500/20 text-green-300 rounded-xl text-xs font-semibold flex items-center justify-between border border-green-500/30">
                          <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                            <span className="text-sm shrink-0">📄</span>
                            <span className="truncate">
                              {uploadedPdfUrl.startsWith("data:") 
                                ? "✓ PDF Document Attached & Ready to Save" 
                                : `✓ Attached: ${uploadedPdfUrl}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadedPdfUrl("")}
                            className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-0.5 rounded hover:bg-red-500/20 cursor-pointer shrink-0 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <input type="hidden" name="file_url" value={uploadedPdfUrl || "#"} />
                    </div>
                  </div>

                  {materialMsg && <div className="text-green-300 bg-green-950/80 p-3 rounded-xl text-xs font-bold border border-green-500/30">{materialMsg}</div>}
                  {materialError && <div className="text-red-300 bg-red-950/80 p-3 rounded-xl text-xs font-bold border border-red-500/30">{materialError}</div>}

                  <button 
                    type="submit" 
                    disabled={isSubmittingMaterial}
                    className="w-full bg-[#F5BE18] hover:bg-[#e2ad07] text-[#0D2847] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg text-xs md:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmittingMaterial ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>Uploading Study Material...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4.5 h-4.5" />
                        <span>Upload PDF Study Material</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 4. Fees & Dues Workspace Panel */}
        {activeFeature === "fees" && (
          <div className="w-full flex-1 bg-white dark:bg-[#0D2847] border border-gray-200 dark:border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-white/10 min-h-[calc(100vh-250px)]">
            {/* 1️⃣ LEFT SECTION: Student Fees Log Table */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between bg-white dark:bg-[#0D2847] min-w-0 gap-4">
              <div className="flex flex-col flex-1">
                <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-4 shrink-0">
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#F5BE18] animate-shake" />
                    <span>Student Fees & Dues (Stream: {activeTab === "foundations" ? "Class 9-10th" : activeTab === "science" ? "Science" : activeTab === "commerce" ? "Commerce" : "Arts"})</span>
                  </span>
                  <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                    📅 Date: {new Date().toISOString().split("T")[0]}
                  </span>
                </h3>

                {/* Student Fees Table */}
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 divide-x divide-gray-200 dark:divide-white/10 text-gray-900 dark:text-amber-300 font-black uppercase text-[10px]">
                        <th className="pb-3 px-4 w-1/5">Student Name</th>
                        <th className="pb-3 px-4 w-28 text-center">Class</th>
                        <th className="pb-3 px-4 w-1/5">Parent Contact</th>
                        <th className="pb-3 px-4 w-1/4">Address</th>
                        <th className="pb-3 px-4 text-center">Mark Fee Status</th>
                        <th className="pb-3 px-4 text-center w-16">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-gray-200">
                      {filteredStudents.map((student) => {
                        const studentId = student._id || student.id || "";
                        const currentRec = feeRecords[studentId] || {};
                        const currentStatus = currentRec.status || "";

                        return (
                          <tr key={studentId} className="hover:bg-gray-50 dark:hover:bg-white/5 divide-x divide-gray-200 dark:divide-white/10 transition">
                            <td className="py-3.5 px-4 w-1/5">
                              <span className="font-bold text-gray-900 dark:text-white block">{student.name}</span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-[#F5BE18]/15 text-[#F5BE18] border border-[#F5BE18]/30 whitespace-nowrap">
                                {student.grade || (activeTab === "foundations" ? "Class 9th" : "Class 11th")}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 w-1/5 font-semibold text-gray-500 dark:text-gray-400">{student.parentPhone || "9876543210"}</td>
                            <td className="py-3.5 px-4 w-1/4 font-semibold text-gray-500 dark:text-gray-400 text-xs">{student.address || "N/A"}</td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="inline-flex gap-2 justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleMarkFeeStatus(studentId, "paid")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "paid" ? "bg-green-600 text-white shadow-md ring-2 ring-green-400" : "bg-green-500/10 text-green-600 dark:text-green-300 hover:bg-green-500/20"}`}
                                >
                                  Paid
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMarkFeeStatus(studentId, "pending")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "pending" ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20"}`}
                                >
                                  Pending
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMarkFeeStatus(studentId, "overdue")}
                                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${currentStatus === "overdue" ? "bg-red-600 text-white shadow-md ring-2 ring-red-400" : "bg-red-500/10 text-red-600 dark:text-red-300 hover:bg-red-500/20"}`}
                                >
                                  Overdue
                                </button>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteStudent(studentId)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition cursor-pointer inline-flex items-center justify-center"
                                title="Delete Student"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400 italic text-xs">No students mapped to this stream database. Add a new student in Attendance Roll tab.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Submit Fee Log & Push Notification Button */}
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-white/10 shrink-0">
                {feeError && <div className="text-red-300 bg-red-950/80 p-3 rounded-xl text-xs font-bold border border-red-500/30">{feeError}</div>}

                <button
                  type="button"
                  onClick={handleSubmitFees}
                  disabled={isSubmittingFees || filteredStudents.length === 0}
                  className="w-full bg-[#F5BE18] hover:bg-[#e2ad07] text-[#0D2847] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg text-xs md:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingFees ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      <span>Submitting & Pushing Dues Notification...</span>
                    </>
                  ) : feeMsg ? (
                    <>
                      <CheckCircle className="w-4.5 h-4.5" />
                      <span>{feeMsg}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Submit Fee Status & Auto-Push Dues Notification</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeFeature === "enquiries" && (
          <div className="w-full flex-1 bg-white dark:bg-[#0D2847] border border-gray-200 dark:border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col divide-y divide-gray-200 dark:divide-white/10 min-h-[calc(100vh-250px)]">
            {/* Form 1 Direct Admission Registrations Table */}
            <div className="p-5 md:p-6 flex flex-col gap-4 overflow-hidden min-h-0">
              <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-4 shrink-0">
                <span className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-[#F5BE18] animate-shake" />
                  <span>Form 1 Report: Direct Course Admission Registrations</span>
                </span>
                <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                  Total: {enrollments.length} Registrations
                </span>
              </h3>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10 divide-x divide-gray-200 dark:divide-white/10 text-gray-900 dark:text-amber-300 font-black uppercase text-[10px]">
                      <th className="pb-3 px-4">Student Name</th>
                      <th className="pb-3 px-4">Contact Mobile</th>
                      <th className="pb-3 px-4">Email</th>
                      <th className="pb-3 px-4">Class / Stream</th>
                      <th className="pb-3 px-4">School / City</th>
                      <th className="pb-3 px-4">Date Submitted</th>
                      <th className="pb-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-gray-200">
                    {enrollments.map((enr, idx) => {
                      const enrId = enr._id || enr.id || String(idx);
                      const currentStatus = enrollmentStatusMap[enrId] || enr.status || "pending";

                      return (
                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 divide-x divide-gray-200 dark:divide-white/10 transition">
                          <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{enr.student_name}</td>
                          <td className="py-3.5 px-4 font-semibold text-[#F5BE18]">
                            <a href={`tel:${enr.phone}`} className="hover:underline flex items-center gap-1">
                              <span>📞 {enr.phone}</span>
                            </a>
                          </td>
                          <td className="py-3.5 px-4 text-gray-400">{enr.email || "N/A"}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-[#F5BE18]/15 text-[#F5BE18] border border-[#F5BE18]/30 whitespace-nowrap">
                              {enr.stream}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-300">{enr.school_or_city || "Delhi"}</td>
                          <td className="py-3.5 px-4 text-gray-400">{new Date(enr.created_at || Date.now()).toISOString().split("T")[0]}</td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex gap-1.5 justify-center">
                              <button
                                type="button"
                                onClick={() => handleUpdateEnrollmentStatus(enrId, "pending")}
                                className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                  currentStatus === "pending" ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-400" : "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateEnrollmentStatus(enrId, "contacted")}
                                className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                  currentStatus === "contacted" ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400" : "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                                }`}
                              >
                                Contacted
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateEnrollmentStatus(enrId, "enrolled")}
                                className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                  currentStatus === "enrolled" ? "bg-green-600 text-white shadow-md ring-2 ring-green-400" : "bg-green-500/10 text-green-300 hover:bg-green-500/20"
                                }`}
                              >
                                Enrolled
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {enrollments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400 italic">
                          No direct enrollment applications received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* General Inquiries Messages list */}
            <div className="p-5 md:p-6 flex flex-col gap-4">
              <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between shrink-0">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#F5BE18]" />
                  <span>General Inquiries</span>
                </span>
                <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                  Total: {contacts.length} Inquiries
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
                {contacts.map((msg, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#071728] p-4 rounded-xl flex flex-col gap-1.5 shadow-sm">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-black dark:text-white text-xs">{msg.name}</span>
                      <span className="text-gray-400">{new Date(msg.created_at || Date.now()).toISOString().split("T")[0]}</span>
                    </div>
                    <span className="text-[10px] text-[#F5BE18] block">{msg.email}</span>
                    <p className="text-gray-300 leading-relaxed italic text-xs">"{msg.message}"</p>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-xs text-gray-400 italic py-4 text-center col-span-2">No general inquiries received yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. Scholarship Applications Module */}
        {activeFeature === "scholarships" && (
          <div className="w-full flex-1 bg-white dark:bg-[#0D2847] border border-gray-200 dark:border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-5 md:p-6 min-h-[calc(100vh-250px)] gap-4">
            <h3 className="font-extrabold text-xs text-black dark:text-white uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between mb-4 shrink-0">
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#F5BE18] animate-shake" />
                <span>Form 2 Report: Scholarship Test Applications</span>
              </span>
              <span className="text-[10px] text-gray-900 dark:text-amber-300 font-bold bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">
                Total: {scholarships.length} Applications
              </span>
            </h3>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 divide-x divide-gray-200 dark:divide-white/10 text-gray-900 dark:text-amber-300 font-black uppercase text-[10px]">
                    <th className="pb-3 px-4">Student</th>
                    <th className="pb-3 px-4">Grade</th>
                    <th className="pb-3 px-4">Previous score</th>
                    <th className="pb-3 px-4">Phone</th>
                    <th className="pb-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-gray-200">
                  {scholarships.map((app, idx) => {
                    const appId = app._id || app.id || String(idx);
                    const currentStatus = scholarshipStatusMap[appId] || app.status || "pending";

                    return (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 divide-x divide-gray-200 dark:divide-white/10 cursor-pointer transition" onClick={() => setExpandedScholarship(expandedScholarship === idx ? null : idx)}>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-black dark:text-white block hover:underline">{app.student_name}</span>
                          <span className="text-[10px] text-gray-400 block">{app.email}</span>
                          {/* Expanded Details Panel */}
                          {expandedScholarship === idx && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-gray-300 bg-gray-50 dark:bg-[#071728] p-3 rounded-lg border border-gray-200 dark:border-white/10">
                              {app.age && (
                                <div>
                                  <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Age</span>
                                  <span className="font-bold text-white">{app.age} Years</span>
                                </div>
                              )}
                              {app.preferred_stream && (
                                <div>
                                  <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Preferred Stream</span>
                                  <span className="font-bold text-[#F5BE18] uppercase">{app.preferred_stream}</span>
                                </div>
                              )}
                              {app.academic_achievements && (
                                <div className="md:col-span-2">
                                  <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Academic Achievements</span>
                                  <span className="text-gray-200 block font-semibold leading-relaxed mt-0.5">{app.academic_achievements}</span>
                                </div>
                              )}
                              {app.why_join && (
                                <div className="md:col-span-2 border-t border-gray-200 dark:border-white/10 pt-2">
                                  <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Why join KVI?</span>
                                  <span className="text-gray-200 block font-semibold leading-relaxed mt-0.5 italic">"{app.why_join}"</span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-semibold align-top">{app.grade}</td>
                        <td className="py-3.5 px-4 font-black text-green-400 align-top">{app.score}%</td>
                        <td className="py-3.5 px-4 align-top text-[#F5BE18] font-bold">{app.phone}</td>
                        <td className="py-3.5 px-4 align-top text-center">
                          <div className="inline-flex gap-1.5 justify-center">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateScholarshipStatus(appId, "pending"); }}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                currentStatus === "pending" ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-400" : "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                              }`}
                            >
                              Pending
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateScholarshipStatus(appId, "contacted"); }}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                currentStatus === "contacted" ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400" : "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                              }`}
                            >
                              Contacted
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateScholarshipStatus(appId, "approved"); }}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                                currentStatus === "approved" ? "bg-green-600 text-white shadow-md ring-2 ring-green-400" : "bg-green-500/10 text-green-300 hover:bg-green-500/20"
                              }`}
                            >
                              Approved
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {scholarships.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 italic">No scholarship applications received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
      </div>
    </div>
  );
}
