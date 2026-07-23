"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { cn } from "@/_helper/cn";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonState = "default" | "hover" | "disabled";

export type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  previewState?: ButtonState;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type Ripple = {
  id: number;
  size: number;
  x: number;
  y: number;
};

const buttonStyles: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default:
      "border border-transparent bg-brand-500 text-white shadow-[0_4px_12px_rgba(37,123,252,0.26)] hover:bg-brand-600 hover:shadow-[0_8px_18px_rgba(37,123,252,0.28)] active:bg-brand-700 active:shadow-[0_2px_8px_rgba(37,123,252,0.22)] focus-visible:ring-brand-100",
    hover:
      "border border-transparent bg-brand-600 text-white shadow-[0_8px_18px_rgba(37,123,252,0.28)] focus-visible:ring-brand-100",
    disabled:
      "cursor-not-allowed border border-transparent bg-brand-100 text-white/75 shadow-none focus-visible:ring-brand-50",
  },
  secondary: {
    default:
      "border border-neutral-300 bg-white text-neutral-900 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)] active:bg-neutral-100 focus-visible:ring-brand-100",
    hover:
      "border border-neutral-400 bg-neutral-100 text-neutral-900 shadow-[0_4px_10px_rgba(15,23,42,0.08)] focus-visible:ring-brand-100",
    disabled:
      "cursor-not-allowed border border-neutral-200 bg-white text-neutral-300 shadow-none focus-visible:ring-neutral-100",
  },
  link: {
    default:
      "bg-transparent text-brand-600 hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100 focus-visible:ring-brand-100",
    hover: "bg-brand-50 text-brand-700 focus-visible:ring-brand-100",
    disabled:
      "cursor-not-allowed bg-transparent text-neutral-300 focus-visible:ring-transparent",
  },
};

const rippleStyles: Record<ButtonVariant, string> = {
  primary: "bg-white/35",
  secondary: "bg-brand-500/18",
  link: "bg-brand-500/15",
};

export default function Button({
  children,
  className,
  disabled,
  leftIcon,
  onMouseDown,
  previewState = "default",
  rightIcon,
  type = "button",
  variant = "primary",
  ...props
}: AppButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const state: ButtonState =
    disabled || previewState === "disabled" ? "disabled" : previewState;
  const isLink = variant === "link";

  function handleMouseDown(event: MouseEvent<HTMLButtonElement>) {
    onMouseDown?.(event);

    if (event.defaultPrevented || state === "disabled") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.9;
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRipples((currentRipples) => [...currentRipples, { id, size, x, y }]);

    window.setTimeout(() => {
      setRipples((currentRipples) =>
        currentRipples.filter((ripple) => ripple.id !== id),
      );
    }, 550);
  }

  return (
    <button
      type={type}
      disabled={state === "disabled"}
      onMouseDown={handleMouseDown}
      className={cn(
        "relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-[0.9rem] md:text-[16px] text-[14px] font-semibold tracking-[0.01em] transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 disabled:transform-none",
        "active:translate-y-px",
        isLink ? "min-h-11 px-3" : "min-h-11 min-w-[150px] px-6",
        buttonStyles[variant][state],
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit]">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={cn(
              "pointer-events-none absolute rounded-full opacity-0 animate-[mui-ripple_550ms_ease-out_forwards]",
              rippleStyles[variant],
            )}
            style={{
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
            }}
          />
        ))}
      </span>
      {leftIcon ? (
        <span className="relative z-10 inline-flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      ) : null}
      <span className="relative z-10 text-[0.98rem]">{children}</span>
      {rightIcon ? (
        <span className="relative z-10 inline-flex shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
