"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import dashboardOpenIcon from "@/assets/images/icons/dashboard-openicon.svg";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
  title: string;
  subtitle: React.ReactNode | string;
}>;

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#f5f7fb] text-neutral-900">
      <Sidebar
        collapsed={isSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

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
        className={`absolute top-[22px] z-50 hidden xl:h-10 lg:h-8 xl:w-10 w-8 -translate-x-1/2 rotate-45 items-center justify-center rounded-[12px] border border-neutral-200 bg-white cursor-pointer transition-all duration-500 ease-in-out lg:inline-flex
           ${isSidebarCollapsed ? "left-[106px]" : "2xl:left-[280px] left-63"
          }`}
      >
        <Image
          src={dashboardOpenIcon}
          alt=""
          width={30}
          height={30}
          className={`-rotate-45 duration-500 transition-transform ${isSidebarCollapsed ? "rotate-[135deg]" : ""
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
