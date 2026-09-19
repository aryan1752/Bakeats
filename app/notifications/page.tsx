"use client";

import { useEffect, useState } from "react";
import { 
  Bell, 
  Megaphone, 
  Info, 
  AlertTriangle, 
  ArrowLeft, 
  Filter, 
  Calendar, 
  User, 
  Eye, 
  X, 
  Image as ImageIcon, 
  Download 
} from "lucide-react";
import Link from "next/link";
import { useNotifications, BroadcastNotification } from "@/components/ui/NotificationContext";

export default function NotificationsPage() {
  const { notifications, markAllAsSeen, fetchNotifications } = useNotifications();
  const [selectedStream, setSelectedStream] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  // Automatically mark all notifications as seen when visiting this dedicated page
  useEffect(() => {
    markAllAsSeen();
  }, [notifications]);

  const filteredNotifications = notifications.filter((item) => {
    const matchesStream =
      selectedStream === "all" || item.stream === "all" || item.stream === selectedStream;
    const matchesPriority =
      selectedPriority === "all" || item.priority === selectedPriority;
    return matchesStream && matchesPriority;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "urgent":
        return {
          bg: "bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-800/40",
          badge: "bg-red-600 text-white",
          icon: <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />,
          label: "URGENT BROADCAST",
        };
      case "important":
        return {
          bg: "bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40",
          badge: "bg-amber-500 text-white",
          icon: <Megaphone className="w-5 h-5 text-amber-600 shrink-0" />,
          label: "IMPORTANT NOTICE",
        };
      default:
        return {
          bg: "bg-blue-50/70 dark:bg-slate-800/40 border-blue-150 dark:border-slate-700/50",
          badge: "bg-blue-600 text-white",
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
          label: "ANNOUNCEMENT",
        };
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#071728] py-10 px-4 md:px-8 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Filters Bar */}
        <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] tracking-wider w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#F5BE18]" />
            <span>Filter Notifications</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Stream Filter */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
              <span className="text-[10px] text-gray-400 font-bold">Stream:</span>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2 text-gray-700 dark:text-gray-200 font-semibold text-xs outline-none focus:border-[#F5BE18]"
              >
                <option value="all">All Streams</option>
                <option value="foundations">Class 9-10th Foundations</option>
                <option value="science">Class 11-12th Science</option>
                <option value="commerce">Class 11-12th Commerce</option>
                <option value="arts">Class 11-12th Arts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="flex flex-col gap-5">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 mb-3">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-base font-extrabold text-[#0D2847] dark:text-white">
                No notifications found
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                There are no broadcast announcements matching your selected filters right now.
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const formattedDate = item.created_at
                ? new Date(item.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Recent";

              return (
                <div
                  key={item._id}
                  className="bg-white dark:bg-[#0d2036] p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 transition shadow-sm hover:shadow-lg relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0D2847] to-[#12365e] border border-amber-400/40 text-[#F5BE18] font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                          {item.sender ? item.sender.charAt(0).toUpperCase() : "K"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-[#0D2847] dark:text-white">
                              {item.sender || "Faculty / Admin"}
                            </span>
                            <span className="text-[10px] bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-extrabold px-2 py-0.5 rounded-full">
                              Official Announcement
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            <span>{item.date ? `Date: ${item.date}` : formattedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {item.date && (
                          <span className="text-[9px] font-extrabold uppercase px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-400/30">
                            📅 {item.date}
                          </span>
                        )}
                        {item.stream && (
                          <span className="text-[9px] font-extrabold uppercase px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-slate-700">
                            🎯 {item.stream === "all" ? "All Batches" : item.stream}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Announcement Title */}
                    <h3 className="font-black text-[#0D2847] dark:text-white text-lg md:text-xl mt-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Attachment Image Poster Section (BEFORE Message) */}
                    {item.image_url && (
                      <div className="mt-3 relative group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-slate-950 shadow-md">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-auto max-h-[480px] object-contain mx-auto bg-black/40 transition duration-300 group-hover:scale-[1.01]"
                          loading="lazy"
                        />
                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            onClick={() => setActiveImageModal(item.image_url!)}
                            className="bg-[#F5BE18] hover:bg-[#e2ad07] text-[#0D2847] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xl transition transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Click to Zoom Poster</span>
                          </button>
                        </div>

                        {/* Mobile preview bar */}
                        <div className="p-2 bg-[#0D2847]/90 text-white flex items-center justify-between text-[11px] px-4 font-bold border-t border-white/10 sm:hidden">
                          <span className="flex items-center gap-1 text-amber-300">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Attached Poster Image</span>
                          </span>
                          <button
                            onClick={() => setActiveImageModal(item.image_url!)}
                            className="text-[#F5BE18] underline font-extrabold"
                          >
                            Zoom Fullscreen
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Announcement Message Text (BELOW Image) */}
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200 mt-3 leading-relaxed whitespace-pre-line font-normal bg-gray-50/50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                      {item.message}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                      <span>Verified Broadcast from Admin Hub</span>
                    </span>
                    {item.image_url && (
                      <button
                        onClick={() => setActiveImageModal(item.image_url!)}
                        className="text-xs text-[#00A5EC] hover:text-[#008AC5] dark:text-sky-400 font-extrabold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Attached Poster</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-all duration-300"
          onClick={() => setActiveImageModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
            <img
              src={activeImageModal}
              alt="Full view announcement poster"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/20"
            />
            <div className="mt-3 flex items-center gap-3">
              <a
                href={activeImageModal}
                target="_blank"
                rel="noreferrer"
                className="bg-[#F5BE18] hover:bg-[#e2ad07] text-[#0D2847] text-xs font-extrabold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                <span>Open Original High-Res Image</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
