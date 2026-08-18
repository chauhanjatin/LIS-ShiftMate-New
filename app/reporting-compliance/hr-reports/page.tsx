"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import CustomSelect from "@/Component/UI/CustomSelect";
import startBreakIcon from "@/assets/images/icons/start-break.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function HRReportsPage() {
  const [activeTab, setActiveTab] = useState("Headcount");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-31");

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">HR Reports</span>
    </span>
  );

  const mockData = [
    { id: 1, dept: "Engineering", headcount: 45, prev: 42, change: "+3" },
    { id: 2, dept: "Marketing", headcount: 32, prev: 35, change: "-3" },
    { id: 3, dept: "Finance", headcount: 18, prev: 16, change: "+2" },
    { id: 4, dept: "Sales", headcount: 8, prev: 8, change: "0" },
    { id: 5, dept: "HR", headcount: 11, prev: 10, change: "+1" },
  ];

  return (
    <DashboardLayout title="Reporting Compliance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 xl:p-6 ${lexendDeca.className}`}>
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex flex-col xl:flex-row flex-wrap xl:items-end gap-4 mb-8">
            <div className="w-[120px]">
              <label className="mb-2 block text-[15px] 2xl:text-[20px] font-medium text-[#111827]">Filters</label>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="mb-2 block text-[14px] text-[#111827]">Employee</label>
                <CustomSelect
                  options={[
                    { label: "All Employee", value: "all" },
                  ]}
                  value={employeeFilter}
                  onChange={(val) => setEmployeeFilter(val)}
                  placeholder="All Employee"
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] text-[#111827]">Department</label>
                <CustomSelect
                  options={[
                    { label: "All", value: "all" },
                    { label: "Engineering", value: "engineering" },
                    { label: "Marketing", value: "marketing" },
                  ]}
                  value={deptFilter}
                  onChange={(val) => setDeptFilter(val)}
                  placeholder="All"
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] text-[#111827]">From</label>
                <div className="relative">
                  <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-xl border border-[#D0D5DD] px-4 py-[11px] text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[14px] text-[#111827]">To</label>
                <div className="relative">
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full rounded-xl border border-[#D0D5DD] px-4 py-[11px] text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white" />
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
            <h3 className="text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-2 md:mb-0">Employee Headcount</h3>
            <div className="flex items-center gap-1 xl:gap-2 rounded-xl p-1 border border-[#E4E7EC]">
              {["Headcount", "Turnover Rate", "Leave Usage", "Absence Tracking"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`xl:px-4 px-2 py-2 rounded-lg xl:text-[14px] text-[12px] transition-colors cursor-pointer ${activeTab === tab ? "bg-[#111827] text-white" : "text-[#475467] hover:text-[#111827]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-xl border border-[#D0D5DD]">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 border-b border-[#D0D5DD] bg-[#F9FAFB] px-6 py-2.5">
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Department</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Headcount</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Previous Month</div>
                <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Change</div>
              </div>

              <div className="divide-y divide-[#D0D5DD]">
                {mockData.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 items-center px-6 py-6.5 hover:bg-neutral-50 transition-colors">
                    <div className="md:text-[14px] text-[12px] text-[#111827]">{item.dept}</div>
                    <div className="md:text-[14px] text-[12px] text-[#111827]">{item.headcount}</div>
                    <div className="md:text-[14px] text-[12px] text-[#111827]">{item.prev}</div>
                    <div className="md:text-[14px] text-[12px] font-medium">
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
