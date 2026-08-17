"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import { useParams } from "next/navigation";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function ExpenseDetailsPage() {
  const params = useParams();
  const expenseId = params.id as string || "EXP-001";

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/expenses-management/expenses-list" className="hover:text-brand-500 transition-colors">Expenses List</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Expenses Details</span>
    </span>
  );

  return (
    <DashboardLayout title="Expenses Management" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-4 xl:p-6 rounded-2xl">
          <h2 className="text-[20px] font-medium text-[#111827] mb-6">Expense Details</h2>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

              <div className="rounded-xl bg-[#F9FAFB] p-6">
                <div className="flex items-center justify-between border-b border-[#D0D5DD] pb-5 mb-5">
                  <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">Expense Information</h3>
                  <span className="inline-flex rounded-full bg-[#EAF9EA] px-3.5 py-1.5 text-[12px] text-[#4DB949]">
                    Approved - Reimbursed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Expense ID</p>
                    <p className="text-[16px] font-medium text-[#111827]">{expenseId}</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Employee</p>
                    <p className="text-[16px] font-medium text-[#111827]">Devon Lane</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Category</p>
                    <p className="text-[16px] font-medium text-[#111827]">Travel</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Amount</p>
                    <p className="text-[16px] font-medium text-[#111827]">$125.50</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Date</p>
                    <p className="text-[16px] font-medium text-[#111827]">5 April 2026</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Payment Method</p>
                    <p className="text-[16px] font-medium text-[#111827]">Personal Card</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Project / Department</p>
                    <p className="text-[16px] font-medium text-[#111827]">Marketing Campaign Q2</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#98A2B3] mb-2">Reference Number</p>
                    <p className="text-[16px] font-medium text-[#111827]">INV-2026-0505</p>3.
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#F9FAFB] p-6">
                <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-6">Approval History</h3>

                <div className="relative pl-7 space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-4rem)] before:w-1 before:bg-[#257BFC]">
                  <div className="relative">
                    <div className="absolute -left-[30px] top-0 h-8 w-8 rounded-full bg-[#257BFC] flex items-center justify-center">
                      <div className="border rounded-full p-0.5 border-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-start ms-3">
                      <div>
                        <h4 className="text-[15px] 2xl:text-[16px] font-medium text-[#111827] mb-1">Submitted</h4>
                        <p className="text-[12px] text-[#6B7280] my-2">Chris Brown</p>
                        <p className="text-[12px] text-[#6B7280]">Expense submitted for approval</p>
                      </div>
                      <span className="text-[12px] text-[#98A2B3]">22 Jan 2024, 09:14</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[30px] top-0 h-8 w-8 rounded-full bg-[#257BFC] flex items-center justify-center">
                      <div className="border rounded-full p-0.5 border-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-start ms-3">
                      <div>
                        <h4 className="text-[15px] 2xl:text-[16px] font-medium text-[#111827] mb-1">Under Review</h4>
                        <p className="text-[12px] text-[#6B7280] my-2">Sarah Johnson (Finance)</p>
                        <p className="text-[12px] text-[#6B7280]">Reviewed and forwarded to approver</p>
                      </div>
                      <span className="text-[12px] text-[#98A2B3]">22 Jan 2024, 09:14</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[30px] top-0 h-8 w-8 rounded-full bg-[#257BFC] flex items-center justify-center">
                      <div className="border rounded-full p-0.5 border-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-start ms-3">
                      <div>
                        <h4 className="text-[15px] 2xl:text-[16px] font-medium text-[#111827] mb-1">Approved</h4>
                        <p className="text-[12px] text-[#6B7280] my-2">David Park (Director)</p>
                        <p className="text-[12px] text-[#6B7280] mt-1">"Approved for Q1 travel — within policy limits."</p>
                      </div>
                      <span className="text-[12px] text-[#98A2B3]">22 Jan 2024, 09:14</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="rounded-xl bg-[#F9FAFB] p-6">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-6">Receipt Preview</h3>

              <div className="relative w-full aspect-[3/4] bg-[#F3F4F6] rounded-xl overflow-hidden mb-4 checkerboard">
                <style dangerouslySetInnerHTML={{
                  __html: `
                .checkerboard {
                  background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
                                    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
                                    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
                                    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
                  background-size: 20px 20px;
                  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                }
               `}} />
              </div>

              <p className="text-center text-[14px] text-[#111827]">receipt_EXP-008.jpg</p>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
