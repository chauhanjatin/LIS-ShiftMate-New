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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-[#f5f7fb] text-neutral-900">
      <Sidebar 
        collapsed={isSidebarCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Sidebar Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <button
        type="button"
        aria-label={
          isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
        }
        onClick={() => setIsSidebarCollapsed((prev) => !prev)}
        className={`absolute top-[66px] z-100 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all duration-500 ease-in-out lg:inline-flex ${
          isSidebarCollapsed ? "2xl:left-28 left-25" : "2xl:left-64 left-60"
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
        <Header 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  );
}
