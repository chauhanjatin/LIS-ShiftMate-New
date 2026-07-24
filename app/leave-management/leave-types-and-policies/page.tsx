"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-red.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

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
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Types & Policies</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Management" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:px-6 px-4 pt-4 md:pt-6">
            <h2 className="md:text-[20px] text-[17px] font-medium text-[#111827]">Leave Types & Policies</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <button className="flex items-center md:gap-2 gap-1.5 rounded-xl bg-[#257BFC] px-4 py-2.5 text-[12px] md:text-[16px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add New Policy
              </button>
            </div>
          </div>

          <div className="p-3 2xl:p-6">
            <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-left border-collapse ">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Leave Type</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Default Entitlement</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Accrual Rate</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Carry Forward</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Paid Type</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {policies.map((policy) => (
                      <tr key={policy.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                        <td className="px-4 py-3 md:py-4 2xl:py-6 sm:px-6 text-[12px] md:text-[14px] font-normal text-[#111827]">{policy.leaveType}</td>
                        <td className="px-4 py-3 md:py-4 2xl:py-6 sm:px-6 text-[12px] md:text-[14px] font-normal text-[#111827]">{policy.entitlement}</td>
                        <td className="px-4 py-3 md:py-4 2xl:py-6 sm:px-6 text-[12px] md:text-[14px] font-normal text-[#111827]">{policy.accrualRate}</td>
                        <td className="px-4 py-3 md:py-4 2xl:py-6 sm:px-6 text-[12px] md:text-[14px] font-normal text-[#111827]">{policy.carryForward}</td>
                        <td className="px-4 py-3 md:py-4 2xl:py-6 sm:px-6 text-[12px] md:text-[14px] font-normal">
                          <span className={`inline-flex rounded-full 2xl:px-5 px-2 py-2.5 2xl:text-[14px] xl:text-[13px] lg:text-[14px] text-[12px] font-normal ${policy.paidTypeColor === 'green' ? 'bg-[#EDFAF2] text-[#4DB949]' : 'bg-[#EAF2FF] text-[#2E334E]'
                            }`}>
                            {policy.paidType}
                          </span>
                        </td>
                        <td className="px-4 md:py-4 py-2 sm:px-6">
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
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[350px] rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-xl p-[9px] bg-red-100">
                <Image src={deleteRedIcon} alt="Delete" className="text-red-600" />
              </div>
              <p className="text-[16px] font-medium text-[#111827]">Are you sure you want to delete this leave policy?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl cursor-pointer border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
