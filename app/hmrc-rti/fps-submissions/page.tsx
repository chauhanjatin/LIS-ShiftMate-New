"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Toast from "@/Component/UI/Toast";
import viewIcon from "@/assets/images/icons/eye-view.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function FPSSubmissionsPage() {
  const [showToast, setShowToast] = useState(false);

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">HMRC RTI</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">FPS Submissions</span>
    </span>
  );

  const submissions = [
    { id: "march-2026", period: "March 2026", employees: 345, paymentDate: "31 Mar 2026", submittedDate: "5 Apr 2026", ack: "ACK-2026-03-345", status: "Accepted" },
    { id: "february-2026", period: "February 2026", employees: 345, paymentDate: "28 Feb 2026", submittedDate: "5 Mar 2026", ack: "ACK-2026-03-345", status: "Accepted" },
    { id: "january-2026", period: "January 2026", employees: 345, paymentDate: "31 Jan 2026", submittedDate: "5 Feb 2026", ack: "ACK-2026-03-345", status: "Accepted" },
    { id: "december-2025", period: "December 2025", employees: 345, paymentDate: "31 Dec 2025", submittedDate: "5 Jan 2026", ack: "ACK-2026-03-345", status: "Accepted" },
  ];

  const handleExport = () => {
    setShowToast(true);
  };

  const renderBadge = (status: string) => {
    switch (status) {
      case "Accepted":
        return <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] font-medium text-[#10B981]">Accepted</span>;
      case "Pending":
        return <span className="inline-flex items-center rounded-full bg-[#FFFBEB] px-3 py-1 text-[12px] font-medium text-[#F59E0B]">Pending</span>;
      case "Rejected":
        return <span className="inline-flex items-center rounded-full bg-[#FEF2F2] px-3 py-1 text-[12px] font-medium text-[#EF4444]">Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <DashboardLayout title="FPS Submissions" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-2xl bg-white shadow-sm min-h-[800px] md:px-6 px-4 pt-4 md:pt-6 pb-10">
          
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-8">
            <h2 className="text-[20px] font-medium text-[#111827]">FPS Submissions</h2>
            <div className="flex flex-wrap md:flex-nowrap mt-3 md:mt-0 md:gap-4 gap-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search.." className="rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-4 text-[14px] text-neutral-900 outline-none focus:border-[#257BFC] transition-colors md:min-w-[240px]" />
              </div>
              <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
            <table className="w-full text-left">
              <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#111827] text-[12px] md:text-[14px] lg::text-[16px]">
                <tr>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Period</th>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Employees</th>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Payment Date</th>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Submitted Date</th>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Acknowledgement</th>
                  <th className="md:px-6 px-4 md:py-2.5 py-1.5 font-normal">Status</th>
                  <th className="px-6 py-2.5 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[11px] md:text-[12px] lg:text-[14px]">
                {submissions.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="md:p-6 p-3 font-normal text-[#111827]">{row.period}</td>
                    <td className="md:p-6 p-3 font-normal text-[#111827]">{row.employees}</td>
                    <td className="md:p-6 p-3 font-normal text-[#111827]">{row.paymentDate}</td>
                    <td className="md:p-6 p-3 font-normal text-[#111827]">{row.submittedDate}</td>
                    <td className="md:p-6 p-3 font-normal text-[#111827]">{row.ack}</td>
                    <td className="md:p-6 p-3">{renderBadge(row.status)}</td>
                    <td className="lg:p-6 p-3">
                      <div className="flex items-center gap-3">
                        <Link href={`/hmrc-rti/fps-submissions/${row.id}`} className="text-[#64748B] hover:text-[#257BFC]">
                          <Image src={viewIcon} alt="View" />
                        </Link>
                        <button className="text-[#111827] hover:text-[#257BFC]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
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

      <Toast 
        show={showToast} 
        message="List Exported Successfully" 
        onClose={() => setShowToast(false)} 
      />
    </DashboardLayout>
  );
}
