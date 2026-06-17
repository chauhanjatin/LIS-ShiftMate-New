"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';

export default function PensionSettingsPage() {
  const [formData, setFormData] = useState({
    schemeName: "NEST Pension Scheme",
    schemeProvider: "NEST",
    employerRef: "NEST12345678",
    regulatorNumber: "123456789",
    minAge: "22",
    stateAge: "66",
    postponement: "3",
    reenrolment: "3",
    empContribution: "5",
    employerContribution: "3",
    lowerThreshold: "6240",
    upperThreshold: "50270",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      schemeName: "",
      schemeProvider: "",
      employerRef: "",
      regulatorNumber: "",
      minAge: "",
      stateAge: "",
      postponement: "",
      reenrolment: "",
      empContribution: "",
      employerContribution: "",
      lowerThreshold: "",
      upperThreshold: "",
    });
  };

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension Settings</span>
    </span>
  );

  return (
    <DashboardLayout title="Pension" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl bg-white shadow-sm h-full flex flex-col p-6 2xl:p-8">
          <h2 className="text-[18px] md:text-[22px] font-bold text-neutral-900 mb-8 md:mb-10">Pension Settings</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-auto">
            
            <div className="space-y-10 xl:border-r xl:border-[#E4E7EC] xl:pr-8">
              
              <div>
                <h3 className="text-[16px] font-bold text-neutral-900 mb-1">Pension Scheme Details</h3>
                <p className="text-[13px] text-neutral-500 mb-6">Manage your organization's registered pension scheme information and compliance details.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Scheme Name</label>
                    <input
                      name="schemeName"
                      value={formData.schemeName}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Scheme Provider</label>
                    <input
                      name="schemeProvider"
                      value={formData.schemeProvider}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Employer Reference Number</label>
                    <input
                      name="employerRef"
                      value={formData.employerRef}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Pension Regulator Number</label>
                    <input
                      name="regulatorNumber"
                      value={formData.regulatorNumber}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-neutral-900 mb-1">Auto-Enrolment Settings</h3>
                <p className="text-[13px] text-neutral-500 mb-6">Configure automatic enrolment rules in line with pension regulations.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Minimum Age</label>
                    <input
                      name="minAge"
                      value={formData.minAge}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">State Pension Age</label>
                    <input
                      name="stateAge"
                      value={formData.stateAge}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Postponement Period (months)</label>
                    <input
                      name="postponement"
                      value={formData.postponement}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Re-enrolment Frequency (years)</label>
                    <input
                      name="reenrolment"
                      value={formData.reenrolment}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div>
              <div>
                <h3 className="text-[16px] font-bold text-neutral-900 mb-1">Contribution Rates</h3>
                <p className="text-[13px] text-neutral-500 mb-6">Define employee and employer contribution percentages and applicable earning thresholds.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Employee Contribution (%)</label>
                    <input
                      name="empContribution"
                      value={formData.empContribution}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Employer Contribution (%)</label>
                    <input
                      name="employerContribution"
                      value={formData.employerContribution}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Lower Earnings Threshold (Annual)</label>
                    <input
                      name="lowerThreshold"
                      value={formData.lowerThreshold}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-[#344054]">Upper Earnings Threshold (Annual)</label>
                    <input
                      name="upperThreshold"
                      value={formData.upperThreshold}
                      onChange={handleChange}
                      className="h-[48px] w-full rounded-xl border border-[#D0D5DD] px-4 text-[14px] outline-none transition focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="flex items-center justify-end gap-4 mt-12 pt-6">
            <button onClick={handleReset} className="rounded-xl border border-neutral-200 bg-white px-8 py-3 text-[14px] font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer">
              Reset
            </button>
            <button className="rounded-xl bg-[#257BFC] px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-blue-600 shadow-sm cursor-pointer">
              Save
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
