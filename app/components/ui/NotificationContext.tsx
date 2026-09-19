"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BroadcastNotification {
  _id: string;
  title: string;
  message: string;
  sender: string;
  stream: string;
  priority: "info" | "important" | "urgent";
  image_url?: string;
  date?: string;
  created_at: string;
}

interface NotificationContextType {
  notifications: BroadcastNotification[];
  unreadCount: number;
  hasUnread: boolean;
  markAllAsSeen: () => void;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const SEEN_STORAGE_KEY = "kvi_seen_notification_ids_v1";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<BroadcastNotification[]>([]);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    }
  };

  // Load seen IDs from localStorage on mount & initial fetch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SEEN_STORAGE_KEY);
      if (saved) {
        setSeenIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read seen notification IDs from storage", e);
    }

    fetchNotifications();

    // Poll periodically every 20 seconds for real-time announcements
    const interval = setInterval(fetchNotifications, 20000);
    return () => clearInterval(interval);
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !seenIds.includes(String(n._id))).length;
  const hasUnread = unreadCount > 0;

  const markAllAsSeen = () => {
    const allIds = notifications.map((n) => String(n._id));
    const combined = Array.from(new Set([...seenIds, ...allIds]));
    setSeenIds(combined);
    try {
      localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(combined));
    } catch (e) {
      console.warn("Failed to write seen notifications to storage", e);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        hasUnread,
        markAllAsSeen,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
