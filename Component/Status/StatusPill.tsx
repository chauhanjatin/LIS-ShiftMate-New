import { cn } from "@/_helper/cn";

type StatusVariant = "warning" | "success" | "info" | "danger" | "accent";

type StatusPillProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  variant?: StatusVariant;
}>;

const statusStyles: Record<StatusVariant, string> = {
  warning: "bg-warning-50 text-warning-500",
  success: "bg-success-50 text-success-500",
  info: "bg-brand-50 text-brand-800",
  danger: "bg-danger-50 text-danger-500",
  accent: "bg-accent-50 text-accent-500",
};

export default function StatusPill({
  children,
  className,
  variant = "info",
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[6.5rem] items-center justify-center rounded-full px-6 py-3 text-lg font-medium tracking-tight",
        statusStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
