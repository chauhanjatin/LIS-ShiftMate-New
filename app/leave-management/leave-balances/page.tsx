"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";

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

  const departments = ["All Departments", "Engineering", "Marketing", "Finance", "HR", "Product", "Sales", "Design"];

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Balances</span>
    </span>
  );

  return (
    <DashboardLayout title="Leave Balances" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6 relative">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 md:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">Leave Balances</h2>

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
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search..."
                />
              </div>

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
                  <div className="absolute top-[50px] right-0 z-10 w-48 rounded-xl bg-white shadow-lg border border-neutral-100 p-2 animate-in slide-in-from-top-2">
                      {departments.map(dept => (
                        <button 
                          key={dept}
                          onClick={() => { setDeptFilter(dept); setFilterOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-50 ${deptFilter === dept ? 'bg-[#257BFC] hover:bg-[#257BFC]' : 'text-neutral-700'}`}
                        >
                          {dept}
                        </button>
                      ))}
                  </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-[1000px] w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pl-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Employee</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Department</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Entitlement</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Used</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Carry-over</th>
                  <th className="border-b border-[#E2E8F0] py-3 sm:py-4 pr-4 text-[12px] sm:text-[14px] font-semibold text-neutral-900">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {filteredBalances.map((bal) => (
                  <tr key={bal.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                    <td className="border-b border-[#F1F5F9] py-4 pl-4 pr-6">
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
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{bal.department}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{bal.entitlement}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{bal.used}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{bal.carryOver}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[13px] sm:text-[14px] font-medium text-neutral-900">{bal.remaining}</td>
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
