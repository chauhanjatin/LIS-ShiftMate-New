"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface Calendar {
    id: number;
    payPeriod: string;
    startDate: string;
    endDate: string;
    payDate: string;
    status: "Active" | "Completed";
}

const initialCalendars: Calendar[] = [
    { id: 1, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Active" },
    { id: 2, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Completed" },
    { id: 3, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Active" },
    { id: 4, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Completed" },
    { id: 5, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Active" },
    { id: 6, payPeriod: "January 2026", startDate: "2026-01-01", endDate: "2026-01-31", payDate: "2026-01-31", status: "Completed" },
];

export default function PayrollCalendarPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [calendars, setCalendars] = useState<Calendar[]>(initialCalendars);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_payroll_calendars");
        if (stored) {
            try {
                setCalendars(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse calendars from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("shiftmate_payroll_calendars", JSON.stringify(calendars));
        }
    }, [calendars, isLoaded]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [currentCalendar, setCurrentCalendar] = useState<Calendar | null>(null);
    const [calendarToDelete, setCalendarToDelete] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        payPeriod: "",
        startDate: "",
        endDate: "",
        payDate: "",
        status: "Active" as "Active" | "Completed",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showToast, setShowToast] = useState(false);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.payPeriod) newErrors.payPeriod = "Required";
        if (!formData.startDate) newErrors.startDate = "Required";
        if (!formData.endDate) newErrors.endDate = "Required";
        if (!formData.payDate) newErrors.payDate = "Required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const filteredCalendars = calendars.filter(cal =>
        cal.payPeriod.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setFormData({ payPeriod: "", startDate: "", endDate: "", payDate: "", status: "Active" });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const openEditModal = (cal: Calendar) => {
        setCurrentCalendar(cal);
        setFormData({
            payPeriod: cal.payPeriod,
            startDate: cal.startDate,
            endDate: cal.endDate,
            payDate: cal.payDate,
            status: cal.status
        });
        setErrors({});
        setIsEditModalOpen(true);
    };

    const handleAdd = () => {
        if (!validateForm()) return;
        const newCal: Calendar = {
            id: Date.now(),
            ...formData
        };
        setCalendars([newCal, ...calendars]);
        setIsAddModalOpen(false);
        setShowToast(true);
    };

    const handleEdit = () => {
        if (!validateForm()) return;
        if (currentCalendar) {
            setCalendars(calendars.map(c => c.id === currentCalendar.id ? { ...c, ...formData } : c));
        }
        setIsEditModalOpen(false);
        setShowToast(true);
    };

    const handleDelete = () => {
        if (calendarToDelete) {
            setCalendars(calendars.filter(c => c.id !== calendarToDelete));
            setIsDeleteModalOpen(false);
            setCalendarToDelete(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const StatusPill = ({ status }: { status: "Active" | "Completed" }) => {
        if (status === "Active") {
            return <span className="inline-flex rounded-full bg-[#ECFDF3] px-3 py-1 text-[12px] font-semibold text-[#027A48]">Active</span>;
        }
        return <span className="inline-flex rounded-full bg-[#EFF8FF] px-3 py-1 text-[12px] font-semibold text-[#175CD3]">Completed</span>;
    };

    const breadcrumb = (
        <span className={`${lexendDeca.className} text-[#98A2B3]`}>
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-neutral-900">Payroll Calendar</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Calendar" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between px-4 md:px-6 md:pt-6 pt-4">
                        <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Pay Periods</h2>

                        <div className="flex items-center gap-4.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
                            <div className="relative 2xl:w-75 md:w-60 w-36">
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

                            <button onClick={openAddModal} className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] px-2 py-1 md:px-5 md:py-2.5 text-[10px] md:text-[14px] font-semibold text-white transition hover:bg-blue-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Generate Calendar
                            </button>
                        </div>
                    </div>

                    <div className="p-3 2xl:p-6">
                        <div className="rounded-2xl border border-[#D0D5DD] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1000px] w-full text-left border-collapse">
                                    <thead className="bg-[#F8F9FC]">
                                        <tr>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Pay Period</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Start Date</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">End Date</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Pay Date</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Status</th>
                                            <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-normal text-[#111827]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {filteredCalendars.map((cal) => (
                                            <tr key={cal.id} className="group transition-colors hover:bg-neutral-50">
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{cal.payPeriod}</td>
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{cal.startDate}</td>
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{cal.endDate}</td>
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6 text-[13px] sm:text-[14px] font-normal text-neutral-900">{cal.payDate}</td>
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6"><StatusPill status={cal.status} /></td>
                                                <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-3 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => openEditModal(cal)} className="text-neutral-400 hover:text-[#257BFC] cursor-pointer transition-colors">
                                                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" />
                                                        </button>
                                                        <button onClick={() => { setCalendarToDelete(cal.id); setIsDeleteModalOpen(true); }} className="text-neutral-400 hover:text-red-500 cursor-pointer transition-colors">
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

            {
                (isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-[700px] rounded-[24px] bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between border-b border-[#E2E8F0] p-4 md:px-8 md:py-6">
                                <h2 className="md:text-[22px] text-[18px] font-bold text-[#111827]">
                                    {isEditModalOpen ? "Edit Calendar" : "Generate New Calendar"}
                                </h2>
                                <button onClick={() => isEditModalOpen ? setIsEditModalOpen(false) : setIsAddModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            <div className="p-4 md:p-8">
                                <div className="md:mb-8 mb-5">
                                    <h3 className="md:text-[18px] text-[16px] font-semibold text-[#111827]">Basic Information</h3>
                                    <p className="md:text-[14px] text-[12px] text-neutral-500 mt-1">Create a new earnings or deduction component to include in employee payroll calculations.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#111827]">Pay period</label>
                                        <input name="payPeriod" value={formData.payPeriod} onChange={handleInputChange} placeholder="e.g., Basic Salary, Overtime, Bonus" className={`w-full rounded-xl border ${errors.payPeriod ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-3 p-2 text-[13px] md:text-[14px] outline-none focus:border-[#257BFC] text-[#4B5563]`} />
                                        {errors.payPeriod && <p className="text-red-500 text-xs mt-1">{errors.payPeriod}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#111827]">Start Date</label>
                                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className={`w-full rounded-xl border ${errors.startDate ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-3 p-2 text-[13px] md:text-[14px] outline-none focus:border-[#257BFC] text-[#9CA3AF]`} />
                                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#111827]">End Date</label>
                                        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className={`w-full rounded-xl border ${errors.endDate ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-3 p-2 text-[13px] md:text-[14px] outline-none focus:border-[#257BFC] text-[#9CA3AF]`} />
                                        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#111827]">Pay Date</label>
                                        <input type="date" name="payDate" value={formData.payDate} onChange={handleInputChange} className={`w-full rounded-xl border ${errors.payDate ? 'border-red-500' : 'border-[#E2E8F0]'} md:p-3 p-2 text-[13px] md:text-[14px] outline-none focus:border-[#257BFC] text-[#9CA3AF]`} />
                                        {errors.payDate && <p className="text-red-500 text-xs mt-1">{errors.payDate}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#111827]">Status</label>
                                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full rounded-xl border border-[#E2E8F0] md:p-3 p-2 text-[13px] md:text-[14px] outline-none focus:border-[#257BFC] bg-white text-[#9CA3AF] overflow-hidden">
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-end gap-3">
                                    <button onClick={() => isEditModalOpen ? setIsEditModalOpen(false) : setIsAddModalOpen(false)} className="rounded-xl cursor-pointer border border-[#E2E8F0] md:px-8 px-4 py-2 text-[13px] md:text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">Cancel</button>
                                    <button onClick={isEditModalOpen ? handleEdit : handleAdd} className="rounded-xl cursor-pointer bg-[#257BFC] md:px-8 px-4 py-2 text-[13px] md:text-[14px] font-semibold text-white hover:bg-blue-600 transition-colors">
                                        {isEditModalOpen ? "Save Change" : "Generate Calendar"}
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
                                <h2 className="mb-2 text-xl font-bold text-neutral-900">Delete Calendar</h2>
                                <p className="text-sm text-neutral-500">Are you sure you want to delete this calendar? This action cannot be undone.</p>
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
                message={isEditModalOpen ? "Calendar Updated Successfully" : "Calendar Generated Successfully"}
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout >
    );
}
