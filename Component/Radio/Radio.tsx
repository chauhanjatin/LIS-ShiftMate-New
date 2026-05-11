"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/_helper/cn";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  labelPosition?: "left" | "right";
};

export default function Radio({
  checked,
  className,
  defaultChecked,
  disabled,
  id,
  label,
  labelPosition = "right",
  ...props
}: RadioProps) {
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
        type="radio"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 bg-white transition-colors duration-150 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100",
          "peer-checked:border-neutral-900 peer-disabled:border-neutral-300",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-900 opacity-0 transition-opacity duration-150 peer-checked:opacity-100 peer-disabled:bg-neutral-300" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
