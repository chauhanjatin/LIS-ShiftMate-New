import StatusPill from "@/Component/Status/StatusPill";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";

const statusItems = [
  { label: "Text", variant: "warning" },
  { label: "Text", variant: "success" },
  { label: "Text", variant: "info" },
  { label: "Text", variant: "danger" },
  { label: "Text", variant: "accent" },
] as const;

export default function StatusShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Status
        </h2>
      </div>

      <div className="max-w-xs">
        <PreviewFrame className="bg-white">
          <div className="space-y-7">
            {statusItems.map((item) => (
              <div key={`${item.variant}-${item.label}`} className="flex justify-center">
                <StatusPill variant={item.variant}>{item.label}</StatusPill>
              </div>
            ))}
          </div>
        </PreviewFrame>
      </div>
    </section>
  );
}
