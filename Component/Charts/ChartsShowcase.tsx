import AreaChartCard from "@/Component/Charts/AreaChartCard";
import BarChartCard from "@/Component/Charts/BarChartCard";
import DonutChartCard from "@/Component/Charts/DonutChartCard";

export default function ChartsShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Charts
        </h2>
      </div>

      <div className="space-y-8">
        <AreaChartCard />
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.4fr]">
          <DonutChartCard />
          <BarChartCard />
        </div>
      </div>
    </section>
  );
}
