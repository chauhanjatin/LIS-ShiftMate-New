"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function MaternityPaternityPage() {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    employee: "",
    leaveType: "",
    expectedDate: "",
    leaveStartDate: "",
    leaveEndDate: "",
    notes: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.employee) newErrors.employee = "Please select an employee";
    if (!formData.leaveType) newErrors.leaveType = "Please select a leave type";
    if (!formData.expectedDate) newErrors.expectedDate = "Please select expected date";
    if (!formData.leaveStartDate) newErrors.leaveStartDate = "Please select start date";
    if (!formData.leaveEndDate) newErrors.leaveEndDate = "Please select end date";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowToast(true);
    }
  };

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Maternity - Paternity - Adoption Pay</span>
    </span>
  );

  return (
    <DashboardLayout title="Maternity / Paternity / Adoption Pay" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-2xl bg-white shadow-sm min-h-[800px] md:px-6 px-4 pt-4 md:pt-6">
          <h2 className="text-[20px] font-medium text-[#111827] mb-8">Maternity, Paternity and Adoption Pay</h2>
          
          <form onSubmit={handleSubmit} className="md:mx-[6%] space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Employee</label>
                <div className="relative mt-2">
                  <select 
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.employee ? 'border-red-500' : 'border-[#111827]'} bg-white px-4 py-3 md:text-[14px] text-[12px] font-medium text-neutral-900 outline-none focus:border-[#257BFC] transition-colors appearance-none`}
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
                {errors.employee && <p className="text-red-500 text-xs mt-1">{errors.employee}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Type of Statutory Pay</label>
                <div className="relative mt-2">
                  <select 
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.leaveType ? 'border-red-500' : 'border-[#111827]'} bg-white px-4 py-3 md:text-[14px] text-[12px] font-medium text-neutral-900 outline-none focus:border-[#257BFC] transition-colors appearance-none`}
                    required
                  >
                    <option value="" disabled hidden>Statutory Maternity Pay (SMP)</option>
                    <option value="Statutory Maternity Pay (SMP)">Statutory Maternity Pay (SMP)</option>
                    <option value="Statutory Paternity Pay (SPP)">Statutory Paternity Pay (SPP)</option>
                    <option value="Statutory Adoption Pay (SAP)">Statutory Adoption Pay (SAP)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                {errors.leaveType && <p className="text-red-500 text-xs mt-1">{errors.leaveType}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Expected Due Date / Placement Date</label>
                <div className="relative mt-2">
                  <input 
                    type="date"
                    name="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.expectedDate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 py-3 text-[14px] text-neutral-500 outline-none focus:border-[#257BFC] transition-colors appearance-none custom-date-input`}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                {errors.expectedDate && <p className="text-red-500 text-xs mt-1">{errors.expectedDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Start of Pay Period</label>
                <div className="relative mt-2">
                  <input 
                    type="date"
                    name="leaveStartDate"
                    value={formData.leaveStartDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.leaveStartDate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 py-3 text-[14px] text-neutral-500 outline-none focus:border-[#257BFC] transition-colors appearance-none custom-date-input`}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                {errors.leaveStartDate && <p className="text-red-500 text-xs mt-1">{errors.leaveStartDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">End of Pay Period</label>
                <div className="relative mt-2">
                  <input 
                    type="date"
                    name="leaveEndDate"
                    value={formData.leaveEndDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${errors.leaveEndDate ? 'border-red-500' : 'border-[#E2E8F0]'} bg-white px-4 py-3 text-[14px] text-neutral-500 outline-none focus:border-[#257BFC] transition-colors appearance-none custom-date-input`}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                {errors.leaveEndDate && <p className="text-red-500 text-xs mt-1">{errors.leaveEndDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-normal text-[#111827]">Weekly Entitlement</label>
                <div className="mt-2">
                  <input 
                    type="text"
                    name="entitlement"
                    placeholder="$172.48"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[14px] font-medium text-neutral-900 outline-none focus:border-[#257BFC] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-normal text-[#111827]">Supporting Details</label>
              <div className="mt-2">
                <input 
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="MATB1 form received, continuous employment verified..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[14px] text-neutral-900 outline-none focus:border-[#257BFC] transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-8 md:pt-16 pb-4 md:pb-0">
              <button 
                type="submit" 
                className="rounded-xl bg-[#E0EAFF] px-8 py-3 text-[14px] font-semibold text-[#257BFC] hover:bg-brand-500 hover:text-white transition-colors"
              >
                Save Record
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
