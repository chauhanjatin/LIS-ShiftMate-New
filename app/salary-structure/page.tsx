"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-red.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

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
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState<{ name: string, earnings: string[], deductions: string[], employerNI: string, employerPension: string }>({
        name: "",
        earnings: [],
        deductions: [],
        employerNI: "",
        employerPension: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Required";
        if (formData.earnings.length === 0) newErrors.earnings = "Select at least one earning component";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const contributions: string[] = [];
        if(formData.employerNI) contributions.push(`NI (${formData.employerNI})`);
        if(formData.employerPension) contributions.push(`Pension (${formData.employerPension})`);

        if (modalMode === 'add') {
            const newStructure: SalaryStructure = {
                id: Date.now(),
                name: formData.name,
                earnings: formData.earnings,
                deductions: formData.deductions,
                contributions: contributions
            };
            setStructures([newStructure, ...structures]);
        } else if (selectedStructure) {
            setStructures(structures.map(s => s.id === selectedStructure.id ? { ...s, name: formData.name, earnings: formData.earnings, deductions: formData.deductions, contributions } : s));
        }

        setIsModalOpen(false);
        setShowToast(true);
    };

    const filteredStructures = structures.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(filteredStructures.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedStructures = filteredStructures.slice(startIndex, startIndex + rowsPerPage);

    const openAddModal = () => {
        setModalMode("add");
        setSelectedStructure(null);
        setFormData({ name: "", earnings: [], deductions: [], employerNI: "", employerPension: "" });
        setErrors({});
        setIsModalOpen(true);
    };

    const openEditModal = (structure: SalaryStructure) => {
        setModalMode("edit");
        setSelectedStructure(structure);
        let employerNI = "";
        let employerPension = "";
        structure.contributions.forEach(c => {
            if (c.startsWith("NI")) employerNI = c.match(/\((.*?)\)/)?.[1] || "";
            if (c.startsWith("Pension")) employerPension = c.match(/\((.*?)\)/)?.[1] || "";
        });
        setFormData({ name: structure.name, earnings: structure.earnings, deductions: structure.deductions, employerNI, employerPension });
        setErrors({});
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
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Salary Structure</span>
        </span>
    );

    return (
        <DashboardLayout title="Salary Structure" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 md:pt-6 px-4 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Salary Structure</h2>

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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-2 md:px-5 md:py-2.5 text-[10px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Salary Structure
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1100px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[13px] md:text-[16px] font-normal text-[#111827] rounded-l-lg">Structure Name</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] md:text-[16px] font-normal text-[#111827]">Earning</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] md:text-[16px] font-normal text-[#111827]">Deductions</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] md:text-[16px] font-normal text-[#111827]">Employer Contributions</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] md:text-[16px] font-normal text-[#111827] rounded-r-lg text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {paginatedStructures.map((structure) => (
                                            <tr key={structure.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#2E334E]">{structure.name}</td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {structure.earnings.map(e => (
                                                            <span key={e} className="inline-flex rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[12px] font-normal text-[#257BFC]">
                                                                {e}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {structure.deductions.map(d => (
                                                            <span key={d} className="inline-flex rounded-full bg-[#FDEAEA] px-2.5 py-1 text-[12px] font-normal text-[#F04438]">
                                                                {d}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {structure.contributions.map(c => (
                                                            <span key={c} className="inline-flex rounded-full bg-[#EAF9EA] px-2.5 py-1 text-[12px] font-normal text-[#4DB949]">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
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

                        {/* Pagination */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4 mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] sm:text-[14px] text-neutral-500">
                                    Rows per page:
                                </span>
                                <div className="w-[80px]">
                                    <CustomSelect
                                        value={String(rowsPerPage)}
                                        onChange={(val) => { setRowsPerPage(Number(val)); setCurrentPage(1); }}
                                        options={[
                                            { label: "5", value: "5" },
                                            { label: "10", value: "10" },
                                            { label: "20", value: "20" }
                                        ]}
                                        menuPlacement="top"
                                        className="!py-1 !px-2 text-[12px] sm:text-[14px] min-h-[32px]"
                                    />
                                </div>
                            </div>

                            <span className="text-[12px] sm:text-[14px] text-neutral-500 ml-4">
                                {filteredStructures.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredStructures.length)} of ${filteredStructures.length}` : '0-0 of 0'}
                            </span>

                            <div className="flex items-center gap-1 ml-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Add/Edit Salary Structure Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[700px] overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] 2xl:px-8 xl:px-6 px-4 md:py-6 py-4 sticky top-0 bg-white z-10">
                            <h2 className="md:text-[24px] text-[20px] font-bold text-[#1D2939]">
                                {modalMode === 'add' ? 'Create Salary Structure' : 'Edit Salary Structure'}
                            </h2>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4">

                            <div className="mb-6">
                                <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                    Structure Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, name: e.target.value }));
                                        setErrors(prev => ({ ...prev, name: "" }));
                                    }}
                                    placeholder="e.g., Executive Package, Standard Package"
                                    className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="mb-8 bg-white rounded-xl md:p-6 p-4 border border-[#E2E8F0] overflow-hidden">
                                <h3 className="text-[16px] font-semibold text-[#1D2939] mb-4 border-b border-[#E2E8F0] pb-3">
                                    Earning Components
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {["Basic Salary", "Hourly Pay", "Car Allowance", "Overtime", "Commission", "Bonus"].map(item => {
                                        const isChecked = formData.earnings.includes(item);
                                        return (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            earnings: checked ? [...prev.earnings, item] : prev.earnings.filter(i => i !== item)
                                                        }));
                                                        setErrors(prev => ({ ...prev, earnings: "" }));
                                                    }}
                                                    className="md:h-5 md:w-5 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                />
                                                <span className="text-[14px] font-medium text-[#344054]">
                                                    {item}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {errors.earnings && <p className="text-red-500 text-xs mt-2">{errors.earnings}</p>}
                            </div>

                            <div className="mb-6 bg-white rounded-xl md:p-6 p-4 border border-[#E2E8F0] overflow-hidden">
                                <h3 className="text-[16px] font-semibold text-[#1D2939] mb-4 border-b border-[#E2E8F0] pb-3">
                                    Deductions Components
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {["PAYE(Income Tax)", "Workplace Pension", "National Insurance", "Student Loan"].map(item => {
                                        const isChecked = formData.deductions.some(d => item.includes(d) || d.includes(item));
                                        return (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            deductions: checked ? [...prev.deductions, item] : prev.deductions.filter(i => i !== item)
                                                        }));
                                                    }}
                                                    className="md:h-5 md:w-5 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                                />
                                                <span className="text-[14px] font-medium text-[#344054]">
                                                    {item}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mb-6 bg-white rounded-xl md:p-6 p-4 border border-[#E2E8F0] overflow-hidden">
                                <h3 className="text-[16px] font-semibold text-[#1D2939] mb-4 border-b border-[#E2E8F0] pb-3">
                                    Employer Contributions
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                            Employer NI
                                        </label>
                                        <CustomSelect
                                            value={formData.employerNI}
                                            onChange={(val) => setFormData(prev => ({ ...prev, employerNI: val }))}
                                            options={[
                                                { label: "13.8%", value: "13.8%" },
                                                { label: "15%", value: "15%" },
                                                { label: "Other", value: "Other" }
                                            ]}
                                            placeholder="Select Rate"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                            Employer Pension
                                        </label>
                                        <CustomSelect
                                            value={formData.employerPension}
                                            onChange={(val) => setFormData(prev => ({ ...prev, employerPension: val }))}
                                            options={[
                                                { label: "3.3%", value: "3.3%" },
                                                { label: "5%", value: "5%" },
                                                { label: "Other", value: "Other" }
                                            ]}
                                            placeholder="Select Rate"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:mt-8 mt-6 flex items-center justify-end md:gap-4 gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#E2E8F0] bg-white md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer overflow-hidden"
                                >
                                    Cancel
                                </button>

                                <button onClick={handleSave} className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    {modalMode === 'add' ? 'Add Pay Component' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[390px] rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 p-[9px] rounded-xl bg-red-100">
                                <Image src={deleteRedIcon} alt="Delete" className="text-red-600" />
                            </div>
                            <p className="text-[16px] text-[#111827] font-medium">Are you sure you want to delete "Executive Package"? This will affect 4 employees.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl cursor-pointer border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <Toast
                show={showToast}
                message={modalMode === 'add' ? "Salary Structure Added Successfully" : "Salary Structure Updated Successfully"}
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
