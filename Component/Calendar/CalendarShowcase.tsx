import CalendarCard from "@/Component/Calendar/CalendarCard";

export default function CalendarShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Calendar
        </h2>
      </div>

      <div className="flex justify-center sm:justify-start">
        <CalendarCard />
      </div>
    </section>
  );
}
