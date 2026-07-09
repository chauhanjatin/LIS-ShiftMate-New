"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import { Lexend_Deca } from "next/font/google";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import backArrow from "@/assets/images/icons/back-arrow.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface EmployeePayroll {
    id: string;
    name: string;
    department: string;
    gross: string;
    deductions: string;
    net: string;
    avatar: string;
}

const initialEmployees: EmployeePayroll[] = [
    { id: "EMP001", name: "Cameron Williamson", department: "Engineering", gross: "$5416.67", deductions: "$1804.16", net: "$3612.51", avatar: "/login/admin-avatar.png" },
    { id: "EMP002", name: "Devon Lane", department: "Product Design", gross: "$5416.67", deductions: "$1804.16", net: "$3612.51", avatar: "/login/admin-avatar.png" },
    { id: "EMP003", name: "Jane Cooper", department: "Engineering", gross: "$5416.67", deductions: "$1804.16", net: "$3612.51", avatar: "/login/admin-avatar.png" },
    { id: "EMP004", name: "Courtney Henry", department: "HR", gross: "$5416.67", deductions: "$1804.16", net: "$3612.51", avatar: "/login/admin-avatar.png" },
    { id: "EMP005", name: "Guy Hawkins", department: "Sales", gross: "$5416.67", deductions: "$1804.16", net: "$3612.51", avatar: "/login/admin-avatar.png" },
];

export default function PayrollRunDetailsPage({ params }: { params: Promise<{ period: string }> }) {
    const { period: periodParam } = use(params);
    const router = useRouter();
    const period = decodeURIComponent(periodParam || "March 2024");

    const [employees, setEmployees] = useState<EmployeePayroll[]>(initialEmployees);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/payroll-runs" className="hover:text-brand-500 transition-colors">Payroll Runs</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">{period}</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Runs" subtitle={breadcrumb}>
            <div className={`flex-1 2xl:px-6 p-4 ${lexendDeca.className}`}>

                <Link href="/payroll-runs">
                    <div className="flex items-center gap-2 cursor-pointer mb-4">
                        <Image src={backArrow} alt="back" />
                        <p className="text-[#111827] font-normal text-[16px]">Back</p>
                    </div>
                </Link>

                <div className="rounded-xl bg-white md:p-6 p-4">
                    <h3 className="md:text-[20px] text-[18px] font-medium text-[#101828] mb-4">Payroll Run Details - {period}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:mb-6 mb-4">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white 2xl:p-5 p-3 flex items-center justify-between overflow-hidden">
                            <div>
                                <h3 className="2xl:text-[32px] xl:text-[28px] text-[26px] font-semibold text-[#111827]">5</h3>
                                <p className="md:mt-2 mt-1 md:text-[14px] text-[12px] font-medium text-[#111827]">Employees Included</p>
                            </div>
                            <div className="flex 2xl:h-[48px] 2xl:w-[48px] h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#257BFC]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#D0D5DD] bg-white 2xl:p-5 p-3 flex items-center justify-between overflow-hidden">
                            <div>
                                <h3 className="2xl:text-[32px] xl:text-[28px] text-[26px] font-semibold text-[#111827]">$122,500</h3>
                                <p className="md:mt-2 mt-1 md:text-[14px] text-[12px] font-medium text-[#111827]">Total Gross Pay</p>
                            </div>
                            <div className="flex 2xl:h-[48px] 2xl:w-[48px] h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#8B5CF6]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#D0D5DD] bg-white 2xl:p-5 p-3 flex items-center justify-between overflow-hidden">
                            <div>
                                <h3 className="2xl:text-[32px] xl:text-[28px] text-[26px] font-semibold text-[#111827]">$11712.49</h3>
                                <p className="md:mt-2 mt-1 md:text-[14px] text-[12px] font-medium text-[#111827]">Total Deductions</p>
                            </div>
                            <div className="flex 2xl:h-[48px] 2xl:w-[48px] h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#EF4444]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#D0D5DD] bg-white 2xl:p-5 p-3 flex items-center justify-between overflow-hidden">
                            <div>
                                <h3 className="2xl:text-[32px] xl:text-[28px] text-[26px] font-semibold text-[#111827]">$23037.51</h3>
                                <p className="md:mt-2 mt-1 md:text-[14px] text-[12px] font-medium text-[#111827]">Total Net Pay</p>
                            </div>
                            <div className="flex 2xl:h-[48px] 2xl:w-[48px] h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#22C55E]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between lg:px-6 px-3 md:pt-6 pt-4">
                            <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-medium text-[#111827]">Employees Included</h2>

                            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 2xl:gap-4 mt-3 md:mt-0">
                                <div className="relative 2xl:w-60 lg:w-52 w-32">
                                    <Image
                                        src={searchIcon}
                                        alt="Search"
                                        width={20}
                                        height={20}
                                        className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                                    />
                                    <input
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white py-1.5 md:py-2 md:pl-11 pl-10 pr-4 lg:text-[14px] text-[12px] outline-none focus:border-[#257BFC] overflow-hidden"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <button className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white md:px-4 px-2 py-2 lg:text-[14px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 overflow-hidden">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                    Recalculate
                                </button>

                                <button className="flex items-center justify-center gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-4 py-2 lg:text-[14px] text-[12px] font-semibold text-white transition hover:bg-blue-600">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Approve Payroll
                                </button>
                            </div>
                        </div>

                        <div className="md:p-3 2xl:p-6 mt-3 md:mt-0">
                            <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-[1000px] w-full text-left border-collapse">
                                        <thead className="bg-[#F8F9FC]">
                                            <tr>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">Employee</th>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Department</th>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Gross Pay</th>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Deductions</th>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Net Pay</th>
                                                <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827] rounded-r-lg text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {filteredEmployees.map((emp) => (
                                                <tr key={emp.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                    <td className="px-4 md:py-4 py-2 sm:px-6">
                                                        <div
                                                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                                            onClick={() => router.push(`/payroll-runs/${encodeURIComponent(period)}/${emp.id}`)}
                                                        >
                                                            <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                                                                <Image src={emp.avatar} alt={emp.name} width={40} height={40} className="h-full w-full object-cover" />
                                                            </div>
                                                            <span className="text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:py-4 py-2 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.department}</td>
                                                    <td className="px-4 md:py-4 py-2 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.gross}</td>
                                                    <td className="px-4 md:py-4 py-2 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.deductions}</td>
                                                    <td className="px-4 md:py-4 py-2 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.net}</td>

                                                    <td className="px-4 md:py-4 py-2 sm:px-6">
                                                        <div className="flex items-center justify-center gap-3">
                                                            <button
                                                                onClick={() => router.push(`/payroll-runs/${encodeURIComponent(period)}/${emp.id}`)}
                                                                className="text-[#111827] transition-colors cursor-pointer"
                                                            >
                                                                <Image src={eyeIcon} alt="View" className="pointer-events-none" />
                                                            </button>
                                                            <button className="text-[#111827] transition-colors cursor-pointer">
                                                                <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                            </button>
                                                            <button className="text-[#111827] transition-colors cursor-pointer">
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
            </div>
        </DashboardLayout>
    );
}
