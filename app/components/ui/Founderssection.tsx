"use client";

import { useState } from "react";

interface Section {
  heading: string;
  content: string | string[];
}

interface InfoRow {
  label: string;
  value: string;
}

interface Founder {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  infoRows: InfoRow[];
  tableOfContents: string[];
  sections: Section[];
  social: { [platform: string]: string };
}

const founder: Founder = {
  id: 1,
  name: "Mr. Pankaj Mishra",
  title: "Managing Director, PND Group",
  image:
    "https://res.cloudinary.com/ddtifclgr/image/upload/v1772051872/125A3288_yq7gfo.jpg",
  bio:
    "is the Managing Director of PND Group, comprising PND Global Logistics, PND Maritime Pvt Ltd., and PND Exim Limited. Known for eliminating third-party dependencies in logistics operations, he built a vertically integrated enterprise focused on operational control, efficiency, and strategic expansion.",
  infoRows: [
    { label: "Profession", value: "Logistics Entrepreneur" },
    { label: "Title", value: "Managing Director, PND Group" },
    { label: "Education", value: "Mechanical Engineering; Gold Medallist in Industrial Engineering & Management" },
    { label: "Founded", value: "PND Global Logistics (2019)" },
    { label: "Nationality", value: "Indian" },
    { label: "Known For", value: "Eliminating third-party logistics dependencies" },
  ],
  tableOfContents: [
    "The Visionary",
    "The Journey",
    "The Innovation",
    "The Success",
    "Quote",
    "Social Links",
  ],
  sections: [
    {
      heading: "The Visionary",
      content:
        "Some entrepreneurs are born with clarity; others discover their calling through perseverance. Mr. Pankaj Mishra's journey reflects adaptability and determination. From an introverted schoolboy to a corporate professional, professor, defence officer, and ultimately a logistics entrepreneur, his evolution shaped his leadership mindset.",
    },
    {
      heading: "The Journey",
      content:
        "As Managing Director of PND Group, Mr. Pankaj leads an enterprise that redefined logistics operations by eliminating reliance on intermediaries. Academically, he graduated in Mechanical Engineering and earned a Gold Medal in Industrial Engineering and Management — building the analytical foundation behind his operational strategies.",
    },
    {
      heading: "The Innovation",
      content:
        "During his corporate tenure and teaching career, he prepared for competitive defence services examinations. However, his entrepreneurial instinct led him to identify a structural gap in logistics — excessive dependency on third-party operators. Together with his co-founder Mr. Amit, he envisioned a vertically integrated logistics model.",
    },
    {
      heading: "The Success",
      content:
        "In 2019, PND Global Logistics was founded with a disruptive approach: direct registration with major shipping lines instead of relying on intermediaries. This strategic shift provided unmatched operational control. Expansion followed through PND Maritime Pvt. Ltd., where the company began acquiring and operating its own containers — further strengthening independence and scalability.",
    },
    {
      heading: "Quote",
      content:
        "\"Innovation isn't just about technology – it's about reimagining how business should be done.\" – Mr. Pankaj Mishra",
    },
    {
      heading: "Social Links",
      content: [],
    },
  ],
  social: {
    Instagram: "https://www.instagram.com/pankaj.mishra.52",
  },
};

interface ProfilePageProps {
  founder: Founder;
  onClose: () => void;
}

function ProfilePage({ founder, onClose }: ProfilePageProps) {
  const [tocOpen, setTocOpen] = useState(true);

  const scrollTo = (heading: string) => {
    const el = document.getElementById(heading.replace(/\s+/g, "-").toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const wikiSerif = "Linux Libertine, Georgia, Times, serif";
  const wikiSans = "'Helvetica Neue', Arial, sans-serif";

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto" style={{ fontFamily: wikiSerif }}>

     
      {/* ── Page body ── */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "16px 16px 80px", boxSizing: "border-box" }}>

        {/* Page title */}
        <h1 style={{
          fontSize: "1.95rem",
          fontWeight: 400,
          borderBottom: "1px solid #a2a9b1",
          paddingBottom: "4px",
          marginBottom: "12px",
          fontFamily: wikiSerif,
          color: "#000",
          lineHeight: 1.3,
        }}>
          {founder.name}
        </h1>

        {/* ── Clearfix container — infobox floats right, content wraps left ── */}
        <div style={{ overflow: "hidden" }}>

          {/* INFOBOX — floated right, responsive width */}
          <div style={{
            float: "right",
            clear: "right",
            width: "min(260px, 45vw)",
            marginLeft: "16px",
            marginBottom: "12px",
            border: "1px solid #a2a9b1",
            fontSize: "12px",
            fontFamily: wikiSans,
            backgroundColor: "#fff",
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: "#cee0f2",
              borderBottom: "1px solid #a2a9b1",
              padding: "5px 10px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              color: "#000",
            }}>
              {founder.name}
              {/* Meta verified badge */}
              <svg width="13" height="13" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M20 2L24.5 7.5L31.5 6.5L33.5 13.5L40 17L37 23.5L40 30L33.5 33.5L31.5 40.5L24.5 39.5L20 45L15.5 39.5L8.5 40.5L6.5 33.5L0 30L3 23.5L0 17L6.5 13.5L8.5 6.5L15.5 7.5L20 2Z" fill="url(#vg1)" />
                <path d="M13 20.5L17.5 25L27 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="vg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F9EF8" />
                    <stop offset="100%" stopColor="#1877F2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Photo */}
            <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#eee" }}>
              <img
                src={founder.image}
                alt={founder.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>

            {/* Info rows */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <tbody>
                {founder.infoRows.map((row) => (
                  <tr key={row.label} style={{ borderTop: "1px solid #eaecf0" }}>
                    <td style={{ padding: "5px 8px", fontWeight: "bold", verticalAlign: "top", backgroundColor: "#f8f9fa", width: "72px", color: "#000", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                      {row.label}
                    </td>
                    <td style={{ padding: "5px 8px", verticalAlign: "top", color: "#000", lineHeight: 1.4, wordBreak: "break-word" }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lead paragraph */}
          <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#000", marginBottom: "14px" }}>
            <strong>{founder.name}</strong> {founder.bio}
          </p>

          {/* Table of Contents */}
          <div style={{
            display: "inline-block",
            border: "1px solid #a2a9b1",
            backgroundColor: "#f8f9fa",
            marginBottom: "18px",
            fontFamily: wikiSans,
            maxWidth: "100%",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 10px",
              borderBottom: "1px solid #a2a9b1",
            }}>
              <span style={{ fontWeight: "bold", fontSize: "12px", color: "#000" }}>Contents</span>
              <button
                onClick={() => setTocOpen(!tocOpen)}
                style={{ color: "#3366cc", fontSize: "11px", background: "none", border: "none", cursor: "pointer", marginLeft: "10px" }}
              >
                [{tocOpen ? "hide" : "show"}]
              </button>
            </div>
            {tocOpen && (
              <ol style={{ listStyle: "none", margin: 0, padding: "6px 10px" }}>
                {founder.tableOfContents.map((item, i) => (
                  <li key={item} style={{ margin: "2px 0" }}>
                    <button
                      onClick={() => scrollTo(item)}
                      style={{ color: "#3366cc", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                    >
                      {i + 1}&nbsp;&nbsp;{item}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Sections */}
          {founder.sections.map((section) => {
            const anchorId = section.heading.replace(/\s+/g, "-").toLowerCase();
            const isListContent = Array.isArray(section.content);
            const isSocial = section.heading === "Social Links";

            return (
              <div key={section.heading} id={anchorId} style={{ marginBottom: "18px" }}>
                <h2 style={{
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  borderBottom: "1px solid #a2a9b1",
                  paddingBottom: "3px",
                  marginBottom: "7px",
                  fontFamily: wikiSerif,
                  color: "#000",
                }}>
                  {section.heading}
                </h2>

                {isSocial ? (
                  <ul style={{ paddingLeft: "1.3em", margin: 0 }}>
                    {Object.entries(founder.social).map(([platform, url]) => (
                      <li key={platform} style={{ fontSize: "14px", lineHeight: "1.7" }}>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#3366cc" }}>
                          {platform} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : isListContent ? (
                  <ul style={{ paddingLeft: "1.3em", margin: 0 }}>
                    {(section.content as string[]).map((item) => (
                      <li key={item} style={{ fontSize: "14px", lineHeight: "1.7", color: "#000" }}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#000", margin: 0 }}>
                    {section.content as string}
                  </p>
                )}
              </div>
            );
          })}

          {/* clearfix */}
          <div style={{ clear: "both" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Founders Section (dark card) ── */
export default function FoundersSection() {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  if (showProfile) {
    return <ProfilePage founder={founder} onClose={() => setShowProfile(false)} />;
  }

  return (
    <section className="bg-black min-h-screen py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-4">
          The Leader Behind the Bakeats
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Meet the founder of bakeats — passionate creators who turned their vision 
           into reality.
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className="relative w-72 rounded-3xl overflow-hidden cursor-pointer group"
          style={{ aspectRatio: "3/4" }}
          onClick={() => setShowProfile(true)}
        >
          <div className="absolute inset-0 bg-black" />
          <img
            src={founder.image}
            alt={founder.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between">
            <div>
              <p className="text-white text-xl font-semibold leading-tight">{founder.name}</p>
              <p className="text-gray-300 text-sm">{founder.title}</p>
            </div>
            <button className="w-11 h-11 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-orange-500 transition-all duration-300" />
        </div>
      </div>
    </section>
  );
}