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

interface LoanPlan {
    id: number;
    planType: string;
    description: string;
    threshold: string;
    deduction: string;
}

const initialPlans: LoanPlan[] = [
    { id: 1, planType: "Plan 2", description: "Pre-2012 loans (England & Wales)", threshold: "$1048", deduction: "9%" },
    { id: 2, planType: "Plan 2", description: "Pre-2012 loans (England & Wales)", threshold: "$1048", deduction: "9%" },
    { id: 3, planType: "Plan 2", description: "Scottish students", threshold: "$1048", deduction: "9%" },
    { id: 4, planType: "Plan 2", description: "Deferred (can defer if earnings high)", threshold: "$1048", deduction: "9%" },
];

export default function StudentLoanRulesPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [plans, setPlans] = useState<LoanPlan[]>(initialPlans);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<LoanPlan | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_student_loan_rules");
        if (stored) {
            try {
                setPlans(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse student loan rules from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_student_loan_rules", JSON.stringify(plans));
        }
    }, [plans, isLoaded]);

    const openAddModal = () => {
        setSelectedPlan(null);
        setIsAddModalOpen(true);
    };

    const openEditModal = (plan: LoanPlan) => {
        setSelectedPlan(plan);
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        if (planToDelete) {
            setPlans(plans.filter(p => p.id !== planToDelete));
            setIsDeleteModalOpen(false);
            setPlanToDelete(null);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const planData = {
            planType: formData.get('planType') as string,
            description: formData.get('description') as string,
            threshold: formData.get('threshold') as string,
            deduction: formData.get('deduction') as string,
        };

        if (isEditModalOpen && selectedPlan) {
            setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...planData } : p));
            setShowToast(true);
        } else {
            const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
            setPlans([...plans, { id: newId, ...planData }]);
        }

        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Student Loan Rules</span>
        </span>
    );

    return (
        <DashboardLayout title="Student Loan Rules" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 pt-4 md:pt-6">
                        <h2 className="lg:text-[20px] md:text-[18px] text-[16px] font-medium text-[#111827]">Student Loan Plans</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <button onClick={openAddModal} className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Add Loan Plan
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[900px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827] rounded-l-lg">Plan Type</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Description</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Repayment Threshold($)</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827]">Deduction Percentage</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[13px] sm:text-[16px] font-normal text-[#111827] text-center rounded-r-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {plans.map((plan) => (
                                            <tr key={plan.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{plan.planType}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{plan.description}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{plan.threshold}</td>
                                                <td className="px-4 md:py-6 py-4 sm:px-6 text-[12px] sm:text-[14px] font-normal text-[#111827]">{plan.deduction}</td>

                                                <td className="px-4 md:py-6 py-4 sm:px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button onClick={() => openEditModal(plan)} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setPlanToDelete(plan.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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

            {/* Add / Edit Student Loan Rule Modal */}
            {(isAddModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] md:px-8 px-4 md:py-6 py-4">
                            <h2 className="md:text-[24px] text-[18px] font-bold text-[#1D2939]">
                                {isAddModalOpen ? 'Create Student Loan Rule' : 'Edit Student Loan Rule'}
                            </h2>

                            <button
                                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="md:px-8 px-6 md:py-6 py-4">

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Plan type
                                    </label>
                                    <input
                                        name="planType"
                                        type="text"
                                        placeholder="Enter Plan Type"
                                        defaultValue={selectedPlan?.planType || ""}
                                        className="md:h-[52px] h-[40px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Description
                                    </label>
                                    <input
                                        name="description"
                                        type="text"
                                        placeholder="Enter Description"
                                        defaultValue={selectedPlan?.description || ""}
                                        className="md:h-[52px] h-[40px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Repayment Threshold($)
                                    </label>
                                    <input
                                        name="threshold"
                                        type="text"
                                        placeholder="Enter Repayment Threshold($)"
                                        defaultValue={selectedPlan?.threshold || ""}
                                        className="md:h-[52px] h-[40px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Deduction Percentage
                                    </label>
                                    <input
                                        name="deduction"
                                        type="text"
                                        placeholder="Enter Deduction Percentage"
                                        defaultValue={selectedPlan?.deduction || ""}
                                        className="md:h-[52px] h-[40px] w-full rounded-2xl border border-[#E2E8F0] px-4 text-[14px] outline-none transition focus:border-[#257BFC]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-end md:gap-4 gap-3">
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className="md:h-[48px] h-[40px] rounded-2xl border border-[#E2E8F0] md:px-8 px-5 md:text-[15px] text-[14px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="md:h-[48px] h-[40px] rounded-2xl bg-[#257BFC] md:px-8 px-5 md:text-[15px] text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                                >
                                    {isAddModalOpen ? 'Add Plan' : 'Save Change'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                                <Image src={deleteIcon} alt="Delete" width={28} height={28} className="h-7 w-7 text-red-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Loan Plan</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to delete this loan plan? This action cannot be undone.</p>
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
                message="Student Loan Rule Updated Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
