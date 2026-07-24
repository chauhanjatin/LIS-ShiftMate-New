"use client";

import React, { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  error?: boolean;
  menuPlacement?: "top" | "bottom";
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  error = false,
  menuPlacement = "bottom",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full rounded-xl border ${
          error ? "border-red-500" : "border-[#D0D5DD]"
        } bg-white px-4 py-2.5 text-[12px] md:text-[14px] outline-none cursor-pointer flex justify-between items-center transition-colors ${
          isOpen ? "border-black ring-1 ring-black" : ""
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-neutral-900" : "text-neutral-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full bg-white border border-neutral-200 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto ${menuPlacement === 'top' ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+1px)]'}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 md:py-2.5 py-2 text-[12px] md:text-[14px] cursor-pointer hover:bg-neutral-100 transition-colors ${
                value === option.value ? "bg-neutral-50 font-medium text-[#257BFC]" : "text-neutral-900"
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
