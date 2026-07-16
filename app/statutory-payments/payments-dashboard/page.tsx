"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import CustomSelect from '@/Component/UI/CustomSelect';
import sickpay from "@/assets/images/icons/sick-pay.svg";
import maternitypay from "@/assets/images/icons/maternity-pay.svg";
import paternitypay from "@/assets/images/icons/paternity-pay.svg";
import adoptionpay from "@/assets/images/icons/adoption-pay.svg";
import viewIcon from "@/assets/images/icons/eye-view.svg";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

interface ActivePayment {
  id: string;
  employeeName: string;
  avatar: string;
  startDate: string;
  endDate: string;
  weeklyAmount: string;
  type: "SSP" | "SMP" | "SAP" | "SPP";
}

const mockPayments: ActivePayment[] = [
  { id: "1", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", startDate: "15 Mar 2026", endDate: "17 Mar 2026", weeklyAmount: "$172.48", type: "SSP" },
  { id: "2", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", startDate: "20 Apr 2026", endDate: "3 May 2026", weeklyAmount: "$116.48", type: "SMP" },
  { id: "3", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", startDate: "22 Apr 2026", endDate: "5 May 2026", weeklyAmount: "$102.48", type: "SAP" },
  { id: "4", employeeName: "Devon Lane", avatar: "https://ui-avatars.com/api/?name=Devon+Lane&background=random", startDate: "20 Apr 2026", endDate: "3 May 2026", weeklyAmount: "$116.48", type: "SPP" },
  { id: "5", employeeName: "Cameron Williamson", avatar: "https://ui-avatars.com/api/?name=Cameron+Williamson&background=random", startDate: "15 Mar 2026", endDate: "17 Mar 2026", weeklyAmount: "$161.48", type: "SMP" },
  { id: "6", employeeName: "Jane Cooper", avatar: "https://ui-avatars.com/api/?name=Jane+Cooper&background=random", startDate: "22 Apr 2026", endDate: "5 May 2026", weeklyAmount: "$172.48", type: "SAP" },
];

function MetricCard({ title, value, iconClass, icon }: { title: string, value: string, iconClass: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between 2xl:gap-4 gap-3 rounded-xl border border-[#E2E8F0] bg-white 2xl:p-5 p-3 overflow-hidden">
      <div className="space-y-1">
        <p className="2xl:text-[32px] md:text-[30px] text-[28px] font-bold tracking-tight text-[#111827]">{value}</p>
        <p className="md:text-[14px] text-[12px] font-medium text-[#111827] mt-4">{title}</p>
      </div>
      <div className={`flex 2xl:h-12 2xl:w-12 h-10 w-10 items-center justify-center rounded-xl text-white ${iconClass}`}>
        {icon}
      </div>
    </div>
  );
}

export default function PaymentsDashboardPage() {
  const [payments] = useState<ActivePayment[]>(mockPayments);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalPages = Math.ceil(payments.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedPayments = payments.slice(startIndex, startIndex + rowsPerPage);

  const breadcrumb = (
    <span className={`${lexendDeca.className} text-[#98A2B3]`}>
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Payments Dashboard</span>
    </span>
  );

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SSP": return "bg-[#EAF2FF] text-[#07265C]";
      case "SMP": return "bg-[#EAF9EA] text-[#4DB949]";
      case "SAP": return "bg-[#F0ECFE] text-[#775AF4]";
      case "SPP": return "bg-[#FFF4E5] text-[#FFA100]";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <DashboardLayout title="Payments Dashboard" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm md:px-6 px-4 md:pt-6 pt-4 min-h-[800px]">
          <h2 className="md:text-[20px] text-[18px] font-medium text-[#111827] md:mb-6 mb-4">Payments Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <MetricCard
              title="Statutory Sick Pay"
              value="12"
              iconClass="bg-[#257BFC]"
              icon={<Image src={sickpay} alt="" />}
            />
            <MetricCard
              title="Statutory Maternity Pay"
              value="05"
              iconClass="bg-[#4DB949]"
              icon={<Image src={maternitypay} alt="" />}
            />
            <MetricCard
              title="Statutory Paternity Pay"
              value="06"
              iconClass="bg-[#FFA100]"
              icon={<Image src={paternitypay} alt="" />}
            />
            <MetricCard
              title="Statutory Adoption Pay"
              value="02"
              iconClass="bg-[#8B5CF6]"
              icon={<Image src={adoptionpay} alt="" />}
            />
          </div>

          <h2 className="text-[18px] font-bold text-neutral-900 mb-6">Active Payments</h2>

          <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full text-left border-collapse">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827]">Employee</th>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827]">Start Date</th>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827]">End Date</th>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827]">Weekly Amount</th>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827]">Type</th>
                    <th className="border-b border-[#D0D5DD] px-4 py-[10px] sm:px-6 md:text-[16px] text-[14px] font-normal text-[#111827] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginatedPayments.map((item) => (
                    <tr key={item.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#D0D5DD] last:border-none">
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.avatar}
                            alt={item.employeeName}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                          />
                          <span className="md:text-[14px] text-[12px] font-medium text-neutral-900 whitespace-nowrap">
                            {item.employeeName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[12px] font-normal text-[#111827]">{item.startDate}</td>
                      <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[12px] font-normal text-[#111827]">{item.endDate}</td>
                      <td className="px-4 md:py-6 py-4 sm:px-6 md:text-[14px] text-[12px] font-normal text-[#111827]">{item.weeklyAmount}</td>
                      <td className="px-4 md:py-6 py-4 sm:px-6">
                        <span className={`inline-flex rounded-full px-3.5 py-2.5 md:text-[14px] text-[12px] font-normal ${getTypeBadge(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-center">
                        <Link href={`/statutory-payments/payments-dashboard/${item.id}`} className="inline-flex md:h-8 md:w-8 h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
                          <Image src={viewIcon} alt="" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4 mt-2">
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
                  {payments.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, payments.length)} of ${payments.length}` : '0-0 of 0'}
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
    </DashboardLayout >
  );
}
