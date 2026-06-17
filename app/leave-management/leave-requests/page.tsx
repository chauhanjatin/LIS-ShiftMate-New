"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";

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

  const filteredRequests = requests.filter(req => {
    if (statusFilter === "All") return true;
    return req.status === statusFilter;
  });

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Requests</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Requests" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6 relative">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">All Leave Requests</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0 relative">
              <div className="relative 2xl:w-75 xl:w-60 w-40">
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

              <select className="rounded-xl border border-neutral-200 bg-neutral-50 xl:px-4 px-2 py-2 md:py-2.5 text-sm text-neutral-600 outline-none hidden md:block">
                <option>All Type</option>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Unpaid Leave</option>
              </select>

              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex md:h-[42px] md:w-[42px] h-[38px] w-[38px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50"
              >
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>
              
              {filterOpen && (
                  <div className="absolute top-[50px] right-0 z-10 w-40 rounded-xl bg-white shadow-lg border border-neutral-100 p-2 animate-in slide-in-from-top-2">
                      <p className="text-xs font-semibold text-neutral-500 mb-2 px-2">Filter Dropdown</p>
                      <button onClick={() => { setStatusFilter("All"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 ${statusFilter === 'All' ? 'font-bold' : ''}`}>All</button>
                      <button onClick={() => { setStatusFilter("Pending"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 ${statusFilter === 'Pending' ? 'font-bold' : ''}`}>Pending</button>
                      <button onClick={() => { setStatusFilter("Approved"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 ${statusFilter === 'Approved' ? 'font-bold' : ''}`}>Approved</button>
                      <button onClick={() => { setStatusFilter("Rejected"); setFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 ${statusFilter === 'Rejected' ? 'font-bold' : ''}`}>Rejected</button>
                  </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-[1000px] w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employee</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Leave Type</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Start Date</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">End Date</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Total Days</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Status</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                    <td className="border-b border-[#F1F5F9] py-4 pl-4 pr-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.avatar}
                          alt={req.employeeName}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                          {req.employeeName}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{req.leaveType}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{req.startDate}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{req.endDate}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{req.totalDays}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-center">
                      <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${
                        req.status === 'Approved' ? 'bg-[#ECFDF3] text-[#027A48]' : 
                        req.status === 'Pending' ? 'bg-[#FFFAEB] text-[#B54708]' : 
                        'bg-[#FEF3F2] text-[#B42318]'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-center">
                        <Link href={`/leave-management/leave-requests/${req.id}`}>
                            <button className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </Link>
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
