"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Toast from "@/Component/UI/Toast";
import { Lexend_Deca } from "next/font/google";
import backArrow from "@/assets/images/icons/back-arrow.svg";

import { useParams } from "next/navigation";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function FPSSubmissionDetailsPage() {
  const params = useParams();
  const id = params?.id as string || '';
  const [showToast, setShowToast] = useState(false);
  const [showExportBanner, setShowExportBanner] = useState(true);

  const monthRaw = id.split('-')[0] || 'March';
  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
  const year = id.split('-')[1] || '2026';

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/hmrc-rti/fps-submissions" className="hover:text-brand-500 transition-colors">HMRC RTI</Link>
      <span className="mx-1">/</span>
      <Link href="/hmrc-rti/fps-submissions" className="hover:text-brand-500 transition-colors">FPS Submissions</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">{month} FPS Submissions Details</span>
    </span>
  );

  const handleExport = () => {
    setShowToast(true);
  };

  return (
    <DashboardLayout title={`${month} Submission Details`} subtitle={breadcrumb}>
      <div className="p-6">
        <div className={`flex-1  ${lexendDeca.className}`}>

          <Link href="/hmrc-rti/fps-submissions">
            <div className="flex items-center gap-2 cursor-pointer mb-4">
              <Image src={backArrow} alt="back" />
              <p className="text-[#111827] font-normal text-[16px]">Back</p>
            </div>
          </Link>

          <div className="bg-white 2xl:p-6 p-4 rounded-xl">
            <div className="flex justify-between items-center md:mb-6 mb-4">
              <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">{month} Submission Details</h2>
              <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">

              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl bg-[#F9FAFB] 2xl:p-6 p-4">
                  <h3 className="text-[16px] font-bold text-[#111827] md:mb-6 mb-4 border-b border-[#E2E8F0] md:pb-4 pb-2">Submission Information</h3>

                  <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-6 gap-y-4">
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Type</p>
                      <p className="text-[14px] font-semibold text-[#111827]">Full Payment Submission (FPS)</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Status</p>
                      <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] font-medium text-[#10B981]">Accepted</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Tax Period</p>
                      <p className="text-[14px] font-semibold text-[#111827]">{month} {year}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Payment Date</p>
                      <p className="text-[14px] font-semibold text-[#111827]">31 {month} {year}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Submitted Date</p>
                      <p className="text-[14px] font-semibold text-[#111827]">5 April {year}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Submitted Time</p>
                      <p className="text-[14px] font-semibold text-[#111827]">14:32:15</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Acknowledgement Reference</p>
                      <p className="text-[14px] font-semibold text-[#111827]">ACK-{year}-03-345</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F9FAFB] 2xl:p-6 p-4">
                  <h3 className="text-[16px] font-bold text-[#111827] md:mb-6 mb-4 border-b border-[#E2E8F0] md:pb-4 pb-2">Payment Summary</h3>

                  <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-6 gap-y-4">
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Employees Included</p>
                      <p className="text-[14px] font-semibold text-[#111827]">345</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Total Gross Pay</p>
                      <p className="text-[14px] font-semibold text-[#111827]">$874,250.00</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Total Tax Deducted</p>
                      <p className="text-[14px] font-semibold text-[#111827]">$174,850.00</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Total NI Contributions</p>
                      <p className="text-[14px] font-semibold text-[#111827]">$87,425.00</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Total Pension Contributions</p>
                      <p className="text-[14px] font-semibold text-[#111827]">$26,227.50</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#98A2B3] mb-1">Net Pay</p>
                      <p className="text-[14px] font-semibold text-[#111827]">$585,747.50</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl bg-[#F9FAFB] 2xl:p-6 p-4">
                  <h3 className="text-[16px] font-bold text-[#111827] md:mb-6 mb-4 border-b border-[#E2E8F0] md:pb-4 pb-2">HMRC Response</h3>

                  <div className="space-y-4 2xl:mb-8 mb-4">
                    <div className="flex flex-col md:flex-row justify-between 2xl:text-[13px] text-[12px]">
                      <span className="text-[#64748B] font-medium">Response Code</span>
                      <span className="text-[#111827] font-semibold">200</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between 2xl:text-[13px] text-[12px]">
                      <span className="text-[#64748B] font-medium">Response Time</span>
                      <span className="text-[#111827] font-semibold">2.3 seconds</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between 2xl:text-[13px] text-[12px]">
                      <span className="text-[#64748B] font-medium">Correlation ID</span>
                      <span className="text-[#111827] font-semibold text-right max-w-[150px] truncate">550e8400-e29b-41d4-a716-446655440000</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between 2xl:text-[13px] text-[12px]">
                      <span className="text-[#64748B] font-medium">Acknowledgement Reference</span>
                      <span className="text-[#111827] font-semibold md:text-right">ACK-{year}-03-345</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-[#065F46]">
                  <h4 className="text-[14px] font-bold mb-1">Submission Successful</h4>
                  <p className="text-[12px]">Keep the acknowledgement reference for your records. You may need it if HMRC contacts you about this submission.</p>
                </div>

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
