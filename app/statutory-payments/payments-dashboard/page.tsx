"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import sickpay from "@/assets/images/icons/sick-pay.svg";
import maternitypay from "@/assets/images/icons/maternity-pay.svg";
import paternitypay from "@/assets/images/icons/paternity-pay.svg";
import adoptionpay from "@/assets/images/icons/adoption-pay.svg";

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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#D0D5DD] bg-white p-5">
      <div className="space-y-1">
        <p className="text-[32px] font-bold tracking-tight text-neutral-900 leading-tight">{value}</p>
        <p className="text-[13px] font-bold text-neutral-700">{title}</p>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${iconClass}`}>
        {icon}
      </div>
    </div>
  );
}

export default function PaymentsDashboardPage() {
  const [payments] = useState<ActivePayment[]>(mockPayments);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Statutory Payments</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Payments Dashboard</span>
    </span>
  );

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SSP": return "bg-[#EFF8FF] text-[#257BFC]";
      case "SMP": return "bg-[#EAF9EA] text-[#4DB949]";
      case "SAP": return "bg-[#F3E8FF] text-[#8B5CF6]";
      case "SPP": return "bg-[#FFF4E5] text-[#FFA100]";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <DashboardLayout title="Payments Dashboard" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl bg-white shadow-sm p-6 2xl:p-8 min-h-[800px]">
          <h2 className="text-[20px] font-bold text-neutral-900 mb-6">Payments Dashboard</h2>
          
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

          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr>
                  <th className="border-b border-[#E2E8F0] pb-4 pl-4 pr-4 text-[13px] font-semibold text-neutral-900">Employee</th>
                  <th className="border-b border-[#E2E8F0] pb-4 pr-4 text-[13px] font-semibold text-neutral-900">Start Date</th>
                  <th className="border-b border-[#E2E8F0] pb-4 pr-4 text-[13px] font-semibold text-neutral-900">End Date</th>
                  <th className="border-b border-[#E2E8F0] pb-4 pr-4 text-[13px] font-semibold text-neutral-900">Weekly Amount</th>
                  <th className="border-b border-[#E2E8F0] pb-4 pr-4 text-[13px] font-semibold text-neutral-900">Type</th>
                  <th className="border-b border-[#E2E8F0] pb-4 pr-4 text-[13px] font-semibold text-neutral-900 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => (
                  <tr key={item.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#F1F5F9] last:border-none">
                    <td className="border-b border-[#F1F5F9] py-4 pl-4 pr-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.employeeName}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                          {item.employeeName}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[14px] font-semibold text-neutral-700">{item.startDate}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[14px] font-semibold text-neutral-700">{item.endDate}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6 text-[14px] font-semibold text-neutral-900">{item.weeklyAmount}</td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-6">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-bold ${getTypeBadge(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="border-b border-[#F1F5F9] py-4 pr-4 text-center">
                      <Link href={`/statutory-payments/payments-dashboard/${item.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
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
