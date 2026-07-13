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
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

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
    { id: 6, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=6", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Monthly" },
    { id: 7, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=7", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Monthly" },
    { id: 8, name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=8", salary: "$58,000", taxCode: "1257L", niCategory: "A", studentLoanPlan: "Plan 2", pensionStatus: "Auto-enrolled", payFrequency: "Monthly" },
];

export default function EmployeePayrollSetupPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [employees, setEmployees] = useState<EmployeePayroll[]>(initialPayrollSetup);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_employee_payroll_setup");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.length >= initialPayrollSetup.length) {
                    setEmployees(parsed);
                } else {
                    setEmployees(initialPayrollSetup);
                }
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
    const [showToast, setShowToast] = useState(false);

    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
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
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Employee Payroll Setup</span>
        </span>
    );

    return (
        <DashboardLayout title="Employee Payroll Setup" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Employee Records</h2>

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
                                    className="w-full rounded-xl border border-[#E2E8F0] bg-white py-1.5 md:py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#257BFC] overflow-hidden"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1100px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Name</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Salary</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Tax Code</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">NI Category</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Student Loan Plan</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">Pension Status</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">Pay Frequency</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827] text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E2E8F0] bg-white">
                                        {paginatedEmployees.map((emp) => (
                                            <tr key={emp.id} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <img src={emp.avatar} alt={emp.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                                                        <span className="text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.salary}</td>
                                                <td className="px-4 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.taxCode}</td>
                                                <td className="px-4 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.niCategory}</td>
                                                <td className="px-4 py-4 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{emp.studentLoanPlan}</td>

                                                <td className="px-4 py-4 sm:px-6 text-center">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-normal ${emp.pensionStatus === "Auto-enrolled" ? "bg-[#EAF9EA] text-[#4DB949]" : "bg-[#FDEAEA] text-[#F04438]"
                                                        }`}>
                                                        {emp.pensionStatus}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 sm:px-6 text-center text-[13px] sm:text-[14px] font-normal text-[#2E334E]">
                                                    {emp.payFrequency}
                                                </td>

                                                <td className="px-4 py-4 sm:px-6">
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
                            
                            {/* Pagination */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] sm:text-[14px] text-neutral-500">
                                        Rows per page:
                                    </span>
                                    <div className="w-[80px]">
                                        <CustomSelect 
                                            value={String(itemsPerPage)}
                                            onChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}
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
                                    {filteredEmployees.length > 0 ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}` : '0-0 of 0'}
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
            </div>

            {/* Edit Employee Payroll Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] lg:px-8 md:px-6 px-4 lg:py-6 py-4">
                            <h2 className="md:text-[24px] text-[18px] font-bold text-[#1D2939]">
                                Edit Employee Payroll
                            </h2>

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-neutral-500 transition hover:text-black cursor-pointer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="md:px-8 px-4 md:py-6 py-4">
                            <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Employee Name
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue={selectedEmployee?.name || ""}
                                        readOnly
                                        className="md:h-[52px] h-[40px] w-full rounded-xl border border-[#E2E8F0] px-4 text-[14px] bg-neutral-50 outline-none text-[#667085]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Salary
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.salary || "$58,000"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, salary: val })}
                                            options={[
                                                { label: "$58,000", value: "$58,000" },
                                                { label: "$60,000", value: "$60,000" },
                                                { label: "$65,000", value: "$65,000" }
                                            ]}
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Tax Code
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.taxCode || "1257L"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, taxCode: val })}
                                            options={[
                                                { label: "1257L", value: "1257L" },
                                                { label: "BR", value: "BR" },
                                                { label: "0T", value: "0T" }
                                            ]}
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        NI Category
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.niCategory || "A"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, niCategory: val })}
                                            options={[
                                                { label: "A", value: "A" },
                                                { label: "B", value: "B" },
                                                { label: "C", value: "C" }
                                            ]}
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Student Loan Plan
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.studentLoanPlan || "Plan 1"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, studentLoanPlan: val })}
                                            options={[
                                                { label: "Plan 1", value: "Plan 1" },
                                                { label: "Plan 2", value: "Plan 2" },
                                                { label: "Plan 4", value: "Plan 4" },
                                                { label: "Postgraduate", value: "Postgraduate" }
                                            ]}
                                            menuPlacement="top"
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pension Status
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.pensionStatus || "Auto-enrolled"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, pensionStatus: val as any })}
                                            options={[
                                                { label: "Auto-enrolled", value: "Auto-enrolled" },
                                                { label: "Opted Out", value: "Opted Out" }
                                            ]}
                                            menuPlacement="top"
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[14px] font-medium text-[#344054]">
                                        Pay Frequency
                                    </label>

                                    <div className="relative mt-2">
                                        <CustomSelect
                                            value={selectedEmployee?.payFrequency || "Weekly"}
                                            onChange={(val) => selectedEmployee && setSelectedEmployee({ ...selectedEmployee, payFrequency: val })}
                                            options={[
                                                { label: "Weekly", value: "Weekly" },
                                                { label: "Monthly", value: "Monthly" },
                                                { label: "Bi-Weekly", value: "Bi-Weekly" }
                                            ]}
                                            menuPlacement="top"
                                            className="md:!h-[52px] !h-[40px] md:!py-3 !py-2"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="md:mt-10 mt-8 flex items-center justify-end gap-3 md:gap-4">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="md:h-[48px] h-[40px] rounded-xl border border-[#E2E8F0] md:px-8 px-4 text-[13px] md:text-[15px] font-semibold text-[#101828] transition hover:bg-neutral-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => {
                                    if (selectedEmployee) {
                                        setEmployees(prev => prev.map(e => e.id === selectedEmployee.id ? selectedEmployee : e));
                                    }
                                    setIsEditModalOpen(false);
                                    setShowToast(true);
                                }} className="md:h-[48px] h-[40px] rounded-xl bg-[#257BFC] md:px-8 px-4 text-[13px] md:text-[15px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer">
                                    Save Change
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
                                <Image src={deleteIcon} alt="Delete" className="text-red-600" />
                            </div>
                            <p className="text-[16px] text-[#111827] font-medium">Are you sure you want to permanently remove this employee from payroll?</p>
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
                message="Employee Payroll Updated Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}
