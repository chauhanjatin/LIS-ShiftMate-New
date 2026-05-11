import ButtonShowcase from "@/Component/Button/ButtonShowcase";
import CalendarShowcase from "@/Component/Calendar/CalendarShowcase";
import CheckboxShowcase from "@/Component/Checkbox/CheckboxShowcase";
import ChartsShowcase from "@/Component/Charts/ChartsShowcase";
import SideMenuShowcase from "@/Component/Navigation/SideMenuShowcase";
import PaletteCard from "@/Component/Palette/PaletteCard";
import PaletteUsage from "@/Component/Palette/PaletteUsage";
import RadioShowcase from "@/Component/Radio/RadioShowcase";
import ShadowsShowcase from "@/Component/Shadows/ShadowsShowcase";
import StatusShowcase from "@/Component/Status/StatusShowcase";
import SwitchShowcase from "@/Component/Switch/SwitchShowcase";
import TableShowcase from "@/Component/Table/TableShowcase";
import TooltipShowcase from "@/Component/Tooltip/TooltipShowcase";
import { paletteGroups } from "@/Data/colorPalette";

export default function Home() {
  return (
    <section className="w-full py-4 sm:py-8">
      <div className="space-y-14">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              Design System
            </p>
            <h1 className="text-5xl font-black tracking-[-0.05em] text-brand-500 sm:text-6xl lg:text-7xl">
              Color Palette
            </h1>
            <p className="max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
              A reusable project palette with primary, neutral, semantic, and
              global colors. These swatches are also defined as CSS theme tokens
              in <code>app/globals.css</code>.
            </p>
          </div>

          <div className="grid max-w-xs gap-4">
            <article className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-white shadow-[0_18px_50px_rgba(17,24,39,0.08)] ring-1 ring-black/3">
              <div className="h-44 bg-[var(--gray-200)]" />
              <div className="space-y-1 px-4 py-3">
                <h2 className="text-base font-semibold tracking-tight text-zinc-950">
                  Color Title
                </h2>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
                  Color HEX
                </p>
              </div>
            </article>
          </div>
        </div>

        <PaletteUsage />

        <section className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              UI Library
            </p>
            <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
              Core Components
            </h2>
            <p className="max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
              Reusable components built from the same color system and design
              tokens used across the project.
            </p>
          </div>

          <div className="space-y-16">
            <ButtonShowcase />
            <CheckboxShowcase />
            <RadioShowcase />
            <SwitchShowcase />
            <StatusShowcase />
            <TooltipShowcase />
            <CalendarShowcase />
            <ChartsShowcase />
            <TableShowcase />
            <ShadowsShowcase />
            <SideMenuShowcase />
          </div>
        </section>

        {paletteGroups.map((group) => (
          <section key={group.key} className="space-y-5">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-zinc-900">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {group.shades.map((swatch) => (
                <PaletteCard key={swatch.label} swatch={swatch} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
