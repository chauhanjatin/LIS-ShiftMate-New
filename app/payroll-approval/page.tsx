"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

interface PayrollApprovalRow {
    id: number;
    name: string;
    avatar: string;
    department: string;
    grossPay: string;
    deductions: string;
    netPay: string;
}

const initialApprovals: PayrollApprovalRow[] = [
    { id: 1, name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=1", department: "Engineering", grossPay: "$5416.67", deductions: "$1804.16", netPay: "$3612.51" },
    { id: 2, name: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", department: "Product Design", grossPay: "$5416.67", deductions: "$1804.16", netPay: "$3612.51" },
    { id: 3, name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", department: "Engineering", grossPay: "$5416.67", deductions: "$1804.16", netPay: "$3612.51" },
    { id: 4, name: "Courtney Henry", avatar: "https://i.pravatar.cc/150?u=4", department: "HR", grossPay: "$5416.67", deductions: "$1804.16", netPay: "$3612.51" },
    { id: 5, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=5", department: "Sales", grossPay: "$5416.67", deductions: "$1804.16", netPay: "$3612.51" },
];

export default function PayrollApprovalPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState<PayrollApprovalRow[]>(initialApprovals);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_payroll_approvals");
        if (stored) {
            try {
                setEmployees(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse payroll approvals from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_payroll_approvals", JSON.stringify(employees));
        }
    }, [employees, isLoaded]);

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Payroll Approval</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Approval" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6 space-y-6">
                
                <div className="bg-white rounded-2xl border border-neutral-200 md:p-6 p-4 shadow-sm">
                    <h2 className="text-[18px] font-bold text-neutral-900 mb-6">Payroll Summary</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                        <div className="rounded-2xl border border-neutral-200 md:p-5 p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-[24px] font-bold text-neutral-900">324</h3>
                                <p className="text-[13px] text-neutral-500 font-medium mt-1">Employees Included</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-[#257BFC] flex items-center justify-center text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-neutral-200 md:p-5 p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-[24px] font-bold text-neutral-900">$487,500</h3>
                                <p className="text-[13px] text-neutral-500 font-medium mt-1">Total Gross Pay</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-[#8B5CF6] flex items-center justify-center text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-neutral-200 md:p-5 p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-[24px] font-bold text-neutral-900">$152,750</h3>
                                <p className="text-[13px] text-neutral-500 font-medium mt-1">Total Deductions</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-[#F04438] flex items-center justify-center text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-neutral-200 md:p-5 p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-[24px] font-bold text-neutral-900">$332,500</h3>
                                <p className="text-[13px] text-neutral-500 font-medium mt-1">Total Net Pay</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-[#22C55E] flex items-center justify-center text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-x-16 gap-y-4 pt-4 border-t border-neutral-100">
                        <div>
                            <p className="text-[12px] font-medium text-neutral-400">Pay Period</p>
                            <p className="text-[14px] font-semibold text-neutral-900 mt-1">March 2026</p>
                        </div>
                        <div>
                            <p className="text-[12px] font-medium text-neutral-400">Pay Date</p>
                            <p className="text-[14px] font-semibold text-neutral-900 mt-1">2026-03-31</p>
                        </div>
                        <div>
                            <p className="text-[12px] font-medium text-neutral-400">Total Employees</p>
                            <p className="text-[14px] font-semibold text-neutral-900 mt-1">324</p>
                        </div>
                        <div>
                            <p className="text-[12px] font-medium text-neutral-400">Gross Payroll</p>
                            <p className="text-[14px] font-semibold text-neutral-900 mt-1">$487,500</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-[#FEF6F6] rounded-2xl border border-[#FCA5A5] p-4 md:p-5 shadow-sm">
                        <div className="mb-4">
                            <h3 className="text-[16px] font-bold text-neutral-900">Errors (2)</h3>
                            <p className="text-[12px] text-neutral-500 mt-1">Must be resolved before approval</p>
                        </div>
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((item, index) => (
                                <div key={index} className="md:flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={`https://i.pravatar.cc/150?u=${10 + item}`} alt="Avatar" className="h-10 w-10 rounded-full object-cover" />
                                        <div>
                                            <p className="text-[13px] font-bold text-neutral-900">{index % 2 === 0 ? 'John Smith' : 'Sarah Chen'}</p>
                                            <p className="text-[12px] text-neutral-500 mt-0.5">{index % 2 === 0 ? 'No valid tax code assigned for this period.' : 'National Insurance category not set.'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="text-[12px] font-medium text-[#F04438]">{index % 2 === 0 ? 'Missing Tax Code' : 'NI Category Missing'}</span>
                                        <button className="text-[13px] font-bold text-[#1D2939] hover:underline cursor-pointer">Fix Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#FFFAF0] rounded-2xl border border-[#FCD34D] p-4 md:p-5 shadow-sm">
                        <div className="mb-4">
                            <h3 className="text-[16px] font-bold text-neutral-900">Warnings (2)</h3>
                            <p className="text-[12px] text-neutral-500 mt-1">Review recommended</p>
                        </div>
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((item, index) => (
                                <div key={index} className="md:flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={`https://i.pravatar.cc/150?u=${20 + item}`} alt="Avatar" className="h-10 w-10 rounded-full object-cover" />
                                        <div>
                                            <p className="text-[13px] font-bold text-neutral-900">{index === 1 ? 'Sarah Chen' : 'John Smith'}</p>
                                            <p className="text-[12px] text-neutral-500 mt-0.5">
                                                {index === 0 ? 'Overtime hours exceed 20hr weekly cap.' : index === 1 ? 'Pension auto-enrolment opt-out expires next month.' : 'New salary effective this period - please verify calculations.'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="text-[12px] font-medium text-[#D97706]">
                                            {index === 0 ? 'Overtime Cap' : index === 1 ? 'Pension Opt-Out' : 'Salary Change'}
                                        </span>
                                        <button className="text-[13px] font-bold text-[#1D2939] hover:underline cursor-pointer">Review</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <div className="border-b border-neutral-100 p-5">
                        <h2 className="text-[18px] font-bold text-neutral-900">Employees Included</h2>
                    </div>

                    <div className="overflow-x-auto p-3 2xl:p-6 pb-0">
                        <table className="min-w-[1000px] w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-l-lg">Employee</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Department</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Gross Pay</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Deductions</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Net Pay</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center rounded-r-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                                        <td className="py-4 pl-4 md:pr-6 pr-16">
                                            <div className="flex items-center gap-3">
                                                <img src={emp.avatar} alt={emp.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                                                <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.department}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.grossPay}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.deductions}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.netPay}</td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </button>
                                                <button className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                    <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                </button>
                                                <button className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                                                    <Image src={deleteIcon} alt="Delete" width={20} height={20} className="pointer-events-none" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-neutral-200 p-5 flex flex-wrap items-center justify-end gap-4 bg-white rounded-b-2xl">
                        <button className="xl:h-[48px] h-[42px] rounded-xl border border-[#F04438] xl:px-8 px-3 text-[14px] font-semibold text-[#F04438] transition hover:bg-[#F04438] hover:text-white cursor-pointer">
                            Reject
                        </button>
                        <button className="xl:h-[48px] h-[42px] rounded-xl border border-[#1D2939] xl:px-8 px-3 text-[14px] font-semibold text-[#1D2939] transition hover:bg-neutral-100 cursor-pointer">
                            Lock payroll
                        </button>
                        <button className="xl:h-[48px] h-[42px] rounded-xl bg-[#257BFC] xl:px-8 px-3 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                            Approve Payroll
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
