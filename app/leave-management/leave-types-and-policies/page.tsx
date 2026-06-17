"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

interface LeavePolicy {
  id: number;
  leaveType: string;
  entitlement: string;
  accrualRate: string;
  carryForward: string;
  paidType: string;
  paidTypeColor: "green" | "blue";
}

const initialPolicies: LeavePolicy[] = [
  { id: 1, leaveType: "Annual Leave", entitlement: "25 days", accrualRate: "2.08 days/month", carryForward: "5 days max", paidType: "Paid", paidTypeColor: "green" },
  { id: 2, leaveType: "Sick Leave", entitlement: "10 days", accrualRate: "N/A", carryForward: "Not allowed", paidType: "Paid (SSP eligible)", paidTypeColor: "green" },
  { id: 3, leaveType: "Unpaid Leave", entitlement: "No limit", accrualRate: "N/A", carryForward: "N/A", paidType: "Unpaid", paidTypeColor: "blue" },
  { id: 4, leaveType: "Maternity Leave", entitlement: "52 weeks", accrualRate: "N/A", carryForward: "N/A", paidType: "Partially paid", paidTypeColor: "blue" },
  { id: 5, leaveType: "Paternity Leave", entitlement: "2 weeks", accrualRate: "N/A", carryForward: "N/A", paidType: "Paid (SPP eligible)", paidTypeColor: "green" },
];

export default function LeaveTypesAndPoliciesPage() {
  const [policies, setPolicies] = useState<LeavePolicy[]>(initialPolicies);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<number | null>(null);

  const handleDelete = () => {
    if (policyToDelete) {
      setPolicies(policies.filter(p => p.id !== policyToDelete));
      setIsDeleteModalOpen(false);
      setPolicyToDelete(null);
    }
  };

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Types & Policies</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Management" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Leave Types & Policies</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <button className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add New Policy
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-[900px] w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Leave Type</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Default Entitlement</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Accrual Rate</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Carry Forward</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Paid Type</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                    <td className="border-b border-[#F1F5F9] py-4 pl-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{policy.leaveType}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{policy.entitlement}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{policy.accrualRate}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{policy.carryForward}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        policy.paidTypeColor === 'green' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#EFF8FF] text-[#175CD3]'
                      }`}>
                        {policy.paidType}
                      </span>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                          <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                        </button>
                        <button onClick={() => { setPolicyToDelete(policy.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                          <Image src={deleteIcon} alt="Delete" width={20} height={20} className="pointer-events-none" />
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <Image src={deleteIcon} alt="Delete" width={28} height={28} className="h-7 w-7 text-red-600" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Leave Policy</h2>
              <p className="text-sm text-neutral-500">Are you sure you want to delete this leave policy? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl cursor-pointer border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
