"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function LeaveRequestDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [comment, setComment] = useState("");

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <Link href="/leave-management/leave-requests" className="hover:text-brand-500 transition-colors">Leave Requests</Link>
    </span>
  );

  return (
    <DashboardLayout title="Leave Requests" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl bg-white shadow-sm h-full flex flex-col p-6 2xl:p-8">
          <h2 className="text-[18px] md:text-[22px] font-bold text-neutral-900 mb-6 md:mb-8">Leave Request Details</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 2xl:gap-8 mb-8">
            <div className="rounded-2xl bg-[#F9FAFB] p-6">
              <h3 className="text-[20px] font-bold text-neutral-900 mb-6">Employee Information</h3>
              <div className="grid grid-cols-2 gap-y-6 border-t border-[#D0D5DD] py-6">
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Full Name</p>
                  <p className="text-[14px] font-bold text-neutral-900">Devon Lane</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Employee ID</p>
                  <p className="text-[14px] font-bold text-neutral-900">EMP-001</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Department</p>
                  <p className="text-[14px] font-bold text-neutral-900">Marketing</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Remaining Balance</p>
                  <p className="text-[14px] font-bold text-neutral-900">12 Days</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F9FAFB] p-6">
              <h3 className="text-[20px] font-bold text-neutral-900 mb-6">Leave Details</h3>
              
              <div className="grid grid-cols-2 gap-y-6 border-t border-[#D0D5DD] py-6">
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Leave Type</p>
                  <p className="text-[14px] font-bold text-neutral-900">Annual Leave</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Total Days</p>
                  <p className="text-[14px] font-bold text-neutral-900">5 days</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">Start Date</p>
                  <p className="text-[14px] font-bold text-neutral-900">10 May 2026</p>
                </div>
                <div>
                  <p className="text-[12px] text-neutral-500 mb-1">End Date</p>
                  <p className="text-[14px] font-bold text-neutral-900">14 May 2026</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[12px] text-neutral-500 mb-1">Reason</p>
                  <p className="text-[14px] font-bold text-neutral-900">Family vacation to Scotland</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[12px] text-neutral-500 mb-1">Status</p>
                  <p className="text-[14px] font-bold text-[#F59E0B] bg-[#FFF6E8] rounded-xl py-0.5 px-2 inline-block">Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-auto">
            <label className="block text-[14px] font-medium text-neutral-900 mb-3">Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comments or notes about this request..."
              className="w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white p-4 text-[14px] outline-none transition focus:border-brand-500 resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-12">
            <button 
              onClick={() => router.push('/leave-management/leave-requests')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#F04438] bg-white xl:px-6 px-3 xl:py-3 py-2 text-[13px] xl:text-[15px] font-semibold text-[#F04438] transition hover:bg-red-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              Reject Request
            </button>
            
            <button 
              onClick={() => router.push('/leave-management/leave-requests')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] xl:px-6 px-3 xl:py-3 py-2 text-[13px] xl:text-[15px] font-semibold text-white transition hover:bg-green-600 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Approve Request
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
