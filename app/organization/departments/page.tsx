"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { useDepartments } from "@/hooks/useDepartments";
import { useEmployees } from "@/hooks/useEmployees";

import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-popup.svg";

export default function DepartmentsPage() {
  const { departments, addDepartment, removeDepartment } = useDepartments();
  const { employees } = useEmployees();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<string | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptCode, setNewDeptCode] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDelete = () => {
    if (deptToDelete) {
      removeDepartment(deptToDelete);
      setDeleteModalOpen(false);
      setDeptToDelete(null);
    }
  };

  const handleCreateDepartment = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newDeptName) newErrors.newDeptName = "Please enter department name";
    if (!newDeptCode) newErrors.newDeptCode = "Please enter department code";
    if (!selectedManagerId) newErrors.selectedManagerId = "Please select a manager";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addDepartment({
      id: `D${Math.floor(Math.random() * 1000)}`,
      name: newDeptName,
      code: newDeptCode,
      managerId: selectedManagerId,
      employeeCount: 0,
    });

    setCreateModalOpen(false);
    setNewDeptName("");
    setNewDeptCode("");
    setSelectedManagerId("");
  };

  const selectedManager = employees.find((emp) => emp.id === selectedManagerId);

  return (
    <DashboardLayout title="Departments" subtitle="Home/ Departments">
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 lg:p-5 p-3">
            <h2 className="md:text-[20px] text-[16px] font-bold text-neutral-900">
              Departments List
            </h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <div className="relative 2xl:w-75 lg:w-60 md:w-50 w-32">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search.."
                />
              </div>

              {/* Filter Button */}
              <button className="flex md:h-[42px] md:w-[42px] h-[35px] w-[35px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50">
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>

              {/* Add Department Button */}
              <button 
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-1 md:gap-2 rounded-xl cursor-pointer bg-[#257BFC] p-2 md:px-2.5 md:py-3 lg:px-5 text-[12px] md:text-[13px] lg:text-[14px] font-semibold text-white transition hover:bg-blue-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Department
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-3 2xl:p-6">
            <table className="min-w-full w-full text-left">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="py-3 sm:py-4 2xl:pl-6 pl-3 md:pr-4 pr-11 text-[12px] sm:text-[13px] 2xl:text-[14px] font-semibold text-neutral-900 whitespace-nowrap rounded-tl-xl border-b border-neutral-200 w-[25%]">
                    Department Name
                  </th>
                  <th className="py-3 sm:py-4 md:pr-4 pr-11 text-[12px] sm:text-[13px] 2xl:text-[14px] font-semibold text-neutral-900 whitespace-nowrap border-b border-neutral-200 w-[15%]">
                    Code
                  </th>
                  <th className="py-3 sm:py-4 md:pr-4 pr-11 text-[12px] sm:text-[13px] 2xl:text-[14px] font-semibold text-neutral-900 whitespace-nowrap border-b border-neutral-200 w-[35%]">
                    Manager
                  </th>
                  <th className="py-3 sm:py-4 md:pr-4 pr-11 text-[12px] sm:text-[13px] 2xl:text-[14px] font-semibold text-neutral-900 whitespace-nowrap border-b border-neutral-200 w-[15%]">
                    Employee count
                  </th>
                  <th className="py-3 sm:py-4 md:pr-4 pr-11 text-[12px] sm:text-[13px] 2xl:text-[14px] font-semibold text-neutral-900 whitespace-nowrap border-b border-neutral-200 rounded-tr-xl w-[10%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => {
                  const manager = employees.find((e) => e.id === dept.managerId);
                  return (
                    <tr key={dept.id} className="group transition-colors hover:bg-neutral-50 border-b border-neutral-100 last:border-0">
                      <td className="md:py-4 py-2 2xl:pl-6 pl-3 md:pr-4 pr-18 text-[12px] sm:text-[13px] 2xl:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                        {dept.name}
                      </td>
                      <td className="md:py-4 py-2 md:pr-4 pr-18 text-[12px] sm:text-[13px] 2xl:text-[14px] font-medium text-neutral-900">
                        {dept.code}
                      </td>
                      <td className="py-4 md:pr-4 pr-18">
                        {manager ? (
                          <div className="flex items-center gap-3">
                            <img src={manager.avatar} alt={manager.name} className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <p className="md:text-[14px] text-[12px] font-semibold text-neutral-900 leading-tight">{manager.name}</p>
                              <p className="md:text-[12px] text-[10px] text-[#98A2B3] leading-tight mt-0.5">{manager.role}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-[12px] sm:text-[13px] 2xl:text-[14px] font-medium text-neutral-900 whitespace-nowrap">
                        {dept.employeeCount} Employees
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button className="text-neutral-400 hover:text-brand-500 transition-colors">
                            <Image src={editIcon} alt="Edit" width={20} height={20} className="pointer-events-none opacity-60 hover:opacity-100" />
                          </button>
                          <button
                            onClick={() => {
                              setDeptToDelete(dept.id);
                              setDeleteModalOpen(true);
                            }}
                            className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Image src={deleteIcon} alt="Delete" width={20} height={20} className="pointer-events-none opacity-60 hover:opacity-100" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-neutral-500">
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-[420px] rounded-xl bg-white p-6 text-center shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            <div className="mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#FDEAEA]">
              <Image src={deleteRedIcon} alt="Delete" className="pointer-events-none" />
            </div>
            <h3 className="mx-auto mb-6 max-w-[275px] text-[16px] font-semibold leading-[22px] text-[#1D2939]">
              Are you sure you want to delete this <br /> Department?
            </h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => { setDeleteModalOpen(false); setDeptToDelete(null); }}
                className="w-full rounded-xl border border-[#344054] bg-white px-6 py-3 text-[16px] font-semibold cursor-pointer leading-none text-[#344054] transition hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl px-6 py-3 text-[16px] font-semibold leading-none text-white bg-[#F04438] cursor-pointer transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Department Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4">
          <div className="w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[20px] font-bold text-neutral-900">Create New Department</h2>
              <button onClick={() => setCreateModalOpen(false)} className="text-neutral-400 hover:text-neutral-900">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-neutral-900 mb-1">Basic Information</h3>
              <p className="text-[12px] text-neutral-500">Provide essential details to define and identify the department.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[13px] font-semibold text-neutral-900 mb-1.5">Department Name</label>
                <input
                  type="text"
                  value={newDeptName}
                  onChange={(e) => { setNewDeptName(e.target.value); setErrors(prev => ({...prev, newDeptName: ""})) }}
                  className={`w-full rounded-xl border ${errors.newDeptName ? 'border-red-500' : 'border-neutral-200'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500`}
                  placeholder="Engineering"
                />
                {errors.newDeptName && <p className="text-red-500 text-xs mt-1">{errors.newDeptName}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-neutral-900 mb-1.5">Department Code</label>
                <input
                  type="text"
                  value={newDeptCode}
                  onChange={(e) => { setNewDeptCode(e.target.value); setErrors(prev => ({...prev, newDeptCode: ""})) }}
                  className={`w-full rounded-xl border ${errors.newDeptCode ? 'border-red-500' : 'border-neutral-200'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-neutral-500`}
                  placeholder="Enter Department Code"
                />
                {errors.newDeptCode && <p className="text-red-500 text-xs mt-1">{errors.newDeptCode}</p>}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[13px] font-semibold text-neutral-900 mb-1.5">Department Manager</label>
              <select
                value={selectedManagerId}
                onChange={(e) => { setSelectedManagerId(e.target.value); setErrors(prev => ({...prev, selectedManagerId: ""})) }}
                className={`w-full rounded-xl border ${errors.selectedManagerId ? 'border-red-500' : 'border-neutral-200'} px-4 py-2.5 text-[14px] outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-neutral-500 bg-white`}
              >
                <option value="">Select a Manager...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                ))}
              </select>
              {errors.selectedManagerId && <p className="text-red-500 text-xs mt-1">{errors.selectedManagerId}</p>}

              {selectedManager && (
                <div className="mt-4 rounded-xl border border-neutral-100 bg-[#F8FAFC] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={selectedManager.avatar} alt={selectedManager.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <h4 className="text-[16px] font-bold text-neutral-900">{selectedManager.name}</h4>
                      <p className="text-[13px] text-neutral-500">{selectedManager.role}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FF] px-3 py-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#257BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-[12px] font-semibold text-brand-500">Department Head</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-neutral-300 bg-white text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateDepartment}
                className="px-6 py-2.5 rounded-xl bg-[#257BFC] text-[14px] font-semibold text-white hover:bg-blue-600 transition cursor-pointer"
              >
                Create Department
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}