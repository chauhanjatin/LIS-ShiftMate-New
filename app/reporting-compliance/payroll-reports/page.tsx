"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import CustomSelect from "@/Component/UI/CustomSelect";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import startBreakIcon from "@/assets/images/icons/start-break.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function PayrollReportsPage() {
  const [activeTab, setActiveTab] = useState("Payroll Summary");

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Payroll Reports</span>
    </span>
  );

  const mockData = [
    { id: 1, employee: "Jenny Wilson", avatar: "https://i.pravatar.cc/150?u=1", dept: "Engineering", basic: "$5,833", bonus: "$500", ded: "$1,240", net: "$5,093", status: "Processed" },
    { id: 2, employee: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", dept: "Marketing", basic: "$3,500", bonus: "$500", ded: "$840", net: "$3,630", status: "Pending" },
    { id: 3, employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", dept: "Finance", basic: "$4,167", bonus: "$500", ded: "$1,240", net: "$3,630", status: "Processed" },
    { id: 4, employee: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=4", dept: "Engineering", basic: "$6,250", bonus: "$200", ded: "$1,240", net: "$5,093", status: "Pending" },
    { id: 5, employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=5", dept: "Marketing", basic: "$3,750", bonus: "$600", ded: "$840", net: "$3,630", status: "Processed" },
    { id: 6, employee: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=6", dept: "Marketing", basic: "$3,833", bonus: "$300", ded: "$1,240", net: "$5,093", status: "Processed" },
    { id: 7, employee: "Kristin Watson", avatar: "https://i.pravatar.cc/150?u=7", dept: "Engineering", basic: "$5,833", bonus: "$200", ded: "$840", net: "$3,630", status: "Processed" },
    { id: 8, employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=8", dept: "Marketing", basic: "$3,750", bonus: "$350", ded: "$1,240", net: "$5,093", status: "Processed" },
  ];

  return (
    <DashboardLayout title="Reporting Compliance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div className="w-[120px]">
              <label className="mb-2 block text-[15px] 2xl:text-[20px] font-medium text-[#111827]">Filters</label>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="mb-2 block text-[13px] 2xl:text-[14px] text-[#111827]">Employee</label>
                <CustomSelect
                  options={[
                    { label: "All Employee", value: "all" },
                    { label: "Jenny Wilson", value: "jenny" },
                  ]}
                  value="all"
                  onChange={() => {}}
                  placeholder="All Employee"
                />
              </div>
              <div>
                <label className="mb-2 block text-[13px] 2xl:text-[14px] text-[#111827]">Department</label>
                <CustomSelect
                  options={[
                    { label: "All", value: "all" },
                    { label: "Engineering", value: "engineering" },
                    { label: "Marketing", value: "marketing" },
                  ]}
                  value="all"
                  onChange={() => {}}
                  placeholder="All"
                />
              </div>
              <div>
                <label className="mb-2 block text-[13px] 2xl:text-[14px] text-[#111827]">From</label>
                <div className="relative">
                  <input type="text" value="1 May 2026" readOnly className="w-full rounded-xl border border-[#D0D5DD] px-4 py-[11px] text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 pr-10" />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[13px] 2xl:text-[14px] text-[#111827]">To</label>
                <div className="relative">
                  <input type="text" value="31 May 2026" readOnly className="w-full rounded-xl border border-[#D0D5DD] px-4 py-[11px] text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 pr-10" />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
            </div>
            <div>
              <button className="h-[44px] rounded-xl bg-[#257BFC] px-6 text-[14px] 2xl:text-[16px] text-white transition hover:bg-blue-600 flex items-center justify-center gap-2">
                <Image src={startBreakIcon} alt="Export" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mb-4">
            <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">Payroll Summary</h3>
            <div className="flex items-center gap-2 rounded-xl p-1 border border-[#E4E7EC]">
              {["Payroll Summary", "PAYE", "NI Contributions", "Pension"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[13px] 2xl:text-[14px] transition-colors cursor-pointer ${activeTab === tab ? "bg-[#111827] text-white" : "text-[#475467] hover:text-[#111827]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-xl border border-[#D0D5DD]">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-8 border-b border-[#D0D5DD] bg-[#F9FAFB] px-6 py-2.5">
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Employee</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Department</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Basic Salary</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Bonus</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Deductions</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Net Pay</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Status</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Action</div>
              </div>

              <div className="divide-y divide-[#D0D5DD]">
                {mockData.map((item) => (
                  <div key={item.id} className="grid grid-cols-8 items-center px-6 py-6.5 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200">
                        {item.id === 6 ? (
                          <div className="h-full w-full bg-[#F2F4F7] flex items-center justify-center text-[#475467]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          </div>
                        ) : (
                          <img src={item.avatar} alt={item.employee} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <span className="text-[14px] text-[#111827]">{item.employee}</span>
                    </div>
                    <div className="text-[14px] text-[#111827]">{item.dept}</div>
                    <div className="text-[14px] text-[#111827]">{item.basic}</div>
                    <div className="text-[14px] text-[#111827]">{item.bonus}</div>
                    <div className="text-[14px] text-[#111827]">{item.ded}</div>
                    <div className="text-[14px] text-[#111827]">{item.net}</div>
                    <div>
                      {item.status === "Processed" ? (
                        <span className="inline-flex rounded-full bg-[#EAF9EA] px-3.5 py-2.5 text-[12px] 2xl:text-[14px] font-medium text-[#4DB949]">Processed</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-[#FFF6E8] px-3.5 py-2.5 text-[12px] 2xl:text-[14px] font-medium text-[#FFA100]">Pending</span>
                      )}
                    </div>
                    <div className="flex">
                      <button className="text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer">
                        <Image src={eyeIcon} alt="View" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="grid grid-cols-8 items-center px-6 py-4 bg-[#F9FAFB]">
                  <div className="col-span-2 text-[14px] font-bold text-[#111827]">Totals (8 Employees)</div>
                  <div className="text-[14px] font-bold text-[#111827]">$45,500</div>
                  <div className="text-[14px] font-bold text-[#111827]">$3,500</div>
                  <div className="text-[14px] font-bold text-[#EF4444]">$10,620</div>
                  <div className="text-[14px] font-bold text-[#4DB949]">$38,330</div>
                  <div className="col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
