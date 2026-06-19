"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
    setShowToast(true);
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">SSP Management</span>
    </span>
  );

  const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors ${checked ? 'border-brand-500 bg-brand-500' : 'border-neutral-300 bg-white group-hover:border-brand-500'}`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <span className="text-[13px] font-medium text-neutral-700">{label}</span>
    </label>
  );

  return (
    <DashboardLayout title="SSP Management" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm min-h-[800px]">
          <h2 className="text-[18px] font-bold text-neutral-900 mb-8">SSP Management</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-neutral-700">Employee</label>
                <div className="relative">
                  <select 
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[14px] font-medium text-neutral-900 outline-none focus:border-brand-500 transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled hidden>Cameron Williamson</option>
                    <option value="Devon Lane">Devon Lane</option>
                    <option value="Cameron Williamson">Cameron Williamson</option>
                    <option value="Jane Cooper">Jane Cooper</option>
                    <option value="Courtney Henry">Courtney Henry</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-neutral-700">Sickness Period</label>
                  <div className="relative">
                    <input 
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[14px] text-neutral-500 outline-none focus:border-brand-500 transition-colors appearance-none custom-date-input"
                    />
                    {!formData.startDate && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 bg-white text-[14px] text-neutral-400">
                        MM/DD/YYYY
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-neutral-700">To</label>
                  <div className="relative">
                    <input 
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[14px] text-neutral-500 outline-none focus:border-brand-500 transition-colors appearance-none custom-date-input"
                    />
                    {!formData.endDate && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 bg-white text-[14px] text-neutral-400">
                        MM/DD/YYYY
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-neutral-700">Waiting Days (first 3)</label>
                  <input 
                    type="text"
                    name="waitingDays"
                    value={formData.waitingDays}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[14px] font-medium text-neutral-900 outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-neutral-700">Weekly SSP Rate</label>
                  <input 
                    type="text"
                    name="sspRate"
                    value={formData.sspRate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[14px] font-medium text-neutral-900 outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Eligibility Check */}
              <div className="rounded-2xl bg-[#F8FAFC] p-6 border border-neutral-100">
                <h3 className="text-[16px] font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Eligibility Check</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
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

              {/* Qualifying Days */}
              <div className="rounded-2xl bg-[#F8FAFC] p-6 border border-neutral-100">
                <h3 className="text-[16px] font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Qualifying Days</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4">
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

            <div className="flex justify-end items-center gap-4 pt-10">
              <button 
                type="button" 
                onClick={handleSubmit}
                className="rounded-xl border border-neutral-300 bg-white px-8 py-3 text-[14px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
              >
                Save Record
              </button>
              <button 
                type="button" 
                onClick={handleCalculate}
                className={`rounded-xl px-8 py-3 text-[14px] font-bold transition-colors shadow-sm ${isCalculated ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-[#E0EAFF] text-[#257BFC]'}`}
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
