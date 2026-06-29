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

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

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

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_pay_components", JSON.stringify(components));
        }
    }, [components, isLoaded]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [componentToDelete, setComponentToDelete] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        type: "Earning",
        taxable: false,
        pensionable: false,
        niApplicable: false,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Required";
        if (!formData.type) newErrors.type = "Required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleAdd = () => {
        if (!validateForm()) return;
        const newComp: PayComponent = {
            id: Date.now(),
            ...formData
        };
        setComponents([newComp, ...components]);
        setIsAddModalOpen(false);
        setShowToast(true);
    };

    const openAddModal = () => {
        setFormData({ name: "", type: "Earning", taxable: false, pensionable: false, niApplicable: false });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const filteredComponents = components.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const totalPages = Math.ceil(filteredComponents.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedComponents = filteredComponents.slice(startIndex, startIndex + rowsPerPage);

    const handleDelete = () => {
        if (componentToDelete) {
            setComponents(components.filter(c => c.id !== componentToDelete));
            setIsDeleteModalOpen(false);
            setComponentToDelete(null);
        }
    };

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Pay Components</span>
        </span>
    );

    return (
        <DashboardLayout title="Pay Components" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 pt-4 md:pt-6">
                        <h2 className="lg:text-[20px] md:text-[17px] text-[16px] font-medium text-[#111827]">Pay Components (Earnings)</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 lg:w-60 w-36">
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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-2 lg:px-5 md:py-2.5 text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Pay Component
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1000px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">Component Name</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Type</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">Taxable</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">Pensionable</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">NI Applicable</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] rounded-r-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {paginatedComponents.map((comp) => (
                                            <tr
                                                key={comp.id}
                                                className="group border-b border-[#E2E8F0] transition-colors hover:bg-neutral-50 last:border-none"
                                            >
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] md:text-[14px] font-normal text-neutral-900 sm:text-[14px]">
                                                    {comp.name}
                                                </td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] md:text-[14px] font-normal text-neutral-900 sm:text-[14px]">
                                                    {comp.type}
                                                </td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-center">
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
                                                        className="h-4 w-4 cursor-pointer rounded border-[#E2E8F0] text-[#257BFC]"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 text-center">
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
                                                        className="h-4 w-4 cursor-pointer rounded border-[#E2E8F0] text-[#257BFC]"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 text-center">
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
                                                        className="h-4 w-4 cursor-pointer rounded border-[#E2E8F0] text-[#257BFC]"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 sm:px-6">
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
                                {filteredComponents.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredComponents.length)} of ${filteredComponents.length}` : '0-0 of 0'}
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

            {/* Add Pay Component Modal */}
            {
                isAddModalOpen && (
                    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-[#E2E8F0] lg:px-8 md:px-6 px-4 lg:py-6 py-4">
                                <h2 className="md:text-[24px] text-[18px] font-bold text-[#1D2939]">
                                    Add Pay Component
                                </h2>

                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-neutral-500 transition hover:text-black cursor-pointer"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className="lg:px-8 md:px-6 px-4 lg:py-6 md:py-4 py-2">
                                <h3 className="text-[20px] font-semibold text-[#1D2939]">
                                    Basic Information
                                </h3>

                                <p className="md:mt-2 mt-1 md:text-[14px] text-[12px] text-[#98A2B3]">
                                    Create a new earnings or deduction component to include
                                    in employee payroll calculations.
                                </p>

                                <div className="md:mt-8 mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                            Component Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Basic Salary, Overtime, Bonus"
                                            className={`md:h-[52px] h-[45px] w-full rounded-2xl border ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'} px-4 text-[14px] outline-none transition focus:border-[#257BFC]`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                            Component Type
                                        </label>

                                        <CustomSelect
                                            value={formData.type}
                                            onChange={(val) => handleSelectChange('type', val)}
                                            options={[
                                                { label: "Earning", value: "Earning" },
                                                { label: "Deduction", value: "Deduction" },
                                                { label: "Allowance", value: "Allowance" },
                                                { label: "Bonus", value: "Bonus" }
                                            ]}
                                            placeholder="Select Component Type"
                                            error={!!errors.type}
                                        />
                                        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="taxable"
                                            checked={formData.taxable}
                                            onChange={handleInputChange}
                                            className="md:h-5 md:w-5 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                        />

                                        <span className="text-[14px] text-[#344054]">
                                            Taxable
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="pensionable"
                                            checked={formData.pensionable}
                                            onChange={handleInputChange}
                                            className="md:h-5 md:w-5 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                        />

                                        <span className="text-[14px] text-[#344054]">
                                            Pensionable
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="niApplicable"
                                            checked={formData.niApplicable}
                                            onChange={handleInputChange}
                                            className="md:h-5 md:w-5 h-4 w-4 rounded border-[#E2E8F0] text-[#257BFC] focus:ring-[#257BFC] cursor-pointer"
                                        />

                                        <span className="text-[14px] text-[#344054]">
                                            NI Applicable
                                        </span>
                                    </label>
                                </div>

                                <div className="lg:mt-12 mt-10 flex items-center justify-end md:gap-4 gap-2">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="md:h-[48px] h-[40px] rounded-2xl border border-[#101828] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button onClick={handleAdd} className="md:h-[48px] h-[40px] rounded-2xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                        Add Pay Component
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isDeleteModalOpen && (
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
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl cursor-pointer border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <Toast
                show={showToast}
                message="Pay Component Added Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout >
    );
}
