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
import { BarChart } from '@mui/x-charts/BarChart';
import infoIcon from "@/assets/images/icons/info-icon.svg"

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


          <div className="flex flex-col lg:flex-row gap-6 mb-6">
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

          <div className="flex flex-col lg:flex-row gap-6">

            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 xl:p-6 flex-1 min-w-0">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6">Weekly Working Hours</h3>

              <div className="h-[300px] w-full mt-2 -ml-2">
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      categoryGapRatio: 0.5,
                      tickLabelStyle: { fill: '#9CA3AF', fontSize: 12, fontFamily: 'inherit' },
                      disableLine: true,
                      disableTicks: true,
                    },
                  ]}
                  yAxis={[
                    {
                      min: 0,
                      max: 12,
                      tickLabelStyle: { fill: '#9CA3AF', fontSize: 12, fontFamily: 'inherit' },
                      disableLine: true,
                      disableTicks: true,
                    },
                  ]}
                  series={[
                    {
                      data: [8, 9, 6, 9.5, 7.5, 0, 0],
                      color: '#257BFC',
                    },
                  ]}
                  grid={{ horizontal: true }}
                  margin={{ left: 30, right: 10, top: 10, bottom: 25 }}
                  slotProps={{
                    bar: {
                      rx: 4,
                    }
                  }}
                  sx={{
                    '& .MuiChartsTooltip-paper': {
                      backgroundColor: '#111827 !important',
                      color: 'white !important',
                      borderRadius: '8px !important',
                      padding: '6px 12px !important',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important',
                      overflow: 'visible !important',
                    },
                    '& .MuiChartsTooltip-paper::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      right: '-4px',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#111827',
                      borderRadius: '1px',
                    },
                    '& .MuiChartsTooltip-markCell': {
                      display: 'none !important',
                    },
                    '& .MuiChartsTooltip-labelCell': {
                      color: 'white !important',
                      fontWeight: '600 !important',
                      fontSize: '14px !important',
                      borderBottom: 'none !important',
                      textAlign: 'center !important',
                      padding: '0 0 2px 0 !important',
                      display: 'block !important',
                    },
                    '& .MuiChartsTooltip-valueCell': {
                      color: '#4DB949 !important',
                      fontWeight: '500 !important',
                      fontSize: '14px !important',
                      textAlign: 'center !important',
                      padding: '0 !important',
                      display: 'block !important',
                    },
                    '& .MuiChartsTooltip-row': {
                      display: 'flex !important',
                      flexDirection: 'column !important',
                      alignItems: 'center !important',
                    }
                  }}
                />
              </div>
            </div>

            {/* Overtime Summary */}
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 xl:p-6 w-full lg:w-[350px] xl:w-[450px] 2xl:w-[598px] shrink-0 flex flex-col">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-6">Overtime summary</h3>

              <div className="space-y-5 flex-1">
                <div>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-[#111827]">Approved</span>
                    <span className="text-[#98A2B3]">9.0h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#EAF2FF] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-[#111827]">Pending approval</span>
                    <span className="text-[#98A2B3]">2.4h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#EAF2FF] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-[#111827]">Rejected</span>
                    <span className="text-[#98A2B3]">1.0h</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#EAF2FF] overflow-hidden">
                    <div className="h-full rounded-full bg-[#257BFC]" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[14px] text-[#111827] mb-4">
                  <span>Total this month</span>
                  <span>12.4h</span>
                </div>

                <div className="bg-[#FFF6E8] border border-[#FFA100] rounded-xl p-6 flex gap-3">
                  <Image src={infoIcon} alt="Warning" />
                  <p className="text-[14px] text-[#111827]">2.4 hours of overtime are pending manager approval since Wed.</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
