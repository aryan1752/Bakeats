"use client";

import { useState } from "react";
import { addMaterial, submitPerformance, markAttendance } from "@/lib/coaching-actions";
import { CldUploadWidget } from "next-cloudinary";
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
  UserCheck 
} from "lucide-react";

interface Student {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  stream: string;
  parentPhone?: string;
}

interface AdminDashboardClientProps {
  students: Student[];
  contacts: any[];
  scholarships: any[];
}

export default function AdminDashboardClient({ 
  students, 
  contacts, 
  scholarships 
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"foundations" | "commerce" | "arts">("foundations");
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [markedRecords, setMarkedRecords] = useState<{ [key: string]: string }>({});
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);

  // Forms state messages
  const [materialMsg, setMaterialMsg] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [performanceMsg, setPerformanceMsg] = useState("");
  const [performanceError, setPerformanceError] = useState("");

  // Get students for current active stream
  const filteredStudents = students.filter(s => s.stream === activeTab);

  // Mark attendance in database + local feedback
  const handleMarkStatus = async (studentId: string, status: "present" | "absent" | "late") => {
    const formData = new FormData();
    formData.append("student_id", studentId);
    formData.append("date", new Date().toISOString().split("T")[0]);
    formData.append("status", status);

    const res = await markAttendance(null, formData);
    if (res.success) {
      setMarkedRecords(prev => ({ ...prev, [studentId]: status }));
    } else {
      alert(res.error || "Failed to log attendance");
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
    formData.append("stream", activeTab);
    formData.set("file_url", uploadedPdfUrl || "#");

    const res = await addMaterial(null, formData);
    if (res.success) {
      setMaterialMsg(res.message || "Material uploaded!");
      setUploadedPdfUrl("");
      form.reset();
    } else {
      setMaterialError(res.error || "Upload failed.");
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
    <div className="flex flex-col gap-8 text-xs">
      
      {/* Dynamic Stream Workspaces selector Tabs */}
      <div className="flex bg-[#0D2847] p-1.5 rounded-xl text-white font-extrabold max-w-lg shadow-md">
        <button
          onClick={() => setActiveTab("foundations")}
          className={`flex-1 py-3 text-center rounded-lg transition-all ${activeTab === "foundations" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
        >
          Class 9-10th (Foundations)
        </button>
        <button
          onClick={() => setActiveTab("commerce")}
          className={`flex-1 py-3 text-center rounded-lg transition-all ${activeTab === "commerce" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
        >
          Class 11-12th Commerce
        </button>
        <button
          onClick={() => setActiveTab("arts")}
          className={`flex-1 py-3 text-center rounded-lg transition-all ${activeTab === "arts" ? "bg-[#F5BE18] text-[#0D2847]" : "hover:text-[#F5BE18]"}`}
        >
          Class 11-12th Arts
        </button>
      </div>

      {/* Stream Specific Workspace Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Module 1: Attendance Register List (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
              <h2 className="text-base font-extrabold text-[#0D2847] flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#F5BE18]" />
                <span>Attendance Log (Stream: {activeTab === "foundations" ? "Class 9-10th" : activeTab === "commerce" ? "Commerce" : "Arts"})</span>
              </h2>
              <span className="text-[10px] text-gray-400 font-bold">Date: {new Date().toISOString().split("T")[0]}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="pb-2">Student Name</th>
                    <th className="pb-2">Parent Contact</th>
                    <th className="pb-2 text-center">Mark Attendance Roll</th>
                    <th className="pb-2 text-center">Alert Parent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  {filteredStudents.map((student) => {
                    const currentStatus = markedRecords[student._id || student.id || ""] || "";
                    return (
                      <tr key={student._id || student.id} className="hover:bg-gray-50/50">
                        <td className="py-3.5">
                          <span className="font-bold text-[#0D2847] block">{student.name}</span>
                          <span className="text-[10px] text-gray-400 block">{student.email}</span>
                        </td>
                        <td className="py-3.5 font-semibold text-gray-500">{student.parentPhone || "9876543210"}</td>
                        <td className="py-3.5 text-center">
                          <div className="inline-flex gap-1.5 justify-center">
                            <button
                              onClick={() => handleMarkStatus(student._id || student.id || "", "present")}
                              className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${currentStatus === "present" ? "bg-green-500 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => handleMarkStatus(student._id || student.id || "", "absent")}
                              className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${currentStatus === "absent" ? "bg-red-500 text-white" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => handleMarkStatus(student._id || student.id || "", "late")}
                              className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition ${currentStatus === "late" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 text-center">
                          {currentStatus === "absent" ? (
                            <a
                              href={getWhatsAppLink(student)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-[10px] font-black shadow transition"
                            >
                              <Send className="h-3 w-3" />
                              <span>WhatsApp Alert</span>
                            </a>
                          ) : (
                            <span className="text-gray-300 text-[10px] italic">Not marked absent</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-400 italic">No students mapped to this stream database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Module 2: Forms Upload Workspaces (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Form 2A: Upload Notes/Assignments */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileText className="h-5 w-5 text-[#F5BE18]" />
              <span>Upload PDF Materials</span>
            </h2>

            <form onSubmit={handleUploadMaterialSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-500 uppercase">Document Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="e.g. Chemical Reactions Practice PDF" 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Material Type</label>
                  <select name="type" className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none text-gray-700">
                    <option value="notes">Lecture Notes</option>
                    <option value="dpp">Assignments Sheet (DPP)</option>
                    <option value="test_paper">CBSE Mock Test Paper</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    required 
                    placeholder="e.g. Science / Accounts" 
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 uppercase">Upload PDF Document</label>
                <CldUploadWidget
                  uploadPreset="ml_default"
                  options={{ sources: ["local", "url", "camera"] }}
                  onSuccess={(results) => {
                    if (results.info && typeof results.info !== "string") {
                      const url = results.info.secure_url;
                      setUploadedPdfUrl(url);
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-2.5 px-3 rounded-lg border border-[#F5BE18]/30 transition cursor-pointer"
                    >
                      Choose PDF File
                    </button>
                  )}
                </CldUploadWidget>

                {uploadedPdfUrl && (
                  <div className="mt-1.5 p-2 bg-green-50 text-green-700 rounded-lg font-bold text-[10px] break-all">
                    ✓ File uploaded: {uploadedPdfUrl}
                  </div>
                )}
                <input type="hidden" name="file_url" value={uploadedPdfUrl || "#"} />
              </div>

              {materialMsg && <div className="text-green-700 bg-green-50 p-2.5 rounded font-bold">{materialMsg}</div>}
              {materialError && <div className="text-red-700 bg-red-50 p-2.5 rounded font-bold">{materialError}</div>}

              <button 
                type="submit" 
                className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="h-4 w-4" />
                <span>Upload to {activeTab === "foundations" ? "Class 9-10th" : activeTab === "commerce" ? "Commerce" : "Arts"}</span>
              </button>
            </form>
          </div>

          {/* Form 2B: Upload Test Marks */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Award className="h-5 w-5 text-[#F5BE18]" />
              <span>Input Test Marks</span>
            </h2>

            <form onSubmit={handlePerformanceSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-500 uppercase">Select Student</label>
                <select name="student_id" className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none text-gray-700 font-semibold">
                  {filteredStudents.map(s => (
                    <option key={s._id || s.id} value={s._id || s.id}>{s.name}</option>
                  ))}
                  {filteredStudents.length === 0 && <option value="">No Students</option>}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-500 uppercase">Test Title</label>
                <input 
                  type="text" 
                  name="testName" 
                  required 
                  placeholder="e.g. Chapter 3 Term Assessment" 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Max Marks</label>
                  <input 
                    type="number" 
                    name="maxMarks" 
                    required 
                    min="1" 
                    placeholder="e.g. 50" 
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Marks Obtained</label>
                  <input 
                    type="number" 
                    name="marksObtained" 
                    required 
                    min="0" 
                    placeholder="e.g. 45" 
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-500 uppercase">Teacher Remarks</label>
                <input 
                  type="text" 
                  name="remarks" 
                  placeholder="e.g. Good performance / Need improvement" 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                />
              </div>

              {performanceMsg && <div className="text-green-700 bg-green-50 p-2.5 rounded font-bold">{performanceMsg}</div>}
              {performanceError && <div className="text-red-700 bg-red-50 p-2.5 rounded font-bold">{performanceError}</div>}

              <button 
                type="submit" 
                disabled={filteredStudents.length === 0}
                className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 disabled:bg-[#0D2847]/50 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Marks</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* administration registries (Inquiries & Scholarship list) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Scholarship Submissions (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
            <ClipboardList className="h-5 w-5 text-[#F5BE18]" />
            <span>Scholarship Applications Registry</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                  <th className="pb-2">Student</th>
                  <th className="pb-2">Grade</th>
                  <th className="pb-2">Previous score</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {scholarships.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 cursor-pointer border-b border-gray-50" onClick={() => setExpandedScholarship(expandedScholarship === idx ? null : idx)}>
                    <td className="py-2.5">
                      <span className="font-bold text-[#0D2847] block hover:underline">{app.student_name}</span>
                      <span className="text-[10px] text-gray-400 block">{app.email}</span>
                      {/* Expanded Details Panel */}
                      {expandedScholarship === idx && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-gray-600 bg-amber-50/40 dark:bg-slate-900/10 p-3 rounded-lg border border-amber-200/30">
                          {app.age && (
                            <div>
                              <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Age</span>
                              <span className="font-bold text-gray-800">{app.age} Years</span>
                            </div>
                          )}
                          {app.preferred_stream && (
                            <div>
                              <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Preferred Stream</span>
                              <span className="font-bold text-[#0D2847] uppercase">{app.preferred_stream}</span>
                            </div>
                          )}
                          {app.academic_achievements && (
                            <div className="md:col-span-2">
                              <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Academic Achievements</span>
                              <span className="text-gray-700 block font-semibold leading-relaxed mt-0.5">{app.academic_achievements}</span>
                            </div>
                          )}
                          {app.why_join && (
                            <div className="md:col-span-2 border-t border-gray-100/50 pt-2">
                              <span className="font-extrabold text-gray-400 block uppercase text-[9px] tracking-wider">Why join KVI?</span>
                              <span className="text-gray-700 block font-semibold leading-relaxed mt-0.5 italic">"{app.why_join}"</span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 font-semibold align-top">{app.grade}</td>
                    <td className="py-2.5 font-black text-green-600 align-top">{app.score}%</td>
                    <td className="py-2.5 align-top">{app.phone}</td>
                    <td className="py-2.5 align-top">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-50 text-amber-700">
                        {app.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contacts (5 Columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-extrabold text-[#0D2847] mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Mail className="h-5 w-5 text-[#F5BE18]" />
            <span>General Inquiries</span>
          </h2>
          <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">
            {contacts.map((msg, idx) => (
              <div key={idx} className="border border-gray-50 bg-gray-50/50 p-3 rounded-xl">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#0D2847]">{msg.name}</span>
                  <span className="text-gray-400">{new Date(msg.created_at || Date.now()).toISOString().split("T")[0]}</span>
                </div>
                <span className="text-[9px] text-gray-400 block mb-1.5">{msg.email}</span>
                <p className="text-gray-600 leading-relaxed italic">"{msg.message}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
