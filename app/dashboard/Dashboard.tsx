"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { LineChart, LinePlot, lineClasses } from "@mui/x-charts/LineChart";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import totalEmployeeIcon from "@/assets/images/icons/total-employee.svg";
import activeEmployeeIcon from "@/assets/images/icons/active-employee.svg";
import departmentsIcon from "@/assets/images/icons/departments.svg";
import pendingApprovalIcon from "@/assets/images/icons/pending-approval.svg";
import menuVertical from "@/assets/images/icons/menu-vertical.svg";
import { PieChart } from "@mui/x-charts/PieChart";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

const statLineData = [5, 12, 7, 20, 10, 18, 13, 16];
const statXLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
const workforceXLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const workforceSeries = {
  days: [14, 15, 17, 12, 15, 16, 21, 17, 20, 18, 15, 19],
  weekly: [13, 14, 16, 14, 16, 17, 20, 18, 18, 15, 14, 18],
  monthly: [10, 11, 12, 11, 13, 14, 16, 15, 14, 13, 12, 15],
} as const;
const workforceSales = [
  978, 1120, 1034, 960, 1348, 1189, 1522, 1296, 1414, 1228, 1098, 1460,
];
const workforceRevenue = [
  2410, 2860, 2544, 2205, 3348, 3012, 3860, 3290, 3588, 3084, 2712, 3650,
];
const workforceMargin = { top: 22, right: 12, bottom: 20, left: 8 };

function StatCard({
  value,
  label,
  color,
  icon,
  chartColor = "#22c55e",
}: Readonly<{
  value: string;
  label: string;
  color: string;
  icon: ImageProps["src"];
  chartColor?: string;
}>) {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[26px] 2xl:text-[32px] font-bold tracking-tight text-neutral-900">
            {value}
          </p>
          <p className="2xl:mt-3 xl:mt-1 text-[12px]  2xl:text-sm font-medium text-neutral-500">{label}</p>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="h-[54px] w-[160px] 2xl:h-[46px] 2xl:w-[150px]">
            <ChartsContainer
              width={160}
              height={54}
              margin={{ top: 6, bottom: 6, left: 0, right: 0 }}
              series={[
                {
                  type: "line",
                  data: statLineData,
                  showMark: false,
                },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: statXLabels,
                  position: "none",
                },
              ]}
              yAxis={[{ position: "none" }]}
              sx={{
                [`& .${lineClasses.line}`]: {
                  stroke: chartColor,
                  strokeWidth: 2.8,
                },
              }}
              disableAxisListener
            >
              <LinePlot />
            </ChartsContainer>
          </div>
        </div>

        <span
          className={`mt-1 inline-flex 2xl:h-12 2xl:w-12 h-10 w-10 items-center justify-center rounded-xl text-white ${color}`}
        >
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            className="2xl:h-6 2xl:w-6 h-5 w-5 brightness-0 invert"
          />
        </span>
      </div>
    </article>
  );
}

const data = [
  { id: 0, value: 12, label: "HR", color: "#4DB949", bgClass: "bg-[#4DB949]" },
  { id: 1, value: 60, label: "Engineering", color: "#775AF4", bgClass: "bg-[#775AF4]" },
  { id: 2, value: 30, label: "Sales", color: "#257BFC", bgClass: "bg-[#257BFC]" },
  { id: 3, value: 15, label: "Support", color: "#FFA100", bgClass: "bg-[#FFA100]" },
];

export default function DashboardPage() {
  const [workforceView, setWorkforceView] =
    useState<keyof typeof workforceSeries>("days");

  return (
    <DashboardLayout title="Dashboard" subtitle="Overview of your workforce and HR activities">
      <div className={`grid flex-1 gap-4 p-4 xl:grid-cols-12 grid-cols-1 2xl:p-6 ${lexendDeca.className}`}>
        <div className="space-y-4 col-span-8">
          <div className="grid gap-2 ms:gap-4 sm:grid-cols-2">
            <StatCard
              value="500"
              label="Total Employees"
              color="bg-[#3b82f6]"
              icon={totalEmployeeIcon}
            />
            <StatCard
              value="231"
              label="Active Employees"
              color="bg-[#22c55e]"
              icon={activeEmployeeIcon}
            />
            <StatCard
              value="12"
              label="Departments"
              color="bg-[#8b5cf6]"
              icon={departmentsIcon}
            />
            <StatCard
              value="5"
              label="Pending Approvals"
              color="bg-[#f59e0b]"
              icon={pendingApprovalIcon}
              chartColor="#ef4444"
            />
          </div>

          <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] overflow-hidden">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Workforce Growth
              </h2>
              <div className="flex w-fit items-center rounded-xl border border-[#E2E8F0] p-1 text-[10px] sm:text-xs">
                {(["days", "weekly", "monthly"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setWorkforceView(tab)}
                    className={`rounded-lg px-2 py-1 sm:px-4 sm:py-1.5 capitalize transition-colors ${workforceView === tab
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-400 hover:text-neutral-700"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <LineChart
              height={230}
              hideLegend
              axisHighlight={{ x: "line" }}
              grid={{ horizontal: true, vertical: false }}
              series={[
                {
                  data: workforceSeries[workforceView],
                  label: "",
                  area: true,
                  showMark: false,
                  color: "#257bfc",
                  valueFormatter: (_value: number | null, context: any) =>
                    `${workforceSales[context.dataIndex].toLocaleString()} sales\n$${workforceRevenue[context.dataIndex].toLocaleString()}`,
                },
              ]}
              xAxis={[
                { scaleType: "point", data: workforceXLabels, height: 28 },
              ]}
              yAxis={[
                {
                  min: 5,
                  max: 22,
                  tickNumber: 4,
                  valueFormatter: (value: number) => `${value}`,
                },
              ]}
              slotProps={{ tooltip: { trigger: "axis" } }}
              margin={workforceMargin}
              sx={{
                [`& .${lineClasses.line}`]: {
                  strokeWidth: 3,
                },
                [`& .${lineClasses.area}`]: {
                  fillOpacity: 0.28,
                },
                [`& .${lineClasses.highlight}`]: {
                  fill: "#257bfc",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  fill: "#98A2B3",
                  fontSize: 12,
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  fill: "#98A2B3",
                  fontSize: 12,
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                  stroke: "transparent",
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
                  stroke: "transparent",
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  stroke: "transparent",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "#E4E7EC",
                  strokeWidth: 1,
                },
                "& .MuiChartsAxisHighlight-root": {
                  stroke: "#257bfc",
                  strokeWidth: 1.5,
                },
                "& .MuiChartsTooltip-paper": {
                  borderRadius: "10px",
                  backgroundColor: "#111827",
                  boxShadow: "none",
                },
                "& .MuiChartsTooltip-labelCell": {
                  display: "none",
                },
                "& .MuiChartsTooltip-axisValueCell": {
                  display: "none",
                },
                "& .MuiChartsTooltip-valueCell": {
                  whiteSpace: "pre-line",
                  color: "#ffffff !important",
                  fontWeight: 600,
                  textAlign: "center",
                },
                "& .MuiChartsTooltip-cell": {
                  color: "#ffffff !important",
                },
                "& .MuiChartsTooltip-mark": {
                  color: "#ffffff !important",
                },
              }}
            />
          </article>
        </div>

        <div className="space-y-4 xl:col-span-4 col-span-8">
          <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] overflow-hidden">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[20px] font-medium tracking-tight">
                Recent Activity
              </h2>
              <button className="text-xs font-semibold text-neutral-400 cursor-pointer">
                View All
              </button>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-5">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#4DB949]"></div>
                <div>
                  <p className="text-[14px] font-medium text-neutral-700">
                    John added new employee
                  </p>
                  <span className="text-xs font-normal text-neutral-400">
                    2 minute ago
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#4DB949]"></div>
                <div>
                  <p className="text-[14px] font-medium text-neutral-700">
                    Admin created new role
                  </p>
                  <span className="text-xs text-neutral-400">
                    15 minute ago
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="mt-1 h-3 w-3 rounded-full bg-[#4DB949]"></div>
                <div>
                  <p className="text-[14px] font-medium text-neutral-700">
                    John added new employee
                  </p>
                  <span className="text-xs text-neutral-400">
                    20 minute ago
                  </span>
                </div>
              </li>
            </ul>
          </article>

          <article className="w-full rounded-xl bg-white 2xl:p-5 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] font-sans">
            <h2 className="2xl:mb-8 text-xl font-bold tracking-tight text-[#1a1c24] xl:mb-2 xl:text-[22px] 2xl:text-[26px]">
              Employees by Department
            </h2>

            <div className="flex 3xl:flex-col 2xl:flex-row xl:flex-col md:flex-row flex-col items-center justify-center gap-3.5 lg:justify-between">
              <div className="h-[234px] w-[234px] shrink-0">
                <PieChart
                  series={[
                    {
                      data: data,
                      innerRadius: 60,
                      outerRadius: 88,
                      paddingAngle: 2,
                      cornerRadius: 15,
                      cx: 120,
                      cy: 120,
                    },
                  ]}
                  width={250}
                  height={250}
                  hideLegend
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                />
              </div>

              <div className="2xl:flex w-full flex-1 2xl:flex-col 3xl:grid 3xl:grid-cols-2 gap-3 2xl:gap-6">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center 2xl:justify-between gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${item.bgClass}`}
                      />
                      <span className="text-base font-medium text-[#1a1c24] 2xl:text-lg text-[14px]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-base font-medium tabular-nums text-[#1a1c24] 2xl:text-lg text-[14px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        <article className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] xl:col-span-6 col-span-8 overflow-hidden">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Pending Approvals Table
            </h2>

            <button className="w-full rounded-lg bg-[#257BFC] px-4 py-2 text-sm font-medium text-white sm:w-auto cursor-pointer">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left border-collapse">
              <thead className="text-[#111827] bg-white">
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-base">
                    Name
                  </th>

                  <th className="border-b border-[#E2E8F0] text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-base">
                    Request Type
                  </th>

                  <th className="border-b border-[#E2E8F0] text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-base">
                    Date
                  </th>

                  <th className="border-b border-[#E2E8F0] text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-base">
                    Status
                  </th>

                  <th className="border-b border-[#E2E8F0] text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-base">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {[
                  [
                    "Cameron Williamson",
                    "Leave Request",
                    "October 25, 2026",
                    "Pending",
                  ],
                  [
                    "Devon Lane",
                    "Role Change",
                    "March 13, 2026",
                    "Pending",
                  ],
                  [
                    "Tena Cooper",
                    "Role Change",
                    "August 24, 2026",
                    "Pending",
                  ],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="font-normal text-[13px] 2xl:text-[14px]"
                  >
                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[0]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[1]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[2]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      <span className="inline-flex rounded-full bg-[#FFF6E8] px-3 py-1 text-[10px] font-semibold text-[#FFA100] sm:px-5 sm:text-xs 2xl:px-6 2xl:py-2">
                        {row[3]}
                      </span>
                    </td>

                    <td className="border-b border-[#E2E8F0] py-4 sm:py-5 2xl:py-6">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 cursor-pointer">
                       <Image src={menuVertical} alt="View" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] xl:col-span-6 col-span-8 overflow-hidden">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Recently Added Employees
            </h2>

            <button className="w-full rounded-lg bg-[#257BFC] px-4 py-2 text-sm font-semibold text-white sm:w-auto cursor-pointer">
              View All
            </button>
          </div>


          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left border-collapse">
              <thead className="text-[#111827] bg-white">
                <tr>
                  <th className="border-b border-[#E2E8F0] py-3 text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-[16px]">
                    Name
                  </th>

                  <th className="border-b border-[#E2E8F0] py-3 text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-[16px]">
                    Department
                  </th>

                  <th className="border-b border-[#E2E8F0] py-3 text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-[16px]">
                    Job title
                  </th>

                  <th className="border-b border-[#E2E8F0] py-3 text-xs font-semibold whitespace-nowrap sm:text-sm 2xl:text-[16px]">
                    Joining Date
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {[
                  [
                    "Cameron Williamson",
                    "Engineering",
                    "Senior Developer",
                    "October 25, 2026",
                  ],
                  [
                    "Devon Lane",
                    "Marketing",
                    "Marketing Manager",
                    "March 13, 2026",
                  ],
                  [
                    "Tena Cooper",
                    "Finance",
                    "Financial Analyst",
                    "August 24, 2026",
                  ],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="font-normal text-[13px] 2xl:text-[14px]"
                  >
                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[0]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[1]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[2]}
                    </td>

                    <td className="border-b border-[#E2E8F0] whitespace-nowrap py-5 2xl:py-6">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </DashboardLayout>
  );
}
