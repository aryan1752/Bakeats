import React from "react";
import { Timeline } from "./timeline";
 
export function TimelineDemo() {
  const data = [
    {
      title: "Institute Foundation",
      content: (
        <div>
          <h4 className="text-base md:text-xl font-black text-[#F5BE18] mb-2">
            Establishment of Knowledge Venture Institute (KVI)
          </h4>
          <p className="mb-4 text-xs font-semibold text-neutral-300 md:text-sm leading-relaxed">
            Founded in Hari Nagar, Jaitpur Badarpur, New Delhi with a singular mission: providing top-tier academic coaching for Class 6th to 12th students with 100% conceptual clarity and small batch sizes.
          </p>
          <div className="mb-6 flex flex-col gap-2 text-xs font-bold text-gray-200">
            <div>✅ Opened Head Office above Dabra Medical Center, Hari Nagar</div>
            <div>✅ Introduced Class 11-12th Commerce & Humanities specialization</div>
            <div>✅ Launched Class 6th to 10th Foundations batch</div>
          </div>
        </div>
      ),
    },
    {
      title: "Faculty Expansion",
      content: (
        <div>
          <h4 className="text-base md:text-xl font-black text-[#00A5EC] mb-2">
            Senior Faculty & Qualified Professionals Onboarded
          </h4>
          <p className="mb-4 text-xs font-semibold text-neutral-300 md:text-sm leading-relaxed">
            Strengthened our teaching team with CS Sanjay Arya (Company Secretary for Commerce), Er. Aditya Pratap Singh (5+ Yrs Exp for 11-12th Maths & Physics), Vimal Sharma (15+ Yrs Exp for Humanities), and Er. Saurabh Singh (B.Tech for 11-12th Chemistry & 9-10th Boards).
          </p>
          <div className="mb-6 flex flex-col gap-2 text-xs font-bold text-gray-200">
            <div>✅ 100% Board pattern mock tests & daily practice sheets</div>
            <div>✅ Dedicated doubt clearance hours post classes</div>
            <div>✅ Parent-Teacher performance review meetings</div>
          </div>
        </div>
      ),
    },
    {
      title: "Board Results",
      content: (
        <div>
          <h4 className="text-base md:text-xl font-black text-emerald-400 mb-2">
            Consistent Board Toppers (95%+ Scores)
          </h4>
          <p className="mb-4 text-xs font-semibold text-neutral-300 md:text-sm leading-relaxed">
            KVI students secured top marks in Economics (99/100), Political Science (98/100), History (98/100), Chemistry (98/100), and Accounts (97/100) across CBSE & State Board examinations in Badarpur & Jaitpur.
          </p>
          <div className="mb-6 flex flex-col gap-2 text-xs font-bold text-gray-200">
            <div>✅ Over 3,000+ students taught successfully</div>
            <div>✅ Highest scoring results in Hari Nagar, Jaitpur Extension & Badarpur</div>
          </div>
        </div>
      ),
    },
    {
      title: "Talent Search",
      content: (
        <div>
          <h4 className="text-base md:text-xl font-black text-[#F5BE18] mb-2">
            KV Talent Search Scholarship & Reward Program
          </h4>
          <p className="mb-4 text-xs font-semibold text-neutral-300 md:text-sm leading-relaxed">
            Introduced fee waiver scholarships for deserving students of Hari Nagar, Jaitpur, Badarpur, and South East Delhi to ensure quality coaching is accessible to all.
          </p>
          <div className="mb-6 flex flex-col gap-2 text-xs font-bold text-gray-200">
            <div>✅ Up to 100% fee waiver for top scorers</div>
            <div>✅ Free textbook assistance and exam study material</div>
          </div>
        </div>
      ),
    }
  ];
  return (
    <div className="relative w-full overflow-clip bg-[#071728] border-b border-gray-800">
      <Timeline data={data} />
    </div>
  );
}