"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import { Lexend_Deca } from "next/font/google";
import eyeIcon from "@/assets/images/icons/eye-view.svg";
import pendingIcon from "@/assets/images/icons/pending-approval.svg";
import moneyBag from "@/assets/images/icons/money-bag.svg";
import onTime from "@/assets/images/icons/on-time.svg";
import history from "@/assets/images/icons/history.svg";
import check from "@/assets/images/icons/check-circle.svg";
import removeCircle from "@/assets/images/icons/remove-circle.svg";
import Toast from "@/Component/UI/Toast";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

type ExpenseStatus = "Pending" | "Approved" | "Rejected";

interface Expense {
  id: string;
  employee: string;
  avatar: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: ExpenseStatus;
}

const mockPendingExpenses: Expense[] = [
  { id: "EXP-001", employee: "Jenny Wilson", avatar: "https://i.pravatar.cc/150?u=1", category: "Travel", description: "Train to London for pitch meeting", amount: "$245.50", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-002", employee: "Devon Lane", avatar: "https://i.pravatar.cc/150?u=2", category: "Equipment", description: "External hard drive for project ba...", amount: "$67.80", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-003", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=3", category: "Meals", description: "Client dinner — prospect negotiation...", amount: "$189.00", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-004", employee: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=4", category: "Travel", description: "Fuel — client site deployment", amount: "$349.99", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-005", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=5", category: "Equipment", description: "External hard drive for project ba...", amount: "$112.40", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-006", employee: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=6", category: "Travel", description: "Train to London for pitch meeting", amount: "$43.20", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-007", employee: "Kristin Watson", avatar: "https://i.pravatar.cc/150?u=7", category: "Equipment", description: "External hard drive for project ba...", amount: "$56.00", date: "5 Apr 2026", status: "Pending" },
  { id: "EXP-008", employee: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=8", category: "Meals", description: "Client dinner — prospect negotiation...", amount: "$56.00", date: "5 Apr 2026", status: "Pending" },
];

function StatusPill({ status }: { status: ExpenseStatus }) {
  const styles = {
    Approved: "bg-[#EAF9EA] text-[#4DB949]",
    Pending: "bg-[#FFF6E8] text-[#FFA100]",
    Rejected: "bg-[#FFE8E8] text-[#EF4444]",
  };
  return (
    <span className={`inline-flex rounded-full xl:px-3.5 px-2.5 xl:py-2.5 py-1.5 text-[12px] xl:text-[14px] ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function ExpenseApprovalsPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockPendingExpenses);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleApproveClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsRejectModalOpen(true);
  };

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false);
    setSelectedExpense(null);
    setToastMessage("Expense approved successfully!");
    setShowToast(true);
  };

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false);
    setSelectedExpense(null);
    setToastMessage("Expense rejected successfully!");
    setShowToast(true);
  };

  const totalPages = Math.ceil(expenses.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, startIndex + rowsPerPage);

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Expense Approvals</span>
    </span>
  );

  return (
    <DashboardLayout title="Expenses Management" subtitle={breadcrumb}>
      <div className={`flex-1 p-4 2xl:p-6 ${lexendDeca.className}`}>

        <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />

        <div className="bg-white p-4 xl:p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-6 gap-4 mb-6">
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">08</h2>
                <p className="text-[14px] font-medium text-[#111827]">Pending Approval</p>
              </div>
              <div className="h-[52px] w-[52px] rounded-xl bg-[#FFA100] flex items-center justify-center">
                <Image src={history} alt="Pending" width={24} height={24} className="brightness-0 invert" />
              </div>
            </div>
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">00</h2>
                <p className="text-[14px] font-medium text-[#111827]">Approved Today</p>
              </div>
              <div className="h-[52px] w-[52px] rounded-xl bg-[#4DB949] flex items-center justify-center text-white">
                <Image
                  src={onTime}
                  alt="" />
              </div>
            </div>
            <div className="rounded-xl border border-[#D0D5DD] bg-white p-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] mb-4">$0.00</h2>
                <p className="text-[14px] font-medium text-[#111827]">Approved This Month</p>
              </div>
              <div className="h-[52px] w-[52px] rounded-xl bg-[#8B5CF6] flex items-center justify-center text-white">
                <Image src={moneyBag} alt="" className="brightness-0 invert" />
              </div>
            </div>
          </div>

          <div className="pb-0">
            <div className="flex items-center justify-between xl:px-6 py-5">
              <h3 className="text-[18px] 2xl:text-[20px] font-medium text-[#111827]">Pending Expenses</h3>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-[#D0D5DD]">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-7 border-b border-[#D0D5DD] bg-[#F9FAFB] px-6 py-2.5">
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Employee</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Category</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Description</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Amount</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Date</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Status</div>
                  <div className="text-[14px] 2xl:text-[16px] font-medium text-[#111827]">Action</div>
                </div>

                <div className="divide-y divide-[#D0D5DD]">
                  {paginatedExpenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-7 items-center xl:px-6 px-4 py-4 hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative xl:h-[50px] xl:w-[50px] h-[40px] w-[40px] overflow-hidden rounded-full border border-neutral-200">
                          <img src={expense.avatar} alt={expense.employee} className="h-full w-full object-cover" />
                        </div>
                        <span className="xl:text-[14px] text-[12px] text-[#111827]">{expense.employee}</span>
                      </div>
                      <div className="xl:text-[14px] text-[12px] text-[#111827] pl-6 xl:pl-0">{expense.category}</div>
                      <div className="xl:text-[14px] text-[12px] text-[#111827] truncate pr-4" title={expense.description}>{expense.description}</div>
                      <div className="xl:text-[14px] text-[12px] text-[#111827]">{expense.amount}</div>
                      <div className="xl:text-[14px] text-[12px] text-[#111827]">{expense.date}</div>
                      <div>
                        <StatusPill status={expense.status} />
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href={`/expenses-management/expenses-list/${expense.id}`} className="flex items-center justify-center cursor-pointer">
                          <Image src={eyeIcon} alt="View" />
                        </Link>
                        <button onClick={() => handleApproveClick(expense)} className="flex items-center justify-center cursor-pointer">
                          <Image src={check} alt="check" />
                        </button>
                        <button onClick={() => handleRejectClick(expense)} className="flex items-center justify-center cursor-pointer">
                          <Image src={removeCircle} alt="removeCircle" className="brightness-100 invert" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {paginatedExpenses.length === 0 && (
                    <div className="p-8 text-center text-[#475467]">
                      No pending expenses found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {expenses.length > 0 && (
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
                  {startIndex + 1}-{Math.min(startIndex + rowsPerPage, expenses.length)} of {expenses.length}
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

      {/* Approve Modal */}
      {isApproveModalOpen && selectedExpense && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[662px] rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] p-6">
              <h2 className="text-[20px] font-semibold text-[#111827]">Approve Expense</h2>
              <button 
                onClick={() => setIsApproveModalOpen(false)}
                className="text-[#111827] cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="rounded-xl bg-[#F9FAFB] p-5 mb-6">
                <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full border border-neutral-200">
                      <img src={selectedExpense.avatar} alt={selectedExpense.employee} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[14px] text-[#111827]">{selectedExpense.employee}</p>
                      <p className="text-[12px] text-[#98A2B3]">No valid tax code assigned for this period.</p>
                    </div>
                  </div>
                  <div className="text-[14px] font-semibold text-[#111827]">{selectedExpense.amount}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#111827]">Category</span>
                    <span className="text-[14px] text-[#111827]">{selectedExpense.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#111827]">Date</span>
                    <span className="text-[14px] text-[#111827]">{selectedExpense.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#111827]">Description</span>
                    <span className="text-[14px] text-[#111827]">30 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#111827]">Location</span>
                    <span className="text-[14px] text-[#111827] truncate max-w-[200px]" title={selectedExpense.description}>{selectedExpense.description}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-[14px] text-[#111827]">Description (optional)</label>
                <textarea 
                  rows={3} 
                  placeholder="e.g. Approved for Q1 travel"
                  className="w-full resize-none rounded-xl border border-[#D0D5DD] px-4 py-3 text-[14px] text-[#111827] focus:border-[#257BFC] focus:outline-none focus:ring-1 focus:ring-[#257BFC]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsApproveModalOpen(false)}
                  className="rounded-xl border border-[#111827] px-6 py-2.5 text-[14px] 2xl:text-[16px] font-semibold text-[#111827] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmApprove}
                  className="rounded-xl bg-[#257BFC] px-6 py-2.5 text-[14px] 2xl:text-[16px] font-semibold text-white cursor-pointer"
                >
                  Confirm Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && selectedExpense && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[662px] rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] p-6">
              <h2 className="text-[20px] font-semibold text-[#111827]">Reject Expense</h2>
              <button 
                onClick={() => setIsRejectModalOpen(false)}
                className="text-[#111827] cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="rounded-xl bg-[#F9FAFB] p-5 mb-6">
                <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full border border-neutral-200">
                      <img src={selectedExpense.avatar} alt={selectedExpense.employee} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[14px] text-[#111827]">{selectedExpense.employee}</p>
                      <p className="text-[12px] text-[#98A2B3]">No valid tax code assigned for this period.</p>
                    </div>
                  </div>
                  <div className="text-[14px] font-semibold text-[#111827]">{selectedExpense.amount}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#475467]">Category</span>
                    <span className="text-[14px] text-[#111827]">{selectedExpense.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#475467]">Date</span>
                    <span className="text-[14px] text-[#111827]">{selectedExpense.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#475467]">Description</span>
                    <span className="text-[14px] text-[#111827]">30 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#475467]">Location</span>
                    <span className="text-[14px] text-[#111827] truncate max-w-[200px]" title={selectedExpense.description}>{selectedExpense.description}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-[14px] font-medium text-[#111827]">Description (optional)</label>
                <textarea 
                  rows={3} 
                  placeholder="e.g. Missing receipt, please resubmit"
                  className="w-full resize-none rounded-xl border border-[#D0D5DD] px-4 py-3 text-[14px] text-[#111827] focus:border-[#257BFC] focus:outline-none focus:ring-1 focus:ring-[#257BFC]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsRejectModalOpen(false)}
                  className="rounded-xl border border-[#D0D5DD] px-6 py-2.5 text-[14px] font-medium text-[#344054] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmReject}
                  className="rounded-xl bg-[#F04438] px-6 py-2.5 text-[14px] font-medium text-white cursor-pointer"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
