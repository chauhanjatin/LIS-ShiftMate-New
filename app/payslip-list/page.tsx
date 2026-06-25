"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import filterIcon from "@/assets/images/icons/filter.svg";
import { Lexend_Deca } from "next/font/google";
import eyeIcon from "@/assets/images/icons/eye-view.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface Payslip {
    id: number;
    name: string;
    avatar: string;
    payPeriod: string;
    payDate: string;
    netPay: string;
    status: "Downloaded" | "Generated" | "Email Sent";
}

const initialPayslips: Payslip[] = [
    { id: 1, name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=1", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
    { id: 2, name: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
    { id: 3, name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", payPeriod: "January 2026", payDate: "January 2026", netPay: "$3612.51", status: "Generated" },
    { id: 4, name: "Courtney Henry", avatar: "https://i.pravatar.cc/150?u=4", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
    { id: 5, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=5", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Email Sent" },
    { id: 6, name: "Brooklyn Simmons", avatar: "https://i.pravatar.cc/150?u=6", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
    { id: 7, name: "Jacob Jones", avatar: "https://i.pravatar.cc/150?u=7", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
    { id: 8, name: "Darlene Robertson", avatar: "https://i.pravatar.cc/150?u=8", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Generated" },
    { id: 9, name: "Esther Howard", avatar: "https://i.pravatar.cc/150?u=9", payPeriod: "January 2026", payDate: "28 January 2026", netPay: "$3612.51", status: "Downloaded" },
];

export default function PayslipListPage() {
    const [payslips] = useState<Payslip[]>(initialPayslips);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Payslip List</span>
        </span>
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Downloaded":
                return "bg-[#EAF9EA] text-[#4DB949]";
            case "Generated":
                return "bg-[#EAF2FF] text-[#257BFC]";
            case "Email Sent":
                return "bg-[#FFF4E5] text-[#FF9800]";
            default:
                return "bg-neutral-100 text-neutral-600";
        }
    };

    const filteredPayslips = payslips.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(filteredPayslips.map(p => p.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    return (
        <DashboardLayout title="Payslip List" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[18px] font-medium text-[#111827]">Employee List</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 md:w-60 w-48">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2 text-neutral-400">
                                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    className="w-full rounded-xl border border-[#E2E8F0] bg-white py-1.5 md:py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#257BFC] overflow-hidden"
                                    placeholder="Search by employee, department, period..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button className="flex h-9 w-9 md:h-[42px] md:w-[42px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-neutral-500 transition hover:bg-neutral-50 cursor-pointer overflow-hidden">
                                <Image
                                    src={filterIcon}
                                    alt="Filter"
                                    width={24}
                                    height={24}
                                    className="pointer-events-none"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1000px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-center w-12 rounded-l-lg">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.length === filteredPayslips.length && filteredPayslips.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="md:h-4 h-3 md:w-4 w-3 rounded border-[#F8F9FC] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                />
                                            </th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827]">Employee</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827]">Pay Period</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827]">Pay Date</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827]">Net Pay</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827] text-center">Status</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-medium text-[#111827] text-center rounded-r-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {filteredPayslips.map((payslip) => (
                                            <tr key={payslip.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="md:py-4 py-3 pl-4 pr-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(payslip.id)}
                                                        onChange={() => handleSelectRow(payslip.id)}
                                                        className="h-3 w-3 md:h-4 md:w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-4 md:py-4 py-3 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <img src={payslip.avatar} alt={payslip.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                                                        <span className="text-[12px] sm:text-[14px] font-normal text-neutral-900">{payslip.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:py-4 py-3 sm:px-6 text-[12px] md:text-[14px] font-normal text-neutral-900">{payslip.payPeriod}</td>
                                                <td className="px-4 md:py-4 py-3 sm:px-6 text-[12px] md:text-[14px] font-normal text-neutral-900">{payslip.payDate}</td>
                                                <td className="px-4 md:py-4 py-3 sm:px-6 text-[12px] md:text-[14px] font-normal text-neutral-900">{payslip.netPay}</td>

                                                <td className="px-4 md:py-4 py-3 sm:px-6 text-center">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[12px] md:text-[14px] font-normal ${getStatusColor(payslip.status)}`}>
                                                        {payslip.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 md:py-4 py-3 sm:px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link href={`/payslip-list/${encodeURIComponent(payslip.name)}`} className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
                                                            <Image src={eyeIcon} alt="View" className="pointer-events-none" />
                                                        </Link>
                                                        <button className="text-[#111827] transition-colors cursor-pointer">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                        </button>
                                                        <button className="text-[#111827] transition-colors cursor-pointer">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-end gap-4 border-t border-[#E2E8F0] p-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] text-neutral-500">Rows per page:</span>
                                    <select className="appearance-none rounded-lg border border-[#E2E8F0] bg-white px-2 py-1 text-[13px] text-neutral-700 outline-none pr-6 relative">
                                        <option>1</option>
                                        <option>5</option>
                                        <option>10</option>
                                    </select>
                                </div>
                                <div className="text-[13px] text-neutral-500">
                                    1-5 of 12
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-neutral-400 hover:bg-neutral-50 transition-colors cursor-pointer">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </button>
                                    <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-neutral-400 hover:bg-neutral-50 transition-colors cursor-pointer">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
