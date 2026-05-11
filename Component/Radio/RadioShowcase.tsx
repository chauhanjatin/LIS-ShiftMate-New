import Radio from "@/Component/Radio/Radio";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";

const rows = [
  { label: "Inactive", checked: false, disabled: false },
  { label: "Active", checked: true, disabled: false },
  { label: "Disabled", checked: true, disabled: true },
] as const;

export default function RadioShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Radio Button
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] space-y-4">
          <div className="grid grid-cols-[120px_120px_1fr_1fr] items-end gap-x-8">
            <div />
            <div />
            <p className="text-center text-lg font-medium text-neutral-500">
              Right Side Label
            </p>
            <p className="text-center text-lg font-medium text-neutral-500">
              Left Side Label
            </p>
          </div>

          <PreviewFrame className="bg-white">
            <div className="space-y-5">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[120px_120px_1fr_1fr] items-center gap-x-8"
                >
                  <p className="text-lg text-neutral-600">{row.label}</p>
                  <div className="flex justify-center">
                    <Radio checked={row.checked} disabled={row.disabled} readOnly />
                  </div>
                  <div className="flex justify-center">
                    <Radio
                      checked={row.checked}
                      disabled={row.disabled}
                      label="Label"
                      readOnly
                    />
                  </div>
                  <div className="flex justify-center">
                    <Radio
                      checked={row.checked}
                      disabled={row.disabled}
                      label="Label"
                      labelPosition="left"
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </PreviewFrame>
        </div>
      </div>
    </section>
  );
}
