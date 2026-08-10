"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";
import editIcon from "@/assets/images/icons/edit.svg";
import deleteIcon from "@/assets/images/icons/delete.svg";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import pendingIcon from "@/assets/images/icons/pending-approval.svg";
import CustomSelect from "@/Component/UI/CustomSelect";
import { useClickOutside } from "@/hooks/useClickOutside";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

type ExpenseStatus = "Submitted" | "Under Review" | "Approved" | "Rejected";

interface Expense {
  id: string;
  employee: string;
  avatar: string;
  category: string;
  amount: string;
  date: string;
  status: ExpenseStatus;
}

const mockExpenses: Expense[] = [
  { id: "EXP-001", employee: "Jenny Wilson", avatar: "https://i.pravatar.cc/150?u=1", category: "Travel", amount: "$245.50", date: "5 Apr 2026", status: "Approved" },
  { id: "EXP-002", employee: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", category: "Meals", amount: "$67.80", date: "5 Apr 2026", status: "Approved" },
  { id: "EXP-003", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", category: "Accommodation", amount: "$189.00", date: "5 Apr 2026", status: "Under Review" },
  { id: "EXP-004", employee: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=4", category: "Equipment", amount: "$349.99", date: "5 Apr 2026", status: "Submitted" },
  { id: "EXP-005", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=5", category: "Other", amount: "$112.40", date: "5 Apr 2026", status: "Approved" },
  { id: "EXP-006", employee: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=6", category: "Travel", amount: "$43.20", date: "5 Apr 2026", status: "Approved" },
  { id: "EXP-007", employee: "Kristin Watson", avatar: "https://i.pravatar.cc/150?u=7", category: "Meals", amount: "$56.00", date: "5 Apr 2026", status: "Submitted" },
  { id: "EXP-008", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=8", category: "Other", amount: "$56.00", date: "5 Apr 2026", status: "Rejected" },
];

function StatusPill({ status }: { status: ExpenseStatus }) {
  const styles = {
    Approved: "bg-[#EAF9EA] text-[#4DB949]",
    "Under Review": "bg-[#FFF6E8] text-[#FFA100]",
    Submitted: "bg-[#EAF2FF] text-[#257BFC]",
    Rejected: "bg-[#FFE8E8] text-[#EF4444]",
  };
  return (
    <span className={`inline-flex rounded-full px-3.5 py-2.5 text-[12px] md:text-[14px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function ExpensesListPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: "", amount: "", date: "", category: "", description: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.type) errors.type = "Required";
    if (!formData.amount) errors.amount = "Required";
    if (!formData.date) errors.date = "Required";
    if (!formData.category) errors.category = "Required";
    if (!receiptFile) errors.receiptFile = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitExpense = () => {
    if (validateForm()) {
      // Mock submit
      setIsSubmitModalOpen(false);
      setFormData({ type: "", amount: "", date: "", category: "", description: "" });
      setReceiptFile(null);
    }
  };

  const filterRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => {
    if (filterOpen) setFilterOpen(false);
  });

  const filteredExpenses = expenses.filter(exp =>
    activeFilter === "All" ? true : exp.status === activeFilter
  );

  const totalPages = Math.ceil(filteredExpenses.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + rowsPerPage);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Expenses List</span>
    </span>
  );

  return (
    <DashboardLayout title="Expenses Management" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>

        <div className="bg-white p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl border border-[#D0D5DD] p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">$1,842</h2>
                <p className="text-[14px] font-medium text-[#111827]">Total Submitted</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#257BFC] flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
            </div>
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">$634</h2>
                <p className="text-[14px] font-medium text-[#111827]">Pending Approval</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#8B5CF6] flex items-center justify-center">
                <Image src={pendingIcon} alt="Pending" width={24} height={24} className="brightness-0 invert" />
              </div>
            </div>
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">$1,208</h2>
                <p className="text-[14px] font-medium text-[#111827]">Approved This Month</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#4DB949] flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">$0</h2>
                <p className="text-[14px] font-medium text-[#111827]">Rejected</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#EF4444] flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
            </div>
          </div>

          <div className="pb-0">
            <div className="flex flex-wrap items-center justify-between px-6 py-5">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">Expenses Lists</h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D0D5DD] rounded-xl px-4 py-2 gap-2 text-[#111827] text-[14px]">
                  <span>16 May 2026 - 18 May 2026</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>

                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex h-10 w-10 md:h-[44px] md:w-[44px] items-center justify-center rounded-xl border border-[#D0D5DD] bg-white transition hover:bg-neutral-50 cursor-pointer"
                  >
                    <Image src={filterIcon} alt="Filter" className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#D0D5DD] bg-white p-2 shadow-lg z-10">
                      {["All", "Submitted", "Approved", "Under Review", "Rejected"].map(status => (
                        <button
                          key={status}
                          onClick={() => {
                            setActiveFilter(status);
                            setFilterOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2 text-[14px] rounded-lg transition-colors ${activeFilter === status ? "bg-[#257BFC] text-white" : "text-[#111827] hover:bg-[#F8F9FC]"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="h-[44px] rounded-xl bg-[#257BFC] px-5 text-[14px] 2xl:text-[16px] text-white transition hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="text-xl leading-none font-light mb-[2px]">+</span>
                  Submit Expense
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto border border-[#D0D5DD] rounded-xl">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-7 border-b border-[#D0D5DD] bg-[#F9FAFB] px-6 py-2.5">
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Expense ID</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Employee</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Category</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Amount</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Date</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Status</div>
                  <div className="text-[14px] 2xl:text-[16px] text-[#111827]">Action</div>
                </div>

                <div className="divide-y divide-[#D0D5DD]">
                  {paginatedExpenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-7 items-center px-6 py-5 hover:bg-neutral-50 transition-colors">
                      <div className="text-[14px] font-medium text-[#111827]">
                        <Link href={`/expenses-management/expenses-list/${expense.id}`} className="hover:text-brand-500">
                          {expense.id}
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full border border-neutral-200">
                          <img src={expense.avatar} alt={expense.employee} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-[14px] font-medium text-[#111827]">{expense.employee}</span>
                      </div>
                      <div className="text-[14px] font-medium text-[#111827]">{expense.category}</div>
                      <div className="text-[14px] font-medium text-[#111827]">{expense.amount}</div>
                      <div className="text-[14px] font-medium text-[#111827]">{expense.date}</div>
                      <div>
                        <StatusPill status={expense.status} />
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/expenses-management/expenses-list/${expense.id}`} className="text-[#6B7280] hover:text-[#111827] transition-colors">
                          <Image src={eyeIcon} alt="View" />
                        </Link>
                        <button className="text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer">
                          <Image src={editIcon} alt="Edit" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors cursor-pointer">
                          <Image src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {paginatedExpenses.length === 0 && (
                    <div className="p-8 text-center text-[#475467]">
                      No expenses found.
                    </div>
                  )}

                </div>
              </div>
            </div>

            {filteredExpenses.length > 0 && (
              <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-4 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#475467]">Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-md border border-[#D0D5DD] bg-white px-2 py-1 text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="text-[14px] text-[#475467]">
                  {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredExpenses.length)} of {filteredExpenses.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 disabled:opacity-50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 disabled:opacity-50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[900px] rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-6 border-b border-[#D0D5DD] pb-5 px-6 py-5">
              <h2 className="text-[20px] font-bold text-[#111827]">Submit New Expense</h2>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-[#111827] transition-colors cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5 px-6 py-5">
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Expense Type</label>
                <CustomSelect
                  options={[
                    { label: "Travel", value: "Travel" },
                    { label: "Meals", value: "Meals" },
                    { label: "Accommodation", value: "Accommodation" },
                    { label: "Equipment", value: "Equipment" },
                    { label: "Other", value: "Other" }
                  ]}
                  value={formData.type}
                  onChange={(val) => handleInputChange("type", val)}
                  placeholder="Select Expense Type"
                />
                {formErrors.type && <p className="mt-1 text-[12px] text-red-500">{formErrors.type}</p>}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Amount($)</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0.00" 
                  className={`w-full rounded-xl border ${formErrors.amount ? 'border-red-500' : 'border-[#D0D5DD]'} px-4 py-3 text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500`} 
                />
                {formErrors.amount && <p className="mt-1 text-[12px] text-red-500">{formErrors.amount}</p>}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className={`w-full rounded-xl border ${formErrors.date ? 'border-red-500' : 'border-[#D0D5DD]'} px-4 py-3 text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white`} 
                  />
                </div>
                {formErrors.date && <p className="mt-1 text-[12px] text-red-500">{formErrors.date}</p>}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Category</label>
                <CustomSelect
                  options={[
                    { label: "Travel", value: "Travel" },
                    { label: "Meals", value: "Meals" },
                    { label: "Accommodation", value: "Accommodation" },
                    { label: "Equipment", value: "Equipment" },
                    { label: "Other", value: "Other" }
                  ]}
                  value={formData.category}
                  onChange={(val) => handleInputChange("category", val)}
                  placeholder="Select Category"
                />
                {formErrors.category && <p className="mt-1 text-[12px] text-red-500">{formErrors.category}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Description (optional)</label>
                <textarea 
                  rows={3} 
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the purpose of this expense..." 
                  className="w-full resize-none rounded-xl border border-[#D0D5DD] px-4 py-3 text-[14px] text-[#111827] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                ></textarea>
              </div>

              <div className="md:col-span-2 mt-2">
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Receipt Upload</label>
                <div className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${formErrors.receiptFile ? 'border-red-500' : 'border-[#D0D5DD]'} bg-white py-10 px-4 text-center hover:bg-neutral-50 transition-colors`}>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <svg className="mb-3 text-[#111827]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  {receiptFile ? (
                    <p className="text-[14px] font-medium text-brand-500 mb-1">{receiptFile.name}</p>
                  ) : (
                    <>
                      <p className="text-[14px] font-medium text-[#111827] mb-1">Drag & Drop Receipt Here</p>
                      <p className="text-[13px] text-[#475467] mb-2">or Click to Browse Files</p>
                      <p className="text-[11px] font-medium text-[#98A2B3]">JPG, PNG, PDF up to 10MB</p>
                    </>
                  )}
                </div>
                {formErrors.receiptFile && <p className="mt-1 text-[12px] text-red-500">{formErrors.receiptFile}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-5">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="rounded-xl border border-[#D0D5DD] bg-white px-6 py-2.5 text-[14px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExpense}
                className="rounded-xl bg-[#257BFC] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
              >
                Submit Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
