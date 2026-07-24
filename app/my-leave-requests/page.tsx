"use client";

import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import CustomSelect from "@/Component/UI/CustomSelect";
import Toast from "@/Component/UI/Toast";
import RequestLeaveModal from "@/Component/ESSP/RequestLeaveModal";
import annualLeave from "@/assets/images/icons/plane.svg";
import sickLeave from "@/assets/images/icons/sick-pay.svg";
import parentalLeave from "@/assets/images/icons/paternity-pay.svg";
import studyLeave from "@/assets/images/icons/graduation-cap.svg";
import filterIcon from "@/assets/images/icons/filter.svg";


const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

const leaveHistoryData = [
  { id: 1, type: "Annual Leave", start: "12 May 2026", end: "16 May 2026", totalDays: "05", requestDate: "02 Apr 2026", status: "Approved" },
  { id: 2, type: "Sick Leave", start: "28 Apr 2026", end: "29 Apr 2026", totalDays: "02", requestDate: "18 Apr 2026", status: "Approved" },
  { id: 3, type: "Annual Leave", start: "22 Jun 2026", end: "26 Jun 2026", totalDays: "05", requestDate: "01 May 2026", status: "Cancelled" },
  { id: 4, type: "Study Leave", start: "10 Jul 2026", end: "10 Jul 2026", totalDays: "01", requestDate: "04 May 2026", status: "Pending" },
  { id: 5, type: "Annual Leave", start: "03 Mar 2026", end: "07 Mar 2026", totalDays: "05", requestDate: "10 Feb 2026", status: "Rejected" },
  { id: 6, type: "Annual Leave", start: "15 Feb 2026", end: "16 Feb 2026", totalDays: "02", requestDate: "01 Feb 2026", status: "Approved" },
];

function MyLeaveRequestsContent() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("toast") === "true") {
      setShowToast(true);
      router.replace("/my-leave-requests");
    }
  }, [searchParams, router]);

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
      case 'Approved': return 'text-[#4DB949] bg-[#EDFAF2]';
      case 'Pending': return 'text-[#FFA100] bg-[#FFF6E8]';
      case 'Rejected': return 'text-[#EF4444] bg-[#FEE2E2]';
      case 'Cancelled': return 'text-[#07265C] bg-[#EAF2FF]';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const filteredData = activeFilter === "All"
    ? leaveHistoryData
    : leaveHistoryData.filter(req => req.status === activeFilter);

  const handleSubmitRequest = () => {
    setIsModalOpen(false);
    setShowToast(true);
  };

  return (
    <DashboardLayout title="Dashboard" subtitle={<><Link href="/dashboard" className="text-[#98A2B3] hover:text-brand-500 transition-colors">Home</Link> <span className="text-[#98A2B3]">/</span> <span className="text-[#111827]">My Leave & Requests</span></>}>
      <div className={`p-4 xl:p-6 ${lexendDeca.className} relative`}>

        <div className="bg-white xl:p-6 p-4 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[
              { name: "Annual Leave", value: "16", total: "28", used: "12 days used this year", color: "#4DB949", icon: <Image src={annualLeave} alt="Annual Leave" /> },
              { name: "Sick Leave", value: "8", total: "10", used: "2 days used this year", color: "#34AFF5", icon: <Image src={sickLeave} alt="Sick Leave" /> },
              { name: "Parental", value: "14", total: "14", used: "0 days used this year", color: "#FFA100", icon: <Image src={parentalLeave} alt="Parental Leave" /> },
              { name: "Study Leave", value: "4", total: "5", used: "1 days used this year", color: "#775AF4", icon: <Image src={studyLeave} alt="Study Leave" /> },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-[16px] md:p-5 p-4 border border-[#E4E7EC] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[14px] font-medium text-[#111827] mb-2">{stat.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[32px] font-semibold text-[#111827] leading-none">{stat.value}</span>
                      <span className="text-[14px] text-[#98A2B3]">/ {stat.total} days left</span>
                    </div>
                  </div>
                  <div className="md:w-[54px] md:h-[54px] w-[45px] h-[45px] rounded-[14px] flex items-center justify-center shrink-0" style={{ backgroundColor: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="h-[6px] w-full bg-[#F2F4F7] rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#257BFC] rounded-full transition-all" style={{ width: `${(Number(stat.value) / Number(stat.total)) * 100}%` }}></div>
                </div>
                <p className="text-[14px] font-medium text-[#98A2B3]">{stat.used}</p>
              </div>
            ))}
          </div>

          {/* Content Box */}
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
              <h2 className="lg:text-[18px] text-[20px] 2xl:text-[20px] font-medium text-[#111827]">Leave Request History</h2>

              <div className="flex flex-wrap lg:flex-nowrap items-center xl:gap-6 gap-3 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-[140px] lg:w-[150px] xl:w-[360px] h-10 pl-10 pr-4 rounded-xl border border-neutral-200 text-[14px] outline-none focus:border-[#257BFC] transition-colors"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                </div>

                <div className="w-[100px] block">
                  <CustomSelect
                    options={[{ value: '2026', label: '2026' }, { value: '2025', label: '2025' }]}
                    value={selectedYear}
                    onChange={(val) => setSelectedYear(val)}
                  />
                </div>

                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors text-neutral-600 cursor-pointer"
                  >
                    <Image src={filterIcon} alt="Filter" />
                  </button>

                  {filterOpen && (
                    <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {["All", "Pending", "Approved", "Rejected", "Cancelled"].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setActiveFilter(item);
                            setFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${activeFilter === item
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

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="h-10 px-4 flex items-center gap-2 rounded-xl bg-[#257BFC] hover:bg-blue-600 transition-colors text-white xl:text-[14px] text-[13px] font-semibold cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Request Leave
                </button>
              </div>
            </div>

            <div className="overflow-x-auto w-full border border-[#D0D5DD] rounded-xl">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#D0D5DD] bg-[#F9FAFB] text-left">
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">Type</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">Start Date</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">End Date</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">Total Days</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">Request Date</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827]">Status</th>
                    <th className="py-3 px-6 xl:text-[16px] text-[14px] font-normal text-[#111827] text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((req) => (
                    <tr key={req.id} className="border-b border-[#D0D5DD] hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-6 xl:text-[14px] text-[12px] text-[#111827]">{req.type}</td>
                      <td className="py-4 px-6 xl:text-[14px] text-[12px] text-[#111827]">{req.start}</td>
                      <td className="py-4 px-6 xl:text-[14px] text-[12px] text-[#111827]">{req.end}</td>
                      <td className="py-4 px-6 xl:text-[14px] text-[12px] text-[#111827]">{req.totalDays}</td>
                      <td className="py-4 px-6 xl:text-[14px] text-[12px] text-[#111827]">{req.requestDate}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3.5 py-2.5 rounded-full xl:text-[14px] text-[12px] font-medium inline-flex ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          {req.status === 'Pending' ? (
                            <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[#EF4444] border border-[#EF4444] hover:bg-[#FEE2E2] transition-colors">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          ) : (
                            <span className="w-8 flex justify-center text-[#111827]">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <RequestLeaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitRequest}
        />

        <Toast
          show={showToast}
          message="Annual Leave request submitted successfully"
          onClose={() => setShowToast(false)}
        />

      </div>
    </DashboardLayout>
  );
}

export default function MyLeaveRequestsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyLeaveRequestsContent />
    </Suspense>
  );
}
