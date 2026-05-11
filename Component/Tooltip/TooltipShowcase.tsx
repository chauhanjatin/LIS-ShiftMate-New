import PreviewFrame from "@/Component/Showcase/PreviewFrame";
import Tooltip from "@/Component/Tooltip/Tooltip";

const tooltipRows = [
  { arrow: "none", shortText: "My Tooltip" },
  { arrow: "bottom", shortText: "My Tooltip" },
  { arrow: "top", shortText: "My Tooltip" },
  { arrow: "right", shortText: "My Tooltip" },
  { arrow: "left", shortText: "My Tooltip" },
] as const;

const longText =
  "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.";

export default function TooltipShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Tooltip
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          <PreviewFrame className="bg-white">
            <div className="grid gap-y-8 md:grid-cols-[140px_1fr] md:gap-x-12">
              {tooltipRows.map((row) => (
                <div key={row.arrow} className="contents">
                  <div className="flex items-center justify-start">
                    <Tooltip arrow={row.arrow}>{row.shortText}</Tooltip>
                  </div>
                  <div className="flex items-center">
                    <Tooltip arrow={row.arrow} size="lg">
                      {longText}
                    </Tooltip>
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
