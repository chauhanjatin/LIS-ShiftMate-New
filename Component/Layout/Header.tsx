import Image from "next/image";
import searchIcon from "@/assets/images/icons/search.svg";
import notificationIcon from "@/assets/images/icons/notification.svg";
import logoutIcon from "@/assets/images/icons/logout.svg";
import adminImage from "@/assets/images/admin-img.png";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";
import { useRef, useState } from "react";

function AdminDropdown() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer rounded-xl px-1 py-1 hover:bg-neutral-100 outline-none">
        <span className="flex items-center gap-2 sm:gap-3">
          <Image
            src={adminImage}
            alt="Mathieu Wade"
            width={40}
            height={40}
            className="md:h-10 h-8 md:w-10 w-8 rounded-xl sm:rounded-2xl object-cover"
          />
          <span className="hidden sm:block text-left leading-tight">
            <span className="block xl:text-base text-[14px] font-bold text-neutral-900">
              Mathieu Wade
            </span>
            <span className="block text-xs font-medium text-[#98A2B3]">HR Admin</span>
          </span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4 text-neutral-800"
          >
            <path
              d="M5.5 7.5L10 12L14.5 7.5"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="absolute right-0 z-20 mt-3 w-[calc(100vw-2rem)] xl:max-w-[280px] max-w-[215px] sm:w-72 rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_16px_35px_rgba(15,23,42,0.14)]">
        <button
          type="button"
          className="flex w-full items-center md:gap-3 gap-2 rounded-xl md:px-3 md:py-3 px-2 py-2 text-left text-[14px] md:text-[16px] font-medium text-neutral-800 hover:bg-neutral-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-neutral-700"
          >
            <path
              d="M12 12.75a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5ZM5 20a7 7 0 0 1 14 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>My Profile</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center md:gap-3 gap-2 rounded-xl md:px-3 md:py-3 px-2 py-2 text-left text-[14px] md:text-[16px] font-medium text-neutral-800 hover:bg-neutral-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-neutral-700"
          >
            <path
              d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M18.5 12a6.5 6.5 0 0 0-.11-1.18l1.53-1.2-1.5-2.6-1.88.61a6.5 6.5 0 0 0-2.04-1.18L14.2 4h-3.4l-.3 2.45a6.5 6.5 0 0 0-2.04 1.18l-1.88-.61-1.5 2.6 1.53 1.2a6.5 6.5 0 0 0 0 2.36l-1.53 1.2 1.5 2.6 1.88-.61a6.5 6.5 0 0 0 2.04 1.18L10.8 20h3.4l.3-2.45a6.5 6.5 0 0 0 2.04-1.18l1.88.61 1.5-2.6-1.53-1.2c.07-.39.11-.78.11-1.18Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Account Settings</span>
        </button>
        <Link href="/">
          <button
            type="button"
            className="flex w-full items-center md:gap-3 gap-2 rounded-xl md:px-3 md:py-3 px-2 py-2 text-left text-[14px] md:text-[16px] font-medium text-[#EF4444] hover:bg-[#FDEAEA] cursor-pointer"
          >
            <Image src={logoutIcon} alt="logout" />
            <span>Logout</span>
          </button>
        </Link>

      </div>
    </details>
  );
}

function NotificationDropdown() {
  const { notifications, unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

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
    <details ref={detailsRef} className="relative" onToggle={(e) => setIsOpen(e.currentTarget.open)}>
      <summary className="list-none cursor-pointer outline-none">
        <div className="relative inline-flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-xl bg-brand-50 transition-transform hover:bg-brand-100 active:scale-95">
          <Image src={notificationIcon} alt="Notifications" width={20} height={20} className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#EE5340]"></span>
          )}
        </div>
      </summary>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => detailsRef.current?.removeAttribute('open')}></div>
          <div className="absolute right-[-40px] sm:right-0 z-20 mt-3 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.14)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <h3 className="text-[18px] font-bold text-neutral-900">Notifications</h3>
              <button onClick={() => detailsRef.current?.removeAttribute('open')} className="text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {notifications.slice(0, 4).map(notification => {
                const styles = getTypeStyles(notification.type);
                return (
                  <div key={notification.id} className="flex gap-4 p-3 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.bg} ${styles.text}`}>
                      {styles.icon}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h4 className="text-[14px] font-semibold text-neutral-900 truncate">{notification.title}</h4>
                      <p className="text-[13px] text-[#667085] leading-tight mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-[12px] font-medium text-[#98A2B3] mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="flex items-center pt-1.5 items-start">
                        <div className="h-2 w-2 rounded-full bg-[#257BFC]"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-neutral-100 p-4 text-center">
              <Link href="/notifications" onClick={() => detailsRef.current?.removeAttribute('open')} className="text-[14px] font-semibold text-[#257BFC] hover:text-blue-700 transition-colors">
                View All
              </Link>
            </div>
          </div>
        </>
      )}
    </details>
  );
}

export default function Header({
  title,
  subtitle,
  onMenuClick
}: {
  title: string;
  subtitle: React.ReactNode | string;
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-2 md:px-4 py-3 xl:px-8 xl:py-4">
      <div className="flex items-center md:gap-4 gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 text-neutral-600 lg:hidden"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="truncate font-bold tracking-tight text-[19px] md:text-[22px] xl:text-[24px]">{title}</h1>
          <p className="hidden xl:text-sm text-[12px] text-neutral-500 sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center md:gap-3 gap-2 xl:gap-4">
        <div className="relative hidden sm:block xl:w-56 w-40">
          <Image
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
          />
          <input
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 sm:py-2.5 pl-10 sm:pl-11 pr-4 text-sm outline-none focus:border-brand-500 transition-colors"
            placeholder="Search"
          />
        </div>

        <button className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-xl hover:bg-neutral-50 sm:hidden">
          <Image
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button>

        <NotificationDropdown />
        <AdminDropdown />
      </div>
    </header>
  );
}
