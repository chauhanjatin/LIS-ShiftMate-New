"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import viewIcon from "@/assets/images/icons/eye-view.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

const MetricCard = ({ title, value, type }: { title: string, value: string, type: 'success' | 'pending' | 'alert' | 'failed' }) => {
  const styles = {
    success: {
      bg: "bg-[#22C55E]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    pending: {
      bg: "bg-[#F59E0B]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    alert: {
      bg: "bg-[#8B5CF6]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )
    },
    failed: {
      bg: "bg-[#EF4444]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      )
    }
  };

  const { bg, icon } = styles[type];

  return (
    <div className="rounded-xl border border-[#D0D5DD] bg-white 2xl:p-5 p-3 flex justify-between items-center">
      <div>
        <h3 className="md:text-[28px] text-[24px] font-bold text-[#111827]">{value}</h3>
        <p className="2xl:text-[14px] text-[12px] font-medium text-[#111827] mt-1">{title}</p>
      </div>
      <div className={`2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 h-8 w-8 rounded-[12px] flex items-center justify-center ${bg}`}>
        {icon}
      </div>
    </div>
  );
};

export default function RTIDashboardPage() {
  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">HMRC RTI</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">RTI Dashboard</span>
    </span>
  );

  const upcomingFilings = [
    { type: "Full Payment Submission (FPS)", period: "March 2024", date: "19 April 2024", status: "Pending", link: "/hmrc-rti/fps-submissions" },
    { type: "Employer Payment Summary (EPS)", period: "March 2024", date: "19 April 2024", status: "Pending", link: "/hmrc-rti/eps-submissions" },
  ];

  const recentSubmissions = [
    { type: "Full Payment Submission (FPS)", period: "March 2024", date: "19 April 2024", status: "Successful", link: "/hmrc-rti/fps-submissions/march-2024" },
    { type: "Employer Payment Summary (EPS)", period: "March 2024", date: "19 April 2024", status: "Successful", link: "/hmrc-rti/eps-submissions/march-2024" },
    { type: "Employer Payment Summary (EPS)", period: "March 2024", date: "19 April 2024", status: "Successful", link: "/hmrc-rti/eps-submissions/march-2024" },
  ];

  const renderBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <span className="inline-flex items-center rounded-full bg-[#FFFBEB] md:px-3.5 px-2 md:py-2.5 py-1.5 text-[12px] md:text-[14px] font-normal text-[#F59E0B]">Pending</span>;
      case "Successful":
        return <span className="inline-flex items-center rounded-full bg-[#EAF9EA] md:px-3.5 px-2 md:py-2.5 py-1.5 text-[12px] md:text-[14px] font-normal text-[#4DB949]">Successful</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <DashboardLayout title="RTI Dashboard" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm min-h-[800px] md:px-6 px-4 pt-4 md:pt-6 pb-10">
          <h2 className="text-[20px] font-medium text-[#111827] mb-6">RTI Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Successful Submissions" value="12" type="success" />
            <MetricCard title="Pending Filings" value="05" type="pending" />
            <MetricCard title="Active Alerts" value="02" type="alert" />
            <MetricCard title="Failed Submissions" value="06" type="failed" />
          </div>

          <div className="mb-8">
            <h3 className="2xl:text-[20px] text-[16px] font-medium text-[#111827] mb-4">Upcoming Filings</h3>
            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-left">
                <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#111827] md:text-[16px] text-[12px]">
                  <tr>
                    <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Filing Type</th>
                    <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Tax Period</th>
                    <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Due Date</th>
                    <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Status</th>
                    <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] md:text-[14px] text-[10px]">
                  {upcomingFilings.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50">
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.type}</td>
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.period}</td>
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.date}</td>
                      <td className="md:p-6 p-3">{renderBadge(row.status)}</td>
                      <td className="md:p-6 p-3">
                        <Link href={row.link} className="text-[#64748B] hover:text-[#257BFC]">
                          <Image src={viewIcon} alt="View" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="2xl:text-[20px] text-[16px] font-medium text-[#111827] mb-4">Recent Submissions</h3>
            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#111827] md:text-[16px] text-[12px]">
                  <tr>
                    <th className="md:px-6 px-4 py-2.5 font-normal">Filing Type</th>
                    <th className="md:px-6 px-4 py-2.5 font-normal">Tax Period</th>
                    <th className="md:px-6 px-4 py-2.5 font-normal">Due Date</th>
                    <th className="md:px-6 px-4 py-2.5 font-normal">Status</th>
                    <th className="md:px-6 px-4 py-2.5 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] md:text-[14px] text-[10px]">
                  {recentSubmissions.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50">
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.type}</td>
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.period}</td>
                      <td className="md:p-6 p-3 font-normal text-[#111827]">{row.date}</td>
                      <td className="md:p-6 p-3">{renderBadge(row.status)}</td>
                      <td className="md:p-6 p-3">
                        <Link href={row.link} className="text-[#64748B] hover:text-[#257BFC]">
                          <Image src={viewIcon} alt="View" />
                        </Link>
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
