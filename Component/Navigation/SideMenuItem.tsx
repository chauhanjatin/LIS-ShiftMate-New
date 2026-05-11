"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/_helper/cn";
import { ChevronDownIcon } from "@/Component/Icons/SystemIcons";

type SideMenuState = "default" | "hover" | "active";

type SideMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  previewState?: SideMenuState;
};

const sideMenuStyles: Record<SideMenuState, string> = {
  default:
    "bg-transparent text-brand-200 opacity-90 hover:bg-white/5 hover:text-white hover:opacity-100",
  hover: "bg-brand-50 text-brand-500",
  active:
    "bg-brand-500 text-white shadow-[0_18px_40px_rgba(37,123,252,0.32)]",
};

export default function SideMenuItem({
  children,
  className,
  previewState = "default",
  type = "button",
  ...props
}: SideMenuItemProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex min-h-12 w-full items-center justify-between rounded-[1.25rem] px-5 py-3 text-left text-lg font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100",
        sideMenuStyles[previewState],
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
      <span>{children}</span>
      <ChevronDownIcon />
    </button>
  );
}
