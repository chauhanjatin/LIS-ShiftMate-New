"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import Link from "next/link";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function PayrollSettingsPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        payrollFrequency: "Weekly (52 pay periods per year)",
        taxYear: "2025/2026",
        defaultWorkingHours: "",
        payrollStartDate: "",
        currency: "",
        payrollCutoffDate: "25",
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("shiftmate_payroll_settings");
        if (stored) {
            try {
                setFormData(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse payroll settings from local storage");
            }
        }
        setIsLoaded(true);
    }, []);

    const handleSave = () => {
        localStorage.setItem("shiftmate_payroll_settings", JSON.stringify(formData));
        setShowToast(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const breadcrumb = (
        <span className="text-[#98A2B3]">
            <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-[#111827]">Payroll Settings</span>
        </span>
    );

    return (
        <DashboardLayout title="Payroll Settings" subtitle={breadcrumb}>
            <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
                <div className="rounded-xl bg-white shadow-sm pb-10">
                    <div className="flex flex-wrap items-center justify-between md:p-6 p-4">
                        <h2 className="md:text-[20px] text-[18px] font-medium text-[#111827]">General Setting</h2>
                    </div>

                    <div className="mx-[6%]">
                        <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Payroll Frequency</label>
                                <CustomSelect 
                                    value={formData.payrollFrequency} 
                                    onChange={(val) => setFormData(prev => ({ ...prev, payrollFrequency: val }))} 
                                    options={[
                                        { label: "Weekly (52 pay periods per year)", value: "Weekly (52 pay periods per year)" },
                                        { label: "Monthly (12 pay periods per year)", value: "Monthly (12 pay periods per year)" }
                                    ]}
                                    className="md:!p-3 !p-2"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Payroll Start Date</label>
                                <input type="date" name="payrollStartDate" value={formData.payrollStartDate} onChange={handleInputChange} placeholder="MM/DD/YYYY" className="w-full rounded-xl border border-neutral-200 md:p-3 p-2 text-[12px] md:text-[16px] outline-none focus:border-[#257BFC] text-[#9CA3AF]" />
                            </div>
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Tax Year</label>
                                <CustomSelect 
                                    value={formData.taxYear} 
                                    onChange={(val) => setFormData(prev => ({ ...prev, taxYear: val }))} 
                                    options={[
                                        { label: "2025/2026", value: "2025/2026" },
                                        { label: "2024/2025", value: "2024/2025" }
                                    ]}
                                    className="md:!p-3 !p-2"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Currency</label>
                                <CustomSelect 
                                    value={formData.currency} 
                                    onChange={(val) => setFormData(prev => ({ ...prev, currency: val }))} 
                                    options={[
                                        { label: "GBP (£)", value: "GBP" },
                                        { label: "USD ($)", value: "USD" },
                                        { label: "EUR (€)", value: "EUR" }
                                    ]}
                                    placeholder="Select Currency Type"
                                    className="md:!p-3 !p-2"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Default Working Hours (per week)</label>
                                <input name="defaultWorkingHours" value={formData.defaultWorkingHours} onChange={handleInputChange} placeholder="Enter Working Hours" className="w-full rounded-xl border border-neutral-200 md:p-3 p-2 text-[12px] md:text-[16px] outline-none focus:border-[#257BFC] text-[#4B5563]" />
                            </div>
                            <div>
                                <label className="mb-2 block text-[14px] text-[#111827]">Payroll Cut-off Date (Day of Month)</label>
                                <input name="payrollCutoffDate" value={formData.payrollCutoffDate} onChange={handleInputChange} placeholder="25" className="w-full rounded-xl border border-neutral-200 md:p-3 p-2 text-[12px] md:text-[16px] outline-none focus:border-[#257BFC] text-[#4B5563]" />
                            </div>
                        </div>

                        <div className="md:mt-10 mt-8 flex items-center justify-end gap-4">
                            <button className="rounded-xl border border-neutral-200 md:px-8 px-4 py-2.5 text-[14px] md:text-[16px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
                                Reset
                            </button>
                            <button onClick={handleSave} className="rounded-xl bg-[#257BFC] px-8 py-2.5 text-[14px] md:text-[16px] font-semibold text-white hover:bg-blue-600 transition-colors cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                show={showToast}
                message="Settings Saved Successfully"
                onClose={() => setShowToast(false)}
            />
        </DashboardLayout>
    );
}