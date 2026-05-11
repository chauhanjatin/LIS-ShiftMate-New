import Button from "@/Component/Button/Button";
import { PlusCircleIcon } from "@/Component/Icons/SystemIcons";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";

const variants = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "link", label: "Link" },
] as const;

const stateRows = [
  { label: "Default", previewState: "default" },
  { label: "Hover", previewState: "hover" },
  { label: "Disabled", previewState: "disabled" },
] as const;

const iconRows = [
  { label: "Default Left Icon", previewState: "default", leftIcon: true },
  { label: "Hover Left Icon", previewState: "hover", leftIcon: true },
  { label: "Disabled Left Icon", previewState: "disabled", leftIcon: true },
  { label: "Default Right Icon", previewState: "default", rightIcon: true },
  { label: "Hover Right Icon", previewState: "hover", rightIcon: true },
  { label: "Disabled Right Icon", previewState: "disabled", rightIcon: true },
] as const;

const previewRows = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "link", label: "Link" },
] as const;

export default function ButtonShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Buttons
        </h2>
      </div>

      <PreviewFrame className="bg-white">
        <div className="grid gap-5">
          {previewRows.map((row) => (
            <div
              key={row.variant}
              className="grid gap-4 md:grid-cols-3"
            >
              {stateRows.map((item) => (
                <div key={`${row.variant}-${item.label}`} className="flex justify-center">
                  <Button
                    variant={row.variant}
                    previewState={item.previewState}
                    leftIcon={<PlusCircleIcon />}
                    rightIcon={<PlusCircleIcon />}
                  >
                    Button
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </PreviewFrame>

      <div className="overflow-x-auto">
        <div className="min-w-[880px] space-y-4">
          <div className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] items-end gap-x-8">
            <div />
            {variants.map((variant) => (
              <p
                key={variant.key}
                className="text-center text-lg font-medium text-neutral-800"
              >
                {variant.label}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            {stateRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] items-center gap-x-8"
              >
                <p className="text-lg text-neutral-800">{row.label}</p>
                {variants.map((variant) => (
                  <div key={`${row.label}-${variant.key}`} className="flex justify-center py-1">
                    <Button variant={variant.key} previewState={row.previewState}>
                      Button
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="h-4" />

          <div className="space-y-4">
            {iconRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] items-center gap-x-8"
              >
                <p className="text-lg text-neutral-800">{row.label}</p>
                {variants.map((variant) => (
                  <div key={`${row.label}-${variant.key}`} className="flex justify-center py-1">
                    <Button
                      variant={variant.key}
                      previewState={row.previewState}
                      leftIcon={
                        "leftIcon" in row && row.leftIcon ? <PlusCircleIcon /> : undefined
                      }
                      rightIcon={
                        "rightIcon" in row && row.rightIcon ? <PlusCircleIcon /> : undefined
                      }
                    >
                      Button
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
