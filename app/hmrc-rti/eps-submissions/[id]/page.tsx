"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Toast from "@/Component/UI/Toast";
import { Lexend_Deca } from "next/font/google";

import { useParams } from "next/navigation";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function EPSSubmissionDetailsPage() {
  const params = useParams();
  const id = params?.id as string || '';
  const [showToast, setShowToast] = useState(false);

  const monthRaw = id.split('-')[0] || 'January';
  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
  const year = id.split('-')[1] || '2026';

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/hmrc-rti/eps-submissions" className="hover:text-brand-500 transition-colors">HMRC RTI</Link>
      <span className="mx-1">/</span>
      <Link href="/hmrc-rti/eps-submissions" className="hover:text-brand-500 transition-colors">EPS Submissions</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">EPS - {month} {year} Details</span>
    </span>
  );

  const handleExport = () => {
    setShowToast(true);
  };

  const isRejected = id.includes('january'); // Fake mock logic based on the design mockup

  const errors = [
    { code: "8046", field: "CISDeductionsSuffered", message: "CIS Deductions Suffered amount (£1,240.00) exceeds total NIC liability for the period. Verify against subcontractor payment records.", severity: "Rejected" },
    { code: "8102", field: "Employment Allowance Indicator", message: "Employment Allowance claimed exceeds remaining annual entitlement (£0.00 remaining for 2024-25). No further allowance can be claimed.", severity: "Warning" }
  ];

  const renderBadge = (status: string) => {
    switch (status) {
      case "Rejected":
        return <span className="inline-flex items-center rounded-full bg-[#FEF2F2] px-3 py-1 text-[12px] font-medium text-[#EF4444]">Rejected</span>;
      case "Warning":
        return <span className="inline-flex items-center rounded-full bg-[#FFFBEB] px-3 py-1 text-[12px] font-medium text-[#F59E0B]">Warning</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <DashboardLayout title={`EPS - ${month} ${year}`} subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-medium text-[#111827]">EPS - {month} {year}</h2>
          <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E2E8F0]">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-[12px] font-medium text-[#98A2B3] mb-2">Period</p>
                  <p className="text-[14px] font-semibold text-[#111827]">{month} {year}</p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#98A2B3] mb-2">Submitted Date</p>
                  <p className="text-[14px] font-semibold text-[#111827]">5 Feb 2026</p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#98A2B3] mb-2">Adjustments</p>
                  <p className="text-[14px] font-semibold text-[#111827]">SMP, SSP, SAP</p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#98A2B3] mb-2">HMRC response</p>
                  <p className={`text-[14px] font-semibold ${isRejected ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>{isRejected ? 'Rejected' : 'Accepted'}</p>
                </div>
              </div>
            </div>

            {/* Validation Errors Table */}
            {isRejected && (
              <div>
                <h3 className="text-[16px] font-bold text-[#111827] mb-4 mt-2">Validation Errors & Warnings</h3>
                <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white">
                  <table className="w-full text-left text-[14px]">
                    <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]">
                      <tr>
                        <th className="px-6 py-4 font-medium">Error Code</th>
                        <th className="px-6 py-4 font-medium">Field</th>
                        <th className="px-6 py-4 font-medium">Message</th>
                        <th className="px-6 py-4 font-medium">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {errors.map((err, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 font-medium text-[#64748B] align-top">{err.code}</td>
                          <td className="px-6 py-4 font-medium text-[#111827] align-top">{err.field}</td>
                          <td className="px-6 py-4 text-[#64748B] max-w-[400px] leading-relaxed align-top">{err.message}</td>
                          <td className="px-6 py-4 align-top">{renderBadge(err.severity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#111827] mb-6">HMRC Response</h3>

              {/* Timeline */}
              <div className="relative border-l-2 border-[#E2E8F0] ml-4 space-y-8 mt-4">
                {[1, 2, 3, 4].map((step) => {
                  const isActive = step === 1;
                  return (
                    <div key={step} className="relative pl-6">
                      <div className={`absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-medium border-2 ${isActive ? 'bg-[#257BFC] text-white border-[#257BFC]' : 'bg-white text-[#98A2B3] border-[#E2E8F0]'}`}>
                        {step}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-[14px] font-medium text-[#111827]">Personal Details</h4>
                        <p className="text-[12px] text-[#98A2B3]">06 Apr 2024, 14:30</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <Toast 
        show={showToast} 
        message="Export Completed Successfully" 
        onClose={() => setShowToast(false)} 
      />
    </DashboardLayout>
  );
}
