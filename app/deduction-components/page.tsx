"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import { Lexend_Deca } from "next/font/google";
import deleteRedIcon from "@/assets/images/icons/delete-red.svg";

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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deductionToDelete, setDeductionToDelete] = useState<number | null>(null);
    const [deductionToEdit, setDeductionToEdit] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        method: "",
        rate: "",
        rules: "",
        applicable: true,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Required";
        if (!formData.type) newErrors.type = "Required";
        if (!formData.method) newErrors.method = "Required";
        if (!formData.rate) {
            newErrors.rate = "Required";
        } else if (isNaN(Number(formData.rate))) {
            newErrors.rate = "Must be a valid number";
        }
        if (!formData.rules) newErrors.rules = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleAdd = () => {
        if (!validateForm()) return;
        const newDed: DeductionComponent = {
            id: Date.now(),
            name: formData.name,
            type: formData.type,
            rate: formData.method === 'Percentage' ? `${formData.rate}%` : `$${formData.rate}`,
            rules: formData.rules,
            applicable: formData.applicable
        };
        setDeductions([newDed, ...deductions]);
        setIsAddModalOpen(false);
        setShowToast(true);
    };

    const handleEditSave = () => {
        if (!validateForm() || deductionToEdit === null) return;
        const rateVal = formData.rate.includes('%') || formData.rate.includes('$')
            ? formData.rate
            : formData.method === 'Percentage' ? `${formData.rate}%` : `$${formData.rate}`;

        setDeductions(deductions.map(d => d.id === deductionToEdit ? {
            ...d,
            name: formData.name,
            type: formData.type,
            rate: rateVal,
            rules: formData.rules,
            applicable: formData.applicable
        } : d));
        setIsEditModalOpen(false);
        setDeductionToEdit(null);
    };

    const openAddModal = () => {
        setFormData({ name: "", type: "", method: "", rate: "", rules: "", applicable: true });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const openEditModal = (ded: DeductionComponent) => {
        const method = ded.rate.includes('%') ? 'Percentage' : 'Fixed Amount';
        const rateVal = ded.rate.replace(/[%$]/g, '');
        setFormData({
            name: ded.name,
            type: ded.type,
            method: method,
            rate: rateVal,
            rules: ded.rules,
            applicable: ded.applicable
        });
        setErrors({});
        setDeductionToEdit(ded.id);
        setIsEditModalOpen(true);
    };

    const filteredDeductions = deductions.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(filteredDeductions.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedDeductions = filteredDeductions.slice(startIndex, startIndex + rowsPerPage);

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
            <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Deduction Components</span>
        </span>
    );

    return (
        <DashboardLayout title="Deduction Components" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Deduction Components</h2>

                        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 md:w-60 w-full">
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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Deduction
                            </button>
                        </div>
                    </div>


                    <div className="p-3 2xl:p-6">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1100px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pl-4 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827] rounded-l-lg">Deduction Name</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Type</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Rate</th>
                                            <th className="border-b border-[#E2E8F0] py-[10px] pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Applicable Rules</th>
                                            <th className="border-b border-[#E2E8F0] px-6 py-[10px] pr-4 text-[14px] md:text-[16px] font-normal text-[#111827] rounded-r-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {paginatedDeductions.map((deduction) => (
                                            <tr key={deduction.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="md:py-6 py-4 pl-4 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.name}</td>
                                                <td className="md:py-6 py-4 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.type}</td>
                                                <td className="md:py-6 py-4 pr-26 text-[13px] sm:text-[14px] font-normal text-[#111827]">{deduction.rate}</td>
                                                <td className="md:py-6 py-4 pr-6 text-[13px] sm:text-[14px] text-[#111827]">
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
                                                        <button
                                                            onClick={() => openEditModal(deduction)}
                                                            className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer"
                                                        >
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

                        {/* Pagination */}
                        <div className="flex items-center justify-between sm:justify-end py-4 mt-2 overflow-x-auto w-full whitespace-nowrap gap-2 sm:gap-4 px-2 sm:px-6">
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
                                {filteredDeductions.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredDeductions.length)} of ${filteredDeductions.length}` : '0-0 of 0'}
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

            {/* Add Deduction Component Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] 2xl:px-8 xl:px-6 px-4 2xl:py-6 py-4">
                            <h2 className="md:text-[24px] text-[16px] font-bold text-[#1D2939]">
                                Add Deduction Component
                            </h2>

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. PAYE, Pension"
                                        className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Type
                                    </label>

                                    <CustomSelect
                                        value={formData.type}
                                        onChange={(val) => handleSelectChange('type', val)}
                                        options={[
                                            { label: "Statutory", value: "Statutory" },
                                            { label: "Custom", value: "Custom" }
                                        ]}
                                        placeholder="Select Type"
                                        error={!!errors.type}
                                    />
                                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Method
                                    </label>

                                    <CustomSelect
                                        value={formData.method}
                                        onChange={(val) => handleSelectChange('method', val)}
                                        options={[
                                            { label: "Percentage", value: "Percentage" },
                                            { label: "Fixed Amount", value: "Fixed Amount" }
                                        ]}
                                        placeholder="Select Method Type"
                                        error={!!errors.method}
                                    />
                                    {errors.method && <p className="text-red-500 text-xs mt-1">{errors.method}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Rate
                                    </label>

                                    <input
                                        type="text"
                                        name="rate"
                                        value={formData.rate}
                                        onChange={handleInputChange}
                                        placeholder="Enter Rate"
                                        className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.rate ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Applicable Rules
                                    </label>

                                    <textarea
                                        name="rules"
                                        value={formData.rules}
                                        onChange={handleInputChange}
                                        placeholder="Describe the rules and conditions for this deduction..."
                                        className={`md:h-[120px] h-[100px] w-full resize-none rounded-xl border ${errors.rules ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-4 p-3 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.rules && <p className="text-red-500 text-xs mt-1">{errors.rules}</p>}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-end gap-3 md:gap-4">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#101828] px-4 md:px-8 text-[12px] md:text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={handleAdd} className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] px-4 md:px-8 text-[12px] md:text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Add Deduction Component
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Deduction Component Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] 2xl:px-8 xl:px-6 px-4 2xl:py-6 py-4">
                            <h2 className="md:text-[24px] text-[16px] font-bold text-[#1D2939]">
                                Edit Deduction Component
                            </h2>

                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setDeductionToEdit(null);
                                }}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. PAYE, Pension"
                                        className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Type
                                    </label>

                                    <CustomSelect
                                        value={formData.type}
                                        onChange={(val) => handleSelectChange('type', val)}
                                        options={[
                                            { label: "Statutory", value: "Statutory" },
                                            { label: "Custom", value: "Custom" }
                                        ]}
                                        placeholder="Select Type"
                                        error={!!errors.type}
                                    />
                                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Method
                                    </label>

                                    <CustomSelect
                                        value={formData.method}
                                        onChange={(val) => handleSelectChange('method', val)}
                                        options={[
                                            { label: "Percentage", value: "Percentage" },
                                            { label: "Fixed Amount", value: "Fixed Amount" }
                                        ]}
                                        placeholder="Select Method Type"
                                        error={!!errors.method}
                                    />
                                    {errors.method && <p className="text-red-500 text-xs mt-1">{errors.method}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Rate(%)
                                    </label>

                                    <input
                                        type="text"
                                        name="rate"
                                        value={formData.rate}
                                        onChange={handleInputChange}
                                        placeholder="Enter Rate"
                                        className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.rate ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Applicable Rules
                                    </label>

                                    <textarea
                                        name="rules"
                                        value={formData.rules}
                                        onChange={handleInputChange}
                                        placeholder="Describe the rules and conditions for this deduction..."
                                        className={`md:h-[120px] h-[100px] w-full resize-none rounded-xl border ${errors.rules ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-4 p-3 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                    />
                                    {errors.rules && <p className="text-red-500 text-xs mt-1">{errors.rules}</p>}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-end gap-3 md:gap-4">
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setDeductionToEdit(null);
                                    }}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#101828] px-4 md:px-8 text-[12px] md:text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={handleEditSave} className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] px-4 md:px-8 text-[12px] md:text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Add Pay Component
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[370px] rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 p-[9px] rounded-xl bg-red-100">
                                <Image src={deleteRedIcon} alt="Delete" className="text-red-600" />
                            </div>
                            <p className="text-[16px] text-[#111827] font-medium">Are you sure you want to permanently delete "PAYE (Income Tax)"?</p>
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
                message="Deduction Added Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
