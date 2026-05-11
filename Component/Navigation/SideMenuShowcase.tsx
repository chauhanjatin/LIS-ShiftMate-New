import SideMenuItem from "@/Component/Navigation/SideMenuItem";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";

const rows = [
  { label: "Text", previewState: "default" },
  { label: "Text", previewState: "hover" },
  { label: "Text", previewState: "active" },
] as const;

export default function SideMenuShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Side Menu
        </h2>
      </div>

      <div className="max-w-sm">
        <PreviewFrame className="bg-neutral-950">
          <div className="space-y-4">
            {rows.map((row) => (
              <SideMenuItem key={`${row.previewState}-${row.label}`} previewState={row.previewState}>
                {row.label}
              </SideMenuItem>
            ))}
          </div>
        </PreviewFrame>
      </div>
    </section>
  );
}
