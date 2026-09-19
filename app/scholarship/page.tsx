import { Metadata } from "next";
import ScholarshipClient from "./ScholarshipClient";

export const metadata: Metadata = {
  title: "KV Talent Search Scholarship & Fee Waiver | KVI Coaching Hari Nagar Badarpur",
  description: "Apply for KV Talent Search Scholarship Program at Knowledge Venture Institute. Up to 100% fee waiver for Class 6-12th students in Hari Nagar, Jaitpur Extension & Badarpur.",
  keywords: [
    "Coaching scholarship test Hari Nagar",
    "Tuition fee waiver Jaitpur Badarpur",
    "KV Talent Search Scholarship KVI",
    "Class 10 12 scholarship test 110044",
    "Free coaching scholarship Badarpur Delhi"
  ]
};

export default function ScholarshipPage() {
  return <ScholarshipClient />;
}
