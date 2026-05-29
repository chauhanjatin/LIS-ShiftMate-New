"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

interface SalaryStructure {
    id: number;
    name: string;
    earnings: string[];
    deductions: string[];
    contributions: string[];
}

const initialStructures: SalaryStructure[] = [
    { 
        id: 1, 
        name: "Executive Package", 
        earnings: ["Basic Salary", "Car Allowance", "Bonus", "Commission"], 
        deductions: ["PAYE", "National Insurance", "Pension"], 
        contributions: ["NI (13.8%)", "Pension (5%)"] 
    },
    { 
        id: 2, 
        name: "Standard Full-Time", 
        earnings: ["Basic Salary", "Overtime"], 
        deductions: ["PAYE", "National Insurance", "Pension", "Student Loan"], 
        contributions: ["NI (13.8%)", "Pension (5%)"] 
    },
    { 
        id: 3, 
        name: "Contractor Package", 
        earnings: ["Basic Salary", "Bonus"], 
        deductions: ["PAYE", "National Insurance"], 
        contributions: ["NI (13.8%)"] 
    },
];

export default function SalaryStructurePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [structures, setStructures] = useState<SalaryStructure[]>(initialStructures);
    const [searchQuery, setSearchQuery] = useState("");

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_salary_structures");
        if (stored) {
            try {
                setStructures(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse salary structures from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_salary_structures", JSON.stringify(structures));
        }
    }, [structures, isLoaded]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedStructure, setSelectedStructure] = useState<SalaryStructure | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [structureToDelete, setStructureToDelete] = useState<number | null>(null);

    const filteredStructures = structures.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setModalMode("add");
        setSelectedStructure(null);
        setIsModalOpen(true);
    };

    const openEditModal = (structure: SalaryStructure) => {
        setModalMode("edit");
        setSelectedStructure(structure);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        if (structureToDelete) {
            setStructures(structures.filter(s => s.id !== structureToDelete));
            setIsDeleteModalOpen(false);
            setStructureToDelete(null);
        }
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Salary Structure</span>
        </span>
    );

    return (
        <DashboardLayout title="Salary Structure" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
                        <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Salary Structure</h2>

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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Salary Structure
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto p-3 2xl:p-6">
                        <table className="min-w-[1100px] w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-l-lg">Structure Name</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Earning</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Deductions</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employer Contributions</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 rounded-r-lg text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStructures.map((structure) => (
                                    <tr key={structure.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                                        <td className="py-4 pl-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{structure.name}</td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex flex-wrap gap-2">
                                                {structure.earnings.map(e => (
                                                    <span key={e} className="inline-flex rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[12px] font-medium text-[#257BFC]">
                                                        {e}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex flex-wrap gap-2">
                                                {structure.deductions.map(d => (
                                                    <span key={d} className="inline-flex rounded-full bg-[#FDEAEA] px-2.5 py-1 text-[12px] font-medium text-[#F04438]">
                                                        {d}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex flex-wrap gap-2">
                                                {structure.contributions.map(c => (
                                                    <span key={c} className="inline-flex rounded-full bg-[#EAF9EA] px-2.5 py-1 text-[12px] font-medium text-[#4DB949]">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => openEditModal(structure)} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                    <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                </button>
                                                <button onClick={() => { setStructureToDelete(structure.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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

            {/* Add/Edit Salary Structure Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    {/* Modal */}
                    <div className="w-full max-w-[700px] overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-6 sticky top-0 bg-white z-10">
                            <h2 className="text-[24px] font-bold text-[#1D2939]">
                                {modalMode === 'add' ? 'Create Salary Structure' : 'Edit Salary Structure'}
                            </h2>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-8 py-6">
                            
                            <div className="mb-6">
                                <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                    Structure Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Executive Package, Standard Package"
                                    defaultValue={selectedStructure?.name || ""}
                                    className="h-[52px] w-full rounded-2xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                />
                            </div>

                            {/* Earning Components */}
                            <div className="mb-8 bg-[#F8FAFC] rounded-2xl p-6 border border-neutral-100">
                                <h3 className="text-[16px] font-semibold text-[#1D2939] mb-4 border-b border-neutral-200 pb-3">
                                    Earning Components
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {["Basic Salary", "Hourly Pay", "Car Allowance", "Overtime", "Commission", "Bonus"].map(item => {
                                        const isChecked = selectedStructure?.earnings.includes(item) || false;
                                        return (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={isChecked}
                                                    className="h-5 w-5 rounded border-[#D0D5DD] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                />
                                                <span className="text-[14px] font-medium text-[#344054]">
                                                    {item}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Deductions Components */}
                            <div className="mb-6 bg-[#F8FAFC] rounded-2xl p-6 border border-neutral-100">
                                <h3 className="text-[16px] font-semibold text-[#1D2939] mb-4 border-b border-neutral-200 pb-3">
                                    Deductions Components
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {["PAYE(Income Tax)", "Workplace Pension", "National Insurance", "Student Loan"].map(item => {
                                        // Handle formatting diffs in mock data vs image text
                                        const isChecked = selectedStructure?.deductions.some(d => item.includes(d) || d.includes(item)) || false;
                                        return (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={isChecked}
                                                    className="h-5 w-5 rounded border-[#D0D5DD] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                />
                                                <span className="text-[14px] font-medium text-[#344054]">
                                                    {item}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>


                            {/* Footer Buttons */}
                            <div className="mt-8 flex items-center justify-end gap-4 border-t border-neutral-200 pt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="h-[48px] rounded-2xl border border-[#D0D5DD] bg-white px-8 text-[15px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => setIsModalOpen(false)} className="h-[48px] rounded-2xl bg-[#257BFC] px-8 text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    {modalMode === 'add' ? 'Add Pay Component' : 'Save Changes'}
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
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Structure</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this salary structure? This action cannot be undone.</p>
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
