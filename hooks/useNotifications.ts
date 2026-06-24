"use client";

import { useState, useEffect } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "profile" | "department" | "company" | "request" | "general" | "warning";
}

const initialNotifications: Notification[] = [
  { id: "1", title: "Employee Profile Updated", message: "Sarah Johnson's information was updated successfully.", time: "2 min ago", read: false, type: "profile" },
  { id: "2", title: "Department Created", message: "Engineering department was created successfully.", time: "2 min ago", read: false, type: "department" },
  { id: "3", title: "New Company Added", message: "TechCorp Solutions has been added to the system.", time: "2 min ago", read: false, type: "company" },
  { id: "4", title: "Request Approved", message: "Your submitted request has been approved.", time: "2 min ago", read: false, type: "request" },
  { id: "5", title: "Pending Approval", message: "You have 5 new pending leave requests to approve.", time: "15 min ago", read: true, type: "warning" },
  { id: "6", title: "System Maintenance", message: "Scheduled maintenance will occur on Sunday at 2 AM.", time: "1 day ago", read: true, type: "general" },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    const stored = localStorage.getItem("shiftmate_notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      localStorage.setItem("shiftmate_notifications", JSON.stringify(initialNotifications));
    }
  }, []);

  const save = (updated: Notification[]) => {
    setNotifications(updated);
    localStorage.setItem("shiftmate_notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    save(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    save([]);
  };

  const removeNotification = (id: string) => {
    save(notifications.filter(n => n.id !== id));
  };

  return { 
    notifications, 
    markAllAsRead, 
    clearAll, 
    removeNotification,
    unreadCount: notifications.filter(n => !n.read).length
  };
}
