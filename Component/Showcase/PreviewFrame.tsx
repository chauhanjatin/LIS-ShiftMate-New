import { cn } from "@/_helper/cn";

type PreviewFrameProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function PreviewFrame({
  children,
  className,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-dashed border-accent-500/70 p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
