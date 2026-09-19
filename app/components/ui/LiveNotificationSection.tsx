"use client";

import { Bell, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useNotifications } from "./NotificationContext";

export default function LiveNotificationSection() {
  const { notifications, markAllAsSeen, hasUnread } = useNotifications();

  if (!notifications || notifications.length === 0) {
    return null;
  }

  const latest = notifications[0];

  return (
    <section id="notifications" className="w-full bg-[#0D2847] text-white py-6 px-4 border-y border-amber-400/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`p-2.5 rounded-xl shrink-0 shadow-md ${hasUnread ? "bg-red-600 animate-bounce" : "bg-[#F5BE18]"}`}>
            <Bell className={`w-5 h-5 ${hasUnread ? "text-white" : "text-[#0D2847]"}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-[#0D2847] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Live Broadcast
              </span>
              <span className="text-[11px] text-gray-300 font-semibold">Faculty Announcement</span>
            </div>
            <h3 className="font-extrabold text-sm md:text-base text-white mt-0.5 line-clamp-1">
              {latest.title}
            </h3>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/notifications"
          onClick={markAllAsSeen}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5BE18] hover:bg-amber-400 text-[#0D2847] text-xs font-black rounded-xl transition shadow-md cursor-pointer shrink-0"
        >
          <Megaphone className="w-4 h-4" />
          <span>View All Faculty Broadcasts ({notifications.length})</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}
