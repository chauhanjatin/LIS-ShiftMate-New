"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function PaymentDetailsPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <Link href="/statutory-payments/payments-dashboard" className="hover:text-brand-500 transition-colors">Payments Dashboard</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Devon Lane</span>
    </span>
  );

  return (
    <DashboardLayout title="Payments Dashboard" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-2xl bg-white shadow-sm md:px-6 px-4 pt-4 md:pt-6 min-h-[800px]">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:mb-8 mb-4">
            <h2 className="text-[16px] md:text-[20px] font-medium text-[#111827]">Devon Lane&apos;s Statutory Payment Details</h2>
            <button
              onClick={() => setShowToast(true)}
              className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 py-2 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer overflow-hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:mb-8 mb-4 bg-[#F9FAFB] p-4 md:p-6 rounded-xl">
            <div>
              <p className="md:text-[14px] text-[12px] font-normal text-[#98A2B3] mb-2">Employee Name</p>
              <p className="md:text-[16px] text-[14px] font-medium text-[#111827]">Devon Lane</p>
            </div>
            <div>
              <p className="md:text-[14px] text-[12px] font-normal text-[#98A2B3] mb-2">Employee ID</p>
              <p className="md:text-[16px] text-[14px] font-medium text-[#111827]">EMP001</p>
            </div>
            <div>
              <p className="md:text-[14px] text-[12px] font-normal text-[#98A2B3] mb-2">Department</p>
              <p className="md:text-[16px] text-[14px] font-medium text-[#111827]">Sales</p>
            </div>
            <div>
              <p className="md:text-[14px] text-[12px] font-normal text-[#98A2B3] mb-2">Eligibility</p>
              <p className="md:text-[16px] text-[14px] font-medium text-[#111827]">Eligible</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:mb-12 mb-8">
            <div className="lg:col-span-7 bg-[#F9FAFB] p-4 md:p-6 rounded-xl">
              <h3 className="md:text-[20px] text-[18px] font-medium text-[#111827] md:mb-6 mb-4 border-b border-[#D0D5DD] md:pb-6 pb-4">Earnings</h3>

              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Payment Type</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">Statutory Maternity Pay(SMP)</p>
                </div>
                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Status</p>
                  <span className="inline-flex text-[16px] font-medium bg-[#EDFAF2] text-[#4DB949] py-1 px-2 rounded-full">Active</span>
                </div>

                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Expected Due Date</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">1 April 2026</p>
                </div>
                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Pay Period Start</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">15 March 2026</p>
                </div>

                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Pay Period End</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">14 March 2027</p>
                </div>
                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Weeks Remaining</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">27 weeks</p>
                </div>

                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Average Weekly Earnings</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">$673.08</p>
                </div>
                <div>
                  <p className="md:text-[14px] text-[11px] font-normal text-[#98A2B3] mb-1.5">Current Weekly Amount</p>
                  <p className="md:text-[16px] text-[13px] font-medium text-[#111827]">$184.03</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col bg-[#F9FAFB] md:p-6 p-4 rounded-xl">
              <h3 className="md:text-[20px] text-[18px] font-medium text-[#111827] md:mb-4 mb-3 border-b border-[#D0D5DD] md:pb-6 pb-4">Summary</h3>

              <div className="flex-1">
                <div className="flex justify-between items-center md:mb-6 mb-3">
                  <span className="md:text-[14px] text-[12px] font-semibold text-neutral-700">Total Paid</span>
                  <span className="md:text-[14px] text-[12px] font-bold text-neutral-900">$2208.36</span>
                </div>
                <div className="flex justify-between items-center md:mb-6 mb-3">
                  <span className="md:text-[14px] text-[12px] font-semibold text-neutral-700">Weeks Paid</span>
                  <span className="md:text-[14px] text-[12px] font-bold text-neutral-900">12</span>
                </div>
                <div className="flex justify-between items-center md:mb-6 mb-3">
                  <span className="md:text-[14px] text-[12px] font-semibold text-neutral-700">Weeks Remaining</span>
                  <span className="md:text-[14px] text-[12px] font-bold text-neutral-900">27</span>
                </div>

                <div className="rounded-xl border border-[#257BFC] border-opacity-30 bg-[#F0F6FF] md:p-5 p-3">
                  <h4 className="md:text-[14px] text-[12px] font-bold text-[#1D2939] mb-1">SMP Payment Structure:</h4>
                  <p className="text-[13px] font-medium text-[#475467]">First 6 weeks: 90% of average weekly earnings</p>
                  <p className="text-[13px] font-medium text-[#475467]">Remaining 33 weeks: £184.03 or 90% of AWE (whichever is lower)</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-neutral-900">Payment History</h3>

            <div className="p-3 2xl:p-6">
              <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-[800px] w-full text-left border-collapse">
                    <thead className="bg-[#F2F4F7]">
                      <tr>
                        <th className="border-b border-t border-[#E2E8F0] py-[10px] pl-4 pr-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Week</th>
                        <th className="border-b border-t border-[#E2E8F0] py-[10px] pl-4 pr-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Period</th>
                        <th className="border-b border-t border-[#E2E8F0] py-[10px] pl-4 pr-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Paid Date</th>
                        <th className="border-b border-t border-[#E2E8F0] py-[10px] pl-4 pr-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-[#E2E8F0] transition-colors hover:bg-neutral-50">
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">Week 1-6</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">15 Mar - 25 Apr</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">30 Apr 2026</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">$605.77</td>
                      </tr>
                      <tr className="border-b border-[#E2E8F0] transition-colors hover:bg-neutral-50 last:border-none">
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">Week 1-6</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">15 Mar - 25 Apr</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">30 Apr 2026</td>
                        <td className="md:py-6 py-3 pl-4 pr-4 md:text-[14px] text-[12px] font-normal text-[#111827]">$605.77</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Toast
        show={showToast}
        message="Payment Details Exported Successfully"
        onClose={() => setShowToast(false)}
      />
    </DashboardLayout>
  );
}
