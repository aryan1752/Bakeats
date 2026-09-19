"use client";

import BatchCoursesExplorer from "@/components/ui/BatchCoursesExplorer";

export default function EnrollmentClient() {
  return (
    <div className="w-full min-h-screen bg-[#071728] text-gray-100 py-8 px-4 md:px-8 mt-6 flex flex-col justify-start items-center">
      <BatchCoursesExplorer title="KVI Academic Batches & Class Timings" />
    </div>
  );
}
