"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import appRectangleIcon from "@/assets/images/icons/apps-rectangle.svg";
import listViewIcon from "@/assets/images/icons/list-view-circle.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";

type Status = "Active" | "On Leave" | "Inactive";

interface Employee {
  id: string;
  name: string;
  dept: string;
  role: string;
  type: string;
  status: Status;
  joinDate: string;
  avatar: string;
}

const employees: Employee[] = [
  { id: "EMP001", name: "Cameron Williamson", dept: "Engineering", role: "Senior Developer", type: "Full Time", status: "Active", joinDate: "October 25, 2026", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "EMP002", name: "Devon Lane", dept: "Marketing", role: "Marketing Manager", type: "Part Time", status: "Active", joinDate: "March 13, 2026", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "EMP003", name: "Jane Cooper", dept: "Finance", role: "Financial Analyst", type: "Contract", status: "Active", joinDate: "August 24, 2026", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "EMP004", name: "Jane Cooper", dept: "Engineering", role: "Senior Developer", type: "Part Time", status: "On Leave", joinDate: "October 31, 2026", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "EMP005", name: "Jane Cooper", dept: "Marketing", role: "Marketing Manager", type: "Full Time", status: "Active", joinDate: "December 2, 2026", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "EMP006", name: "Jane Cooper", dept: "Finance", role: "Financial Analyst", type: "Contract", status: "Inactive", joinDate: "December 19, 2026", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: "EMP007", name: "Jane Cooper", dept: "Marketing", role: "Financial Analyst", type: "Full Time", status: "Active", joinDate: "November 28, 2026", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: "EMP008", name: "Jane Cooper", dept: "Engineering", role: "Senior Developer", type: "Contract", status: "Inactive", joinDate: "May 12, 2026", avatar: "https://i.pravatar.cc/150?u=8" },
  { id: "EMP009", name: "Jane Cooper", dept: "Marketing", role: "Marketing Manager", type: "Full Time", status: "Active", joinDate: "August 24, 2026", avatar: "https://i.pravatar.cc/150?u=9" },
];

function StatusPill({ status }: { status: Status }) {
  const styles = {
    Active: { bg: "#EAF9EA", text: "#4DB949" },
    "On Leave": { bg: "#FFF6E8", text: "#FFA100" },
    Inactive: { bg: "#FFE8E8", text: "#EF4444" },
  };
  return (
    <span 
      className="inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold"
      style={{ backgroundColor: styles[status].bg, color: styles[status].text }}
    >
      {status === "Inactive" ? "In Active" : status}
    </span>
  );
}

export default function AllEmployeesPage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <DashboardLayout title="Employees" subtitle="Home/ All Employees">
      <div className="flex-1 p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-neutral-100 p-5">
            <h2 className="text-[20px] font-bold text-neutral-900">Employee List</h2>

            <div className="flex items-center gap-6">
              <div className="relative w-75">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search"
                />
              </div>

              {/* Filter Button */}
              <button className="flex h-[42px] w-[42px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50">
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>

              {/* View Toggle */}
              <div className="flex h-[42px] items-center rounded-xl border border-neutral-200 bg-neutral-50 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`flex h-full w-[34px] items-center justify-center rounded-lg transition-colors ${view === "grid" ? "bg-white shadow-sm text-brand-500" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                  <Image src={appRectangleIcon}
                    alt="Filter"
                    width={24}
                    height={24}
                    className="pointer-events-none" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`flex h-full w-[34px] items-center justify-center rounded-lg transition-colors ${view === "list" ? "bg-white shadow-sm text-brand-500" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                  <Image src={listViewIcon}
                    alt="Filter"
                    width={24}
                    height={24}
                    className="pointer-events-none" />
                </button>
              </div>

              {/* Add Employee Button */}
              <button className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-5 py-3 text-[16px] text-white transition hover:bg-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Employee
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          {view === "list" ? (
            <div className="overflow-x-auto p-6">
              <table className="w-full text-left">
                <thead className="bg-white">
                  <tr>
                    <th className="border-b border-[#D0D5DD] py-4 pl-6 pr-2 text-[14px] font-semibold text-neutral-900">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#D0D5DD] text-brand-500 focus:ring-brand-500" />
                    </th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Employee ID</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Name</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Department</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Job Title</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Employment Type</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Status</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Joining Date</th>
                    <th className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-semibold text-neutral-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="group transition-colors hover:bg-neutral-50">
                      <td className="border-b border-[#D0D5DD] py-4 pl-6 pr-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500" />
                      </td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px] font-medium">{emp.id}</td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <img src={emp.avatar} alt={emp.name} className="h-9 w-9 rounded-full object-cover" />
                          <span className="text-[14px] font-medium text-neutral-900">{emp.name}</span>
                        </div>
                      </td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px]">{emp.dept}</td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px]">{emp.role}</td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px]">{emp.type}</td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6">
                        <StatusPill status={emp.status} />
                      </td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6 text-[14px]">{emp.joinDate}</td>
                      <td className="border-b border-[#D0D5DD] py-4 pr-6">
                        <div className="flex items-center gap-4">
                          <button className="text-neutral-400 hover:text-brand-500">
                            <Image src={editIcon}
                              alt="Filter"
                              width={24}
                              height={24}
                              className="pointer-events-none" />
                          </button>
                          <button onClick={() => setDeleteModalOpen(true)} className="text-neutral-400 hover:text-red-500">
                            <Image src={deleteIcon}
                              alt="Delete"
                              width={24}
                              height={24}
                              className="pointer-events-none" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-end gap-4 border-t border-neutral-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-neutral-500">Rows per page:</span>
                  <select className="rounded-lg border border-neutral-200 bg-white px-2 py-1 text-[14px] text-neutral-900 outline-none">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
                <span className="text-[14px] text-neutral-500">1-5 of 12</span>
                <div className="flex items-center gap-1">
                  <button className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {employees.map((emp) => (
                <div key={emp.id} className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <StatusPill status={emp.status} />
                    <button className="text-neutral-400 transition hover:text-neutral-900">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                  </div>

                  {/* Center Content */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <div className="mb-4 h-[88px] w-[88px] overflow-hidden rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                      <img src={emp.avatar} alt={emp.name} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="text-[16px] font-bold text-neutral-900">{emp.name}</h3>
                    <p className="mt-1 text-[13px] text-neutral-500">EMP ID : {emp.id.replace("EMP", "")}</p>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
                    <div className="flex-1 text-center">
                      <p className="text-[12px] font-medium text-neutral-400">Department</p>
                      <p className="mt-1 text-[14px] font-semibold text-neutral-900">{emp.dept}</p>
                    </div>
                    <div className="h-8 w-px bg-neutral-100"></div>
                    <div className="flex-1 text-center">
                      <p className="text-[12px] font-medium text-neutral-400">Job Title</p>
                      <p className="mt-1 text-[14px] font-semibold text-neutral-900">{emp.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-[24px] bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[20px] bg-[#FFE8E8]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <h3 className="mb-8 text-[20px] font-bold text-[#1A1C21] px-4">
              Are you sure you want to delete this Employee Record?
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 rounded-[14px] border border-[#D0D5DD] py-3.5 text-[16px] font-bold text-[#1A1C21] transition hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 rounded-[14px] bg-[#EF4444] py-3.5 text-[16px] font-bold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
