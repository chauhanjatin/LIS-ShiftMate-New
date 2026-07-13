"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-red.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface TaxRule {
    id: number;
    bandName: string;
    lower: string;
    upper: string;
    rate: string;
}

const initialRules: TaxRule[] = [
    { id: 1, bandName: "Personal Allowance", lower: "$0", upper: "$12,570", rate: "0%" },
    { id: 2, bandName: "Basic Rate", lower: "$12,571", upper: "$50,270", rate: "20%" },
    { id: 3, bandName: "Higher Rate", lower: "$50,271", upper: "$125,140", rate: "40%" },
    { id: 4, bandName: "Additional Rate", lower: "$125,141", upper: "Unlimited", rate: "45%" },
];

export default function TaxRulesPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState<TaxRule[]>(initialRules);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(rules.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedRules = rules.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_tax_rules");
        if (stored) {
            try {
                setRules(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse tax rules from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_tax_rules", JSON.stringify(rules));
        }
    }, [rules, isLoaded]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxRule | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [editFormData, setEditFormData] = useState({ bandName: "", lower: "", upper: "", rate: "" });
    const [taxYear, setTaxYear] = useState("2025/2026");

    const openEditModal = (rule: TaxRule) => {
        setSelectedRule(rule);
        setEditFormData({ bandName: rule.bandName, lower: rule.lower, upper: rule.upper, rate: rule.rate });
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        if (ruleToDelete) {
            setRules(rules.filter(r => r.id !== ruleToDelete));
            setIsDeleteModalOpen(false);
            setRuleToDelete(null);
        }
    };

    const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedRule) return;
        const updatedRule = {
            ...selectedRule,
            ...editFormData
        };
        setRules(rules.map(r => r.id === selectedRule.id ? updatedRule : r));
        setIsEditModalOpen(false);
        setShowToast(true);
    };

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Tax Rules</span>
        </span>
    );

    return (
        <DashboardLayout title="Tax Rules" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Tax Rules</h2>

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


                    <div className="p-3 2xl:p-6">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[900px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827] rounded-l-lg">Band Name</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Lower Threshold($)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Upper Threshold($)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827]">Tax Rate (%)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[14px] md:text-[16px] font-normal text-[#111827] rounded-r-lg text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {paginatedRules.map((rule) => (
                                            <tr key={rule.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{rule.bandName}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{rule.lower}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{rule.upper}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{rule.rate}</td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button onClick={() => openEditModal(rule)} className="text-[#111827] hover:text-[#257BFC] transition-colors cursor-pointer">
                                                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setRuleToDelete(rule.id); setIsDeleteModalOpen(true); }} className="text-[#111827] hover:text-red-500 transition-colors cursor-pointer">
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
                                {rules.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, rules.length)} of ${rules.length}` : '0-0 of 0'}
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

            {/* Edit Tax Rule Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 lg:px-8 py-4 lg:py-6">
                            <h2 className="md:text-[24px] text-[20px] font-bold text-[#1D2939]">
                                Edit Tax Rules
                            </h2>

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <form onSubmit={handleEditSave} className="px-4 md:px-8 py-4 md:py-6">

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Band Name
                                    </label>

                                    <input
                                        type="text"
                                        name="bandName"
                                        value={editFormData.bandName}
                                        onChange={(e) => setEditFormData({ ...editFormData, bandName: e.target.value })}
                                        className="lg:h-[52px] h-[42px] w-full rounded-xl border border-[#E2E8F0] px-4 md:text-[14px] text-[12px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Lower Threshold($)
                                    </label>

                                    <div className="relative">
                                        <CustomSelect
                                            value={editFormData.lower}
                                            onChange={(val) => setEditFormData({ ...editFormData, lower: val })}
                                            options={[
                                                { label: "$0", value: "$0" },
                                                { label: "$12,571", value: "$12,571" },
                                                { label: "$50,271", value: "$50,271" },
                                                { label: "$125,141", value: "$125,141" }
                                            ]}
                                            className="lg:h-[52px] h-[42px] !rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Upper Threshold($)
                                    </label>

                                    <div className="relative">
                                        <CustomSelect
                                            value={editFormData.upper}
                                            onChange={(val) => setEditFormData({ ...editFormData, upper: val })}
                                            options={[
                                                { label: "$12,570", value: "$12,570" },
                                                { label: "$50,270", value: "$50,270" },
                                                { label: "$125,140", value: "$125,140" },
                                                { label: "Unlimited", value: "Unlimited" }
                                            ]}
                                            className="lg:h-[52px] h-[42px] !rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Tax Rate (%)
                                    </label>

                                    <div className="relative">
                                        <CustomSelect
                                            value={editFormData.rate}
                                            onChange={(val) => setEditFormData({ ...editFormData, rate: val })}
                                            options={[
                                                { label: "0%", value: "0%" },
                                                { label: "20%", value: "20%" },
                                                { label: "40%", value: "40%" },
                                                { label: "45%", value: "45%" }
                                            ]}
                                            className="lg:h-[52px] h-[42px] !rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-end md:gap-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="lg:h-[48px] h-[40px] rounded-xl border border-[#E2E8F0] md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="lg:h-[48px] h-[40px] rounded-xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Save Change
                                </button>
                            </div>
                        </form>
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
                            <p className="text-[16px] font-medium text-[#111827]">Are you sure you want to delete this tax rule?</p>
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
                message="Tax Rule Updated Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
