"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart, lineClasses } from "@mui/x-charts/LineChart";

import dollarIcon from "@/assets/images/icons/dollar.svg";
import usersIcon from "@/assets/images/icons/users.svg";
import planeIcon from "@/assets/images/icons/plane.svg";
import overtimeIcon from "@/assets/images/icons/on-time.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

const payrollTrendData = [
  { month: "January", value: 16000 },
  { month: "February", value: 16000 },
  { month: "March", value: 16000 },
  { month: "April", value: 16000 },
  { month: "May", value: 16000 },
];

const headcountData = [
  { id: 0, value: 12, label: "HR", color: "#4DB949" },
  { id: 1, value: 60, label: "Engineering", color: "#8B5CF6" },
  { id: 2, value: 30, label: "Sales", color: "#257BFC" },
  { id: 3, value: 15, label: "Support", color: "#FFA100" },
];

const leaveTrendsData = {
  xAxis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  annual: [5, 10, 20, 45, 40, 15, 15, 8, 20, 10, 5, 2],
  sick: [15, 25, 28, 22, 25, 30, 38, 25, 15, 25, 32, 35],
};

export default function ReportsDashboardPage() {
  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Reports Dashboard</span>
    </span>
  );

  return (
    <DashboardLayout title="Reporting Compliance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mb-6">
            <div className="rounded-2xl border border-[#D0D5DD] bg-white 3xl:p-4 xl:p-6 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[30px] font-semibold text-[#111827] mb-1">$485,250</h2>
                <p className="text-[12px] 2xl:text-[14px] 3xl:text-[12px] font-medium text-[#111827]">Total Payroll Cost (Mar 2026)</p>
              </div>
              <div className="3xl:h-[48px] 3xl:w-[48px] h-[54px] w-[54px] rounded-xl bg-[#257BFC] flex items-center justify-center shrink-0">
                <Image src={dollarIcon} alt="Dollar" className="brightness-0 invert" />
              </div>
            </div>
            <div className="rounded-2xl border border-[#D0D5DD] bg-white 3xl:p-4 xl:p-6 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[30px] font-semibold text-[#111827] mb-1">124</h2>
                <p className="text-[12px] 2xl:text-[14px] 3xl:text-[12px] font-medium text-[#111827]">Current Headcount</p>
              </div>
              <div className="3xl:h-[48px] 3xl:w-[48px] h-[54px] w-[54px] rounded-xl bg-[#4DB949] flex items-center justify-center shrink-0">
                <Image src={usersIcon} alt="Users" className="brightness-0 invert" />
              </div>
            </div>
            <div className="rounded-2xl border border-[#D0D5DD] bg-white 3xl:p-4 xl:p-6 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[30px] font-semibold text-[#111827] mb-1">12.5</h2>
                <p className="text-[12px] 2xl:text-[14px] 3xl:text-[12px] font-medium text-[#111827]">Avg Leave Days/Employee</p>
              </div>
              <div className="3xl:h-[48px] 3xl:w-[48px] h-[54px] w-[54px] rounded-xl bg-[#8B5CF6] flex items-center justify-center shrink-0">
                <Image src={planeIcon} alt="Plane" className="brightness-0 invert" />
              </div>
            </div>
            <div className="rounded-2xl border border-[#D0D5DD] bg-white 3xl:p-4 xl:p-6 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[30px] font-semibold text-[#111827] mb-1">245hr</h2>
                <p className="text-[12px] 2xl:text-[14px] 3xl:text-[12px] font-medium text-[#111827]">Overtime Hours (This Month)</p>
              </div>
              <div className="3xl:h-[48px] 3xl:w-[48px] h-[54px] w-[54px] rounded-xl bg-[#FFA100] flex items-center justify-center shrink-0">
                <Image src={overtimeIcon} alt="Overtime" className="brightness-0 invert" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827] mb-6">Reports & Analytics</h3>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              <div className="rounded-xl border border-[#E2E8F0] p-5">
                <h4 className="text-[15px] 2xl:text-[20px] font-medium text-[#111827] mb-6">Payroll Trend (Last 5 Months)</h4>
                <div className="h-[250px] w-full">
                  <BarChart
                    dataset={payrollTrendData}
                    xAxis={[{ scaleType: "band", dataKey: "month", tickLabelStyle: { fill: "#98A2B3", fontSize: 12 } }]}
                    yAxis={[{
                      valueFormatter: (value: number) => `${value / 1000}K`,
                      tickLabelStyle: { fill: "#98A2B3", fontSize: 12 }
                    }]}
                    series={[{ dataKey: "value", color: "#257BFC" }]}
                    height={250}
                    margin={{ left: 40, right: 10, top: 20, bottom: 30 }}
                    hideLegend
                    sx={{
                      "& .MuiChartsAxis-line": { stroke: "#E2E8F0" },
                      "& .MuiChartsAxis-tick": { stroke: "#E2E8F0" }
                    }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] p-5">
                <h4 className="text-[15px] font-semibold text-[#111827] mb-6">Headcount by Department</h4>
                <div className="flex h-[250px] items-center gap-8">
                  <div className="h-[200px] flex-1">
                    <PieChart
                      series={[
                        {
                          data: headcountData,

                          innerRadius: 60,
                          outerRadius: 90,
                          paddingAngle: 5,
                          cornerRadius: 5,
                        },
                      ]}
                      hideLegend
                      margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    />
                  </div>
                  <div className="flex w-[160px] flex-col gap-4">
                    {headcountData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[13px] text-[#111827] font-medium">{item.label}</span>
                        </div>
                        <span className="text-[13px] text-[#111827] font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overtime by Department Donut Chart */}
              <div className="rounded-xl border border-[#E2E8F0] p-5">
                <h4 className="text-[15px] font-semibold text-[#111827] mb-6">Overtime by Department</h4>
                <div className="flex h-[250px] items-center gap-8">
                  <div className="h-[200px] flex-1">
                    <PieChart
                      series={[
                        {
                          data: headcountData,
                          innerRadius: 60,
                          outerRadius: 90,
                          paddingAngle: 5,
                          cornerRadius: 5,
                        },
                      ]}
                      hideLegend
                      margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    />
                  </div>
                  <div className="flex w-[160px] flex-col gap-4">
                    {headcountData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[13px] text-[#111827] font-medium">{item.label}</span>
                        </div>
                        <span className="text-[13px] text-[#111827] font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave Trends Area Chart */}
              <div className="rounded-xl border border-[#E2E8F0] p-5">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[15px] font-semibold text-[#111827]">Leave Trends</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#257BFC]"></div>
                      <span className="text-[12px] font-medium text-[#475467]">Annual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#4DB949]"></div>
                      <span className="text-[12px] font-medium text-[#475467]">Sick</span>
                    </div>
                  </div>
                </div>
                <div className="h-[250px] w-full">
                  <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], valueFormatter: (v: number) => leaveTrendsData.xAxis[v], tickLabelStyle: { fill: "#98A2B3", fontSize: 12 } }]}
                    yAxis={[{ tickLabelStyle: { fill: "#98A2B3", fontSize: 12 }, max: 45 }]}
                    series={[
                      {
                        data: leaveTrendsData.annual,
                        area: true,
                        color: "#257BFC",
                        showMark: true,
                      },
                      {
                        data: leaveTrendsData.sick,
                        area: true,
                        color: "#4DB949",
                        showMark: true,
                      },
                    ]}
                    height={250}
                    margin={{ left: 30, right: 10, top: 10, bottom: 30 }}
                    hideLegend
                    sx={{
                      [`& .${lineClasses.line}`]: {
                        strokeWidth: 2,
                      },
                      [`& .${lineClasses.area}`]: {
                        fillOpacity: 0.1,
                      },
                      "& .MuiChartsAxis-line": { stroke: "#E2E8F0" },
                      "& .MuiChartsAxis-tick": { stroke: "#E2E8F0" }
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
