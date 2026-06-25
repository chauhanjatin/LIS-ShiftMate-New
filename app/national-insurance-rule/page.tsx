"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface TaxRule {
    id: number;
    niCategory: string;
    description: string;
    lowerThreshold: string;
    upperThreshold: string;
    employeeRate: string;
    employerRate: string;
}

const initialRules: TaxRule[] = [
    { id: 1, niCategory: "Category “A”", description: "Standard - Most employees", lowerThreshold: "$1048", upperThreshold: "$4189", employeeRate: "12%", employerRate: "13.8%" },
    { id: 2, niCategory: "Category “B”", description: "Married women / widows", lowerThreshold: "$1048", upperThreshold: "$4189", employeeRate: "5.85%", employerRate: "13.8%" },
    { id: 3, niCategory: "Category “C”", description: "Over State Pension age", lowerThreshold: "$1048", upperThreshold: "$4189", employeeRate: "12%", employerRate: "13.8%" },
    { id: 4, niCategory: "Category “H”", description: "Deferred (can defer if earnings high)", lowerThreshold: "$1048", upperThreshold: "12%", employeeRate: "45%", employerRate: "13.8%" },
];

export default function NationalInsuranceRulePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState<TaxRule[]>(initialRules);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_national_insurance_rules");
        if (stored) {
            try {
                setRules(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse national insurance rules from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_national_insurance_rules", JSON.stringify(rules));
        }
    }, [rules, isLoaded]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxRule | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState<number | null>(null);

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

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">National Insurance Rule</span>
        </span>
    );

    return (
        <DashboardLayout title="National Insurance" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">National Insurance Categories</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative">
                            <p className="text-[14px] text-[#111827]">Tax Year</p>
                                <select
                                    className="h-[40px] appearance-none rounded-xl border border-[#344054] bg-white px-4 pr-10 mt-2 text-[14px] text-[#344054] outline-none transition overflow-hidden"
                                >
                                    <option>2025/2026</option>
                                    <option>2024/2025</option>
                                    <option>2023/2024</option>
                                    <option>2022/2023</option>
                                </select>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-[72%] -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[900px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">NI Category</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Description</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Lower Threshold($)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Upper Threshold($)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Employee rate (%)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Employer Rate(%)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827] rounded-r-lg text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {rules.map((rule) => (
                                            <tr key={rule.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.niCategory}</td>
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.description}</td>
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.lowerThreshold}</td>
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.upperThreshold}</td>
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.employeeRate}</td>
                                                <td className="px-4 md:py-6 py-3 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{rule.employerRate}</td>

                                                <td className="px-4 md:py-6 py-3 sm:px-6">
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

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                                <Image src={deleteIcon} alt="Delete" width={28} height={28} className="h-7 w-7 text-red-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete National Insurance Rule</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this national insurance rule? This action cannot be undone.</p>
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
