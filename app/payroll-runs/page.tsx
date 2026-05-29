"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import eyeIcon from "@/assets/images/icons/eye.svg"; // Fallback if eye icon isn't present, but we used inline SVG before. Let's use inline SVG for eye.

interface PayrollRun {
    id: number;
    period: string;
    group: string;
    date: string;
    cost: string;
    status: "Paid" | "Pending Approval";
}

const initialRuns: PayrollRun[] = [
    { id: 1, period: "May 2026", group: "All Employees", date: "May 31, 2026", cost: "$122,500", status: "Paid" },
    { id: 2, period: "February 2026", group: "All Employees", date: "February 28, 2026", cost: "$118,250", status: "Paid" },
    { id: 3, period: "January 2026", group: "All Employees", date: "January 31, 2026", cost: "$115,000", status: "Pending Approval" },
    { id: 4, period: "December 2025", group: "All Employees", date: "December 31, 2025", cost: "$120,000", status: "Paid" },
    { id: 5, period: "April 2026", group: "All Employees", date: "April 30, 2026", cost: "$121,000", status: "Paid" },
];

export default function PayrollRunsPage() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [runs, setRuns] = useState<PayrollRun[]>(initialRuns);
    const [searchQuery, setSearchQuery] = useState("");

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_payroll_runs");
        if (stored) {
            try {
                setRuns(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse payroll runs from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_payroll_runs", JSON.stringify(runs));
        }
    }, [runs, isLoaded]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [runToDelete, setRunToDelete] = useState<number | null>(null);

    const filteredRuns = runs.filter(r => 
        r.period.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (runToDelete) {
            setRuns(runs.filter(r => r.id !== runToDelete));
            setIsDeleteModalOpen(false);
            setRunToDelete(null);
        }
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Payroll Runs</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Runs" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
                        <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Employee Records</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 md:w-60 w-32">
                                <Image
                                    src={searchIcon}
                                    alt="Search"
                                    width={20}
                                    height={20}
                                    className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                                />
                                <input
                                    className="w-full rounded-xl border border-neutral-200 bg-white py-1.5 md:py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#257BFC]"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Create Payroll Run
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto p-3 2xl:p-6">
                        <table className="min-w-[1000px] w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-l-lg">Payroll Period</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Pay Group</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Pay Date</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Total Payroll Cost</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Status</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-r-lg text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRuns.map((run) => (
                                    <tr key={run.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                                        <td className="py-4 pl-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{run.period}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{run.group}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{run.date}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{run.cost}</td>
                                        <td className="py-4 pr-6 text-center">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                                                run.status === "Paid" ? "bg-[#EAF9EA] text-[#4DB949]" : "bg-[#FFF4E5] text-[#D97706]"
                                            }`}>
                                                {run.status}
                                            </span>
                                        </td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => router.push(`/payroll-runs/${encodeURIComponent(run.period)}`)} className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </button>
                                                <button className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                    <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                </button>
                                                <button onClick={() => { setRunToDelete(run.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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

            {/* Create New Payroll Run Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    {/* Modal */}
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-6 shrink-0">
                            <h2 className="text-[24px] font-bold text-[#1D2939]">
                                Create New Payroll Run
                            </h2>

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-8 py-6 overflow-y-auto">
                            
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-6">
                                {/* Payroll Period */}
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Payroll Period
                                    </label>

                                    <div className="relative">
                                        <input 
                                            type="text"
                                            defaultValue="April 2024"
                                            className="h-[52px] w-full rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                </div>

                                {/* Pay Date */}
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Date
                                    </label>

                                    <div className="relative">
                                        <input 
                                            type="text"
                                            defaultValue="March 23,2024"
                                            className="h-[52px] w-full rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                </div>
                                
                                {/* Pay Group */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Group
                                    </label>

                                    <div className="relative">
                                        <select 
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option>All Employees</option>
                                            <option>Engineering Team</option>
                                            <option>Sales Team</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                                
                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Notes
                                    </label>

                                    <textarea
                                        placeholder="Describe the rules and conditions for this deduction..."
                                        className="h-[100px] w-full resize-none rounded-2xl border border-[#D0D5DD] p-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>
                            </div>

                            {/* Include Employees Summary */}
                            <div className="mb-4 rounded-2xl bg-[#F8FAFC] p-6">
                                <h3 className="mb-4 text-[16px] font-semibold text-neutral-900">
                                    Include Employees
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                                        <span className="text-[14px] font-medium text-[#344054]">Active Employees</span>
                                        <span className="text-[14px] font-semibold text-neutral-900">324</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                                        <span className="text-[14px] font-medium text-[#344054]">On Leave</span>
                                        <span className="text-[14px] font-semibold text-neutral-900">12</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                                        <span className="text-[14px] font-medium text-[#344054]">New Joiners</span>
                                        <span className="text-[14px] font-semibold text-neutral-900">8</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[14px] font-medium text-[#344054]">Total to Process</span>
                                        <span className="text-[14px] font-semibold text-neutral-900">324</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer Buttons */}
                        <div className="flex items-center justify-end gap-4 px-8 py-6 shrink-0">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="h-[48px] rounded-2xl border border-[#D0D5DD] bg-white px-8 text-[15px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button onClick={() => setIsAddModalOpen(false)} className="h-[48px] rounded-2xl bg-[#257BFC] px-8 text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                Generate Payroll
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                                <Image src={deleteIcon} alt="Delete" width={28} height={28} className="h-7 w-7 text-red-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Payroll Run</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this payroll run? This action cannot be undone.</p>
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