"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import searchIcon from "@/assets/images/icons/search.svg";
import shiftSwap from "@/assets/images/icons/shift-swap.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

// Types
interface ShiftData {
  id: string;
  type: "Morning Shift" | "Evening Shift";
  time: string;
  hasOvertime?: boolean;
  swapPending?: boolean;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  shifts?: ShiftData[];
}

const calendarDays: CalendarDay[] = [
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { 
    day: 1, 
    isCurrentMonth: true, 
    shifts: [{ id: "s1", type: "Morning Shift", time: "09:00 - 17:00", hasOvertime: true }] 
  },
  { 
    day: 2, 
    isCurrentMonth: true, 
    shifts: [{ id: "s2", type: "Morning Shift", time: "09:00 - 17:00", swapPending: true }] 
  },
  { 
    day: 3, 
    isCurrentMonth: true, 
    shifts: [{ id: "s3", type: "Evening Shift", time: "17:00 - 01:00", hasOvertime: true }] 
  },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  
  { 
    day: 6, 
    isCurrentMonth: true,
    shifts: [{ id: "s4", type: "Evening Shift", time: "17:00 - 01:00" }] 
  },
  { 
    day: 7, 
    isCurrentMonth: true,
    shifts: [{ id: "s5", type: "Morning Shift", time: "09:00 - 17:00", hasOvertime: true }] 
  },
  { day: 8, isCurrentMonth: true, isToday: true },
  { 
    day: 9, 
    isCurrentMonth: true,
    shifts: [{ id: "s6", type: "Morning Shift", time: "09:00 - 17:00" }] 
  },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },

  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },

  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true },
];

export default function ShiftSchedulePage() {
  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-[#257BFC] transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Shift Schedule</span>
    </span>
  );

  return (
    <DashboardLayout title="Time & Attendance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        
        <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden flex flex-col min-h-[700px]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 xl:p-6 border-b border-[#E2E8F0] gap-4">
            <h2 className="text-[20px] font-semibold text-[#111827] m-0">Shift Schedule</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              
              <div className="relative w-full sm:w-60 md:w-72">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 md:h-5 md:w-5 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#111827] outline-none focus:border-[#257BFC]"
                  placeholder="Search..."
                />
              </div>

              <button className="h-11.5 whitespace-nowrap rounded-xl bg-[#257BFC] px-5 text-[14px] 2xl:text-[16px] text-white flex items-center justify-center gap-2 cursor-pointer">
                <Image src={shiftSwap} alt="Request"/>
                Request Shift Swap
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] bg-white">
            <button className="h-8 w-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors text-[#6B7280]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <h3 className="text-[18px] font-semibold text-[#111827]">May 2026</h3>
            <button className="h-8 w-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors text-[#6B7280]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          <div className="flex-1 w-full overflow-x-auto bg-white">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-7 border-b border-[#E2E8F0] bg-[#F8F9FC]">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="px-4 py-3 text-[14px] font-medium text-[#475467]">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 auto-rows-[130px] border-l border-[#E2E8F0]">
                {calendarDays.map((dateObj, i) => (
                  <div 
                    key={i} 
                    className={`border-r border-b border-[#E2E8F0] p-2 md:p-3 relative flex flex-col gap-1.5 transition-colors ${
                      dateObj.isToday ? 'bg-[#EAF6FF]' : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <span className={`text-[15px] font-medium ${
                      dateObj.isToday ? 'text-[#257BFC]' : dateObj.isCurrentMonth ? 'text-[#111827]' : 'text-[#98A2B3]'
                    }`}>
                      {dateObj.day}
                    </span>
                    <div className="flex flex-col gap-1.5 mt-1 flex-1 overflow-y-auto no-scrollbar">
                      {dateObj.shifts?.map((shift) => (
                        <div key={shift.id} className="flex flex-col gap-1">
                          <div className={`rounded-md px-2 py-1.5 text-[11px] leading-tight ${
                            shift.type === 'Morning Shift' ? 'bg-[#EAF2FF] text-[#257BFC]' :
                            shift.type === 'Evening Shift' ? 'bg-[#FFF6E8] text-[#FFA100]' :
                            'bg-[#F3F4F6] text-[#4B5563]'
                          }`}>
                            <span className="font-semibold block truncate">{shift.type}</span>
                            <span className="truncate opacity-80">{shift.time}</span>
                          </div>

                          {shift.hasOvertime && (
                            <span className="inline-block w-fit rounded-full bg-[#EAF9EA] px-2 py-0.5 text-[10px] font-medium text-[#4DB949]">
                              Overtime
                            </span>
                          )}

                          {shift.swapPending && (
                            <span className="inline-block w-fit rounded-full bg-[#F3E8FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                              Swap Request Pending
                            </span>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
