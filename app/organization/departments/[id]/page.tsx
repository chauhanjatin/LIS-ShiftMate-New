"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import CustomSelect from '@/Component/UI/CustomSelect';
import { useDepartments } from "@/hooks/useDepartments";
import { useEmployees } from "@/hooks/useEmployees";
import { Lexend_Deca } from "next/font/google";

import backArrow from "@/assets/images/icons/back-arrow.svg";
import searchIcon from "@/assets/images/icons/search.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import deleteRedIcon from "@/assets/images/icons/delete-popup.svg";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export default function DepartmentDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { departments } = useDepartments();
  const { employees } = useEmployees();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const department = useMemo(() => departments.find(d => d.id === id), [departments, id]);
  const manager = useMemo(() => employees.find(e => e.id === department?.managerId), [employees, department]);
  
  // Actually find all employees for this department. 
  // In our mock data, they might not match exactly, so we will filter by dept === department.name, 
  // but if that fails, we can just show all employees as a fallback for the UI demo.
  const deptEmployees = useMemo(() => {
    if (!department) return [];
    const filtered = employees.filter(e => e.dept === department.name);
    return filtered.length > 0 ? filtered : employees.slice(0, department.employeeCount || 5);
  }, [employees, department]);

  const filteredEmployees = deptEmployees;
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(paginatedEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + rowsPerPage);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <Link href="/organization/departments" className="hover:text-brand-500 transition-colors">Departments</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">{department?.name || 'Edit Department'}</span>
    </span>
  );

  if (!department) {
    return (
      <DashboardLayout title="Departments" subtitle={breadcrumb}>
        <div className="p-6">Department not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Departments" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>
        <Link href="/organization/departments">
          <div className="flex items-center gap-2 cursor-pointer mb-4 w-fit">
            <Image src={backArrow} alt="back" />
            <p className="text-[#111827] font-normal text-[16px]">Back</p>
          </div>
        </Link>
        
        <div className="flex flex-col xl:flex-row 2xl:gap-6 md:gap-4 gap-8 min-h-[800px] border border-[#D0D5DD] bg-white rounded-xl md:p-6 p-4">
          <div className="w-full 2xl:w-[320px] xl:w-[280px] shrink-0">
            <h2 className="md:text-[24px] text-[18px] font-semibold text-[#111827] mb-4">{department.name}</h2>
            
            <div className="border border-[#D0D5DD] rounded-xl bg-[#F9FAFB] md:p-6 p-4 text-center flex flex-col items-center justify-center mb-6">
              {manager ? (
                <>
                  <img src={manager.avatar} alt={manager.name} className="w-[100px] h-[100px] rounded-full object-cover shadow-sm mb-4" />
                  <h3 className="md:text-[24px] text-[18px] font-medium text-[#111827] leading-tight md:mb-2 mb-1">{manager.name}</h3>
                  <p className="md:text-[14px] text-[12px] text-[#98A2B3] font-normal leading-tight">{department.name} Manager</p>
                </>
              ) : (
                <div className="text-center text-[#9CA3AF]">No Manager Assigned</div>
              )}
            </div>

            <div className="md:space-y-6 px-1 space-y-4">
              <div>
                <p className="text-[14px] text-[#98A2B3] md:mb-2">Manager</p>
                <p className="md:text-[20px] text-[16px] font-medium text-[#111827]">{manager ? manager.name : '-'}</p>
              </div>
              <div>
                <p className="text-[14px] text-[#98A2B3] md:mb-2">Department Code</p>
                <p className="md:text-[20px] text-[16px] font-medium text-[#111827]">{department.code}</p>
              </div>
              <div>
                <p className="text-[14px] text-[#98A2B3] md:mb-2">Established</p>
                <p className="md:text-[20px] text-[16px] font-medium text-[#111827]">March, 2019</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col md:border-l md:border-[#E4E7EC] md:pl-6">
            <div className="flex flex-wrap items-center justify-between mb-2 md:mb-0">
              <h2 className="md:text-[20px] text-[13px] font-medium text-[#111827]">
                All Employees <span className="text-[#111827] mx-1">•</span> {department.name}
              </h2>

              <div className="flex items-center mt-3 md:mt-0">
                <span className="text-[16px] font-bold text-[#111827]">Total : {filteredEmployees.length}</span>
              </div>
            </div>

            <div className="2xl:py-6 flex-1 flex flex-col">
              <div className="rounded-xl border border-[#D0D5DD] bg-white overflow-hidden flex-1">
                <div className="overflow-x-auto">
                  <table className="min-w-full w-full text-left border-collapse">
                    <thead className="bg-[#F9FAFB]">
                      <tr>
                        <th className="py-[10px] 3xl:pl-4 2xl:pl-6 pl-3 md:pr-4 pr-11 text-[16px] font-normal text-[#2E334E] whitespace-nowrap rounded-tl-xl border-b border-[#E2E8F0] w-[5%]">
                           <div className="flex items-center justify-center">
                              <input 
                                type="checkbox" 
                                checked={paginatedEmployees.length > 0 && selectedEmployees.length === paginatedEmployees.length}
                                onChange={handleSelectAll}
                                className="appearance-none h-4 w-4 rounded-[4px] border border-[#D0D5DD] bg-white checked:border-transparent checked:bg-[#257BFC] checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%203L4.5%208.5L2%206%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0" />
                           </div>
                        </th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">ID</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">Name</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">Job Title</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">Employment Type</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">Status</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD]">Joining Date</th>
                        <th className="py-[10px] md:pr-4 pr-11 3xl:text-[14px] md:text-[16px] text-[14px] font-normal text-[#111827] whitespace-nowrap border-b border-[#D0D5DD] rounded-tr-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {paginatedEmployees.map((emp) => (
                        <tr key={emp.id} className="group transition-colors hover:bg-neutral-50 border-b border-[#D0D5DD]">
                          <td className="md:py-4 py-2 3xl:pl-2 2xl:pl-6 pl-3 3xl:pr-2 md:pr-4 pr-11">
                            <div className="flex items-center justify-center">
                               <input 
                                 type="checkbox" 
                                 checked={selectedEmployees.includes(emp.id)}
                                 onChange={() => handleSelect(emp.id)}
                                 className="appearance-none h-4 w-4 rounded-[4px] border border-[#D0D5DD] bg-white checked:border-transparent checked:bg-[#257BFC] checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%203L4.5%208.5L2%206%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0" />
                            </div>
                          </td>
                          <td className="md:py-4 py-2 md:pr-4 pr-11 3xl:text-[13px] md:text-[14px] text-[13px] font-medium text-[#111827]">{emp.id}</td>
                          <td className="md:py-4 py-2 md:pr-4 pr-16">
                            <Link href={`/employees/${emp.id}`} className="flex items-center gap-3 cursor-pointer transition-colors">
                              <img src={emp.avatar} alt={emp.name} className="h-9 w-9 rounded-full object-cover" />
                              <p className="3xl:text-[13px] md:text-[14px] text-[13px] font-medium text-[#111827]">{emp.name}</p>
                            </Link>
                          </td>
                          <td className="md:py-4 py-2 md:pr-4 pr-11 3xl:text-[13px] md:text-[14px] text-[13px] font-medium text-[#111827]">{emp.role}</td>
                          <td className="md:py-4 py-2 md:pr-4 pr-11 3xl:text-[13px] md:text-[14px] text-[13px] font-medium text-[#111827]">{emp.type || 'Full-Time'}</td>
                          <td className="md:py-4 py-2 md:pr-4 pr-11">
                            <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 3xl:text-[13px] md:text-[14px] text-[13px] font-normal capitalize whitespace-nowrap ${emp.status === 'Active' ? 'bg-[#EDFAF2] text-[#37AB3F]' : emp.status === 'Inactive' ? 'bg-[#FEE2E2] text-[#EF4444]' : 'bg-[#FFF6E8] text-[#FFA100]'}`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="md:py-4 py-2 md:pr-4 pr-11 3xl:text-[13px] md:text-[14px] text-[13px] font-medium text-[#111827]">01/15/2023</td>
                          <td className="md:py-4 py-2 3xl:pr-2 md:pr-4 pr-11">
                            <div className="flex items-center 3xl:gap-2 md:gap-3 gap-1">
                              <button className="cursor-pointer hover:opacity-80 transition-opacity">
                                <Image src={editIcon} alt="Edit" width={20} height={20} />
                              </button>
                              <button className="cursor-pointer hover:opacity-80 transition-opacity">
                                <Image src={deleteIcon} alt="Delete" width={20} height={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {paginatedEmployees.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-sm text-neutral-500">
                            No employees found in this department.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between sm:justify-end py-4 mt-2 overflow-x-auto w-full whitespace-nowrap gap-2 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] sm:text-[14px] text-neutral-500">Rows per page:</span>
                  <div className="w-[70px] sm:w-[80px]">
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
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <span className="text-[12px] sm:text-[14px] text-neutral-500">
                    {filteredEmployees.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}` : '0-0 of 0'}
                  </span>
                  <div className="flex items-center gap-1">
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
