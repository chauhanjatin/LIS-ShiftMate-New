"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface DeductionComponent {
    id: number;
    name: string;
    type: string;
    rate: string;
    rules: string;
    applicable: boolean;
}

const initialDeductions: DeductionComponent[] = [
    { id: 1, name: "PAYE (Income Tax)", type: "Statutory", rate: "20%", rules: "Applies to earnings above £12,570. Rates: 20% (basic), 40% (higher), 45% (additional)", applicable: true },
    { id: 2, name: "National Insurance", type: "Statutory", rate: "10%", rules: "Class 1 NIC. 10% on earnings between £12,570-£50,270, 2% above", applicable: true },
    { id: 3, name: "Workplace Pension", type: "Statutory", rate: "12%", rules: "Auto-enrolment. 12% employee contribution on qualifying earnings (£6,240-£50,270)", applicable: true },
    { id: 4, name: "Student Loan (Plan 2)", type: "Statutory", rate: "9%", rules: "9% on earnings above £27,295. Plan 2 repayment threshold", applicable: true },
    { id: 5, name: "Postgraduate Loan", type: "Statutory", rate: "6%", rules: "6% on earnings above £21,000", applicable: true },
    { id: 6, name: "Company Car Benefit", type: "Custom", rate: "$250", rules: "Monthly deduction for company car usage. Based on vehicle CO2 emissions", applicable: true },
    { id: 7, name: "Cycle to Work Scheme", type: "Custom", rate: "$45", rules: "Monthly salary sacrifice for bicycle purchase. 12-month repayment term", applicable: true },
    { id: 8, name: "Childcare Vouchers", type: "Custom", rate: "20%", rules: "Salary sacrifice for childcare. Tax-free up to £243/month", applicable: true },
];

export default function DeductionComponentsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [deductions, setDeductions] = useState<DeductionComponent[]>(initialDeductions);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_deduction_components");
        if (stored) {
            try {
                setDeductions(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse deduction components from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_deduction_components", JSON.stringify(deductions));
        }
    }, [deductions, isLoaded]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deductionToDelete, setDeductionToDelete] = useState<number | null>(null);

    const filteredDeductions = deductions.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (deductionToDelete) {
            setDeductions(deductions.filter(d => d.id !== deductionToDelete));
            setIsDeleteModalOpen(false);
            setDeductionToDelete(null);
        }
    };

    const toggleApplicable = (id: number) => {
        setDeductions(deductions.map(d =>
            d.id === id ? { ...d, applicable: !d.applicable } : d
        ));
    };

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Deduction Components</span>
        </span>
    );

    return (
        <DashboardLayout title="Deduction Components" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between px-6 pt-6">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Deduction Components</h2>

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
                                    className="w-full rounded-xl border border-[#E2E8F0] bg-white py-1.5 md:py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#257BFC] overflow-hidden"
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
                                Add Deduction
                            </button>
                        </div>
                    </div>


                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1100px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pl-4 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">Deduction Name</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Type</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Rate</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Applicable Rules</th>
                                            <th className="border-b border-[#E2E8F0] px-6 py-[10px] pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] rounded-r-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {filteredDeductions.map((deduction) => (
                                            <tr key={deduction.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="py-6 pl-4 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.name}</td>
                                                <td className="py-6 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.type}</td>
                                                <td className="py-6 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.rate}</td>
                                                <td className="py-6 pr-26 text-[13px] sm:text-[14px] text-[#111827]">
                                                    <div className="flex items-start gap-2 max-w-[500px]">
                                                        <input
                                                            type="checkbox"
                                                            checked={deduction.applicable}
                                                            onChange={() => toggleApplicable(deduction.id)}
                                                            className="mt-1 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer flex-shrink-0"
                                                        />
                                                        <span className="leading-snug">{deduction.rules}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <button className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setDeductionToDelete(deduction.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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

            {/* Add Deduction Component Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-8 py-6">
                            <h2 className="text-[24px] font-bold text-[#1D2939]">
                                Add Deduction Component
                            </h2>

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="px-8 py-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. PAYE, Pension"
                                        className="h-[52px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Type
                                    </label>

                                    <div className="relative">
                                        <select className="h-[52px] w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-white px-4 pr-12 text-[14px] text-[#98A2B3] outline-none transition focus:border-[#257BFC] overflow-hidden">
                                            <option>Select Type</option>
                                            <option>Statutory</option>
                                            <option>Custom</option>
                                        </select>

                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Method
                                    </label>

                                    <div className="relative">
                                        <select className="h-[52px] w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-white px-4 pr-12 text-[14px] text-[#98A2B3] outline-none transition focus:border-[#257BFC] overflow-hidden">
                                            <option>Select Method Type</option>
                                            <option>Percentage</option>
                                            <option>Fixed Amount</option>
                                        </select>

                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Rate(%)
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Select Type"
                                        className="h-[52px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Applicable Rules
                                    </label>

                                    <textarea
                                        placeholder="Describe the rules and conditions for this deduction..."
                                        className="h-[120px] w-full resize-none rounded-2xl border border-[#E2E8F0] p-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-end gap-4">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="h-[48px] rounded-2xl border border-[#101828] px-8 text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => setIsAddModalOpen(false)} className="h-[48px] rounded-2xl bg-[#257BFC] px-8 text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Add Deduction Component
                                </button>
                            </div>
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
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Deduction</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this deduction? This action cannot be undone.</p>
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
