"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import Toast from '@/Component/UI/Toast';
import searchIcon from "@/assets/images/icons/search.svg";

interface PensionContribution {
  id: string;
  employeeName: string;
  avatar: string;
  pensionScheme: string;
  employeeContribution: string;
  employerContribution: string;
  totalContribution: string;
  date: string;
}

const mockContributions: PensionContribution[] = [
  { id: "1", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", pensionScheme: "NEST Workplace Pension", employeeContribution: "$150.00", employerContribution: "$120.00", totalContribution: "$270.00", date: "2026-06-01" },
  { id: "2", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", pensionScheme: "Scottish Widows", employeeContribution: "$210.00", employerContribution: "$168.00", totalContribution: "$378.00", date: "2026-06-01" },
  { id: "3", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", pensionScheme: "NEST Workplace Pension", employeeContribution: "$95.00", employerContribution: "$76.00", totalContribution: "$171.00", date: "2026-06-01" },
  { id: "4", employeeName: "Courtney Henry", avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random", pensionScheme: "Aviva Pension", employeeContribution: "$300.00", employerContribution: "$240.00", totalContribution: "$540.00", date: "2026-06-01" },
  { id: "5", employeeName: "Guy Hawkins", avatar: "https://ui-avatars.com/api/?name=Guy+Hawkins&background=random", pensionScheme: "NEST Workplace Pension", employeeContribution: "$180.00", employerContribution: "$144.00", totalContribution: "$324.00", date: "2026-06-01" },
];

export default function PensionContributionPage() {
  const [contributions] = useState<PensionContribution[]>(mockContributions);
  const [showToast, setShowToast] = useState(false);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension Contribution</span>
    </span>
  );

  return (
    <DashboardLayout title="Pension Contribution" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Pension Contribution</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <div className="relative 2xl:w-75 md:w-60 w-32">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search..."
                />
              </div>

              <button 
                onClick={() => setShowToast(true)}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 md:py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-[1000px] w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employee</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-6 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Pension Scheme</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employee Cont.</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employer Cont.</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Total Contribution</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((item) => (
                  <tr key={item.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                    <td className="border-b border-[#F1F5F9] py-4 pl-4 pr-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.employeeName}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                          {item.employeeName}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.pensionScheme}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.employeeContribution}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.employerContribution}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-bold text-neutral-900">{item.totalContribution}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-500">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toast
        show={showToast}
        message="Pension Contributions Exported Successfully"
        onClose={() => setShowToast(false)}
      />
    </DashboardLayout>
  );
}
