import Image from "next/image";
import searchIcon from "@/assets/images/icons/search.svg";
import notificationIcon from "@/assets/images/icons/notification.svg";
import adminImage from "@/assets/images/admin-img.png";

function AdminDropdown() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer rounded-xl px-1 py-1 hover:bg-neutral-100">
        <span className="flex items-center gap-3">
          <Image
            src={adminImage}
            alt="Mathieu Wade"
            className="rounded-2xl object-cover"
          />
          <span className="text-left leading-tight">
            <span className="block text-[20px] font-medium text-neutral-900">
              Mathieu Wade
            </span>
            <span className="block text-[16px] text-[#98A2B3]">HR Admin</span>
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

      <div className="absolute right-0 z-20 mt-3 w-72 rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_16px_35px_rgba(15,23,42,0.14)]">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[16px] font-medium text-neutral-800 hover:bg-neutral-100"
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
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[16px] font-medium text-neutral-800 hover:bg-neutral-100"
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
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[16px] font-medium text-neutral-800 hover:bg-neutral-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-neutral-700"
          >
            <path
              d="M13.5 4.5h3A1.5 1.5 0 0 1 18 6v12a1.5 1.5 0 0 1-1.5 1.5h-3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M10 8.5 6.5 12 10 15.5M6.5 12H15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </details>
  );
}

export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-56">
          <Image
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
          />
          <input
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-sm"
            placeholder="Search"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50"
        >
          <Image
            src={notificationIcon}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button>
        <AdminDropdown />
      </div>
    </header>
  );
}
