"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import CustomSelect from '@/Component/UI/CustomSelect';
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function SSPManagementPage() {
  const [showToast, setShowToast] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [formData, setFormData] = useState({
    employee: "",
    startDate: "",
    endDate: "",
    waitingDays: "3",
    sspRate: "$116.75",
    eligibility: {
      earnings: true,
      notification: true,
      offWork: true
    },
    qualifyingDays: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
      sun: false
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.employee) newErrors.employee = "Please select an employee";
    if (!formData.startDate) newErrors.startDate = "Please select a start date";
    if (!formData.endDate) newErrors.endDate = "Please select an end date";
    if (!formData.waitingDays) newErrors.waitingDays = "Please enter waiting days";
    if (!formData.sspRate) newErrors.sspRate = "Please enter SSP rate";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleEligibilityChange = (key: keyof typeof formData.eligibility) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [key]: !prev.eligibility[key]
      }
    }));
  };

  const handleDayChange = (key: keyof typeof formData.qualifyingDays) => {
    setFormData(prev => ({
      ...prev,
      qualifyingDays: {
        ...prev.qualifyingDays,
        [key]: !prev.qualifyingDays[key]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowToast(true);
    }
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">SSP Management</span>
    </span>
  );

  const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div className={`flex md:h-5 md:w-5 h-4 w-4 items-center justify-center rounded-[4px] border transition-colors ${checked ? 'border-[#257BFC] bg-[#257BFC]' : 'border-neutral-300 bg-white group-hover:border-[#257BFC]'}`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <span className="md:text-[14px] text-[12px] font-normal text-[#111827]">{label}</span>
    </label>
  );

  return (
    <DashboardLayout title="SSP Management" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-2xl bg-white shadow-sm min-h-[800px] md:px-6 px-4 md:pt-6 pt-4">
          <h2 className="text-[20px] font-medium text-[#111827] md:mb-8 mb-6">SSP Management</h2>
          
          <form onSubmit={handleSubmit} className="md:mx-[6%] space-y-8">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Employee</label>
                <div className="relative mt-2">
                  <CustomSelect
                    value={formData.employee}
                    onChange={(val) => {
                      setFormData(prev => ({ ...prev, employee: val }));
                      setErrors(prev => ({ ...prev, employee: "" }));
                    }}
                    options={[
                      { label: "Devon Lane", value: "Devon Lane" },
                      { label: "Cameron Williamson", value: "Cameron Williamson" },
                      { label: "Jane Cooper", value: "Jane Cooper" },
                      { label: "Courtney Henry", value: "Courtney Henry" },
                    ]}
                    placeholder="Cameron Williamson"
                    error={!!errors.employee}
                    className="md:!py-3 !py-2"
                  />
                </div>
                {errors.employee && <p className="text-red-500 text-xs mt-1">{errors.employee}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[14px] font-medium text-[#111827]">Sickness Period</label>
                  <div className="relative mt-2">
                    <input 
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.startDate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 md:py-3 py-2 text-[14px] text-neutral-500 outline-none focus:border-[#257BFC] transition-colors custom-date-input`}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                  {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-medium text-[#111827]">To</label>
                  <div className="relative mt-2">
                    <input 
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.endDate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 md:py-3 py-2 text-[14px] text-neutral-500 outline-none focus:border-[#257BFC] transition-colors appearance-none custom-date-input`}
                    />
                    
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                  {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-medium text-[#111827]">Waiting Days (first 3)</label>
                  <input 
                    type="text"
                    name="waitingDays"
                    value={formData.waitingDays}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.waitingDays ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 md:py-3 py-2 text-[14px] font-medium text-neutral-900 outline-none focus:border-[#257BFC] transition-colors mt-2`}
                  />
                  {errors.waitingDays && <p className="text-red-500 text-xs mt-1">{errors.waitingDays}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-medium text-[#111827]">Weekly SSP Rate</label>
                  <input 
                    type="text"
                    name="sspRate"
                    value={formData.sspRate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.sspRate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 md:py-3 py-2 text-[14px] font-medium text-neutral-900 outline-none focus:border-[#257BFC] transition-colors mt-2`}
                  />
                  {errors.sspRate && <p className="text-red-500 text-xs mt-1">{errors.sspRate}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#F9FAFB] md:p-6 p-4">
                <h3 className="text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-4">Eligibility Check</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-y-5 gap-y-3 md:gap-x-4 gap-x-2">
                  <CustomCheckbox 
                    checked={formData.eligibility.earnings} 
                    onChange={() => handleEligibilityChange('earnings')} 
                    label="Meets earnings criteria" 
                  />
                  <CustomCheckbox 
                    checked={formData.eligibility.offWork} 
                    onChange={() => handleEligibilityChange('offWork')} 
                    label="Off work >3 days" 
                  />
                  <CustomCheckbox 
                    checked={formData.eligibility.notification} 
                    onChange={() => handleEligibilityChange('notification')} 
                    label="Proper notification given" 
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-[#F9FAFB] md:p-6 p-4">
                <h3 className="text-[20px] font-medium text-[#111827] mb-6 border-b border-[#D0D5DD] pb-4">Qualifying Days</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:gap-y-5 gap-y-3 md:gap-x-4 gap-x-2">
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.mon} 
                    onChange={() => handleDayChange('mon')} 
                    label="Mon" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.tue} 
                    onChange={() => handleDayChange('tue')} 
                    label="Tue" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.wed} 
                    onChange={() => handleDayChange('wed')} 
                    label="Wed" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.thu} 
                    onChange={() => handleDayChange('thu')} 
                    label="Thu" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.fri} 
                    onChange={() => handleDayChange('fri')} 
                    label="Fri" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.sat} 
                    onChange={() => handleDayChange('sat')} 
                    label="Sat" 
                  />
                  <CustomCheckbox 
                    checked={formData.qualifyingDays.sun} 
                    onChange={() => handleDayChange('sun')} 
                    label="Sun" 
                  />
                </div>
              </div>
            </div>

            {isCalculated && (
              <div className="rounded-2xl bg-[#F0F6FF] border border-[#257BFC] border-opacity-30 p-6 shadow-sm">
                <h3 className="text-[16px] font-bold text-neutral-900 mb-4 border-b border-[#257BFC] border-opacity-10 pb-4">SSP Calculation</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-neutral-700">Total sick days</span>
                    <span className="font-bold text-neutral-900">04</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-neutral-700">Waiting days (non-paid)</span>
                    <span className="font-bold text-neutral-900">03</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-neutral-700">Paid days</span>
                    <span className="font-bold text-neutral-900">10</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end items-center gap-4 pt-10 pb-5">
              <button 
                type="button" 
                onClick={handleSubmit}
                className="rounded-xl border border-[#111827] bg-white md:px-8 px-4 md:py-3 py-2 md:text-[14px] text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
              >
                Save Record
              </button>
              <button 
                type="button" 
                onClick={handleCalculate}
                className={`rounded-xl md:px-8 px-4 md:py-3 py-2 md:text-[14px] text-[12px] font-bold transition-colors shadow-sm ${isCalculated ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-[#E0EAFF] text-[#257BFC]'}`}
              >
                Calculate SSP
              </button>
            </div>

          </form>
        </div>
      </div>
      
      <Toast
        show={showToast}
        message="Record Saved Successfully"
        onClose={() => setShowToast(false)}
      />

      {/* Hide default calendar picker icon across all browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-date-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          cursor: pointer;
        }
      `}} />
    </DashboardLayout>
  );
}
