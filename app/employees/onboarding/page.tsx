"use client";

import React, { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/Component/Layout/DashboardLayout";
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
        <span className="hover:text-brand-500 transition-colors cursor-pointer">Home</span>
        <span className="mx-1">/</span>
        <span className="text-neutral-900">Onboarding</span>
      </span>
    }>
      <div className="flex-1 p-4 2xl:p-6 pb-20">
        <div className="rounded-xl bg-white shadow-sm overflow-hidden p-6 min-h-[800px]">
          
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-[20px] font-bold text-[#111827] m-0">Onboarding</h2>

            <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-0">
              <div className="relative w-full sm:w-[280px]">
                <Image src={searchIcon} alt="Search" width={20} height={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 transition-colors"
                  placeholder="Search Employee"
                />
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-[#257BFC] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-blue-600 cursor-pointer border-none shadow-sm whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Onboarding
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {data.map(record => (
              <div key={record.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleExpand(record.id)}
                >
                  <div className="flex items-center gap-4">
                    <img src={record.avatar} alt={record.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold text-[#111827]">{record.name}</span>
                        <span className="text-[13px] font-medium text-[#9CA3AF]">{record.role}</span>
                      </div>
                      
                      <div className="mt-2 w-[350px] max-w-full bg-[#E5E7EB] rounded-full h-1.5 relative overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-[#257BFC] rounded-full transition-all duration-300" 
                          style={{ width: `${record.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-[#9CA3AF]">{record.tasksCompleted}/{record.totalTasks} Task</span>
                      <span className="text-[15px] font-bold text-[#257BFC]">{record.progress}%</span>
                    </div>
                    <div className={`text-[#6B7280] transition-transform duration-200 ${expandedIds.includes(record.id) ? 'rotate-180' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>

                {expandedIds.includes(record.id) && (
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-[#F3F4F6] pt-6">
                    {record.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4 transition-colors hover:bg-neutral-50 cursor-pointer"
                        onClick={() => toggleTask(record.id, task.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`flex w-5 h-5 items-center justify-center rounded-[6px] border ${task.completed ? 'bg-[#257BFC] border-[#257BFC]' : 'border-[#D1D5DB] bg-white'}`}
                          >
                            {task.completed && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            )}
                          </div>
                          <span className={`text-[14px] font-medium transition-colors ${task.completed ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}>
                            {task.name}
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${getDeptColor(task.dept)}`}>
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
    </DashboardLayout>
  );
}
