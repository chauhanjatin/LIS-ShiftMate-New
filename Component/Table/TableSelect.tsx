"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/_helper/cn";
import { ChevronDownIcon } from "@/Component/Icons/SystemIcons";

type TableSelectProps = Readonly<{
  className?: string;
  dark?: boolean;
  label?: string;
  onValueChange?: (value: string) => void;
  options?: string[];
  value?: string;
}>;

export default function TableSelect({
  className,
  dark = false,
  label = "Place holder",
  onValueChange,
  options = ["Pending", "Approved", "Archived"],
  value,
}: TableSelectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleSelect(nextValue: string) {
    if (value === undefined) {
      setSelectedValue(nextValue);
    }

    onValueChange?.(nextValue);
    setIsOpen(false);
  }

  const currentValue = value ?? selectedValue;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-[0.95rem] border px-4 text-base font-semibold tracking-tight",
          dark
            ? "border-neutral-700 bg-neutral-950 text-white"
            : "border-neutral-200 bg-white text-neutral-400",
        )}
        onClick={() => setIsOpen((currentValueOpen) => !currentValueOpen)}
      >
        <span>{currentValue || label}</span>
        <ChevronDownIcon className={dark ? "text-white" : "text-neutral-900"} />
      </button>

      {isOpen ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-[1rem] border shadow-[var(--shadow-sm)]",
            dark
              ? "border-neutral-700 bg-neutral-950"
              : "border-neutral-200 bg-white",
          )}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={cn(
                "flex w-full items-center px-4 py-3 text-left text-base font-medium transition-colors",
                dark
                  ? "text-white hover:bg-neutral-800"
                  : "text-neutral-900 hover:bg-neutral-50",
                currentValue === option
                  ? dark
                    ? "bg-neutral-800"
                    : "bg-brand-50"
                  : "",
              )}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
