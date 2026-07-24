"use client";

import React, { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
import CustomSelect from "@/Component/UI/CustomSelect";
import searchIcon from "@/assets/images/icons/search.svg";

type Task = {
  id: number;
  name: string;
  dept: string;
  completed: boolean;
};

type OnboardingRecord = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tasksCompleted: number;
  totalTasks: number;
  progress: number;
  tasks: Task[];
};

const initialData: OnboardingRecord[] = [
  {
    id: "EMP001",
    name: "Cameron Williamson",
    role: "Senior Developer",
    avatar: "https://i.pravatar.cc/150?u=1",
    tasksCompleted: 3,
    totalTasks: 8,
    progress: 38,
    tasks: [
      { id: 1, name: "Send offer letter", dept: "HR", completed: true },
      { id: 2, name: "Complete employment contract", dept: "HR", completed: true },
      { id: 3, name: "Provide ID documents", dept: "HR", completed: true },
      { id: 4, name: "Set up company email", dept: "IT", completed: false },
      { id: 5, name: "Provision laptop & equipment", dept: "IT", completed: false },
      { id: 6, name: "Complete payroll setup", dept: "Finance", completed: false },
      { id: 7, name: "Team introduction meeting", dept: "Manager", completed: false },
      { id: 8, name: "Complete compliance training", dept: "HR", completed: false },
    ]
  },
  {
    id: "EMP002",
    name: "Albert Flores",
    role: "Senior Developer",
    avatar: "https://i.pravatar.cc/150?u=2",
    tasksCompleted: 3,
    totalTasks: 8,
    progress: 38,
    tasks: [
      { id: 1, name: "Send offer letter", dept: "HR", completed: true },
      { id: 2, name: "Complete employment contract", dept: "HR", completed: true },
      { id: 3, name: "Provide ID documents", dept: "HR", completed: true },
      { id: 4, name: "Set up company email", dept: "IT", completed: false },
      { id: 5, name: "Provision laptop & equipment", dept: "IT", completed: false },
      { id: 6, name: "Complete payroll setup", dept: "Finance", completed: false },
      { id: 7, name: "Team introduction meeting", dept: "Manager", completed: false },
      { id: 8, name: "Complete compliance training", dept: "HR", completed: false },
    ]
  }
];

export default function OnboardingPage() {
  const [data, setData] = useState(initialData);
  const [expandedIds, setExpandedIds] = useState<string[]>(["EMP001", "EMP002"]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee: "Michael",
    jobTitle: "",
    department: "",
    startDate: "",
    template: "Standard onboarding"
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const toggleTask = (recordId: string, taskId: number) => {
    setData(prevData => prevData.map(record => {
      if (record.id === recordId) {
        const newTasks = record.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const completedCount = newTasks.filter(t => t.completed).length;
        return {
          ...record,
          tasks: newTasks,
          tasksCompleted: completedCount,
          progress: Math.round((completedCount / record.totalTasks) * 100)
        };
      }
      return record;
    }));
  };

  const getDeptColor = (dept: string) => {
    switch(dept) {
      case 'HR': return 'bg-[#F5F3FF] text-[#8B5CF6]';
      case 'IT': return 'bg-[#ECFDF5] text-[#10B981]';
      case 'Finance': return 'bg-[#ECFDF5] text-[#10B981]';
      case 'Manager': return 'bg-[#FFFBEB] text-[#F59E0B]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout title="Onboarding" subtitle={
      <span className="text-[#98A2B3]">
        <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-neutral-900">Onboarding</span>
      </span>
    }>
      <div className="flex-1 p-4 2xl:p-6 pb-20">
        <div className="rounded-xl bg-white shadow-sm overflow-hidden md:p-6 p-4 min-h-[800px]">
          
          <div className="flex flex-wrap items-center justify-between md:mb-8 mb-6">
            <h2 className="text-[20px] font-medium text-[#111827] m-0">Onboarding</h2>

            <div className="flex flex-wrap items-center md:gap-4 gap-2 mt-3 sm:mt-0">
              <div className="relative w-full md:w-[280px]">
                <Image src={searchIcon} alt="Search" width={20} height={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white md:py-2.5 py-2 pl-10 pr-4 md:text-[14px] text-[12px] outline-none focus:border-brand-500 transition-colors"
                  placeholder="Search Employee"
                />
              </div>

              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-3 md:px-5 py-2 md:py-2.5 2xl:text-[16px] md:text-[14px] text-[12px] font-normal text-white transition hover:bg-blue-600 cursor-pointer border-none shadow-sm whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Onboarding
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {data.map(record => (
              <div key={record.id} className="rounded-2xl border border-[#D0D5DD] bg-white md:p-5 p-2">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleExpand(record.id)}
                >
                  <div className="md:flex items-start md:gap-4 gap-2 w-full">
                    <img src={record.avatar} alt={record.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center md:gap-3">
                          <span className="text-[16px] font-medium text-[#111827]">{record.name}</span>
                          <span className="text-[14px] font-normal text-[#9CA3AF] mt-0.5 md:mt-0">{record.role}</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-0">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-[13px] font-medium text-[#9CA3AF]">{record.tasksCompleted}/{record.totalTasks} Task</span>
                            <span className="text-[15px] font-bold text-[#257BFC]">{record.progress}%</span>
                          </div>
                          <div className={`text-[#6B7280] transition-transform duration-200 ml-1 ${expandedIds.includes(record.id) ? 'rotate-180' : ''}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-[#E5E7EB] rounded-full h-1.5 relative overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-[#257BFC] rounded-full transition-all duration-300" 
                          style={{ width: `${record.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedIds.includes(record.id) && (
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-[#D0D5DD] pt-6">
                    {record.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between rounded-xl border border-[#E4E7EC] md:p-4 p-2 transition-colors hover:bg-neutral-50 cursor-pointer"
                        onClick={() => toggleTask(record.id, task.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`flex w-5 h-5 items-center justify-center rounded-[6px] border ${task.completed ? 'bg-[#257BFC] border-[#257BFC]' : 'border-[#D0D5DD] bg-white'}`}
                          >
                            {task.completed && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            )}
                          </div>
                          <span className={`md:text-[14px] text-[12px] font-medium transition-colors ${task.completed ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}>
                            {task.name}
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-1 md:text-[12px] text-[10px] font-normal ${getDeptColor(task.dept)}`}>
                          {task.dept}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[850px] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] md:px-6 px-4 md:py-5 py-3">
              <h2 className="text-[16px] md:text-[20px] font-semibold text-[#111827]">
                Create New Onboarding
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#111827] transitio cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="md:p-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-4">
                <div className="md:col-span-2">
                  <label className="mb-2 block md:text-[14px] text-[13px] font-normal text-[#111827]">
                    Employee
                  </label>
                  <CustomSelect
                    value={formData.employee}
                    onChange={(val) => setFormData({ ...formData, employee: val })}
                    options={[{ label: "Michael", value: "Michael" }]}
                    placeholder="Select employee"
                  />
                </div>

                <div>
                  <label className="mb-2 block md:text-[14px] text-[13px] font-normal text-[#111827]">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="h-[45px] w-full rounded-xl border border-[#E2E8F0] px-4 text-[13px] outline-none transition focus:border-[#257BFC]"
                    placeholder="Enter job title"
                  />
                </div>

                <div>
                  <label className="mb-2 block md:text-[14px] text-[13px] font-normal text-[#111827]">
                    Department
                  </label>
                  <CustomSelect
                    value={formData.department}
                    onChange={(val) => setFormData({ ...formData, department: val })}
                    options={[{ label: "Engineering", value: "Engineering" }, { label: "Marketing", value: "Marketing" }]}
                    placeholder="Select department"
                  />
                </div>

                <div>
                  <label className="mb-2 block md:text-[14px] text-[13px] font-normal text-[#111827]">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="h-[45px] w-full rounded-xl border border-[#E2E8F0] px-4 text-[13px] outline-none transition focus:border-[#257BFC]"
                      placeholder="MM/DD/YYYY"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block md:text-[14px] text-[13px] font-normal text-[#111827]">
                    Onboarding Template
                  </label>
                  <CustomSelect
                    value={formData.template}
                    onChange={(val) => setFormData({ ...formData, template: val })}
                    options={[
                      { label: "Standard onboarding", value: "Standard onboarding" },
                      { label: "Manager onboarding", value: "Manager onboarding" },
                      { label: "Remote employee onboarding", value: "Remote employee onboarding" },
                    ]}
                    placeholder="Select template"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#F9FAFB] md:p-4 p-2 md:text-[14px] text-[12px] text-[#98A2B3] font-normal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#111827]"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                8 default tasks will be added and assigned to HR, IT, Finance, and Manager.
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-[40px] rounded-xl border border-[#D0D5DD] px-6 md:text-[14px] text-[13px] font-semibold text-[#344054] transition hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-[40px] rounded-xl bg-[#257BFC] md:px-6 px-4 md:text-[14px] text-[12px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                >
                  Create Onboarding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
