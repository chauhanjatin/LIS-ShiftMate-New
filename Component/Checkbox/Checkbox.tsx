"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/_helper/cn";
import { CheckIcon } from "@/Component/Icons/SystemIcons";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  labelPosition?: "left" | "right";
};

export default function Checkbox({
  checked,
  className,
  defaultChecked,
  disabled,
  id,
  label,
  labelPosition = "right",
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-center gap-3 text-lg font-medium tracking-tight",
        labelPosition === "left" ? "flex-row-reverse" : "flex-row",
        disabled ? "cursor-not-allowed text-neutral-300" : "cursor-pointer text-neutral-900",
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          "relative inline-flex h-5 w-5 shrink-0 items-center justify-center",
          disabled ? "opacity-70" : "",
        )}
      >
        <span
          className={cn(
            "absolute -inset-2 rounded-full bg-brand-500/12 opacity-0 transition-opacity duration-200",
            disabled ? "hidden" : "group-hover:opacity-100 peer-focus-visible:opacity-100",
          )}
        />
        <span
          className={cn(
            "mui-checkbox-box relative z-10 flex h-5 w-5 items-center justify-center rounded-[0.35rem] border-2 border-neutral-400 bg-white text-white transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out",
            "group-active:scale-95 group-hover:border-brand-500 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100",
            "peer-checked:border-brand-500 peer-checked:bg-brand-500 peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100",
          )}
        >
          <CheckIcon className="h-3 w-3 origin-center scale-50 opacity-0 transition-[transform,opacity] duration-150 ease-out peer-checked:scale-100 peer-checked:opacity-100 peer-checked:animate-[mui-checkbox-pop_180ms_cubic-bezier(.2,.9,.2,1)] peer-disabled:text-neutral-300" />
        </span>
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
