import { cn } from "@/_helper/cn";
import { UserCircleIcon } from "@/Component/Icons/SystemIcons";

type AvatarProps = Readonly<{
  className?: string;
  online?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "white" | "muted";
}>;

const sizeStyles = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

export default function Avatar({
  className,
  online = false,
  showIcon = false,
  size = "md",
  tone = "white",
}: AvatarProps) {
  return (
    <div className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-neutral-200",
          sizeStyles[size],
          tone === "muted" ? "bg-neutral-100 text-neutral-500" : "bg-white text-neutral-400",
        )}
      >
        {showIcon ? <UserCircleIcon className="h-7 w-7" /> : null}
      </span>
      {online ? (
        <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-success-500" />
      ) : null}
    </div>
  );
}
