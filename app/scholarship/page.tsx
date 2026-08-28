"use client";

import { useState } from "react";
import { Award, Calculator, Sparkles } from "lucide-react";

export default function Scholarship() {
  const [calculatorScore, setCalculatorScore] = useState<number>(85);

  // Fee waiver logic
  let estimateWaiver = "Standard counseling admission";
  let waiverColor = "text-[#0D2847] dark:text-[#F5BE18]";
  if (calculatorScore >= 95) {
    estimateWaiver = "80% - 100% Tuition Fee Waiver";
    waiverColor = "text-green-600 dark:text-green-400 font-extrabold";
  } else if (calculatorScore >= 90) {
    estimateWaiver = "50% - 75% Tuition Fee Waiver";
    waiverColor = "text-green-600 dark:text-green-400 font-extrabold";
  } else if (calculatorScore >= 80) {
    estimateWaiver = "25% - 45% Tuition Fee Waiver";
    waiverColor = "text-green-500 dark:text-green-400 font-bold";
  } else if (calculatorScore >= 70) {
    estimateWaiver = "10% - 20% Tuition Fee Waiver";
    waiverColor = "text-amber-600 dark:text-amber-400 font-bold";
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#071728] text-gray-800 dark:text-gray-100 py-12 px-4 md:px-8 mt-10 flex flex-col justify-start items-center">
      <div className="max-w-xl w-full bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 flex flex-col justify-between relative">
        <div className="absolute inset-0 bg-[#F5BE18]/5 rounded-full filter blur-3xl z-0" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/10 dark:bg-[#F5BE18]/20 text-[#0D2847] dark:text-[#F5BE18] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scholarship waiver Estimator</span>
            </span>
            <h2 className="text-2xl font-black text-[#0D2847] dark:text-white flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6 text-[#F5BE18]" />
              <span>KV Eligibility Calculator</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Move the slider to match your previous final class percentage score and view your estimated KVI tuition scholarship potential.
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
              onChange={(e) => setCalculatorScore(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00A5EC]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Eligibility Box */}
          <div className="bg-gray-50 dark:bg-[#091a2e] border border-gray-150 dark:border-gray-800 p-6 rounded-xl mt-2 text-center shadow-inner">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider block font-black">Estimated Scholarship Potential</span>
            <span className={`text-base md:text-lg block mt-3 ${waiverColor}`}>
              {estimateWaiver}
            </span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 block mt-3 italic font-semibold">
              *Subject to performance in the offline admission selection evaluation test.
            </span>
          </div>
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
