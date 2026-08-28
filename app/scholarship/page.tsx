"use client";

import { useState } from "react";
import { Award, Calculator, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { submitScholarship } from "@/lib/coaching-actions";

export default function Scholarship() {
  const [calculatorScore, setCalculatorScore] = useState<number>(85);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("score", calculatorScore.toString());

    try {
      const res = await submitScholarship(null, formData);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message || "Registration successful!");
        e.currentTarget.reset();
      } else {
        setError(res.error || "Failed to submit registration details.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#071728] text-gray-800 dark:text-gray-100 py-12 px-4 md:px-8 mt-10 flex flex-col justify-start items-center">
      <div className="max-w-xl w-full bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 flex flex-col justify-between relative">
        <div className="absolute inset-0 bg-[#F5BE18]/5 rounded-full filter blur-3xl z-0" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/10 dark:bg-[#F5BE18]/20 text-[#0D2847] dark:text-[#F5BE18] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scholarship Registration</span>
            </span>
            <h2 className="text-2xl font-black text-[#0D2847] dark:text-white flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6 text-[#F5BE18]" />
              <span>KV Eligibility Calculator</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Move the slider to match your previous final class percentage score and proceed with your KVI registration.
            </p>
          </div>

          {/* Slider Widget */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Previous Percentage:</span>
              <span className="text-[#00A5EC] dark:text-sky-400 font-black text-base">{calculatorScore}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={calculatorScore} 
              disabled={showForm || successMsg !== ""}
              onChange={(e) => setCalculatorScore(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00A5EC] disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Form Action Toggle or Success state */}
          {!showForm && successMsg === "" && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Proceed to Register</span>
            </button>
          )}

          {successMsg && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center flex flex-col items-center gap-3 mt-4 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <h3 className="font-extrabold text-green-800 text-sm">Application Received Successfully!</h3>
              <p className="text-xs text-green-700 leading-relaxed">{successMsg}</p>
              <button
                onClick={() => { setSuccessMsg(""); setShowForm(false); }}
                className="mt-2 text-xs font-bold text-[#0D2847] underline hover:text-[#0D2847]/80"
              >
                Calculate Again
              </button>
            </div>
          )}

          {showForm && successMsg === "" && (
            <form onSubmit={handleSubmit} className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-4 flex flex-col gap-4 text-xs animate-in slide-in-from-top duration-300">
              <h3 className="font-black text-sm text-[#0D2847] dark:text-white uppercase tracking-wide">Enter Student Details</h3>
              
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg text-xs font-bold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Student Name *</label>
                  <input
                    type="text"
                    name="student_name"
                    required
                    placeholder="Enter student name"
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Age (Years)</label>
                  <input
                    type="number"
                    name="age"
                    min="5"
                    max="30"
                    placeholder="Enter student age"
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Gmail Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter gmail address"
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter contact number"
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                  />
                </div>

                {/* Grade/Class */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Current Class *</label>
                  <select
                    name="grade"
                    required
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-bold"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Other">Other Class</option>
                  </select>
                </div>

                {/* Preferred Stream */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase tracking-wider">Preferred Stream *</label>
                  <select
                    name="preferred_stream"
                    required
                    className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-bold"
                  >
                    <option value="Science">Science (Medical/Non-Medical)</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Humanities / Arts</option>
                    <option value="Foundations">Foundations (Class 8-10)</option>
                  </select>
                </div>
              </div>

              {/* Academic Achievements */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 uppercase tracking-wider">Academic Achievements</label>
                <textarea
                  name="academic_achievements"
                  rows={2}
                  placeholder="E.g., Olympiads, school awards, previous class performance details..."
                  className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                />
              </div>

              {/* Evaluation Question */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 uppercase tracking-wider">Evaluation: Why do you want to join Knowledge Venture Institute? *</label>
                <textarea
                  name="why_join"
                  required
                  rows={2}
                  placeholder="Explain why you want to enroll at KVI..."
                  className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00A5EC] font-semibold"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-1/3 py-3 border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold tracking-wider rounded-xl transition duration-200 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-3 bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-black uppercase tracking-wider rounded-xl transition duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6 relative z-10 text-xs text-gray-400 dark:text-gray-500 text-center flex flex-col items-center">
          <span className="flex items-center gap-1 text-[#F5BE18] font-bold uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>KV Talent Search Reward Program</span>
          </span>
          <p className="mt-1 leading-relaxed max-w-sm">
            Top waiver tier scores qualify for cash rewards, complimentary textbooks, and doubt session board preparation guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
