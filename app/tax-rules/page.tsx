"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
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

    const openEditModal = (rule: TaxRule) => {
        setSelectedRule(rule);
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
        const formData = new FormData(e.currentTarget);
        const updatedRule = {
            ...selectedRule,
            bandName: formData.get('bandName') as string,
            lower: formData.get('lower') as string,
            upper: formData.get('upper') as string,
            rate: formData.get('rate') as string,
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
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-neutral-900">Tax Rules</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative">
                                <select className="h-[40px] appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-10 text-[14px] text-[#98A2B3] outline-none transition focus:border-[#000000] overflow-hidden"
                                >
                                    <option>2025/2026</option>
                                    <option>2024/2025</option>
                                </select>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>


                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
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
                                        {rules.map((rule) => (
                                            <tr key={rule.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{rule.bandName}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{rule.lower}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{rule.upper}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{rule.rate}</td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button onClick={() => openEditModal(rule)} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setRuleToDelete(rule.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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
                                        defaultValue={selectedRule?.bandName || ""}
                                        className="lg:h-[52px] h-[42px] w-full rounded-2xl border border-[#E2E8F0] px-4 md:text-[14px] text-[12px] outline-none transition focus:border-[#257BFC]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Lower Threshold($)
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="lower"
                                            defaultValue={selectedRule?.lower || ""}
                                            className="lg:h-[52px] h-[42px] w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-white px-4 pr-12 md:text-[14px] text-[12px] text-[#344054] outline-none transition focus:border-[#257BFC] overflow-hidden"
                                        >
                                            <option value="$0">$0</option>
                                            <option value="$12,571">$12,571</option>
                                            <option value="$50,271">$50,271</option>
                                            <option value="$125,141">$125,141</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Upper Threshold($)
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="upper"
                                            defaultValue={selectedRule?.upper || ""}
                                            className="lg:h-[52px] h-[42px] w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-white px-4 pr-12 md:text-[14px] text-[12px] text-[#344054] outline-none transition focus:border-[#257BFC] overflow-hidden"
                                        >
                                            <option value="$12,570">$12,570</option>
                                            <option value="$50,270">$50,270</option>
                                            <option value="$125,140">$125,140</option>
                                            <option value="Unlimited">Unlimited</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Tax Rate (%)
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="rate"
                                            defaultValue={selectedRule?.rate || ""}
                                            className="lg:h-[52px] h-[42px] w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-white px-4 pr-12 md:text-[14px] text-[12px] text-[#344054] outline-none transition focus:border-[#257BFC] overflow-hidden"
                                        >
                                            <option value="0%">0%</option>
                                            <option value="20%">20%</option>
                                            <option value="40%">40%</option>
                                            <option value="45%">45%</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-end md:gap-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="lg:h-[48px] h-[40px] rounded-2xl border border-[#E2E8F0] md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="lg:h-[48px] h-[40px] rounded-2xl bg-[#257BFC] md:px-8 px-4 md:text-[15px] text-[13px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Save Change
                                </button>
                            </div>
                        </form>
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
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Tax Rule</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this tax rule? This action cannot be undone.</p>
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
