"use client";

import { use } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function PayslipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const decodedName = decodeURIComponent(id || "Devon Lane");

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/payslip-list" className="hover:text-brand-500 transition-colors">Payslip List</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">{decodedName}</span>
        </span>
    );

    return (
        <DashboardLayout title="Payslip Details" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6 pb-20">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-[20px] font-bold text-neutral-900">{decodedName} - March 2026</h2>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Email Payslip
                        </button>
                        <button className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-[850px] overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-200 relative">

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
                        <span className="text-[120px] font-black uppercase tracking-[0.2em] text-black -rotate-45 select-none">
                            Shiftmate
                        </span>
                    </div>

                    <div className="bg-[#257BFC] p-5 md:p-8 lg:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl m-2">
                        <div>
                            <h1 className="text-[24px] md:text-[28px] font-bold">Shiftmate Corporation Ltd</h1>
                            <p className="mt-1 text-[13px] text-white/80">123 Business Street, London, EC1A 1BB</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:text-right">
                            <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-wide">PAYSLIP</h2>
                            <p className="mt-1 text-[14px] font-medium text-white/90">March 2026</p>
                        </div>
                    </div>

                    <div className="md:p-8 p-5 lg:p-10 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 mb-10 border-b border-neutral-100 pb-10">
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Full Name</p>
                                <p className="text-[14px] font-semibold text-neutral-900">{decodedName}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Employee ID</p>
                                <p className="text-[14px] font-semibold text-neutral-900">EMP001</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Department</p>
                                <p className="text-[14px] font-semibold text-neutral-900">Sales</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Pay Date</p>
                                <p className="text-[14px] font-semibold text-neutral-900">31/03/2026</p>
                            </div>

                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">NI Number</p>
                                <p className="text-[14px] font-semibold text-neutral-900">AB123456C</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Tax Code</p>
                                <p className="text-[14px] font-semibold text-neutral-900">1257L</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Pay Frequency</p>
                                <p className="text-[14px] font-semibold text-neutral-900">Monthly</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-neutral-500 mb-1">Tax Year</p>
                                <p className="text-[14px] font-semibold text-neutral-900">2025/2026</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
                                <h3 className="text-[16px] font-bold text-neutral-900">Earnings</h3>
                                <span className="text-[14px] font-bold text-neutral-900">Amount</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">Basic Salary</span>
                                    <span className="font-semibold text-neutral-900">$5416.67</span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">Overtime</span>
                                    <span className="font-semibold text-neutral-900">$0.00</span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">Bonus</span>
                                    <span className="font-semibold text-neutral-900">$0.00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-4">
                                <span className="text-[14px] font-bold text-neutral-900">Total Earnings</span>
                                <span className="text-[16px] font-bold text-[#4DB949]">$5416.67</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
                                <h3 className="text-[16px] font-bold text-neutral-900">Deductions</h3>
                                <span className="text-[14px] font-bold text-neutral-900">Amount</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">PAYE (Income Tax)</span>
                                    <span className="font-semibold text-neutral-900">$1083.33</span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">National Insurance</span>
                                    <span className="font-semibold text-neutral-900">$450.00</span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">Pension (5%)</span>
                                    <span className="font-semibold text-neutral-900">$270.83</span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-neutral-600">Student Loan</span>
                                    <span className="font-semibold text-neutral-900">$0.00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-4">
                                <span className="text-[14px] font-bold text-neutral-900">Total Deductions</span>
                                <span className="text-[16px] font-bold text-[#F04438]">$1804.16</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
