"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/Component/Icons/SystemIcons";

type CalendarCardProps = Readonly<{
  initialMonth?: number;
  initialSelectedDay?: number;
  initialYear?: number;
}>;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarCard({
  initialMonth = 8,
  initialSelectedDay = 19,
  initialYear = 2026,
}: CalendarCardProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const calendarCells = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  function changeMonth(direction: -1 | 1) {
    const nextMonth = currentMonth + direction;
    const wrappedMonth = (nextMonth + 12) % 12;
    const nextYear =
      nextMonth < 0 ? currentYear - 1 : nextMonth > 11 ? currentYear + 1 : currentYear;
    const nextDaysInMonth = getDaysInMonth(nextYear, wrappedMonth);

    setCurrentMonth(wrappedMonth);
    setCurrentYear(nextYear);
    setSelectedDay((currentSelectedDay) =>
      Math.min(currentSelectedDay, nextDaysInMonth),
    );
  }

  return (
    <div className="w-full max-w-[21rem] rounded-[1.8rem] bg-white p-7 shadow-[0_28px_60px_rgba(15,23,42,0.35)]">
      <div className="mb-7 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100"
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <h3 className="text-[1.15rem] font-bold tracking-tight text-neutral-900">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100"
          onClick={() => changeMonth(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-6 text-center">
        {weekDays.map((day) => (
          <span
            key={day}
            className="text-[0.68rem] font-semibold tracking-[0.08em] text-neutral-400"
          >
            {day}
          </span>
        ))}

        {calendarCells.map((day, index) =>
          day === null ? (
            <span key={`empty-${index}`} className="h-8 w-8" />
          ) : (
            <button
              key={day}
              type="button"
              className="inline-flex items-center justify-center text-[1.05rem] font-semibold text-neutral-900"
              onClick={() => setSelectedDay(day)}
            >
              <span
                className={
                  day === selectedDay
                    ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white"
                    : "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
                }
              >
                {day}
              </span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
