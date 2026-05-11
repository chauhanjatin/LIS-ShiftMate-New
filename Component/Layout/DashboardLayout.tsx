"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import dashboardOpenIcon from "@/assets/images/icons/dashboard-openicon.svg";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
  title: string;
  subtitle: string;
}>;

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-[#f5f7fb] text-neutral-900">
      <Sidebar collapsed={isSidebarCollapsed} />

      <button
        type="button"
        aria-label={
          isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
        }
        onClick={() => setIsSidebarCollapsed((prev) => !prev)}
        className={`absolute top-[66px] z-20 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all duration-500 ease-in-out lg:inline-flex ${
          isSidebarCollapsed ? "left-28" : "left-64"
        }`}
      >
        <Image
          src={dashboardOpenIcon}
          alt=""
          width={18}
          height={18}
          className={`h-[18px] w-[18px] transition-transform ${
            isSidebarCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      <section className="flex min-w-0 flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />
        {children}
      </section>
    </div>
  );
}
