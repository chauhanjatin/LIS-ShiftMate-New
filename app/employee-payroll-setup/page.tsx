"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

interface EmployeePayroll {
    id: number;
    name: string;
    avatar: string;
    salary: string;
    taxCode: string;
    niCategory: string;
    studentLoanPlan: string;
    pensionStatus: "Auto-enrolled" | "Opted Out";
    payFrequency: string;
}

const initialPayrollSetup: EmployeePayroll[] = [
    { id: 1, name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=1", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Monthly" },
    { id: 2, name: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Weekly" },
    { id: 3, name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Opted Out", payFrequency: "Monthly" },
    { id: 4, name: "Courtney Henry", avatar: "https://i.pravatar.cc/150?u=4", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Weekly" },
    { id: 5, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=5", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Monthly" },
];

export default function EmployeePayrollSetupPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState<EmployeePayroll[]>(initialPayrollSetup);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_employee_payroll_setup");
        if (stored) {
            try {
                setEmployees(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse employee payroll setup from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_employee_payroll_setup", JSON.stringify(employees));
        }
    }, [employees, isLoaded]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeePayroll | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openEditModal = (employee: EmployeePayroll) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        if (employeeToDelete) {
            setEmployees(employees.filter(e => e.id !== employeeToDelete));
            setIsDeleteModalOpen(false);
            setEmployeeToDelete(null);
        }
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Employee Payroll Setup</span>
        </span>
    );

    return (
        <DashboardLayout title="Employee Payroll Setup" subtitle={breadcrumb}>
            <div className="flex-1 p-4 2xl:p-6">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
                        <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Employee Records</h2>

                        <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 md:w-60 w-48">
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
                        </div>
                    </div>

                    <div className="overflow-x-auto p-3 2xl:p-6">
                        <table className="min-w-[1100px] w-full text-left">
                            <thead className="bg-white">
                                <tr>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Name</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Salary</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Tax Code</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">NI Category</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Student Loan Plan</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Pension Status</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Pay Frequency</th>
                                    <th className="border-b border-[#D0D5DD] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                                        <td className="py-4 pl-4 pr-6">
                                            <div className="flex items-center gap-3">
                                                <img src={emp.avatar} alt={emp.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                                                <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.salary}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.taxCode}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.niCategory}</td>
                                        <td className="py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{emp.studentLoanPlan}</td>

                                        <td className="py-4 pr-6 text-center">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${emp.pensionStatus === "Auto-enrolled" ? "bg-[#EAF9EA] text-[#4DB949]" : "bg-[#FDEAEA] text-[#F04438]"
                                                }`}>
                                                {emp.pensionStatus}
                                            </span>
                                        </td>

                                        <td className="py-4 pr-6 text-center text-[13px] sm:text-[14px] font-medium text-neutral-900">
                                            {emp.payFrequency}
                                        </td>

                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => openEditModal(emp)} className="text-neutral-400 hover:text-[#257BFC] transition-colors cursor-pointer">
                                                    <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                </button>
                                                <button onClick={() => { setEmployeeToDelete(emp.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
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

            {/* Edit Employee Payroll Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-200 lg:px-8 px-6 lg:py-6 py-4">
                            <h2 className="text-[24px] font-bold text-[#1D2939]">
                                Edit Employee Payroll
                            </h2>

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="px-8 py-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Employee Name
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue={selectedEmployee?.name || ""}
                                        readOnly
                                        className="h-[52px] w-full rounded-2xl border border-[#D0D5DD] px-4 text-[14px] bg-neutral-50 outline-none text-[#667085]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Salary
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.salary || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="$58,000">$58,000</option>
                                            <option value="$60,000">$60,000</option>
                                            <option value="$65,000">$65,000</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Tax Code
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.taxCode || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="1257L">1257L</option>
                                            <option value="BR">BR</option>
                                            <option value="0T">0T</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        NI Category
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.niCategory || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Student Loan Plan
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.studentLoanPlan || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="Plan 1">Plan 1</option>
                                            <option value="Plan 2">Plan 2</option>
                                            <option value="Plan 4">Plan 4</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pension Status
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.pensionStatus || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="Auto-enrolled">Auto-enrolled</option>
                                            <option value="Opted Out">Opted Out</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Frequency
                                    </label>

                                    <div className="relative">
                                        <select
                                            defaultValue={selectedEmployee?.payFrequency || ""}
                                            className="h-[52px] w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-12 text-[14px] text-[#344054] outline-none transition focus:border-[#257BFC]"
                                        >
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Bi-Weekly">Bi-Weekly</option>
                                        </select>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-10 flex items-center justify-end gap-4">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="h-[48px] rounded-2xl border border-[#D0D5DD] px-8 text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => setIsEditModalOpen(false)} className="h-[48px] rounded-2xl bg-[#257BFC] px-8 text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Save Change
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
                            <h2 className="mb-2 text-xl font-bold text-neutral-900">Remove Employee</h2>
                            <p className="text-sm text-neutral-500">Are you sure you want to remove this employee from payroll? This action cannot be undone.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl cursor-pointer border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
