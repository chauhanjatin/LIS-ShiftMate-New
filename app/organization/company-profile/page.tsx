"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import appLogo from "@/assets/images/icons/company-profileicon.svg";

export default function CompanyProfilePage() {
  const [formData, setFormData] = useState({
    companyName: "HRMetheus Inc.",
    registrationNumber: "123456789",
    foundedDate: "02/25/2026",
    phoneNumber: "(406) 555-0120",
    emailAddress: "info@example.co",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    city: "London",
    postalCode: "E14 5AB",
    country: "United Kingdom",
    taxId: "GB123456789",
    companyUtr: "1234567890",
    payeReference: "123456789",
    accountsOfficeRef: "123PA4567890",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout title="Company Profile" subtitle="Home/ Organization/ Company Profile">
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white md:p-8 p-5 shadow-sm">

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-5 rounded-2xl bg-[#F8FAFC] border border-neutral-100 md:p-6 p-4 md:mb-10 mb-8">
            <Image
              src={appLogo}
              alt="App Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
            <div>
              <h1 className="md:text-[24px] text-[22px] font-bold text-neutral-900 mb-2">HRMetheus Inc.</h1>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EDFAF2] px-3 py-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4DB949" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-[12px] font-semibold text-[#4DB949]">Verified Company</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-12">
            <div>
              <div className="mb-8">
                <h2 className="text-[18px] font-bold text-neutral-900 mb-1">Basic Information</h2>
                <p className="text-[13px] text-neutral-500">Official company identity and registration details.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Founded Date</label>
                    <input
                      type="text"
                      name="foundedDate"
                      value={formData.foundedDate}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 mb-8">
                <h2 className="text-[18px] font-bold text-neutral-900 mb-1">Contact Information</h2>
                <p className="text-[13px] text-neutral-500">Business contact and location details.</p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h2 className="text-[18px] font-bold text-neutral-900 mb-1">Tax & Payroll Details</h2>
                <p className="text-[13px] text-neutral-500">Official tax and payroll references for financial compliance.</p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Tax ID</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Company UTR</label>
                    <input
                      type="text"
                      name="companyUtr"
                      value={formData.companyUtr}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">PAYE Reference</label>
                    <input
                      type="text"
                      name="payeReference"
                      value={formData.payeReference}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-900 mb-1.5">Accounts Office Reference</label>
                    <input
                      type="text"
                      name="accountsOfficeRef"
                      value={formData.accountsOfficeRef}
                      onChange={handleChange}
                      disabled
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[14px] text-neutral-500 outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-[#F0F6FF] border border-[#D1E4FF] p-4 md:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#257BFC] text-white mb-4">
                    <span className="text-[18px] font-bold">$</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-neutral-900 mb-2">PAYE & Accounts Office Reference</h3>
                  <p className="text-[11px] md:text-[13px] text-neutral-600 leading-relaxed mb-4">
                    Your PAYE reference is used for monthly reporting to HMRC. The Accounts Office reference is required when making payments to HMRC via BACS or Direct Debit.
                  </p>
                  <a href="#" className="text-[12px] md:text-[14px] font-semibold text-brand-500 hover:text-blue-700 flex items-center gap-1">
                    Learn more about HMRC references
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
