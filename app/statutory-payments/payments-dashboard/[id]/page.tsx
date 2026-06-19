"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';

export default function PaymentDetailsPage() {
  const params = useParams();
  const [showToast, setShowToast] = useState(false);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
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
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl bg-white shadow-sm p-6 2xl:p-8 min-h-[800px]">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900">Devon Lane&apos;s Statutory Payment Details</h2>
            <button 
              onClick={() => setShowToast(true)}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export
            </button>
          </div>

          {/* Top Details Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 mb-8 border-b border-neutral-100">
            <div>
              <p className="text-[13px] font-medium text-neutral-500 mb-1">Employee Name</p>
              <p className="text-[15px] font-bold text-neutral-900">Devon Lane</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-neutral-500 mb-1">Employee ID</p>
              <p className="text-[15px] font-bold text-neutral-900">EMP001</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-neutral-500 mb-1">Department</p>
              <p className="text-[15px] font-bold text-neutral-900">Sales</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-neutral-500 mb-1">Eligibility</p>
              <p className="text-[15px] font-bold text-neutral-900">Eligible</p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            {/* Earnings Section */}
            <div className="lg:col-span-7">
              <h3 className="text-[18px] font-bold text-neutral-900 mb-6">Earnings</h3>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Payment Type</p>
                  <p className="text-[14px] font-bold text-neutral-900">Statutory Maternity Pay(SMP)</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Status</p>
                  <span className="inline-flex text-[14px] font-bold text-[#4DB949]">Active</span>
                </div>
                
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Expected Due Date</p>
                  <p className="text-[14px] font-bold text-neutral-900">1 April 2026</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Pay Period Start</p>
                  <p className="text-[14px] font-bold text-neutral-900">15 March 2026</p>
                </div>

                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Pay Period End</p>
                  <p className="text-[14px] font-bold text-neutral-900">14 March 2027</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Weeks Remaining</p>
                  <p className="text-[14px] font-bold text-neutral-900">27 weeks</p>
                </div>

                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Average Weekly Earnings</p>
                  <p className="text-[14px] font-bold text-neutral-900">$673.08</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1.5">Current Weekly Amount</p>
                  <p className="text-[14px] font-bold text-neutral-900">$184.03</p>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-5 flex flex-col">
              <h3 className="text-[18px] font-bold text-neutral-900 mb-4">Summary</h3>
              
              <div className="flex-1">
                <div className="flex justify-between items-center py-4 border-b border-neutral-100">
                  <span className="text-[14px] font-semibold text-neutral-700">Total Paid</span>
                  <span className="text-[14px] font-bold text-neutral-900">$2208.36</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-neutral-100">
                  <span className="text-[14px] font-semibold text-neutral-700">Weeks Paid</span>
                  <span className="text-[14px] font-bold text-neutral-900">12</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-neutral-100 mb-6">
                  <span className="text-[14px] font-semibold text-neutral-700">Weeks Remaining</span>
                  <span className="text-[14px] font-bold text-neutral-900">27</span>
                </div>

                {/* Structure Info Card */}
                <div className="rounded-xl border border-[#257BFC] border-opacity-30 bg-[#F0F6FF] p-5">
                  <h4 className="text-[14px] font-bold text-[#1D2939] mb-1">SMP Payment Structure:</h4>
                  <p className="text-[13px] font-medium text-[#475467]">First 6 weeks: 90% of average weekly earnings</p>
                  <p className="text-[13px] font-medium text-[#475467]">Remaining 33 weeks: £184.03 or 90% of AWE (whichever is lower)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History Table */}
          <div>
            <h3 className="text-[18px] font-bold text-neutral-900 mb-6">Payment History</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b border-t border-[#E2E8F0] py-4 pl-4 pr-4 text-[13px] font-bold text-neutral-900">Week</th>
                    <th className="border-b border-t border-[#E2E8F0] py-4 pr-4 text-[13px] font-bold text-neutral-900">Period</th>
                    <th className="border-b border-t border-[#E2E8F0] py-4 pr-4 text-[13px] font-bold text-neutral-900">Paid Date</th>
                    <th className="border-b border-t border-[#E2E8F0] py-4 pr-4 text-[13px] font-bold text-neutral-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F1F5F9] transition-colors hover:bg-neutral-50">
                    <td className="py-5 pl-4 pr-4 text-[14px] font-semibold text-neutral-700">Week 1-6</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-700">15 Mar - 25 Apr</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-900">30 Apr 2026</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-900">$605.77</td>
                  </tr>
                  <tr className="border-b border-[#F1F5F9] transition-colors hover:bg-neutral-50 last:border-none">
                    <td className="py-5 pl-4 pr-4 text-[14px] font-semibold text-neutral-700">Week 1-6</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-700">15 Mar - 25 Apr</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-900">30 Apr 2026</td>
                    <td className="py-5 pr-4 text-[14px] font-semibold text-neutral-900">$605.77</td>
                  </tr>
                </tbody>
              </table>
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
