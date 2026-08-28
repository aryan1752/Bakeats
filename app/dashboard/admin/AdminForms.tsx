"use client";

import { useActionState } from "react";
import { addMaterial, submitPerformance, markAttendance } from "@/lib/coaching-actions";
import { FileText, Send, Calendar, Award } from "lucide-react";

interface StudentOption {
  id: number;
  name: string;
}

// 1. Material Upload Form
export function MaterialForm() {
  const [state, formAction, isPending] = useActionState(addMaterial, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 text-xs">
      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">Material Title</label>
        <input 
          type="text" 
          name="title" 
          required 
          placeholder="e.g. Science Chapter 2 Notes" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Material Type</label>
          <select 
            name="type" 
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-gray-700"
          >
            <option value="notes">Notes Study Guide</option>
            <option value="dpp">Daily Practice Problem (DPP)</option>
            <option value="test_paper">CBSE Mock Test Paper</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Subject</label>
          <input 
            type="text" 
            name="subject" 
            required 
            placeholder="e.g. Physics / Economics" 
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">File / Download URL</label>
        <input 
          type="text" 
          name="file_url" 
          placeholder="e.g. # or document PDF link" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
        />
      </div>

      {state && (
        <div className={`p-2.5 rounded-lg font-semibold ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {state.message || state.error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
      >
        <FileText className="h-4 w-4" />
        <span>{isPending ? "Uploading..." : "Upload KVI Material"}</span>
      </button>
    </form>
  );
}

// 2. Attendance Logger Form
export function AttendanceForm({ students }: { students: StudentOption[] }) {
  const [state, formAction, isPending] = useActionState(markAttendance, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 text-xs">
      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">Select Student</label>
        <select 
          name="student_id" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-gray-700 font-semibold"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Attendance Date</label>
          <input 
            type="date" 
            name="date" 
            required 
            defaultValue={new Date().toISOString().split("T")[0]}
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-gray-700"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Attendance Status</label>
          <select 
            name="status" 
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-gray-700 font-semibold"
          >
            <option value="present">Present (On-time)</option>
            <option value="late">Late Arrival</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {state && (
        <div className={`p-2.5 rounded-lg font-semibold ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {state.message || state.error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
      >
        <Calendar className="h-4 w-4" />
        <span>{isPending ? "Logging..." : "Log Attendance Status"}</span>
      </button>
    </form>
  );
}

// 3. Test Grades Form
export function PerformanceForm({ students }: { students: StudentOption[] }) {
  const [state, formAction, isPending] = useActionState(submitPerformance, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 text-xs">
      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">Select Student</label>
        <select 
          name="student_id" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white text-gray-700 font-semibold"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">Test / Exam Name</label>
        <input 
          type="text" 
          name="test_name" 
          required 
          placeholder="e.g. Weekly Math Test 2 or Term 1 Board Prep" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Maximum Marks</label>
          <input 
            type="number" 
            name="max_marks" 
            required 
            min="1"
            placeholder="e.g. 50 or 100" 
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-500 uppercase">Marks Obtained</label>
          <input 
            type="number" 
            name="marks_obtained" 
            required 
            min="0"
            placeholder="e.g. 42" 
            className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-gray-500 uppercase">Teacher Remarks (Optional)</label>
        <input 
          type="text" 
          name="remarks" 
          placeholder="e.g. Excellent understanding / Need practice in algebra" 
          className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] focus:bg-white transition"
        />
      </div>

      {state && (
        <div className={`p-2.5 rounded-lg font-semibold ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {state.message || state.error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
      >
        <Award className="h-4 w-4" />
        <span>{isPending ? "Submitting..." : "Submit Student Marks"}</span>
      </button>
    </form>
  );
}
