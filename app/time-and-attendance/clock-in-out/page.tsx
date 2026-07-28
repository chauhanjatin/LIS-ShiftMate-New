"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function ClockInOutPage() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date | null) => {
    if (!d) return "00:00:00";
    return d.toLocaleTimeString("en-GB", { hour12: false });
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "Loading date...";
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-[#257BFC] transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Clock In / Clock Out</span>
    </span>
  );

  return (
    <DashboardLayout title="Time & Attendance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Today's Status (Clock Widget) */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm p-6 xl:p-8 lg:col-span-8 flex flex-col min-h-[400px]">
            <h3 className="text-[18px] font-semibold text-[#111827] mb-6">Today's Status</h3>
            <div className="border-b border-[#E2E8F0] w-full mb-8"></div>
            
            <div className="bg-[#F8F9FC] rounded-2xl flex-1 flex flex-col items-center justify-center p-8 mb-8 border border-[#E5E7EB] relative">
              <span className="inline-flex rounded-full bg-[#FEE2E2] px-3 py-1 text-[12px] font-medium text-[#EF4444] mb-4">Clocked Out</span>
              
              <h1 className="text-[54px] md:text-[64px] xl:text-[72px] font-bold text-[#111827] tracking-tight m-0 leading-none">
                {formatTime(time)}
              </h1>
              <p className="text-[14px] md:text-[16px] text-[#6B7280] mt-3 mb-8">
                {formatDate(time)}
              </p>
              
              <div className="flex items-center gap-4">
                <button className="h-11 md:h-12 px-6 md:px-8 rounded-xl bg-[#FFF6E8] text-[#FFA100] font-semibold transition hover:bg-[#FFEECF] border border-[#FFE2B5] flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Start Break
                </button>
                <button className="h-11 md:h-12 px-6 md:px-8 rounded-xl bg-[#257BFC] text-white font-semibold transition hover:bg-blue-600 shadow-sm">
                  Start Shift
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full mt-auto">
              <div className="flex justify-between text-[12px] md:text-[13px] text-[#6B7280] mb-2 font-medium">
                <span>09:00</span>
                <span className="text-[#257BFC]">Not started</span>
                <span>17:00</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden relative">
                <div className="h-full rounded-full bg-[#257BFC] absolute left-0" style={{ width: '45%' }}></div>
              </div>
              <p className="text-center text-[12px] md:text-[13px] font-medium text-[#111827] mt-3">Morning Shift - 09:00 - 17:00</p>
            </div>
          </div>

          {/* Shift Details Sidebar */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm p-6 xl:p-8 lg:col-span-4 h-fit">
            <h3 className="text-[18px] font-semibold text-[#111827] mb-6">Shift Details</h3>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                <span className="text-[14px] text-[#6B7280] font-medium">Shift</span>
                <span className="text-[14px] text-[#111827] font-semibold">Morning</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                <span className="text-[14px] text-[#6B7280] font-medium">Scheduled</span>
                <span className="text-[14px] text-[#111827] font-semibold">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                <span className="text-[14px] text-[#6B7280] font-medium">Break Allowance</span>
                <span className="text-[14px] text-[#111827] font-semibold">30 min</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-[14px] text-[#6B7280] font-medium">Location</span>
                <span className="text-[14px] text-[#111827] font-semibold">UK Office</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
