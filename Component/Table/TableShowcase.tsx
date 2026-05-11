import Avatar from "@/Component/Avatar/Avatar";
import Checkbox from "@/Component/Checkbox/Checkbox";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/Component/Icons/SystemIcons";
import Radio from "@/Component/Radio/Radio";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";
import StatusPill from "@/Component/Status/StatusPill";
import Switch from "@/Component/Switch/Switch";
import TableHeaderCell from "@/Component/Table/TableHeaderCell";
import TablePagination from "@/Component/Table/TablePagination";
import TableSelect from "@/Component/Table/TableSelect";
import { cn } from "@/_helper/cn";

type RowState = "default" | "hover" | "selected";

function PaginationArrowButton({
  dark = false,
  direction = "right",
  filled = false,
}: Readonly<{ dark?: boolean; direction?: "left" | "right"; filled?: boolean }>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border",
        dark
          ? "border-neutral-800 bg-neutral-900 text-white"
          : filled
            ? "border-neutral-100 bg-neutral-100 text-neutral-900"
            : "border-transparent bg-transparent text-neutral-900",
      )}
    >
      {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

function DotMatrixPreview() {
  return (
    <PreviewFrame className="bg-white px-6 py-5">
      <div className="grid justify-center gap-y-4">
        {[1, 2, 3, 4].map((count) => (
          <div key={count} className="flex justify-center gap-4">
            {Array.from({ length: count }).map((_, index) => (
              <span
                key={`${count}-${index}`}
                className="h-5 w-5 rounded-full border-2 border-neutral-900"
              />
            ))}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function AvatarPreview() {
  return (
    <PreviewFrame className="bg-white px-6 py-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar size="lg" />
        <Avatar size="lg" online />
        <Avatar size="lg" showIcon tone="muted" />
      </div>
    </PreviewFrame>
  );
}

function TableCellRow({ state }: Readonly<{ state: RowState }>) {
  return (
    <div
      className={cn(
        "grid grid-cols-[28px_48px_1fr_150px_116px_38px_58px] items-center gap-4 border-b border-neutral-200 px-6 py-3",
        state === "hover" ? "bg-brand-50" : "bg-white",
      )}
    >
      <Checkbox checked={state === "selected"} readOnly />
      <Avatar size="md" tone={state === "hover" ? "muted" : "white"} />
      <span className="text-[1.2rem] font-medium tracking-tight text-neutral-900">
        Table Cell
      </span>
      <TableSelect />
      <StatusPill variant="warning" className="min-w-0 px-5 py-2 text-base">
        Text
      </StatusPill>
      <Radio checked={false} readOnly />
      <Switch checked readOnly />
    </div>
  );
}

export default function TableShowcase() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Table
        </h2>
      </div>

      <div className="space-y-10">
        <div className="grid gap-6 xl:grid-cols-[1fr_220px]">
          <div className="space-y-4">
            <h3 className="text-[1.6rem] font-medium tracking-tight text-neutral-900">
              Table Header
            </h3>
            <div className="max-w-[30rem]">
              <PreviewFrame className="bg-white px-5 py-5">
                <div className="grid gap-5 md:grid-cols-3">
                  <TableHeaderCell label="Header" />
                  <TableHeaderCell label="Header" checkboxPosition="left" />
                  <TableHeaderCell label="Header" checkboxPosition="right" />
                </div>
              </PreviewFrame>
            </div>
          </div>

          <DotMatrixPreview />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_180px]">
          <div className="space-y-4">
            <h3 className="text-[1.6rem] font-medium tracking-tight text-neutral-900">
              Table Cell
            </h3>
            <div className="overflow-x-auto">
              <div className="min-w-[860px]">
                <PreviewFrame className="bg-white px-5 py-6">
                  <div className="grid grid-cols-[110px_1fr] gap-y-4">
                    <span className="self-center text-lg text-neutral-500">Default</span>
                    <TableCellRow state="default" />
                    <span className="self-center text-lg text-neutral-500">Hover</span>
                    <TableCellRow state="hover" />
                    <span className="self-center text-lg text-neutral-500">Selected</span>
                    <TableCellRow state="selected" />
                  </div>
                </PreviewFrame>
              </div>
            </div>
          </div>

          <AvatarPreview />
        </div>

        <div className="space-y-4">
          <h3 className="text-[1.6rem] font-medium tracking-tight text-neutral-900">
            Pagination
          </h3>

          <div className="grid gap-8 xl:grid-cols-[140px_1fr]">
            <div className="space-y-8">
              <PreviewFrame className="bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <PaginationArrowButton direction="left" filled />
                  <PaginationArrowButton direction="right" />
                </div>
              </PreviewFrame>

              <PreviewFrame className="bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <PaginationArrowButton dark direction="left" />
                  <PaginationArrowButton dark direction="right" />
                </div>
              </PreviewFrame>
            </div>

            <div className="space-y-8">
              <PreviewFrame className="bg-white px-5 py-5">
                <TablePagination className="rounded-[0.8rem] border border-neutral-100" />
              </PreviewFrame>

              <PreviewFrame className="bg-white px-5 py-5">
                <TablePagination dark className="rounded-[0.8rem]" />
              </PreviewFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
