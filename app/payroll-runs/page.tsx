"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import deleteRedIcon from "@/assets/images/icons/delete-red.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

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
    const [taxYear, setTaxYear] = useState("2025/2026");

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

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_payroll_runs", JSON.stringify(runs));
        }
    }, [runs, isLoaded]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [runToDelete, setRunToDelete] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        period: "",
        date: "",
        group: "",
        notes: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.period) newErrors.period = "Required";
        if (!formData.date) newErrors.date = "Required";
        if (!formData.group) newErrors.group = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleAdd = () => {
        if (!validateForm()) return;
        const newRun: PayrollRun = {
            id: Date.now(),
            period: formData.period,
            group: formData.group,
            date: formData.date,
            cost: "$0",
            status: "Pending Approval"
        };
        setRuns([newRun, ...runs]);
        setIsAddModalOpen(false);
        setShowToast(true);
    };

    const openAddModal = () => {
        setFormData({ period: "", date: "", group: "", notes: "" });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const filteredRuns = runs.filter(r =>
        r.period.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(filteredRuns.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedRuns = filteredRuns.slice(startIndex, startIndex + rowsPerPage);

    const handleDelete = () => {
        if (runToDelete) {
            setRuns(runs.filter(r => r.id !== runToDelete));
            setIsDeleteModalOpen(false);
            setRunToDelete(null);
        }
    };

    const breadcrumb = (
        <span className="${lexendDeca.className} text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Payroll Runs</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Runs" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Employee Records</h2>

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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-3 py-1 md:px-5 md:py-2.5 text-[11px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Create Payroll Run
                            </button>

                            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                                <div className="w-[140px]">
                                    <CustomSelect
                                        value={taxYear}
                                        onChange={setTaxYear}
                                        options={[
                                            { label: "2025/2026", value: "2025/2026" },
                                            { label: "2024/2025", value: "2024/2025" }
                                        ]}
                                        className="!h-[40px] !py-2 !rounded-xl !text-[#98A2B3]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1000px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">Payroll Period</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Pay Group</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Pay Date</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Total Payroll Cost</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827]">Status</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] sm:text-[16px] font-normal text-[#111827] rounded-r-lg text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {paginatedRuns.map((run) => (
                                            <tr key={run.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{run.period}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{run.group}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{run.date}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{run.cost}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <span className={`inline-flex rounded-full px-3.5 py-2.5 md:text-[14px] text-[12px] font-medium ${run.status === "Paid" ? "bg-[#EAF9EA] text-[#4DB949]" : "bg-[#FFF6E8] text-[#FFA100]"
                                                        }`}>
                                                        {run.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button onClick={() => router.push(`/payroll-runs/${encodeURIComponent(run.period)}`)} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                            <Image src={eyeIcon} alt="Edit" className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setSelectedRun(run); setIsEditModalOpen(true); }} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
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

                        {/* Pagination */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end py-4 mt-2">
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
                                {filteredRuns.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredRuns.length)} of ${filteredRuns.length}` : '0-0 of 0'}
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

            {isAddModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[820px] overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[75vh] flex flex-col">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] 2xl:px-8 xl:px-6 px-4 2xl:py-6 py-4 shrink-0">
                            <h2 className="md:text-[24px] text-[18px] font-bold text-[#1D2939]">
                                Create New Payroll Run
                            </h2>

                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4 overflow-y-auto">

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:mb-6 mb-4">
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Payroll Period
                                    </label>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="period"
                                            value={formData.period}
                                            onChange={handleInputChange}
                                            placeholder="e.g., April 2024"
                                            className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.period ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC] overflow-hidden`}
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                    {errors.period && <p className="text-red-500 text-xs mt-1">{errors.period}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Date
                                    </label>

                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className={`md:h-[52px] h-[45px] w-full rounded-xl border ${errors.date ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC] overflow-hidden`}
                                        />
                                    </div>
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Group
                                    </label>

                                    <div className="relative">
                                        <CustomSelect
                                            value={formData.group}
                                            onChange={(val) => {
                                                setFormData(prev => ({ ...prev, group: val }));
                                                setErrors(prev => ({ ...prev, group: "" }));
                                            }}
                                            options={[
                                                { label: "All Employees", value: "All Employees" },
                                                { label: "Engineering Team", value: "Engineering Team" },
                                                { label: "Sales Team", value: "Sales Team" }
                                            ]}
                                            placeholder="Select Pay Group"
                                            error={!!errors.group}
                                            className="md:h-[52px] h-[45px]"
                                        />
                                    </div>
                                    {errors.group && <p className="text-red-500 text-xs mt-1">{errors.group}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Notes
                                    </label>

                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Add any notes..."
                                        className="md:h-[100px] h-[80px] w-full resize-none rounded-xl border border-[#E2E8F0] md:p-4 p-2 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 rounded-2xl bg-[#F9FAFB] p-6">
                                <h3 className="mb-6 text-[20px] font-medium text-[#111827] border-b border-[#D0D5DD] pb-6">
                                    Include Employees
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">Active Employees</span>
                                        <span className="text-[14px] font-normal text-[#111827]">324</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">On Leave</span>
                                        <span className="text-[14px] font-normal text-[#111827]">12</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">New Joiners</span>
                                        <span className="text-[14px] font-normal text-[#111827]">8</span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-[#D0D5DD] pt-4">
                                        <span className="text-[14px] font-normal text-[#111827]">Total to Process</span>
                                        <span className="text-[14px] font-normal text-[#111827]">324</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-3 pt-6 shrink-0 mb-2.5 mr-6">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#D0D5DD] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                                >
                                    Generate Payroll
                                </button>
                            </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[820px] overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[75vh] flex flex-col">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] 2xl:px-8 xl:px-6 px-4 2xl:py-6 py-4 shrink-0">
                            <h2 className="md:text-[24px] text-[18px] font-bold text-[#1D2939]">
                                Edit Payroll Run
                            </h2>

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4 overflow-y-auto">

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:mb-6 mb-4">
                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Payroll Period
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={selectedRun?.period}
                                            placeholder="e.g., April 2024"
                                            className="md:h-[52px] h-[45px] w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={selectedRun?.date}
                                            className="md:h-[52px] h-[45px] w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        />
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Group
                                    </label>
                                    <div className="relative">
                                        <CustomSelect
                                            value={selectedRun?.group || "All Employees"}
                                            onChange={() => {}}
                                            options={[
                                                { label: "All Employees", value: "All Employees" },
                                                { label: "Engineering Team", value: "Engineering Team" },
                                                { label: "Sales Team", value: "Sales Team" }
                                            ]}
                                            className="md:h-[52px] h-[45px]"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Notes
                                    </label>
                                    <textarea
                                        placeholder="Describe the rules and conditions for this deduction..."
                                        className="md:h-[100px] h-[80px] w-full resize-none rounded-xl border border-[#E2E8F0] md:p-4 p-2 text-[14px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 rounded-2xl bg-[#F9FAFB] p-6">
                                <h3 className="mb-6 text-[20px] font-medium text-[#111827] border-b border-[#D0D5DD] pb-6">
                                    Include Employees
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">Active Employees</span>
                                        <span className="text-[14px] font-normal text-[#111827]">324</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">On Leave</span>
                                        <span className="text-[14px] font-normal text-[#111827]">12</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-normal text-[#111827]">New Joiners</span>
                                        <span className="text-[14px] font-normal text-[#111827]">8</span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-[#D0D5DD] pt-4">
                                        <span className="text-[14px] font-normal text-[#111827]">Total to Process</span>
                                        <span className="text-[14px] font-normal text-[#111827]">324</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-3 pt-6 shrink-0">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#D0D5DD] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[12px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                                >
                                    Generate Payroll
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[350px] rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 rounded-xl p-[9px] bg-red-100">
                                <Image src={deleteRedIcon} alt="Delete" className="text-red-600" />
                            </div>
                            <p className="text-[16px] font-medium text-[#111827]">Are you sure you want to delete the payroll run for March 2024?</p>
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
                message="Payroll Run Generated Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}