import { Metadata } from "next";
import EnrollmentClient from "./EnrollmentClient";

export const metadata: Metadata = {
  title: "Course Batches & Enrollment | Knowledge Venture Institute Hari Nagar Jaitpur Badarpur",
  description: "Explore academic batches, course schedules & fees at Knowledge Venture Institute (KVI). Admissions open for Class 6-10th Foundations, Class 11-12th Commerce & Arts in Hari Nagar, Jaitpur & Badarpur.",
  keywords: [
    "Coaching course batches Hari Nagar",
    "Class 11 12 Commerce tuition fees Jaitpur",
    "Class 9 10 Science Maths batch Badarpur",
    "KVI enrollment Hari Nagar Badarpur Delhi",
    "Best tuition batches 110044"
  ]
};

export default function DirectEnrollmentPage() {
  return <EnrollmentClient />;
}
