import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Location | Best Coaching Centre in Hari Nagar, Jaitpur & Badarpur",
  description: "Contact Knowledge Venture Institute (KVI) in Hari Nagar, Jaitpur Badarpur 110044. Phone: 7011731649, 8585575250. Address: I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi.",
  keywords: [
    "Coaching center address Hari Nagar Jaitpur",
    "Tuition institute near me Badarpur border",
    "Knowledge Venture Institute address 110044",
    "Contact KVI Hari Nagar phone number",
    "Best coaching institute location Badarpur Delhi"
  ]
};

export default function ContactPage() {
  return <ContactClient />;
}
