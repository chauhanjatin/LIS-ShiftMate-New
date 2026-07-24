"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import CustomSelect from '@/Component/UI/CustomSelect';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import { Lexend_Deca } from "next/font/google";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface LeaveRequest {
  id: string;
  employeeName: string;
  avatar: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  status: "Approved" | "Pending" | "Rejected";
}

const initialRequests: LeaveRequest[] = [
  { id: "1", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", leaveType: "Annual Leave", startDate: "10 May 2026", endDate: "14 May 2026", totalDays: "05", status: "Approved" },
  { id: "2", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", leaveType: "Sick Leave", startDate: "25 Apr 2026", endDate: "26 Apr 2026", totalDays: "02", status: "Pending" },
  { id: "3", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", leaveType: "Annual Leave", startDate: "1 Jun 2026", endDate: "15 Jun 2026", totalDays: "10", status: "Approved" },
  { id: "4", employeeName: "Courtney Henry", avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random", leaveType: "Paternity Leave", startDate: "20 May 2026", endDate: "2 Jun 2026", totalDays: "10", status: "Pending" },
  { id: "5", employeeName: "Guy Hawkins", avatar: "https://ui-avatars.com/api/?name=Guy+Hawkins&background=random", leaveType: "Annual Leave", startDate: "1 May 2026", endDate: "3 May 2026", totalDays: "03", status: "Rejected" },
  { id: "6", employeeName: "Courtney Henry", avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random", leaveType: "Unpaid Leave", startDate: "10 Jul 2026", endDate: "20 Jul 2026", totalDays: "08", status: "Approved" },
];

export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [leaveType, setLeaveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterRef = useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => {
    if (filterOpen) setFilterOpen(false);
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesLeaveType = leaveType === "All Type" || req.leaveType === leaveType;
    const matchesSearch = req.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesLeaveType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + rowsPerPage);

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Requests</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Requests" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 relative ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:px-6 px-4 pt-4 md:pt-6">
            <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">All Leave Requests</h2>

            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0 relative" ref={filterRef}>
              <div className="relative 2xl:w-75 xl:w-60 md:w-40 w-full">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-[#E2E8F0] bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#257BFC]"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="w-[140px]">
                <CustomSelect
                  value={leaveType}
                  onChange={(val) => setLeaveType(val)}
                  options={[
                    { label: "All Type", value: "All Type" },
                    { label: "Annual Leave", value: "Annual Leave" },
                    { label: "Sick Leave", value: "Sick Leave" },
                    { label: "Unpaid Leave", value: "Unpaid Leave" }
                  ]}
                  className="xl:!px-4 !px-2 !py-1 min-h-[38px] md:min-h-[42px] bg-neutral-50"
                />
              </div>

              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex md:h-[42px] md:w-[42px] h-[38px] w-[38px] p-2 items-center justify-center rounded-xl border border-[#E2E8F0] text-neutral-600 transition hover:bg-neutral-50"
              >
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>

              {filterOpen && (
                <div className="absolute top-[50px] right-0 z-10 w-40 rounded-xl bg-white shadow-lg border border-[#E2E8F0] p-2 animate-in slide-in-from-top-2 overflow-hidden">
                  <button onClick={() => { setStatusFilter("Pending"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Pending' ? 'font-normal' : ''}`}>Pending</button>
                  <button onClick={() => { setStatusFilter("Approved"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Approved' ? 'font-normal' : ''}`}>Approved</button>
                  <button onClick={() => { setStatusFilter("Rejected"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-[16px] rounded-lg hover:bg-[#257BFC] hover:text-white cursor-pointer ${statusFilter === 'Rejected' ? 'font-normal' : ''}`}>Rejected</button>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 2xl:p-6">
            <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-left border-collapse">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 pl-4 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827]">Employee</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827]">Leave Type</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827]">Start Date</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827]">End Date</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827]">Total Days</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827] text-center">Status</th>
                      <th className="border-b border-[#E2E8F0] 2xl:px-4 px-2 2xl:py-[10px] py-2 sm:px-6 2xl:pr-4 pr-3 md:text-[16px] text-[14px] font-normal text-[#111827] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {paginatedRequests.map((req) => (
                      <tr key={req.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                        <td className="px-4 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={req.avatar}
                              alt={req.employeeName}
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                            />
                            <span className="text-[13px] sm:text-[14px] font-normal text-[#111827] whitespace-nowrap">
                              {req.employeeName}
                            </span>
                          </div>
                        </td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-[13px] sm:text-[14px] font-normal text-[#111827]">{req.leaveType}</td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-[13px] sm:text-[14px] font-normal text-[#111827]">{req.startDate}</td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-[13px] sm:text-[14px] font-normal text-[#111827]">{req.endDate}</td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-[13px] sm:text-[14px] font-normal text-[#111827]">{req.totalDays}</td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-center">
                          <span className={`inline-flex rounded-full 2xl:px-5 xl:px-4 px-3 2xl:py-2.5 xl:py-2 py-1 2xl:text-[14px] text-[12px] font-normal ${req.status === 'Approved' ? 'bg-[#EDFAF2] text-[#4DB949]' :
                              req.status === 'Pending' ? 'bg-[#FFF6E8] text-[#FFA100]' :
                                'bg-[#FEE2E2] text-[#EF4444]'
                            }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="2xl:py-6 xl:py-5 py-3 2xl:px-6 xl:px-5 px-4 text-center">
                          <Link href={`/leave-management/leave-requests/${req.id}`}>
                            <button className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">
                              <Image src={eyeIcon} alt="View"/>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    {filteredRequests.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredRequests.length)} of ${filteredRequests.length}` : '0-0 of 0'}
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
      </div>
    </DashboardLayout>
  );
}
