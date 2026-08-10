"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import breakIcon from "@/assets/images/icons/start-break.svg";

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
        
        <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl">
          
          <div className="rounded-xl border border-[#D0D5DD] p-6 flex-1 flex flex-col min-h-[400px]">
            <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6">Today's Status</h3>
            <div className="border-b border-[#D0D5DD] w-full mb-6"></div>
            
            <div className="bg-[#F9FAFB] rounded-2xl flex-1 flex flex-col items-center justify-center p-6 mb-6 border border-[#E5E7EB] relative">
              <span className="inline-flex rounded-full bg-[#FEE2E2] px-3.5 py-1.5 text-[12px] text-[#EF4444] mb-4">Clocked Out</span>
              
              <h1 className="text-[54px] md:text-[64px] font-semibold text-[#111827] tracking-tight m-0 leading-none">
                {formatTime(time)}
              </h1>
              <p className="text-[14px] text-[#98A2B3] mt-4 mb-5">
                {formatDate(time)}
              </p>
              
              <div className="flex items-center gap-6">
                <button className="h-11 md:h-12 px-6 md:px-8 rounded-lg bg-[#FFE4B5] text-[#ffffff] text-[16px] flex items-center gap-2 cursor-pointer">
                  <Image src={breakIcon} alt="break" />
                  Start Break
                </button>
                <button className="h-11 md:h-12 px-6 md:px-8 rounded-lg bg-[#257BFC] text-white cursor-pointer">
                  Start Shift
                </button>
              </div>
            </div>

            <div className="w-full mt-auto">
              <div className="flex justify-between text-[12px] md:text-[14px] text-[#98A2B3] mb-2">
                <span>09:00</span>
                <span className="text-[#257BFC]">Not started</span>
                <span>17:00</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden relative">
                <div className="h-full rounded-full bg-[#257BFC] absolute left-0" style={{ width: '45%' }}></div>
              </div>
              <p className="text-center text-[12px] md:text-[14px] text-[#111827] mt-3">Morning Shift • 09:00 - 17:00</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#D0D5DD] p-6 flex-1 h-fit">
            <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-6">Shift Details</h3>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#111827]">Shift</span>
                <span className="text-[14px] text-[#111827]">Morning</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#111827]">Scheduled</span>
                <span className="text-[14px] text-[#111827]">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#111827]">Break Allowance</span>
                <span className="text-[14px] text-[#111827]">30 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#111827]">Location</span>
                <span className="text-[14px] text-[#111827]">UK Office</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
