"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import Toast from "@/Component/UI/Toast";
import CustomSelect from '@/Component/UI/CustomSelect';
import viewIcon from "@/assets/images/icons/eye-view.svg";
import { Lexend_Deca } from "next/font/google";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function EPSSubmissionsPage() {
  const [showToast, setShowToast] = useState(false);
  const [taxYear, setTaxYear] = useState("2025/2026");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => {
    if (isFilterOpen) setIsFilterOpen(false);
  });

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">HMRC RTI</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">EPS Submissions</span>
    </span>
  );

  const submissions = [
    { id: "march-2026", period: "March 2026", taxPeriod: "12", amount: "$2172.48", date: "5 Apr 2026", adjustments: "SMP, SSP, Recovery", status: "Accepted" },
    { id: "february-2026", period: "February 2026", taxPeriod: "11", amount: "$2172.48", date: "5 Mar 2026", adjustments: "SMP, Recovery", status: "Pending" },
    { id: "january-2026", period: "January 2026", taxPeriod: "10", amount: "$2172.48", date: "5 Feb 2026", adjustments: "SMP, SSP, SAP", status: "Rejected" },
    { id: "december-2025", period: "December 2025", taxPeriod: "9", amount: "$2172.48", date: "5 Jan 2026", adjustments: "SMP, SSP, Recovery", status: "Accepted" },
  ];

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    const matchesSearch = sub.period.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSubmissions.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + rowsPerPage);

  const handleAction = () => {
    setShowToast(true);
  };

  const renderBadge = (status: string) => {
    switch (status) {
      case "Accepted":
        return <span className="inline-flex items-center rounded-full bg-[#EAF9EA] md:px-3.5 px-2 md:py-2.5 py-1.5 md:text-[14px] text-[11px] font-normal text-[#4DB949]">Accepted</span>;
      case "Pending":
        return <span className="inline-flex items-center rounded-full bg-[#FFFBEB] md:px-3.5 px-2 md:py-2.5 py-1.5 md:text-[14px] text-[11px] font-normal text-[#F59E0B]">Pending</span>;
      case "Rejected":
        return <span className="inline-flex items-center rounded-full bg-[#FEF2F2] md:px-3.5 px-2 md:py-2.5 py-1.5 md:text-[14px] text-[11px] font-normal text-[#EF4444]">Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <DashboardLayout title="EPS Submissions" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm min-h-[800px] px-4 md:px-6 pt-4 md:pt-6 pb-10">
          
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-6">
            <h2 className="text-[20px] font-medium text-[#111827]">EPS Submissions</h2>
            <div className="flex flex-wrap md:flex-nowrap md:gap-4 gap-2 mt-3 md:mt-0">
              <div className="relative">
                <svg className="absolute left-3 top-[45%] -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input 
                  type="text" 
                  placeholder="Search.." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-4 text-[14px] text-neutral-900 outline-none focus:border-[#257BFC] transition-colors w-[200px]" 
                />
              </div>
              <div className="w-[140px]">
                <CustomSelect
                  value={taxYear}
                  onChange={(val) => setTaxYear(val)}
                  options={[
                    { label: "2025/2026", value: "2025/2026" },
                    { label: "2024/2025", value: "2024/2025" }
                  ]}
                  className="min-h-[42px]"
                />
              </div>
              <div className="relative" ref={filterRef}>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white w-[42px] h-[42px] text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </button>
                {isFilterOpen && (
                  <div className="absolute top-[50px] right-0 z-10 w-40 rounded-xl bg-white shadow-lg border border-[#E2E8F0] p-2 animate-in slide-in-from-top-2 overflow-hidden">
                    <button onClick={() => { setStatusFilter("All"); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'All' ? 'font-normal' : ''}`}>All</button>
                    <button onClick={() => { setStatusFilter("Pending"); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Pending' ? 'font-normal' : ''}`}>Pending</button>
                    <button onClick={() => { setStatusFilter("Accepted"); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Accepted' ? 'font-normal' : ''}`}>Accepted</button>
                    <button onClick={() => { setStatusFilter("Rejected"); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Rejected' ? 'font-normal' : ''}`}>Rejected</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#D0D5DD]">
            <table className="w-full text-left">
              <thead className="border-b border-[#D0D5DD] bg-[#F9FAFB] text-[#111827] lg:text-[16px] md:text-[14px] text-[13px]">
                <tr>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Period</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Tax Period</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Amount</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Submitted Date</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Adjustments</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Status</th>
                  <th className="2xl:px-6 px-4 md:py-2.5 py-1.5 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[11px] md:text-[12px] lg:text-[14px]">
                {paginatedSubmissions.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="2xl:p-6 p-3 font-normal text-[#111827]">{row.period}</td>
                    <td className="2xl:p-6 p-3 font-normal text-[#111827]">{row.taxPeriod}</td>
                    <td className="2xl:p-6 p-3 font-normal text-[#111827]">{row.amount}</td>
                    <td className="2xl:p-6 p-3 font-normal text-[#111827]">{row.date}</td>
                    <td className="2xl:p-6 p-3 font-normal text-[#111827]">{row.adjustments}</td>
                    <td className="2xl:p-6 p-3">{renderBadge(row.status)}</td>
                    <td className="2xl:p-6 p-3">
                      <div className="flex items-center md:gap-3 gap-2">
                        <Link href={`/hmrc-rti/eps-submissions/${row.id}`} className="text-[#111827] hover:text-[#257BFC]">
                          <Image src={viewIcon} alt="View" />
                        </Link>
                        {row.status === 'Rejected' && (
                          <button onClick={handleAction} className="text-[#111827] hover:text-[#257BFC]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                          </button>
                        )}
                        {/* <button onClick={handleAction} className="text-[#111827] hover:text-[#257BFC]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between sm:justify-end py-4 mt-2 overflow-x-auto w-full whitespace-nowrap gap-2 sm:gap-4 px-2 sm:px-6">
              <div className="flex items-center gap-2">
                  <span className="text-[12px] sm:text-[14px] text-neutral-500">
                      Rows per page:
                  </span>
                  <div className="w-[80px]">
                      <CustomSelect 
                          value={String(rowsPerPage)}
                          onChange={(val) => { setRowsPerPage(Number(val)); setCurrentPage(1); }}
                          options={[
                              { label: "5", value: "5" },
                              { label: "10", value: "10" },
                              { label: "20", value: "20" }
                          ]}
                          menuPlacement="top"
                          className="!py-1 !px-2 text-[12px] sm:text-[14px] min-h-[32px]"
                      />
                  </div>
              </div>

              <span className="text-[12px] sm:text-[14px] text-neutral-500 ml-4">
                  {filteredSubmissions.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredSubmissions.length)} of ${filteredSubmissions.length}` : '0-0 of 0'}
              </span>

              <div className="flex items-center gap-1 ml-4">
                  <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
              </div>
          </div>

        </div>
      </div>

      <Toast 
        show={showToast} 
        message="Action Completed" 
        onClose={() => setShowToast(false)} 
      />
    </DashboardLayout>
  );
}
