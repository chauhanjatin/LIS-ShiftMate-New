"use client";

import { useState } from "react";

type AreaChartPoint = {
  amount: string;
  label: string;
  sales: string;
  value: number;
};

type AreaChartSeries = {
  activeIndex: number;
  points: AreaChartPoint[];
};

type AreaChartCardProps = Readonly<{
  title?: string;
}>;

const chartSeries: Record<"days" | "weekly" | "monthly", AreaChartSeries> = {
  days: {
    activeIndex: 5,
    points: [
      { label: "Jan", value: 13.8, sales: "1,122 sales", amount: "$2,912" },
      { label: "Feb", value: 17.2, sales: "1,264 sales", amount: "$3,104" },
      { label: "Mar", value: 11.7, sales: "952 sales", amount: "$2,401" },
      { label: "Apr", value: 15.6, sales: "1,280 sales", amount: "$3,016" },
      { label: "May", value: 20.9, sales: "1,518 sales", amount: "$3,984" },
      { label: "Jun", value: 17.5, sales: "1,348 sales", amount: "$3,348" },
      { label: "Jul", value: 19.8, sales: "1,426 sales", amount: "$3,655" },
      { label: "Aug", value: 17.9, sales: "1,311 sales", amount: "$3,210" },
      { label: "Sep", value: 17.6, sales: "1,294 sales", amount: "$3,184" },
      { label: "Oct", value: 14.7, sales: "1,016 sales", amount: "$2,842" },
      { label: "Nov", value: 12.6, sales: "934 sales", amount: "$2,256" },
      { label: "Dec", value: 19.4, sales: "1,482 sales", amount: "$3,621" },
    ],
  },
  weekly: {
    activeIndex: 3,
    points: [
      { label: "Mon", value: 9.2, sales: "144 sales", amount: "$428" },
      { label: "Tue", value: 12.8, sales: "192 sales", amount: "$566" },
      { label: "Wed", value: 15.7, sales: "230 sales", amount: "$698" },
      { label: "Thu", value: 13.9, sales: "208 sales", amount: "$632" },
      { label: "Fri", value: 17.1, sales: "256 sales", amount: "$764" },
      { label: "Sat", value: 14.5, sales: "221 sales", amount: "$688" },
      { label: "Sun", value: 11.4, sales: "176 sales", amount: "$511" },
    ],
  },
  monthly: {
    activeIndex: 2,
    points: [
      { label: "Q1", value: 11.6, sales: "3,338 sales", amount: "$8,417" },
      { label: "Q2", value: 18.7, sales: "4,146 sales", amount: "$10,124" },
      { label: "Q3", value: 16.8, sales: "3,904 sales", amount: "$9,348" },
      { label: "Q4", value: 20.2, sales: "4,512 sales", amount: "$11,006" },
    ],
  },
};

const yTicks = [20, 15, 10, 5];

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const following = points[index + 2] ?? next;

    const controlPointOneX = current.x + (next.x - previous.x) / 6;
    const controlPointOneY = current.y + (next.y - previous.y) / 6;
    const controlPointTwoX = next.x - (following.x - current.x) / 6;
    const controlPointTwoY = next.y - (following.y - current.y) / 6;

    path += ` C ${controlPointOneX} ${controlPointOneY}, ${controlPointTwoX} ${controlPointTwoY}, ${next.x} ${next.y}`;
  }

  return path;
}

export default function AreaChartCard({
  title = "Workforce Growth",
}: AreaChartCardProps) {
  const [activeTab, setActiveTab] = useState<"days" | "weekly" | "monthly">("days");
  const [activeIndex, setActiveIndex] = useState(chartSeries.days.activeIndex);

  const currentSeries = chartSeries[activeTab];
  const data = currentSeries.points;
  const safeActiveIndex = Math.min(activeIndex, data.length - 1);
  const viewBoxWidth = 1000;
  const viewBoxHeight = 320;
  const chartLeft = 54;
  const chartRight = 976;
  const chartTop = 30;
  const chartBottom = 248;
  const yMin = 5;
  const yMax = 20;

  const xStep = data.length > 1 ? (chartRight - chartLeft) / (data.length - 1) : 0;
  const points = data.map((point, index) => ({
    x: chartLeft + xStep * index,
    y:
      chartBottom -
      ((point.value - yMin) / (yMax - yMin)) * (chartBottom - chartTop),
    ...point,
  }));

  const linePath = buildSmoothPath(points);
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${chartBottom} L ${points[0].x} ${chartBottom} Z`
      : "";
  const activePoint = points[safeActiveIndex];

  function handleTabChange(nextTab: "days" | "weekly" | "monthly") {
    setActiveTab(nextTab);
    setActiveIndex(chartSeries[nextTab].activeIndex);
  }

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white px-6 py-5 shadow-[var(--shadow-sm)] sm:px-8 sm:py-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-[2rem] font-bold tracking-[-0.04em] text-neutral-900">
          {title}
        </h3>
        <div className="grid grid-cols-3 overflow-hidden rounded-[0.95rem] border border-neutral-200 bg-white p-1 text-base font-medium text-neutral-400">
          {(["days", "weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab
                  ? "rounded-[0.75rem] bg-neutral-900 px-8 py-2.5 text-white"
                  : "px-8 py-2.5 capitalize"
              }
              onClick={() => handleTabChange(tab)}
            >
              {tab === "days" ? "Days" : tab === "weekly" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="w-full">
        {yTicks.map((tick) => {
          const y =
            chartBottom - ((tick - yMin) / (yMax - yMin)) * (chartBottom - chartTop);

          return (
            <g key={tick}>
              <line
                x1={chartLeft}
                y1={y}
                x2={chartRight}
                y2={y}
                stroke="#DCE4F2"
                strokeWidth="1"
              />
              <text
                x="12"
                y={y + 4}
                fontSize="14"
                fontWeight="500"
                fill="#98A2B3"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="rgba(37,123,252,0.22)" />
        <path
          d={linePath}
          fill="none"
          stroke="#257BFC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {activePoint ? (
          <>
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={chartBottom}
              stroke="#257BFC"
              strokeWidth="2"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="10"
              fill="#257BFC"
              stroke="#FFFFFF"
              strokeWidth="4"
            />

            <g transform={`translate(${activePoint.x - 122}, ${activePoint.y - 28})`}>
              <rect width="104" height="64" rx="10" fill="#1A2233" />
              <text
                x="52"
                y="24"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#FFFFFF"
              >
                {activePoint.sales}
              </text>
              <text
                x="52"
                y="47"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#FFFFFF"
              >
                {activePoint.amount}
              </text>
            </g>
          </>
        ) : null}

        {points.map((point, index) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="18"
              fill="transparent"
              onMouseEnter={() => setActiveIndex(index)}
            />
            <text
              x={point.x}
              y="274"
              textAnchor="middle"
              fontSize="14"
              fontWeight="500"
              fill="#98A2B3"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
