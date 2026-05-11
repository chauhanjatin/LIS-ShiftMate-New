type BarChartDatum = {
  color: string;
  label: string;
  value: number;
};

type BarChartCardProps = Readonly<{
  data?: BarChartDatum[];
  title?: string;
}>;

const defaultData: BarChartDatum[] = [
  { label: "Jan", value: 16.6, color: "var(--blue-300)" },
  { label: "Feb", value: 18.4, color: "var(--green-300)" },
  { label: "Mar", value: 17.1, color: "var(--cyan-300)" },
  { label: "Apr", value: 19.3, color: "var(--purple-300)" },
  { label: "May", value: 15.8, color: "var(--blue-300)" },
  { label: "Jun", value: 18.3, color: "var(--orange-300)" },
  { label: "Jul", value: 16.6, color: "var(--blue-300)" },
  { label: "Aug", value: 18.4, color: "var(--green-300)" },
  { label: "Sep", value: 17.1, color: "var(--cyan-300)" },
  { label: "Oct", value: 19.3, color: "var(--blue-300)" },
  { label: "Nov", value: 15.8, color: "var(--purple-300)" },
  { label: "Dec", value: 18.3, color: "var(--orange-300)" },
];

const yTicks = [20, 15, 10, 5];

export default function BarChartCard({
  data = defaultData,
  title = "Workforce Growth",
}: BarChartCardProps) {
  const maxValue = 20;

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white px-6 py-6 shadow-[var(--shadow-sm)] sm:px-8">
      <h3 className="mb-7 text-[2rem] font-bold tracking-[-0.04em] text-neutral-900">
        {title}
      </h3>

      <div className="grid grid-cols-[26px_1fr] gap-4">
        <div className="relative h-60">
          {yTicks.map((tick, index) => (
            <span
              key={tick}
              className="absolute left-0 text-sm font-medium text-neutral-400"
              style={{ top: `${index * 27.5}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0">
            {yTicks.map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-neutral-200"
                style={{
                  top: `${((maxValue - tick) / maxValue) * 100}%`,
                }}
              />
            ))}
            <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200" />
          </div>

          <div className="relative flex h-60 items-end justify-between gap-5 px-6">
            {data.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-3">
                <div
                  className="w-5 rounded-t-md"
                  style={{
                    height: `${(item.value / maxValue) * 190}px`,
                    backgroundColor: item.color,
                  }}
                />
                <span className="text-sm font-medium text-neutral-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
