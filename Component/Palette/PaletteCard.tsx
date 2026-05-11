import type { ColorSwatch } from "@/Data/colorPalette";

type PaletteCardProps = {
  swatch: ColorSwatch;
};

export default function PaletteCard({ swatch }: PaletteCardProps) {
  const hex = swatch.hex.replace("#", "");

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_18px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/3">
      <div
        className="h-36 w-full sm:h-40"
        style={{ backgroundColor: `var(${swatch.cssVar})` }}
      />
      <div className="space-y-1 px-4 py-3">
        <h3 className="text-sm font-semibold tracking-tight text-zinc-950">
          {swatch.label}
        </h3>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          {hex}
        </p>
      </div>
    </article>
  );
}
