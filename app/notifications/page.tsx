"use client";

import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Image from "next/image";
import { useNotifications } from "@/hooks/useNotifications";
import filterIcon from "@/assets/images/icons/filter.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function NotificationsPage() {
  const { notifications, markAllAsRead, clearAll, removeNotification } = useNotifications();

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "profile":
        return { bg: "bg-[#EAF2FF]", text: "text-[#257BFC]", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> };
      case "department":
      case "company":
        return { bg: "bg-[#F3E8FF]", text: "text-[#8B5CF6]", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg> };
      case "request":
        return { bg: "bg-[#EAF9EA]", text: "text-[#4DB949]", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> };
      case "warning":
        return { bg: "bg-[#FFF6E8]", text: "text-[#FFA100]", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> };
      default:
        return { bg: "bg-neutral-100", text: "text-neutral-500", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> };
    }
  };

  return (
    <DashboardLayout title="Notifications" subtitle="Home / Notifications">
      <div className={`flex-1 p-4 2xl:p-6 pb-20 ${lexendDeca.className}`}>
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between p-5 border-b border-neutral-100">
            <h2 className="text-[18px] font-bold text-neutral-900">Notifications</h2>
            
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer">
                <Image src={filterIcon} alt="Filter" />
              </button>
              
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Mark All as Read
              </button>

              <button 
                onClick={clearAll}
                className="flex items-center gap-2 rounded-xl border border-[#EE5340] px-5 py-2.5 text-[14px] font-semibold text-[#EE5340] transition hover:bg-[#FEE2E2] cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Clear All
              </button>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {notifications.length === 0 ? (
              <div className="p-10 text-center text-neutral-500">
                <p>No notifications available.</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const styles = getTypeStyles(notification.type);
                return (
                  <div key={notification.id} className="flex items-center gap-4 p-5 hover:bg-neutral-50 transition-colors">
                    <div className="w-2 flex justify-center shrink-0">
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-[#257BFC]"></div>}
                    </div>

                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.bg} ${styles.text}`}>
                      {styles.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-semibold text-neutral-900 truncate">{notification.title}</h4>
                      <p className="text-[14px] text-neutral-500 leading-tight mt-1 line-clamp-1">{notification.message}</p>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 ml-4">
                      <span className="text-[13px] font-medium text-neutral-400">{notification.time}</span>
                      
                      <button 
                        onClick={() => removeNotification(notification.id)}
                        className="text-neutral-400 hover:text-[#EE5340] transition-colors p-2"
                        aria-label="Delete notification"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
