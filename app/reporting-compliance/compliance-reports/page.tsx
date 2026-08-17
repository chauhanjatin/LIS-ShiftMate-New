"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import filterIcon from "@/assets/images/icons/filter.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

type EventType = "Login" | "Data Change" | "Export" | "Approval";

interface AuditLog {
  id: string;
  timestamp: string;
  employeeName: string;
  avatar: string;
  description: string;
  ipAddress: string;
  eventType: EventType;
}

const mockLogs: AuditLog[] = [
  { id: "L001", timestamp: "07 May 2025, 09:42", employeeName: "Jenny Wilson", avatar: "https://i.pravatar.cc/150?u=1", description: "User logged in via Internet Identity", ipAddress: "192.168.1.12", eventType: "Login" },
  { id: "L002", timestamp: "07 May 2025, 09:42", employeeName: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", description: "Updated employee record: James Harper - salary revised", ipAddress: "192.168.1.12", eventType: "Data Change" },
  { id: "L003", timestamp: "07 May 2025, 09:42", employeeName: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", description: "User logged in via Internet Identity", ipAddress: "192.168.1.12", eventType: "Login" },
  { id: "L004", timestamp: "07 May 2025, 09:42", employeeName: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=6", description: "Exported payroll summary report (CSV)", ipAddress: "192.168.1.12", eventType: "Export" },
  { id: "L005", timestamp: "07 May 2025, 09:42", employeeName: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=4", description: "Approved expense claim EXP-2025-084 - Tom Whitfield", ipAddress: "192.168.1.12", eventType: "Approval" },
  { id: "L006", timestamp: "07 May 2025, 09:42", employeeName: "Kristin Watson", avatar: "https://i.pravatar.cc/150?u=7", description: "Pension scheme updated for Oliver Nash to NEST", ipAddress: "192.168.1.12", eventType: "Data Change" },
  { id: "L007", timestamp: "07 May 2025, 09:42", employeeName: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=5", description: "User logged in via Internet Identity", ipAddress: "192.168.1.12", eventType: "Login" },
  { id: "L008", timestamp: "07 May 2025, 09:42", employeeName: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=8", description: "User logged in via Internet Identity", ipAddress: "192.168.1.12", eventType: "Login" },
  { id: "L009", timestamp: "07 May 2025, 09:42", employeeName: "Kristin Watson", avatar: "https://i.pravatar.cc/150?u=9", description: "User logged in via Internet Identity", ipAddress: "192.168.1.12", eventType: "Login" },
  { id: "L010", timestamp: "07 May 2025, 09:42", employeeName: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=10", description: "Exported NI contributions report (PDF)", ipAddress: "192.168.1.12", eventType: "Export" },
];

function EventPill({ type }: { type: EventType }) {
  const styles = {
    Login: "bg-[#EAF2FF] text-[#257BFC]",
    "Data Change": "bg-[#FFF6E8] text-[#FFA100]",
    Export: "bg-[#EAF2FF] text-[#257BFC]",
    Approval: "bg-[#EAF9EA] text-[#4DB949]",
  };
  return (
    <span className={`inline-flex rounded-full px-3.5 py-2.5 text-[14px] ${styles[type]}`}>
      {type}
    </span>
  );
}

export default function ComplianceReportsPage() {
  const [filterType, setFilterType] = useState<"All Events" | EventType>("All Events");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Compliance Reports</span>
    </span>
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions: Array<"All Events" | EventType> = [
    "All Events",
    "Login",
    "Data Change",
    "Export",
    "Approval"
  ];

  const filteredLogs = filterType === "All Events" 
    ? mockLogs 
    : mockLogs.filter(log => log.eventType === filterType);

  return (
    <DashboardLayout title="Reporting Compliance" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-4 xl:p-6 rounded-2xl min-h-[calc(100vh-140px)]">
          <div className="flex items-center justify-between mb-6 relative" ref={dropdownRef}>
            <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">Audit Logs</h3>
            
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#D0D5DD] bg-[#F9FAFB] cursor-pointer"
            >
              <Image src={filterIcon} alt="Filter"/>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-[180px] rounded-xl bg-white p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#E2E8F0]">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilterType(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full rounded-lg px-4 py-2.5 text-left text-[14px] font-medium transition-colors mb-1 last:mb-0 ${
                      filterType === option 
                        ? "bg-[#257BFC] text-white" 
                        : "text-[#111827] hover:bg-neutral-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full overflow-x-auto rounded-xl border border-[#D0D5DD]">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-[#F9FAFB]">
                <tr className="border-b border-[#D0D5DD]">
                  <th className="py-2.5 pl-6 pr-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Timestamp</th>
                  <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Employee</th>
                  <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Description</th>
                  <th className="py-2.5 px-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">IP Address</th>
                  <th className="py-2.5 pr-6 pl-4 text-[14px] 2xl:text-[16px] font-normal text-[#111827]">Event Type</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredLogs.map((log, index) => (
                  <tr key={`${log.id}-${index}`} className="border-b border-[#E2E8F0] last:border-none hover:bg-neutral-50 transition-colors">
                    <td className="py-6.5 pl-6 pr-4 text-[14px] text-[#111827] whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-6.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12.5 w-12.5 overflow-hidden rounded-full shrink-0">
                          <img src={log.avatar} alt={log.employeeName} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-[14px] text-[#111827] whitespace-nowrap">{log.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-6.5 px-4 text-[14px] text-[#111827] max-w-[400px] truncate" title={log.description}>{log.description}</td>
                    <td className="py-6.5 px-4 text-[14px] text-[#111827]">{log.ipAddress}</td>
                    <td className="py-6.5 pr-6 pl-4">
                      <EventPill type={log.eventType} />
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#475467]">No audit logs found for this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
