"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

interface PayComponent {
    id: number;
    name: string;
    type: string;
    taxable: boolean;
    pensionable: boolean;
    niApplicable: boolean;
}

const initialComponents: PayComponent[] = [
    { id: 1, name: "Basic Salary", type: "Salary", taxable: true, pensionable: true, niApplicable: true },
    { id: 2, name: "Hourly Pay", type: "Hourly", taxable: true, pensionable: true, niApplicable: true },
    { id: 3, name: "Overtime", type: "Overtime", taxable: true, pensionable: false, niApplicable: true },
    { id: 4, name: "Performance Bonus", type: "Bonus", taxable: true, pensionable: false, niApplicable: true },
    { id: 5, name: "Commission", type: "Commission", taxable: true, pensionable: false, niApplicable: true },
    { id: 6, name: "Car Allowance", type: "Allowance", taxable: true, pensionable: false, niApplicable: false },
    { id: 7, name: "Housing Allowance", type: "Allowance", taxable: false, pensionable: false, niApplicable: false },
];

export default function PayComponentsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [components, setComponents] = useState<PayComponent[]>(initialComponents);
    const [searchQuery, setSearchQuery] = useState("");

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_pay_components");
        if (stored) {
            try {
                setComponents(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse pay components from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_pay_components", JSON.stringify(components));
        }
    }, [components, isLoaded]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [componentToDelete, setComponentToDelete] = useState<number | null>(null);

    const filteredComponents = components.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (componentToDelete) {
            setComponents(components.filter(c => c.id !== componentToDelete));
            setIsDeleteModalOpen(false);
            setComponentToDelete(null);
        }
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Pay Components</span>
        </span>
    );

    return (
        <DashboardLayout title="Pay Components" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
                        <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Pay Components (Earnings)</h2>

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
                                Add Pay Component
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto p-3 2xl:p-6">
                        <table className="min-w-[1000px] w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-l-lg">Component Name</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Type</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Taxable</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Pensionable</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">NI Applicable</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-r-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComponents.map((comp) => (
                                    <tr
                                        key={comp.id}
                                        className="group border-b border-[#F1F5F9] transition-colors hover:bg-neutral-50 last:border-none"
                                    >
                                        <td className="py-4 pl-4 pr-6 text-[13px] font-medium text-neutral-900 sm:text-[14px]">
                                            {comp.name}
                                        </td>

                                        <td className="py-4 pr-6 text-[13px] font-medium text-neutral-900 sm:text-[14px]">
                                            {comp.type}
                                        </td>

                                        {/* TAXABLE */}
                                        <td className="py-4 pr-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={comp.taxable}
                                                onChange={() => {
                                                    setComponents((prev) =>
                                                        prev.map((item) =>
                                                            item.id === comp.id
                                                                ? { ...item, taxable: !item.taxable }
                                                                : item
                                                        )
                                                    );
                                                }}
                                                className="h-4 w-4 cursor-pointer rounded border-[#D0D5DD] text-[#257BFC]"
                                            />
                                        </td>

                                        {/* PENSIONABLE */}
                                        <td className="py-4 pr-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={comp.pensionable}
                                                onChange={() => {
                                                    setComponents((prev) =>
                                                        prev.map((item) =>
                                                            item.id === comp.id
                                                                ? {
                                                                    ...item,
                                                                    pensionable: !item.pensionable,
                                                                }
                                                                : item
                                                        )
                                                    );
                                                }}
                                                className="h-4 w-4 cursor-pointer rounded border-[#D0D5DD] text-[#257BFC]"
                                            />
                                        </td>

                                        {/* NI APPLICABLE */}
                                        <td className="py-4 pr-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={comp.niApplicable}
                                                onChange={() => {
                                                    setComponents((prev) =>
                                                        prev.map((item) =>
                                                            item.id === comp.id
                                                                ? {
                                                                    ...item,
                                                                    niApplicable: !item.niApplicable,
                                                                }
                                                                : item
                                                        )
                                                    );
                                                }}
                                                className="h-4 w-4 cursor-pointer rounded border-[#D0D5DD] text-[#257BFC]"
                                            />
                                        </td>

                                        <td className="py-4 pr-6">
                                            <div className="flex items-center gap-3">
                                                <button className="cursor-pointer text-neutral-400 transition-colors hover:text-[#257BFC]">
                                                    <Image
                                                        src={editIcon}
                                                        alt="Edit"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setComponentToDelete(comp.id);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="cursor-pointer text-neutral-400 transition-colors hover:text-red-500"
                                                >
                                                    <Image
                                                        src={deleteIcon}
                                                        alt="Delete"
                                                        width={20}
                                                        height={20}
                                                    />
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

            {/* Add Pay Component Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    {/* Modal */}
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-6">
                            <h2 className="text-[24px] font-bold text-[#1D2939]">
                                Add Pay Component
                            </h2>

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-8 py-6">
                            {/* Section Title */}
                            <h3 className="text-[20px] font-semibold text-[#1D2939]">
                                Basic Information
                            </h3>

                            <p className="mt-2 text-[14px] text-[#98A2B3]">
                                Create a new earnings or deduction component to include
                                in employee payroll calculations.
                            </p>

                            {/* Form */}
                            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Component Name */}
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Component Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g., Basic Salary, Overtime, Bonus"
                                        className="h-[52px] w-full rounded-2xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>

                                {/* Component Type */}
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Component Type
                                    </label>

                                    <div className="relative">
                                        <select className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#98A2B3] outline-none transition focus:border-[#257BFC]">
                                            <option>Select Component Type</option>
                                            <option>Earning</option>
                                            <option>Deduction</option>
                                            <option>Allowance</option>
                                            <option>Bonus</option>
                                        </select>

                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="mt-8 space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-[#D0D5DD] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                    />

                                    <span className="text-[14px] text-[#344054]">
                                        Taxable
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-[#D0D5DD] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                    />

                                    <span className="text-[14px] text-[#344054]">
                                        Pensionable
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-[#D0D5DD] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                    />

                                    <span className="text-[14px] text-[#344054]">
                                        NI Applicable
                                    </span>
                                </label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="mt-12 flex items-center justify-end gap-4">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="h-[48px] rounded-2xl border border-[#101828] px-8 text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => setIsAddModalOpen(false)} className="h-[48px] rounded-2xl bg-[#257BFC] px-8 text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Add Pay Component
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
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Component</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this component? This action cannot be undone.</p>
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
