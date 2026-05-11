import { cn } from "@/_helper/cn";

type TableHeaderCellProps = Readonly<{
  checkboxPosition?: "left" | "right";
  className?: string;
  label: string;
}>;

function HeaderCheckbox() {
  return <span className="h-5 w-5 rounded-md border border-neutral-300 bg-white" />;
}

export default function TableHeaderCell({
  checkboxPosition,
  className,
  label,
}: TableHeaderCellProps) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center justify-center gap-3 border-b border-neutral-200 bg-neutral-50 px-6 text-[1.1rem] font-medium tracking-tight text-neutral-900",
        className,
      )}
    >
      {checkboxPosition === "left" ? <HeaderCheckbox /> : null}
      <span>{label}</span>
      {checkboxPosition === "right" ? <HeaderCheckbox /> : null}
    </div>
  );
}
