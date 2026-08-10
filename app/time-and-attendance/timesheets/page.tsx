"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import editIcon from "@/assets/images/icons/edit.svg";
import onTime from "@/assets/images/icons/on-time.svg"
import overtime from "@/assets/images/icons/overtime.svg"
import leaveBalance from "@/assets/images/icons/leave-balance.svg"
import viewIcon from "@/assets/images/icons/eye-view.svg"

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface TimesheetRecord {
  id: string;
  date: string;
  hours: string;
  overtime: string;
  status: "Approved" | "Pending" | "Submitted" | "Non-working";
}

const timesheetData: TimesheetRecord[] = [
  { id: "1", date: "Mon 12 May", hours: "8.50h", overtime: "+0.50h", status: "Approved" },
  { id: "2", date: "Tue 13 May", hours: "8.00h", overtime: "0h", status: "Approved" },
  { id: "3", date: "Wed 14 May", hours: "9.50h", overtime: "+1.50h", status: "Pending" },
  { id: "4", date: "Thu 15 May", hours: "7.50h", overtime: "0h", status: "Submitted" },
  { id: "5", date: "Fri 16 May", hours: "8.00h", overtime: "0h", status: "Approved" },
  { id: "6", date: "Sat 17 May", hours: "-", overtime: "-", status: "Non-working" },
  { id: "7", date: "Sun 18 May", hours: "-", overtime: "-", status: "Non-working" },
];

const getStatusStyles = (status: TimesheetRecord["status"]) => {
  switch (status) {
    case "Approved": return "bg-[#EDFAF2] text-[#4DB949]";
    case "Pending": return "bg-[#FFF6E8] text-[#FFA100]";
    case "Submitted": return "bg-[#EAF2FF] text-[#257BFC]";
    case "Non-working": return "bg-[#F3E8FF] text-[#8B5CF6]";
    default: return "bg-gray-100 text-gray-500";
  }
};

export default function TimesheetsPage() {
  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-[#257BFC] transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Timesheets</span>
    </span>
  );

  return (
    <DashboardLayout title="Time & Attendance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-6 rounded-2xl">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-6 mb-6">
            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[28px] 2xl:text-[32px] font-semibold text-[#111827] mb-3">41h</h3>
                <p className="text-[14px] font-medium text-[#111827]">Total Hours (This Week)</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#4DB949] flex items-center justify-center shrink-0">
                <Image src={leaveBalance} alt="Leave Balance" />
              </div>
            </div>

            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[28px] 2xl:text-[32px] font-semibold text-[#111827] mb-3">02h</h3>
                <p className="text-[14px] font-medium text-[#111827]">Overtime (This Week)</p>
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

            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[28px] 2xl:text-[32px] font-semibold text-[#111827] mb-3">03</h3>
                <p className="text-[14px] font-medium text-[#111827]">Total Approved (This Week)</p>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl bg-[#4DB949] flex items-center justify-center shrink-0">

                <Image
                  src={onTime}
                  alt=""
                  width={24}
                  height={24}
                  className="2xl:h-6 2xl:w-6 h-5 w-5"
                />

              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 xl:p-6 gap-4">
              <h2 className="text-[20px] font-semibold text-[#111827] m-0">Timesheets</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Date Selector */}
                <div className="relative w-full sm:w-auto">
                  <select className="appearance-none w-full sm:w-auto h-11 pl-4 pr-10 rounded-xl border border-[#111827] bg-white text-[14px] text-[#111827] outline-none cursor-pointer focus:border-[#111827]">
                    <option>16 May 2026 - 18 May 2026</option>
                    <option>09 May 2026 - 15 May 2026</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <button className="h-11 whitespace-nowrap rounded-xl bg-[#257BFC] px-5 text-[14px] font-medium text-white transition hover:bg-blue-600 cursor-pointer">
                  Submit Timesheet
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-[#F8F9FC]">
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="py-2.5 pl-6 pr-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Date</th>
                    <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Hours Worked</th>
                    <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Overtime</th>
                    <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Status</th>
                    <th className="py-2.5 pr-6 pl-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {timesheetData.map((record) => (
                    <tr key={record.id} className="border-b border-[#E2E8F0] last:border-none hover:bg-neutral-50 transition-colors">
                      <td className="py-5 pl-6 pr-4 text-[14px] text-[#111827]">{record.date}</td>
                      <td className="py-5 px-4 text-[14px] text-[#111827]">{record.hours}</td>
                      <td className="py-5 px-4 text-[14px] text-[#111827]">{record.overtime}</td>
                      <td className="py-5 px-4">
                        <span className={`inline-flex rounded-full px-3.5 py-2.5 text-[14px] font-medium ${getStatusStyles(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-5 pr-6 pl-4">
                        <div className="flex items-center gap-3">
                          <button className="text-[#111827] hover:text-[#257BFC] transition-colors cursor-pointer">
                            <Image src={editIcon} alt="Edit" className="pointer-events-none" />
                          </button>
                          <button className="text-[#111827] hover:text-[#257BFC] transition-colors cursor-pointer">
                            <Image src={viewIcon} alt="View" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
