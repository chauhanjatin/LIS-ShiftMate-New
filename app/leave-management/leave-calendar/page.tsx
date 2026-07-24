"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from '@/Component/Layout/DashboardLayout';
import searchIcon from "@/assets/images/icons/search.svg";
import filterIcon from "@/assets/images/icons/filter.svg";

interface LeaveEvent {
  id: string;
  date: number;
  month: number;
  title: string;
  type: "public" | "sick" | "annual" | "unpaid" | "other";
}

const mockEvents: LeaveEvent[] = [
  { id: "1", date: 1, month: 4, title: "Public Holiday", type: "public" },
  { id: "2", date: 10, month: 4, title: "Devon Lane", type: "unpaid" },
  { id: "3", date: 10, month: 4, title: "Guy Hawkins", type: "unpaid" },
  { id: "4", date: 20, month: 4, title: "Esther Howard", type: "other" },
  { id: "5", date: 22, month: 4, title: "Jacob Jones", type: "sick" },
  { id: "6", date: 24, month: 4, title: "Devon Lane", type: "annual" },
  { id: "7", date: 24, month: 4, title: "Guy Hawkins", type: "annual" },
];

export default function LeaveCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const calendarDays = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: daysInPrevMonth - i,
      month: month - 1,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: i,
      month: month,
      isCurrentMonth: true,
    });
  }

  const remainingCells = 35 - calendarDays.length;
  for (let i = 1; i <= (remainingCells > 0 ? remainingCells : remainingCells + 7); i++) {
    calendarDays.push({
      date: i,
      month: month + 1,
      isCurrentMonth: false,
    });
  }

  const breadcrumb = (
    <span className="text-[#98A2B3]">
      <Link href="/dashboard" className="hover:text-brand-500 transition-colors">Home</Link>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Management</span>
      <span className="mx-1">/</span>
      <span className="text-neutral-900">Leave Calendar</span>
    </span>
  );

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'public': return 'bg-[#F4F3FF] text-[#6941C6]';
      case 'unpaid': return 'bg-[#FEF3F2] text-[#B42318]';
      case 'sick': return 'bg-[#EFF8FF] text-[#175CD3]';
      case 'annual': return 'bg-[#ECFDF3] text-[#027A48]';
      case 'other': return 'bg-[#FFFAEB] text-[#B54708]';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <DashboardLayout title="Leave Calendar" subtitle={breadcrumb}>
      <div className="flex-1 p-4 2xl:p-6">
        <div className="rounded-xl bg-white shadow-sm flex flex-col min-h-[700px]">
          <div className="flex flex-wrap items-center justify-between md:px-6 px-4 md:pt-6 pt-4">
            <h2 className="md:text-[20px] text-[16px] font-medium text-[#111827]">Leave Calendar</h2>

            <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-6 mt-3 md:mt-0">
              <div className="relative 2xl:w-75 md:w-60 w-32">
                <Image
                  src={searchIcon}
                  alt="Search"
                  width={20}
                  height={20}
                  className="pointer-events-none absolute left-3 top-1/2 md:h-5 md:w-5 h-4 w-4 -translate-y-1/2"
                />
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-1.5 md:py-2.5 pl-11 pr-4 text-sm"
                  placeholder="Search..."
                />
              </div>

              <button className="flex md:h-[42px] md:w-[42px] h-[38px] w-[38px] p-2 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50">
                <Image
                  src={filterIcon}
                  alt="Filter"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 2xl:p-6 flex flex-col">
            <div className="flex item-center justify-between py-4 border border-neutral-200 border-b-0 rounded-t-xl px-4 bg-white">
              <button onClick={prevMonth} className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-500 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <h3 className="text-[16px] font-bold text-neutral-900">
                {currentDate.toLocaleString('default', { month: 'long' })} {year}
              </h3>
              <button onClick={nextMonth} className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-500 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 border border-neutral-200 border-b-0 bg-[#F8FAFC]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="py-3 px-4 text-[13px] font-semibold text-neutral-700 border-r border-neutral-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="flex-1 grid grid-cols-7 border-l border-neutral-200 bg-white rounded-b-xl overflow-hidden">
              {calendarDays.map((dayObj, index) => {
                const isSelected = dayObj.date === 8 && dayObj.month === 4;
                const events = mockEvents.filter(e => e.date === dayObj.date && e.month === dayObj.month);

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border-r border-b border-neutral-200 relative transition-colors ${!dayObj.isCurrentMonth ? 'bg-neutral-50' :
                      isSelected ? 'bg-[#EFF8FF]' : 'bg-white hover:bg-neutral-50'
                      }`}
                  >
                    <span className={`text-[14px] font-semibold mb-2 block ${!dayObj.isCurrentMonth ? 'text-neutral-400' : isSelected ? 'text-[#257BFC]' : 'text-neutral-900'}`}>
                      {dayObj.date}
                    </span>

                    <div className="flex flex-col gap-1">
                      {events.map(event => (
                        <div
                          key={event.id}
                          className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-full w-max font-medium truncate max-w-full ${getEventStyle(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
