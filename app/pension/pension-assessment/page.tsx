"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";

interface PensionAssessment {
  id: string;
  employeeName: string;
  avatar: string;
  age: number;
  annualEarnings: string;
  category: string;
  status: "Enrolled" | "Pending" | "Not Enrolled" | "Opted Out";
}

const mockAssessments: PensionAssessment[] = [
  { id: "1", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", age: 34, annualEarnings: "$42,000", category: "Eligible Jobholder", status: "Enrolled" },
  { id: "2", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", age: 28, annualEarnings: "$38,000", category: "Non-Eligible Jobholder", status: "Pending" },
  { id: "3", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", age: 19, annualEarnings: "$55,000", category: "Entitled Worker", status: "Enrolled" },
  { id: "4", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", age: 41, annualEarnings: "$42,000", category: "Eligible Jobholder", status: "Enrolled" },
  { id: "5", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", age: 23, annualEarnings: "$11,200", category: "Eligible Jobholder", status: "Not Enrolled" },
  { id: "6", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", age: 67, annualEarnings: "$42,000", category: "Non-Eligible Jobholder", status: "Opted Out" },
];

export default function PensionAssessmentPage() {
  const [assessments] = useState<PensionAssessment[]>(mockAssessments);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Pension Assessment</span>
    </span>
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Enrolled": return "bg-[#ECFDF3] text-[#027A48]";
      case "Pending": return "bg-[#FFFAEB] text-[#B54708]";
      case "Not Enrolled": return "bg-[#EFF8FF] text-[#175CD3]";
      case "Opted Out": return "bg-[#FEF3F2] text-[#B42318]";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <DashboardLayout title="Pension Assessment" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Pension Assessment</h2>

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

              <button className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 md:py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 cursor-pointer">
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
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-6 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Age</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Annual earnings</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Category</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((item) => (
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
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.age}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.annualEarnings}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{item.category}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6">
                      <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
