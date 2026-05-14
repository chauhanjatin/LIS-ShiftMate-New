const usageExamples = [
  {
    title: "Use Semantic Tailwind Tokens",
    description:
      "Use the semantic names from app/globals.css for buttons, cards, text, borders, and states.",
    code: `export function SaveButton() {
  return (
    <button className="rounded-full bg-brand-500 px-5 py-3 text-white hover:bg-brand-600">
      Save Changes
    </button>
  );
}`,
  },
  {
    title: "Use Raw CSS Variables",
    description:
      "Use raw palette variables when a color is dynamic or needs to be passed through inline styles.",
    code: `export function StatusDot() {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full bg-[var(--green-500)] shadow-[0_0_0_4px_var(--green-50)]"
    />
  );
}`,
  },
  {
    title: "Render From Palette Data",
    description:
      "Import the palette data when you want to build docs, pickers, previews, or generated UI.",
    code: `import { paletteGroups } from "@/Data/colorPalette";

const brandPalette = paletteGroups.find((group) => group.key === "blue");

brandPalette?.shades.map((swatch) => (
  // Use style for purely dynamic CSS variables
  <div key={swatch.label} style={{ backgroundColor: \`var(\${swatch.cssVar})\` }} />
));`,
  },
];

const tokenGuide = [
  {
    title: "Brand",
    token: "brand",
    purpose: "Primary actions, links, key headings",
    previewClassName: "bg-brand-500 text-white",
  },
  {
    title: "Neutral",
    token: "neutral",
    purpose: "Text, surfaces, borders, layout structure",
    previewClassName: "bg-neutral-800 text-white",
  },
  {
    title: "Success",
    token: "success",
    purpose: "Success alerts, confirmed actions, positive metrics",
    previewClassName: "bg-success-500 text-white",
  },
  {
    title: "Warning",
    token: "warning",
    purpose: "Warnings, pending states, attention items",
    previewClassName: "bg-warning-500 text-neutral-900",
  },
  {
    title: "Accent",
    token: "accent",
    purpose: "Secondary emphasis, highlights, featured UI",
    previewClassName: "bg-accent-500 text-white",
  },
  {
    title: "Info",
    token: "info",
    purpose: "Info banners, charts, support states",
    previewClassName: "bg-info-500 text-white",
  },
];

export default function PaletteUsage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Usage Guide
        </p>
        <h2 className="text-3xl font-bold tracking-[-0.04em] text-zinc-950 sm:text-4xl">
          How to use this palette in the project
        </h2>
        <p className="max-w-3xl text-base leading-7 text-zinc-600">
          The colors are available in two ways: semantic Tailwind utilities for
          everyday UI, and raw CSS variables for dynamic styling.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <div className="grid gap-4">
          {usageExamples.map((example) => (
            <article
              key={example.title}
              className="rounded-[1.8rem] border border-white/70 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/3"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-950">
                  {example.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600">
                  {example.description}
                </p>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-neutral-900 p-4 text-sm leading-6 text-white">
                <code className="font-mono">{example.code}</code>
              </pre>
            </article>
          ))}
        </div>

        <div className="grid gap-4">
          <article className="rounded-[1.8rem] border border-white/70 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-950">
                Live UI Preview
              </h3>
              <p className="text-sm leading-6 text-zinc-600">
                A small example using the same tokens you can use in forms,
                alerts, badges, and buttons.
              </p>
            </div>

            <div className="mt-5 space-y-4 rounded-[1.5rem] bg-surface-muted p-4">
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
                  Primary Button
                </button>
                <button className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-400">
                  Secondary Button
                </button>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-success-100 bg-success-50 px-4 py-3 text-sm text-success-900">
                  Payment completed successfully.
                </div>
                <div className="rounded-2xl border border-warning-100 bg-warning-50 px-4 py-3 text-sm text-warning-900">
                  Shift still needs manager approval.
                </div>
                <div className="rounded-2xl border border-info-100 bg-info-50 px-4 py-3 text-sm text-info-900">
                  New team updates were published today.
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-white/70 bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-950">
                Recommended Mapping
              </h3>
              <p className="text-sm leading-6 text-zinc-600">
                Prefer semantic tokens instead of raw palette names in product
                UI. It keeps styling consistent when the palette evolves.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {tokenGuide.map((item) => (
                <div
                  key={item.token}
                  className="grid gap-3 rounded-2xl border border-neutral-200 bg-surface px-4 py-4 sm:grid-cols-[auto_1fr]"
                >
                  <span
                    className={`inline-flex h-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${item.previewClassName}`}
                  >
                    {item.token}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-950">
                      {item.title}
                    </p>
                    <p className="text-sm leading-6 text-zinc-600">
                      {item.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
