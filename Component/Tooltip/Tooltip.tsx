import { cn } from "@/_helper/cn";

type TooltipArrow = "none" | "top" | "bottom" | "left" | "right";
type TooltipSize = "sm" | "lg";

type TooltipProps = Readonly<{
  children: React.ReactNode;
  arrow?: TooltipArrow;
  className?: string;
  size?: TooltipSize;
}>;

const arrowBase =
  "absolute h-3.5 w-3.5 rotate-45 bg-neutral-900";

const arrowStyles: Record<Exclude<TooltipArrow, "none">, string> = {
  top: "-top-1.5 left-1/2 -translate-x-1/2",
  bottom: "-bottom-1.5 left-1/2 -translate-x-1/2",
  left: "-left-1.5 top-1/2 -translate-y-1/2",
  right: "-right-1.5 top-1/2 -translate-y-1/2",
};

const sizeStyles: Record<TooltipSize, string> = {
  sm: "px-4 py-2 text-sm font-semibold",
  lg: "max-w-[22rem] px-5 py-3 text-base font-medium leading-6",
};

export default function Tooltip({
  arrow = "none",
  children,
  className,
  size = "sm",
}: TooltipProps) {
  return (
    <div className={cn("relative inline-flex", className)}>
      {arrow !== "none" ? (
        <span className={cn(arrowBase, arrowStyles[arrow])} />
      ) : null}
      <div
        className={cn(
          "relative rounded-lg bg-neutral-900 text-white",
          sizeStyles[size],
        )}
      >
        {children}
      </div>
    </div>
  );
}
