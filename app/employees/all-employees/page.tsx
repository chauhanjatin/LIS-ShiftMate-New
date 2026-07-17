"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import CustomSelect from '@/Component/UI/CustomSelect';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import appRectangleIcon from "@/assets/images/icons/apps-rectangle.svg";
import listViewIcon from "@/assets/images/icons/list-view-circle.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-popup.svg";
import deleteredIcon from "@/assets/images/icons/delete-red.svg"
import Link from "next/link";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee, Status } from "@/Data/employees";
import { Lexend_Deca } from "next/font/google";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

function StatusPill({ status }: { status: Status }) {
  const styles = {
    Active: "bg-[#EAF9EA] text-[#4DB949]",
    "On Leave": "bg-[#FFF6E8] text-[#FFA100]",
    Inactive: "bg-[#FFE8E8] text-[#EF4444]",
  };
  return (
    <span
      className={`inline-flex rounded-full px-4 py-1.5 text-[12px] md:text-[14px] font-normal ${styles[status]}`}
    >
      {status === "Inactive" ? "In Active" : status}
    </span>
  );
}

export default function AllEmployeesPage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const { employees: employeesList, setEmployees: setEmployeesList, removeEmployee } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => {
    if (filterOpen) setFilterOpen(false);
  });

  const filteredEmployees = employeesList.filter((emp) => 
    selectedDepartment === "All Departments" ? true : emp.dept === selectedDepartment
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + rowsPerPage);

  const allSelected = paginatedEmployees.length > 0 && selectedEmployees.length === paginatedEmployees.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(paginatedEmployees.map((emp) => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (employeeToDelete) {
      removeEmployee(employeeToDelete);
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <DashboardLayout title="Employees" subtitle="Home/ All Employees">

      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
            <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Employee List</h2>

            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
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
                  placeholder="Search"
                />
              </div>

              <div className="relative" ref={filterRef}>
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
                  <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E2E8F0] p-2 z-50">
                    {["All Departments", "Engineering", "Sales", "Marketing", "HR", "Finance"].map((dept) => (
                      <div
                        key={dept}
                        onClick={() => {
                          setSelectedDepartment(dept);
                          setFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-2 rounded-lg cursor-pointer text-[14px] font-normal mb-1 ${
                          selectedDepartment === dept
                            ? "bg-[#257BFC] text-white"
                            : "hover:bg-neutral-50 text-neutral-700"
                        }`}
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {view === "list" ? (
                <button
                  onClick={() => setView("grid")}
                  className="flex md:h-[42px] md:w-[42px] h-[38px] w-[38px] p-2 items-center justify-center rounded-xl border border-[#E2E8F0] text-neutral-600 transition hover:bg-neutral-50"
                >
                  <Image src={appRectangleIcon} alt="Grid View" width={24} height={24} className="cursor-pointer" />
                </button>
              ) : (
                <button
                  onClick={() => setView("list")}
                  className="flex h-[42px] w-[42px] p-2 items-center justify-center rounded-xl border border-[#E2E8F0] text-neutral-600 transition hover:bg-neutral-50"
                >
                  <Image src={listViewIcon} alt="List View" width={24} height={24} className="cursor-pointer" />
                </button>
              )}

              <Link href="/employees/add-employee">
                <button className="flex items-center gap-1 md:gap-2 rounded-xl bg-[#257BFC] px-2.5 py-2 2xl:px-5 md:py-3 text-[12px] 2xl:text-[16px] text-white transition hover:bg-blue-600 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Employee
                </button>
              </Link>
            </div>
          </div>

          {view === "list" ? (
            <div className="p-3 2xl:p-6">
              <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-[1100px] w-full text-left border-collapse">
                    <thead className="bg-[#F8F9FC]">
                      <tr>
                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pl-6 pl-3 pr-2 text-[12px] sm:text-[14px] 2xl:text-[16px] font-normal text-[#475467] whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-[#E2E8F0] text-brand-500 focus:ring-brand-500 cursor-pointer"
                          />
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Employee ID
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Name
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Department
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Job Title
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Employment Type
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Status
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Joining Date
                        </th>

                        <th className="border-b border-[#E2E8F0] px-4 py-4 sm:px-6 2xl:pr-6 pr-4 text-[13px] md:text-[14px] 2xl:text-[16px] font-normal text-[#111827] whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {paginatedEmployees.map((emp) => (
                        <tr
                          key={emp.id}
                          className="group transition-colors hover:bg-neutral-50"
                        >
                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 2xl:pl-6 pl-3 pr-2">
                            <input
                              type="checkbox"
                              checked={selectedEmployees.includes(emp.id)}
                              onChange={() => handleSelectEmployee(emp.id)}
                              className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                            />
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 text-[12px] sm:text-[14px] font-medium whitespace-nowrap">
                            {emp.id}
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6">
                            <Link href={`/employees/${emp.id}`}>
                              <div className="flex min-w-[180px] items-center gap-2 sm:gap-3 cursor-pointer hover:underline ">
                                <img
                                  src={emp.avatar}
                                  alt={emp.name}
                                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover flex-shrink-0"
                                />

                                <span className="text-[12px] md:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                                  {emp.name}
                                </span>
                              </div>
                            </Link>
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 text-[12px] md:text-[14px] whitespace-nowrap">
                            {emp.dept}
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 text-[12px] md:text-[14px] whitespace-nowrap">
                            {emp.role}
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 text-[12px] md:text-[14px] whitespace-nowrap">
                            {emp.type}
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 whitespace-nowrap">
                            <StatusPill status={emp.status} />
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 pr-6 text-[12px] md:text-[14px] whitespace-nowrap">
                            {emp.joinDate}
                          </td>

                          <td className="border-b border-[#E2E8F0] px-4 md:py-6 py-2 sm:px-6 md:pr-4 pr-2">
                            <div className="flex items-center gap-2 md:gap-3">
                              <Link href={`/employees/${emp.id}`}>
                                <button className="text-neutral-400 hover:text-brand-500 mt-2 cursor-pointer">
                                  <Image
                                    src={editIcon}
                                    alt="Filter"
                                    width={24}
                                    height={24}
                                    className="pointer-events-none h-6 w-8 md:h-6 md:w-6"
                                  />
                                </button>
                              </Link>

                              <button
                                onClick={() => {
                                  setEmployeeToDelete(emp.id);
                                  setDeleteModalOpen(true);
                                }}
                                className="text-neutral-400 hover:text-red-500 cursor-pointer"
                              >
                                <Image
                                  src={deleteIcon}
                                  alt="Delete"
                                  width={24}
                                  height={24}
                                  className="pointer-events-none h-6 w-8 md:h-6 md:w-6"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end px-2 sm:px-6 py-4">
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

                <span className="text-[12px] sm:text-[14px] text-neutral-500">
                  {employeesList.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, employeesList.length)} of ${employeesList.length}` : '0-0 of 0'}
                </span>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 p-3 sm:grid-cols-2 gap-4 sm:p-4 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-6 2xl:p-6">
              {paginatedEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="relative rounded-xl border border-[#E2E8F0] bg-white p-3 2xl:p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <StatusPill status={emp.status} />

                    <div className="relative">
                      <button onClick={() => setOpenDropdownId(openDropdownId === emp.id ? null : emp.id)} className="cursor-pointer text-black transition shrink-0 hover:bg-neutral-100 rounded-full p-1 border-none bg-transparent">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                      {openDropdownId === emp.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E2E8F0] p-1.5 z-50">
                           <Link href={`/employees/${emp.id}`}>
                             <div className="p-2 hover:bg-neutral-50 rounded-lg cursor-pointer text-[16px] text-[#111827] flex items-center gap-2 font-normal">
                               <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none" /> Edit
                             </div>
                           </Link>
                           <div onClick={() => { setEmployeeToDelete(emp.id); setDeleteModalOpen(true); setOpenDropdownId(null); }} className="p-2 hover:bg-red-50 rounded-lg cursor-pointer text-[14px] text-[#EF4444] flex items-center gap-2 font-medium">
                               <Image src={deleteredIcon} alt="Delete" width={24} height={24} className="pointer-events-none" /> Delete
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center text-center">
                    <div className="mb-4 h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:h-[88px] sm:w-[88px]">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <Link href={`/employees/${emp.id}`} className="hover:underline">
                      <h3 className="text-[14px] md:text-[16px] font-medium text-neutral-900 break-words">
                        {emp.name}
                      </h3>
                    </Link>

                    <p className="mt-1 text-[11px] md:text-[12px] text-[#98A2B3]">
                      EMP ID : {emp.id.replace("EMP", "")}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-300">
                    <div className="flex-1 border-r border-neutral-300 pt-4 text-center min-w-0">
                      <p className="2xl:text-[14px] xl:text-[13px] font-normal text-[#111827]">
                        Department
                      </p>

                      <p className="mt-1 truncate text-[11px] 2xl:text-[12px] font-normal text-[#98A2B3]">
                        {emp.dept}
                      </p>
                    </div>

                    <div className="h-8 w-px bg-neutral-100"></div>

                    <div className="flex-1 pt-4 text-center min-w-0">
                      <p className="2xl:text-[14px] xl:text-[13px] font-normal text-[#111827]">
                        Job Title
                      </p>

                      <p className="mt-1 truncate text-[11px] 2xl:text-[12px] font-normal text-[#98A2B3]">
                        {emp.role}
                      </p>
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
          <div className="max-w-[420px] rounded-xl bg-white p-6 text-center shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">

            <div className="mx-auto mb-7 flex items-center justify-center rounded-[16px]">
              <Image
                src={deleteRedIcon}
                alt="Delete"
                className="pointer-events-none"
              />
            </div>

            <h3 className="mx-auto mb-6 max-w-[290px] text-[16px] font-semibold leading-[22px] text-[#1D2939]">
              Are you sure you want to delete this <br /> Employee Record?
            </h3>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => { setDeleteModalOpen(false); setEmployeeToDelete(null); }}
                className="w-full rounded-xl border border-[#344054] bg-white px-6 py-3 text-[16px] font-semibold leading-none text-[#344054] overflow-hidden cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl px-6 py-3 text-[16px] font-semibold leading-none text-white bg-[#F04438] cursor-pointer"
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

