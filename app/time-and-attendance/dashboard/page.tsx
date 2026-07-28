"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import icon from "@/assets/images/icons/total-employee.svg"
import onTime from "@/assets/images/icons/on-time.svg"
import weeklyHours from "@/assets/images/icons/weekly-hours.svg"
import overtime from "@/assets/images/icons/overtime.svg"

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

// Types
interface TeamMember {
  id: string;
  name: string;
  clockIn: string;
  clockOut: string;
  hours: string;
  status: "Clocked in" | "On break" | "On leave" | "Clocked out" | "Absent";
}

// Mock Data
const teamAttendance: TeamMember[] = [
  { id: "1", name: "Cameron Williamson", clockIn: "08:54", clockOut: "-", hours: "6h 12m", status: "Clocked in" },
  { id: "2", name: "Devon Lane", clockIn: "09:02", clockOut: "-", hours: "5h 48m", status: "On break" },
  { id: "3", name: "Jane Cooper", clockIn: "-", clockOut: "-", hours: "-", status: "On leave" },
  { id: "4", name: "Jane Cooper", clockIn: "08:30", clockOut: "17:05", hours: "8h 35m", status: "Clocked out" },
  { id: "5", name: "Jane Cooper", clockIn: "-", clockOut: "-", hours: "-", status: "Absent" },
];

const getStatusStyles = (status: TeamMember["status"]) => {
  switch (status) {
    case "Clocked in": return "bg-[#EDFAF2] text-[#4DB949]";
    case "On break": return "bg-[#FFF6E8] text-[#FFA100]";
    case "On leave": return "bg-[#F3E8FF] text-[#8B5CF6]";
    case "Clocked out": return "bg-[#EAF2FF] text-[#257BFC]";
    case "Absent": return "bg-[#FEE2E2] text-[#EF4444]";
    default: return "bg-gray-100 text-gray-500";
  }
};

export default function AttendanceDashboardPage() {
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

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-[#257BFC] transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Time & Attendance</span>
    </span>
  );

  return (
    <DashboardLayout title="Time & Attendance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-4 2xl:p-6 rounded-2xl">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 mb-6">
            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[#111827] mb-2">Today's Attendance</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-[32px] font-semibold text-[#111827]">4</h3>
                  <span className="text-[14px] text-[#98A2B3]">/ 7 days left</span>
                </div>
                <p className="text-[14px] font-medium text-[#98A2B3] mt-2">12 days used this year</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#4DB949] flex items-center justify-center shrink-0">
                <Image
                  src={icon}
                  alt=""
                  width={24}
                  height={24}
                  className="2xl:h-6 2xl:w-6 h-5 w-5"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[#111827] mb-2">Clock-in Status</p>
                <h3 className="text-[32px] font-semibold text-[#111827]">On time</h3>
                <p className="text-[14px] font-medium text-[#9CA3AF] mt-2">Clocked in at 08:54</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#2BB1FA] flex items-center justify-center shrink-0">
                <Image
                  src={onTime}
                  alt=""
                  width={24}
                  height={24}
                  className="2xl:h-6 2xl:w-6 h-5 w-5"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[#111827] mb-2">Weekly Hours</p>
                <h3 className="text-[32px] font-semibold text-[#111827]">42.1h</h3>
                <p className="text-[14px] font-medium text-[#9CA3AF] mt-2">Target 40h - 100% complete</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#FFA100] flex items-center justify-center shrink-0">
                <Image
                  src={weeklyHours}
                  alt=""
                  width={24}
                  height={24}
                  className="2xl:h-6 2xl:w-6 h-5 w-5"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[#111827] mb-2">Overtime</p>
                <h3 className="text-[32px] font-semibold text-[#111827]">2.3h</h3>
                <p className="text-[14px] font-medium text-[#9CA3AF] mt-2">This week so far</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#8B5CF6] flex items-center justify-center shrink-0">
                <Image
                  src={overtime}
                  alt=""
                  width={24}
                  height={24}
                  className="2xl:h-6 2xl:w-6 h-5 w-5"
                />
              </div>
            </div>
          </div>

          {/* Main Grid: Clock & Team Attendance */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">

            {/* Today's Status */}
            <div className="rounded-xl border border-[#D0D5DD] p-5 xl:p-6 w-full lg:w-[350px] xl:w-[450px] 2xl:w-[598px] shrink-0 flex flex-col">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-6">Today's Status</h3>
              <div className="bg-[#F9FAFB] rounded-2xl flex-1 flex flex-col items-center justify-center p-12 mb-5 border border-[#E4E7EC]">
                <h1 className="text-[40px] xl:text-[48px] font-bold text-[#111827] tracking-tight m-0">{formatTime(time)}</h1>
                <p className="text-[14px] text-[#98A2B3] mt-1 mb-3">Current Working</p>
                <span className="inline-flex rounded-full bg-[#EDFAF2] px-3 py-1 text-[12px] font-medium text-[#4DB949]">Active session</span>
              </div>

              <div className="grid grid-cols-3 gap-3 xl:gap-4">
                <div className="bg-[#EDFAF2] border border-[#4DB949] rounded-xl flex flex-col items-center justify-center p-6">
                  <span className="text-[14px] 2xl:text-[18px] font-medium text-[#111827]">Clock In</span>
                  <span className="text-[12px] 2xl:text-[14px] text-[#98A2B3] mt-2">08:54 AM</span>
                </div>
                <div className="bg-[#E8F8FF] border border-[#34AFF5] rounded-xl flex flex-col items-center justify-center py-3">
                  <span className="text-[14px] 2xl:text-[18px] font-medium text-[#111827]">Break</span>
                  <span className="text-[12px] 2xl:text-[14px] text-[#98A2B3] mt-2">32m</span>
                </div>
                <div className="bg-[#F0ECFE] border border-[#775AF4] rounded-xl flex flex-col items-center justify-center py-3">
                  <span className="text-[14px] 2xl:text-[18px] font-medium text-[#111827]">Expected Out</span>
                  <span className="text-[12px] 2xl:text-[14px] text-[#98A2B3] mt-2">17:30 PM</span>
                </div>
              </div>
            </div>

            {/* Team Attendance */}
            <div className="rounded-xl border border-[#D0D5DD] flex-1 flex flex-col min-w-0">
              <div className="p-5 xl:p-6 flex items-center justify-between">
                <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] m-0">Today's Team Attendance</h3>
                <button className="rounded-lg bg-[#257BFC] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-blue-600">View All</button>
              </div>

              <div className="overflow-x-auto flex-1 px-5 xl:px-6 pb-5 xl:pb-6">
                <table className="w-full text-left rounded-xl border border-[#D0D5DD] border-separate border-spacing-0 overflow-hidden">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="py-3 pl-6 pr-4 text-[13px] 2xl:text-[16px] font-normal text-[#111827] border-b border-[#D0D5DD]">Employee</th>
                      <th className="py-3 px-4 text-[13px] 2xl:text-[16px] font-normal text-[#111827] border-b border-[#D0D5DD]">Clock-in</th>
                      <th className="py-3 px-4 text-[13px] 2xl:text-[16px] font-normal text-[#111827] border-b border-[#D0D5DD]">Clock-out</th>
                      <th className="py-3 px-4 text-[13px] 2xl:text-[16px] font-normal text-[#111827] border-b border-[#D0D5DD]">Hours</th>
                      <th className="py-3 pr-6 pl-4 text-[13px] 2xl:text-[16px] font-normal text-[#111827] border-b border-[#D0D5DD]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {teamAttendance.map((member, index) => (
                      <tr key={index} className="last:border-none hover:bg-neutral-50 transition-colors">
                        <td className="py-4 pl-6 text-[14px] text-[#111827] border-b border-[#D0D5DD]">{member.name}</td>
                        <td className="py-4 px-4 text-[14px] text-[#111827] border-b border-[#D0D5DD]">{member.clockIn}</td>
                        <td className="py-4 px-4 text-[14px] text-[#111827] border-b border-[#D0D5DD]">{member.clockOut}</td>
                        <td className="py-4 px-4 text-[14px] text-[#111827] border-b border-[#D0D5DD]">{member.hours}</td>
                        <td className="py-4 pl-4 border-b border-[#D0D5DD]">
                          <span className={`inline-flex rounded-full px-3.5 py-2.5 text-[12px] 2xl:text-[14px] font-medium whitespace-nowrap ${getStatusStyles(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Chart & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Weekly Working Hours */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm p-5 xl:p-6 lg:col-span-2">
              <h3 className="text-[18px] font-semibold text-[#111827] mb-6">Weekly Working Hours</h3>

              <div className="relative h-[240px] w-full flex items-end justify-between pl-8 pb-8 pt-4">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[12px] text-[#9CA3AF] py-4">
                  <span>12</span>
                  <span>09</span>
                  <span>06</span>
                  <span>03</span>
                </div>

                {/* Grid Lines */}
                <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between py-6">
                  <div className="w-full border-t border-[#F3F4F6]"></div>
                  <div className="w-full border-t border-[#F3F4F6]"></div>
                  <div className="w-full border-t border-[#F3F4F6]"></div>
                  <div className="w-full border-t border-[#F3F4F6]"></div>
                </div>

                {/* Bars */}
                {[{ day: "Mon", val: 8 }, { day: "Tue", val: 9 }, { day: "Wed", val: 6, active: true }, { day: "Thu", val: 9.5 }, { day: "Fri", val: 7.5 }, { day: "Sat", val: 0 }, { day: "Sun", val: 0 }].map((d, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center w-full h-full justify-end group">
                    {d.val > 0 && (
                      <div
                        className={`w-8 md:w-12 rounded-t-sm transition-all duration-300 ${d.active ? 'bg-[#257BFC]' : 'bg-[#257BFC] hover:bg-[#1A5DC2]'}`}
                        style={{ height: `${(d.val / 12) * 100}%` }}
                      ></div>
                    )}
                    {d.active && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-[12px] py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap z-20">
                        <p className="font-semibold">{d.day}</p>
                        <p className="text-[#9CA3AF]">{d.val}h</p>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111827] rotate-45"></div>
                      </div>
                    )}
                    <span className="absolute -bottom-8 text-[12px] text-[#9CA3AF]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overtime Summary */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm p-5 xl:p-6 lg:col-span-1 flex flex-col">
              <h3 className="text-[18px] font-semibold text-[#111827] mb-6">Overtime summary</h3>

              <div className="space-y-5 flex-1">
                <div>
                  <div className="flex justify-between text-[13px] mb-2">
                    <span className="text-[#475467] font-medium">Approved</span>
                    <span className="text-[#111827] font-semibold">9.0h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[13px] mb-2">
                    <span className="text-[#475467] font-medium">Pending approval</span>
                    <span className="text-[#111827] font-semibold">2.4h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[13px] mb-2">
                    <span className="text-[#475467] font-medium">Rejected</span>
                    <span className="text-[#111827] font-semibold">1.0h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E2E8F0] pt-4">
                <div className="flex justify-between text-[14px] font-semibold text-[#111827] mb-4">
                  <span>Total this month</span>
                  <span>12.4h</span>
                </div>

                <div className="bg-[#FFF6E8] border border-[#FFE2B5] rounded-xl p-3 flex gap-3 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFA100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <p className="text-[13px] text-[#B87400] leading-tight">2.4 hours of overtime are pending manager approval since Wed.</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
