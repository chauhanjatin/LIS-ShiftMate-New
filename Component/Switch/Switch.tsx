"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/_helper/cn";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  labelPosition?: "left" | "right";
};

export default function Switch({
  checked,
  className,
  defaultChecked,
  disabled,
  id,
  label,
  labelPosition = "right",
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-center gap-3 text-lg font-medium tracking-tight",
        labelPosition === "left" ? "flex-row-reverse" : "flex-row",
        disabled ? "cursor-not-allowed text-neutral-300" : "cursor-pointer text-neutral-900",
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          "relative inline-flex h-7 w-10 shrink-0 items-center rounded-full bg-neutral-300 transition-colors duration-150 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100",
          "peer-checked:bg-brand-500 peer-disabled:bg-brand-50",
        )}
      >
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-150 peer-checked:translate-x-3 peer-disabled:bg-white/95" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
