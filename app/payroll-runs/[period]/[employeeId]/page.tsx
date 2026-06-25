"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function EmployeePayrollBreakdownPage({ params }: { params: Promise<{ period: string; employeeId: string }> }) {
    const { period: periodParam } = use(params);
    const period = decodeURIComponent(periodParam || "March 2024");
    const employeeName = "Devon Lane";
    const [showToast, setShowToast] = useState(false);

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/payroll-runs" className="hover:text-brand-500 transition-colors">Payroll Runs</Link>
            <span className="mx-1">/</span>
            <Link href={`/payroll-runs/${encodeURIComponent(period)}`} className="hover:text-brand-500 transition-colors">{period}</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">{employeeName}</span>
        </span>
    );

    return (
        <DashboardLayout title="Employee Payroll Breakdown" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 lg:pb-24 pb-8 ${lexendDeca.className}`}>
                <div className="bg-white md:p-6 p-4 rounded-xl">
                    <div className="mb-6 rounded-2xl overflow-hidden">
                        <h3 className="md:mb-6 mb-3 text-[18px] font-medium text-[#101828]">
                            {employeeName} - {period}
                        </h3>

                        <div className="grid grid-cols-1 md:gap-6 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-[#F9FAFB] rounded-xl md:p-6 p-4">
                            <div>
                                <p className="md:mb-2 mb-1 text-[14px] font-normal text-[#98A2B3]">Full Name</p>
                                <p className="text-[16px] font-medium text-[#101828]">{employeeName}</p>
                            </div>
                            <div>
                                <p className="md:mb-2 mb-1 text-[14px] font-normal text-[#98A2B3]">Employee ID</p>
                                <p className="text-[16px] font-medium text-[#101828]">EMP001</p>
                            </div>
                            <div>
                                <p className="md:mb-2 mb-1 text-[14px] font-normal text-[#98A2B3]">Department</p>
                                <p className="text-[16px] font-medium text-[#101828]">Sales</p>
                            </div>
                            <div>
                                <p className="md:mb-2 mb-1 text-[14px] font-normal text-[#98A2B3]">Pay Period</p>
                                <p className="text-[16px] font-medium text-[#101828]">{period}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-[18px] font-medium text-[#101828]">Details</h3>
                        <div className="flex items-center md:gap-3 gap-2">
                            <button className="flex items-center justify-center md:gap-2 gap-1 rounded-xl border border-[#E2E8F0] bg-white md:px-4 px-2 py-2 md:text-[14px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer overflow-hidden">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Add Bonus
                            </button>
                            <button className="flex items-center justify-center md:gap-2 gap-1 rounded-xl border border-[#E2E8F0] bg-white md:px-4 px-2 py-2 md:text-[14px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer overflow-hidden">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Add Deductions
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl bg-[#F9FAFB] md:p-6 p-4 overflow-hidden">
                            <h4 className="pb-4 md:pb-6 md:mb-6 mb-4 md:text-[20px] text-[18px] font-medium text-neutral-900 border-b border-[#D0D5DD]">Earnings</h4>

                            <div className="md:space-y-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">Basic Salary</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$4,000</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">Overtime</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$350</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">Sales Commission</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$150</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-[#D0D5DD] pt-4 mt-4">
                                    <span className="md:text-[14px] text-[12px] font-semibold text-[#111827]">Total Earnings</span>
                                    <span className="md:text-[14px] text-[12px] font-semibold text-[#22C55E]">$4500</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#F9FAFB] md:p-6 p-4 overflow-hidden">
                            <h4 className="pb-4 md:pb-6 md:mb-6 mb-4 md:text-[20px] text-[18px] font-medium text-neutral-900 border-b border-[#D0D5DD]">Deductions</h4>

                            <div className="md:space-y-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">PAYE (Income Tax)</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$720</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">National Insurance</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$425</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">Pension (5%)</span>
                                    <span className="md:text-[14px] text-[12px] font-normal text-neutral-900">$100</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-[#D0D5DD] pt-4 mt-4">
                                    <span className="md:text-[14px] text-[12px] font-semibold text-[#111827]">Total Deductions</span>
                                    <span className="md:text-[14px] text-[12px] font-semibold text-[#EF4444]">$1,245</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="mb-4 md:text-[18px] text-[16px] font-medium text-[#101828]">Tax Breakdown</h3>

                        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr className="border-b border-[#E2E8F0]">
                                            <th className="py-[10px] pl-6 pr-6 md:text-[16px] text-[13px] font-semibold text-[#344054]">Tax Type</th>
                                            <th className="py-[10px] pr-6 md:text-[16px] text-[13px] font-semibold text-[#344054]">Rate</th>
                                            <th className="px-4 py-[10px] sm:px-6 md:text-[16px] text-[13px] font-semibold text-[#344054]">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr className="border-b border-[#E2E8F0]">
                                            <td className="md:py-6 py-4 md:pl-6 pl-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">Income Tax</td>
                                            <td className="md:py-6 py-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">20%</td>
                                            <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[11px] font-normal text-neutral-900">$720</td>
                                        </tr>
                                        <tr className="border-b border-[#E2E8F0]">
                                            <td className="md:py-6 py-4 md:pl-6 pl-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">Employee NI</td>
                                            <td className="md:py-6 py-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">12%</td>
                                            <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[11px] font-normal text-neutral-900">$425</td>
                                        </tr>
                                        <tr>
                                            <td className="md:py-6 py-4 md:pl-6 pl-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">Employer NI</td>
                                            <td className="md:py-6 py-4 pr-6 md:text-[14px] text-[11px] font-normal text-neutral-900">13.8%</td>
                                            <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[11px] font-normal text-neutral-900">$621</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end md:gap-4 gap-2">
                        <button className="md:h-[48px] h-[40px] rounded-2xl border border-[#E2E8F0] bg-white md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer overflow-hidden">
                            Adjust Pay
                        </button>
                        <button onClick={() => setShowToast(true)} className="md:h-[48px] h-[40px] rounded-2xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
            <Toast
                show={showToast}
                message="Payroll Changes Saved Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
