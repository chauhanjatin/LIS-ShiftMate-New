"use client";

import { useState } from "react";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";
import { useRouter } from "next/navigation";
import RequestLeaveModal from "@/Component/ESSP/RequestLeaveModal";
import waveBg from '@/assets/images/phase4-bg.png'
import uploadIcon from '@/assets/images/icons/upload-expense.svg'
import latestPayslip from '@/assets/images/icons/latest-payslip.svg'
import leaveBalance from '@/assets/images/icons/leave-balance.svg'
import upcomingLeave from '@/assets/images/icons/upcoming-leave.svg'
import announcementIcon from '@/assets/images/icons/announcement-icon.svg'

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function EssDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <DashboardLayout title="Dashboard" subtitle={<>Home / <span className="text-[#111827]">Dashboard</span></>}>
      <div className={`p-4 2xl:p-6 space-y-6 ${lexendDeca.className}`}>

        <div className="rounded-2xl bg-gradient-to-r from-[#111827] to-[#07265c] text-white px-4 xl:px-6 py-5 xl:py-7 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between xl:gap-6 gap-4">

          <Image src={waveBg} alt="Wave" className="absolute top-0 right-0" />

          <div className="relative z-10">
            <p className="text-white text-[12px] xl:text-[16px] font-normal mb-2">Thursday, May 7</p>
            <h1 className="text-[22px] md:text-[24px] xl:text-[40px] font-medium mb-2">
              Welcome back, John Smith!👋
            </h1>
            <p className="text-white text-[11px] xl:text-[16px]">
              You have 3 pending requests and your next payslip will be issued in 9 days.
            </p>
          </div>

          <div className="relative z-10 flex items-center xl:gap-4 gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center xl:gap-2 gap-1 px-2 md:px-3 xl:px-6 py-2 xl:py-4 rounded-xl border border-white hover:bg-white/10 transition-colors text-white font-semibold xl:text-[16px] md:text-[12px] text-[11px] cursor-pointer">
              <Image src={uploadIcon} alt="Upload" className="md:h-[20px] md:w-[20px] h-[16px] w-[16px]" />
              Upload Expense
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center xl:gap-2 gap-1 px-1 md:px-3 xl:px-6 py-2 xl:py-4 rounded-xl bg-white hover:bg-gray-50 transition-colors text-[#111827] font-semibold xl:text-[16px] md:text-[12px] text-[11px] cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Request leave
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">
          <div className="bg-white rounded-2xl xl:p-5 lg:p-3 p-4 flex items-center justify-between">
            <div>
              <p className="text-[#111827] xl:text-[14px] text-[12px] font-medium xl:mb-2 mb-1">Latest Payslip</p>
              <h3 className="xl:text-[32px] text-[24px] font-semibold text-[#111827] mb-2">$4,250.00</h3>
              <p className="text-[#98A2B3] xl:text-[14px] text-[12px]">April 2026 • Net Pay</p>
            </div>
            <div className="xl:p-3 p-2 rounded-xl bg-[#4DB949] flex items-center justify-center shrink-0">
              <Image src={latestPayslip} alt="Latest Payslip" />
            </div>
          </div>

          <div className="bg-white rounded-2xl xl:p-6 p-3 flex items-center justify-between">
            <div>
              <p className="text-[#111827] xl:text-[14px] text-[12px] font-medium xl:mb-2 mb-1">Leave Balance</p>
              <h3 className="xl:text-[32px] text-[24px] font-semibold text-[#111827] mb-2">18 days</h3>
              <p className="text-[#98A2B3] xl:text-[14px] text-[12px]">Annual leave remaining</p>
            </div>
            <div className="xl:p-3 p-2 rounded-xl bg-[#34AFF5] flex items-center justify-center shrink-0">
              <Image src={leaveBalance} alt="Leave Balance" />
            </div>
          </div>

          <div className="bg-white rounded-2xl xl:p-6 p-3 flex items-center justify-between">
            <div>
              <p className="text-[#111827] xl:text-[14px] text-[12px] font-medium xl:mb-2 mb-1">Upcoming Leave</p>
              <h3 className="xl:text-[32px] text-[24px] font-semibold text-[#111827] mb-2">Apr 14</h3>
              <p className="text-[#98A2B3] xl:text-[14px] text-[12px]">Annual Leave • 5 days</p>
            </div>
            <div className="xl:p-3 p-2 rounded-xl bg-[#FFA100] flex items-center justify-center shrink-0">
              <Image src={upcomingLeave} alt="Upcoming Leave" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-6 gap-4">
          {/* Announcements */}
          <div className="bg-white rounded-2xl xl:p-6 lg:p-4 md:p-5 p-4">
            <h2 className="text-[20px] lg:text-[18px] 2xl:text-[20px] font-medium text-[#111827] md:mb-6 mb-4">Announcements</h2>

            <div className="xl:space-y-6 md:space-y-4 space-y-5">
              {[
                { title: 'New HR System Update', time: '2h ago', desc: 'The new payroll system is now live. Please review your details.', isNew: true },
                { title: 'Office closure - Bank Holiday 26 May', time: '2h ago', desc: 'A reminder that the office will be closed on Monday, 26 May for the Spring Bank Holiday. Please plan your schedules accordingly.', isNew: true },
                { title: 'New HR System Update', time: '2h ago', desc: 'The new payroll system is now live. Please review your details.', isNew: true },
              ].map((announcement, idx) => (
                <div key={idx} className="md:flex xl:gap-3 lg:gap-2 md:gap-3 gap-2">
                  <div className="xl:h-[50px] xl:w-[50px] lg:h-[35px] lg:w-[35px] md:h-[40px] md:w-[40px] h-[30px] w-[30px] rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                    <Image src={announcementIcon} alt="announcement" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="xl:text-[14px] lg:text-[12px] md:text-[15px] text-[12px] font-normal text-[#111827]">{announcement.title}</h4>
                        {announcement.isNew && (
                          <span className="px-2 py-0.5 rounded-full bg-[#EDFAF2] text-[#4db949] xl:text-[14px] lg:text-[12px] md:text-[13px] text-[12px]">New</span>
                        )}
                      </div>
                      <span className="xl:text-[14px] lg:text-[12px] md:text-[13px] text-[11px] text-[#98A2B3] shrink-0">{announcement.time}</span>
                    </div>
                    <p className="xl:text-[12px] lg:text-[10px] md:text-[12px] text-[11px] text-[#98A2B3] leading-relaxed truncate md:whitespace-normal">{announcement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave balance */}
          <div className="bg-white rounded-2xl xl:p-6 lg:p-4 md:p-5 p-4">
            <h2 className="text-[20px] lg:text-[18px] 2xl:text-[20px] font-medium text-[#111827] md:mb-6 mb-4">Leave balance</h2>

            <div className="space-y-4">
              {[
                { name: 'Annual', used: 18.5, total: 28, leftText: '28 days left' },
                { name: 'Sick', used: 8, total: 10, leftText: '10 days left' },
                { name: 'Personal', used: 4, total: 5, leftText: '5 days left' },
                { name: 'Paternity Leave', used: 18.5, total: 28, leftText: '28 days left' },
              ].map((leave, idx) => {
                const percentage = (leave.used / leave.total) * 100;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="xl:text-[14px] lg:text-[12px] md:text-[14px] text-[13px] text-[#111827]">{leave.name}</span>
                      <span className="xl:text-[13px] lg:text-[11px] md:text-[13px] text-[12px] text-[#98A2B3]">{leave.used} / {leave.leftText}</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#257BFC] rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <RequestLeaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {
            setIsModalOpen(false);
            router.push("/my-leave-requests?toast=true");
          }}
        />
      </div>
    </DashboardLayout>
  );
}
