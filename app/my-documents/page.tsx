"use client";

import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "@/Component/UI/CustomSelect";
import filterIcon from "@/assets/images/icons/filter.svg";
import viewIcon from "@/assets/images/icons/eye-view.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

const documentsData = [
  { id: 1, name: "Payslip - April 2026", period: "Apr 2026", date: "5 Apr 2026", size: "184 KB", status: "New" },
  { id: 2, name: "Payslip - March 2026", period: "Mar 2026", date: "5 Mar 2026", size: "184 KB", status: "Available" },
  { id: 3, name: "Payslip - February 2026", period: "Feb 2026", date: "5 Feb 2026", size: "184 KB", status: "Available" },
  { id: 4, name: "Payslip - January 2026", period: "Jan 2026", date: "5 Feb 2026", size: "184 KB", status: "Available" },
  { id: 5, name: "P60 - Tax Year 2024/25", period: "2023/24", date: "5 Feb 2026", size: "184 KB", status: "Available" },
  { id: 6, name: "Employment Contract", period: "Permanent", date: "5 Feb 2026", size: "184 KB", status: "Signed" },
  { id: 7, name: "NDA - Confidentiality Agreement", period: "Permanent", date: "5 Feb 2026", size: "184 KB", status: "Signed" },
  { id: 8, name: "Salary Review Letter 2026", period: "2026", date: "5 Feb 2026", size: "184 KB", status: "New" },
  { id: 9, name: "Employee Handbook v4.2", period: "2026", date: "5 Feb 2026", size: "184 KB", status: "Approved" },
  { id: 10, name: "Health & Safety Acknowledgement", period: "2026", date: "5 Jan 2026", size: "184 KB", status: "Action needed" },
];

export default function MyDocumentsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2026");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'text-[#07265C] bg-[#EAF2FF]';
      case 'Available': return 'text-[#4DB949] bg-[#EDFAF2]';
      case 'Signed': return 'text-[#775AF4] bg-[#F0ECFE]';
      case 'Approved': return 'text-[#22c55e] bg-green-50';
      case 'Action needed': return 'text-[#FFA100] bg-[#FFF6E8]';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const filteredData = activeFilter === "All" 
    ? documentsData 
    : documentsData.filter(doc => {
        if (activeFilter === "Payslips") return doc.name.includes("Payslip");
        if (activeFilter === "P60") return doc.name.includes("P60");
        if (activeFilter === "Contracts") return doc.name.includes("Contract") || doc.name.includes("NDA");
        if (activeFilter === "HR Documents") return doc.name.includes("Handbook") || doc.name.includes("Acknowledgement") || doc.name.includes("Letter");
        return true;
      });

  return (
    <DashboardLayout title="Dashboard" subtitle={<><Link href="/dashboard" className="text-[#98A2B3] hover:text-brand-500 transition-colors">Home</Link> <span className="text-[#98A2B3]">/</span> <span className="text-[#111827]">My Documents</span></>}>
      <div className={`p-4 xl:p-6 ${lexendDeca.className}`}>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">My Documents</h2>
            
            <div className="grid grid-cols-2 md:flex items-center xl:gap-6 md:gap-4 gap-2 w-full md:w-auto">  
              <div className="relative flex-1 md:flex-none">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full xl:w-[360px] h-10 pl-10 pr-4 rounded-xl border border-neutral-200 text-[14px] outline-none focus:border-[#257BFC] transition-colors"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>

              <div className="w-[120px]">
                <CustomSelect 
                  options={[{ value: '2026', label: '2026' }, { value: '2025', label: '2025' }]}
                  value={selectedYear}
                  onChange={(val) => setSelectedYear(val)}
                />
              </div>

              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="h-11 w-11 flex items-center justify-center rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors text-neutral-600 cursor-pointer"
                >
                  <Image src={filterIcon} alt="Filter" />
                </button>

                {filterOpen && (
                  <div className="absolute md:right-0 right-[-65%] top-12 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {["All", "Payslips", "P60", "Contracts", "HR Documents"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveFilter(item);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                          activeFilter === item 
                            ? "bg-[#257BFC] text-white" 
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#D0D5DD] rounded-xl">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#D0D5DD] bg-[#F9FAFB] text-left">
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Document</th>
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Period</th>
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Date</th>
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Size</th>
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Status</th>
                  <th className="py-2.5 xl:px-6 px-4 md:text-[16px] text-[14px] font-normal text-[#111827]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((doc) => (
                  <tr key={doc.id} className="border-b border-[#D0D5DD]">
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4 md:text-[14px] text-[12px] font-normal text-[#111827]">{doc.name}</td>
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4 md:text-[14px] text-[12px] font-normal text-[#111827]">{doc.period}</td>
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4 md:text-[14px] text-[12px] font-normal text-[#111827]">{doc.date}</td>
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4 md:text-[14px] text-[12px] font-normal text-[#111827]">{doc.size}</td>
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4">
                      <span className={`md:px-3.5 px-2.5 md:py-2.5 py-1.5 rounded-full text-[12px] 2xl:text-[14px] font-normal inline-flex ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="xl:py-5 md:py-4 py-3 xl:px-6 px-4">
                      <div className="flex items-center gap-3 text-neutral-400">
                        <button className="hover:text-brand-500 transition-colors cursor-pointer">
                          <Image src={viewIcon} alt="View" />
                        </button>
                        <button className="cursor-pointer text-[#111827]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button>
                      </div>
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
