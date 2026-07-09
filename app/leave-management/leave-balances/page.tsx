"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import CustomSelect from '@/Component/UI/CustomSelect';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface LeaveBalance {
  id: string;
  employeeName: string;
  avatar: string;
  department: string;
  entitlement: string;
  used: string;
  carryOver: string;
  remaining: string;
}

const initialBalances: LeaveBalance[] = [
  { id: "1", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", department: "Engineering", entitlement: "28 Days", used: "9 Days", carryOver: "2 Days", remaining: "19 Days" },
  { id: "2", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", department: "Marketing", entitlement: "28 Days", used: "18 Days", carryOver: "5 Days", remaining: "10 Days" },
  { id: "3", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", department: "Finance", entitlement: "28 Days", used: "4 Days", carryOver: "3 Days", remaining: "24 Days" },
  { id: "4", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", department: "Engineering", entitlement: "28 Days", used: "12 Days", carryOver: "1 Days", remaining: "16 Days" },
  { id: "5", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", department: "Marketing", entitlement: "28 Days", used: "6 Days", carryOver: "2 Days", remaining: "22 Days" },
  { id: "6", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", department: "Marketing", entitlement: "28 Days", used: "0 Days", carryOver: "5 Days", remaining: "23 Days" },
  { id: "7", employeeName: "Courtney Henry", avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random", department: "Finance", entitlement: "28 Days", used: "12 Days", carryOver: "3 Days", remaining: "16 Days" },
  { id: "8", employeeName: "Guy Hawkins", avatar: "https://ui-avatars.com/api/?name=Guy+Hawkins&background=random", department: "Marketing", entitlement: "28 Days", used: "6 Days", carryOver: "1 Days", remaining: "22 Days" },
  { id: "9", employeeName: "Courtney Henry", avatar: "https://ui-avatars.com/api/?name=Courtney+Henry&background=random", department: "Engineering", entitlement: "28 Days", used: "4 Days", carryOver: "2 Days", remaining: "24 Days" },
  { id: "10", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", department: "Marketing", entitlement: "28 Days", used: "9 Days", carryOver: "5 Days", remaining: "19 Days" },
];

export default function LeaveBalancesPage() {
  const [balances, setBalances] = useState<LeaveBalance[]>(initialBalances);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deptFilter, setDeptFilter] = useState<string>("All Departments");

  const filteredBalances = balances.filter(bal => {
    if (deptFilter === "All Departments") return true;
    return bal.department === deptFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(filteredBalances.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedBalances = filteredBalances.slice(startIndex, startIndex + rowsPerPage);

  const departments = ["All Departments", "Engineering", "Marketing", "Finance", "HR", "Product", "Sales", "Design"];

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Balances</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Balances" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 relative ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
            <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Leave Balances</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0 relative">
              <div className="relative 2xl:w-75 md:w-60 w-32">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-[#E2E8F0] bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search..."
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
                <div className="absolute top-[50px] right-0 z-10 w-48 rounded-xl bg-white shadow-lg border border-[#E2E8F0] p-2.5 animate-in slide-in-from-top-2 overflow-hidden">
                  {departments.map(dept => (
                    <button
                      key={dept}
                      onClick={() => { setDeptFilter(dept); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-[16px] font-normal rounded-lg cursor-pointer ${deptFilter === dept ? 'bg-[#257BFC] text-white' : 'text-neutral-700'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-3 2xl:p-6">
            <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-left border-collapse ">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pl-4 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Employee</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Department</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Entitlement</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Used</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Carry-over</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-[10px] sm:px-6 pr-4 text-[12px] sm:text-[16px] font-medium text-[#111827]">Remaining</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {paginatedBalances.map((bal) => (
                      <tr key={bal.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#E2E8F0] last:border-none">
                        <td className="px-4 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={bal.avatar}
                              alt={bal.employeeName}
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                            />
                            <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                              {bal.employeeName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-6 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{bal.department}</td>
                        <td className="px-4 py-6 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{bal.entitlement}</td>
                        <td className="px-4 py-6 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{bal.used}</td>
                        <td className="px-4 py-6 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{bal.carryOver}</td>
                        <td className="px-4 py-6 sm:px-6 text-[13px] sm:text-[14px] font-normal text-[#111827]">{bal.remaining}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4 mt-2">
                <div className="flex items-center gap-2">
                    <span className="text-[12px] sm:text-[14px] text-neutral-500">Rows per page:</span>
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
                    {filteredBalances.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredBalances.length)} of ${filteredBalances.length}` : '0-0 of 0'}
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
