const shadowCards = [
  { label: "xs", className: "shadow-[var(--shadow-xs)]" },
  { label: "sm", className: "shadow-[var(--shadow-sm)]" },
  { label: "md", className: "shadow-[var(--shadow-md)]" },
  { label: "lg", className: "shadow-[var(--shadow-lg)]" },
  { label: "None", className: "shadow-none" },
] as const;

export default function ShadowsShowcase() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Tokens
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Shadows
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        {shadowCards.map((card) => (
          <div key={card.label} className="space-y-5">
            <p className="text-2xl font-semibold tracking-tight text-zinc-950">
              {card.label}
            </p>
            <div
              className={`h-44 rounded-[2rem] bg-white ${card.className}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
