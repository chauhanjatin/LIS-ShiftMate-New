type DonutChartLegend = {
  color: string;
  label: string;
  value: number;
};

type DonutChartCardProps = Readonly<{
  title?: string;
}>;

const legendItems: DonutChartLegend[] = [
  { label: "HR", value: 12, color: "var(--green-500)" },
  { label: "Engineering", value: 60, color: "var(--purple-500)" },
  { label: "Sales", value: 30, color: "var(--blue-500)" },
  { label: "Support", value: 15, color: "var(--orange-500)" },
];

const ringSegments = [
  { value: 30, color: "var(--blue-500)" },
  { value: 60, color: "var(--purple-500)" },
  { value: 12, color: "var(--green-500)" },
  { value: 15, color: "var(--orange-500)" },
];

export default function DonutChartCard({
  title = "Employees by Department",
}: DonutChartCardProps) {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const total = ringSegments.reduce((sum, segment) => sum + segment.value, 0);
  const chartSegments = ringSegments.reduce<
    Array<{ color: string; dashLength: number; dashOffset: number }>
  >((segments, segment, index) => {
    const dashLength = (segment.value / total) * circumference;
    const dashOffset =
      index === 0
        ? circumference * 0.61
        : segments[index - 1].dashOffset - segments[index - 1].dashLength;

    segments.push({
      color: segment.color,
      dashLength,
      dashOffset,
    });

    return segments;
  }, []);

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white px-6 py-6 shadow-[var(--shadow-sm)] sm:px-8">
      <h3 className="mb-6 text-[2rem] font-bold tracking-[-0.04em] text-neutral-900">
        {title}
      </h3>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
        <svg viewBox="0 0 220 220" className="mx-auto w-full max-w-[220px]">
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#F2F4F7"
            strokeWidth="30"
          />
          {chartSegments.map((segment) => (
            <circle
              key={`${segment.color}-${segment.dashLength}`}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="30"
              strokeLinecap="round"
              strokeDasharray={`${segment.dashLength} ${circumference}`}
              strokeDashoffset={segment.dashOffset}
              transform="rotate(-90 110 110)"
            />
          ))}
        </svg>

        <div className="space-y-4">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[1.45rem] font-medium tracking-tight text-neutral-900">
                  {item.label}
                </span>
              </div>
              <span className="text-[1.3rem] font-medium tracking-tight text-neutral-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
