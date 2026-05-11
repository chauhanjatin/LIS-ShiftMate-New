"use client";

import { useState } from "react";
import Checkbox from "@/Component/Checkbox/Checkbox";
import PreviewFrame from "@/Component/Showcase/PreviewFrame";

const initialRows = {
  active: { base: true, left: true, right: true },
  disabled: { base: true, left: true, right: true },
  inactive: { base: false, left: false, right: false },
};

export default function CheckboxShowcase() {
  const [rows, setRows] = useState(initialRows);

  function updateRow(
    rowKey: keyof typeof initialRows,
    field: keyof (typeof initialRows)["active"],
    checked: boolean,
  ) {
    if (rowKey === "disabled") {
      return;
    }

    setRows((currentRows) => ({
      ...currentRows,
      [rowKey]: {
        ...currentRows[rowKey],
        [field]: checked,
      },
    }));
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Components
        </p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
          Checkbox
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] space-y-4">
          <div className="grid grid-cols-[120px_120px_1fr_1fr] items-end gap-x-8">
            <div />
            <div />
            <p className="text-center text-lg font-medium text-neutral-500">
              Right Side Label
            </p>
            <p className="text-center text-lg font-medium text-neutral-500">
              Left Side Label
            </p>
          </div>

          <PreviewFrame className="bg-white">
            <div className="space-y-5">
              <div className="grid grid-cols-[120px_120px_1fr_1fr] items-center gap-x-8">
                <p className="text-lg text-neutral-600">Inactive</p>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.inactive.base}
                    onChange={(event) => updateRow("inactive", "base", event.target.checked)}
                  />
                </div>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.inactive.right}
                    label="Label"
                    onChange={(event) => updateRow("inactive", "right", event.target.checked)}
                  />
                </div>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.inactive.left}
                    label="Label"
                    labelPosition="left"
                    onChange={(event) => updateRow("inactive", "left", event.target.checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[120px_120px_1fr_1fr] items-center gap-x-8">
                <p className="text-lg text-neutral-600">Active</p>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.active.base}
                    onChange={(event) => updateRow("active", "base", event.target.checked)}
                  />
                </div>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.active.right}
                    label="Label"
                    onChange={(event) => updateRow("active", "right", event.target.checked)}
                  />
                </div>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.active.left}
                    label="Label"
                    labelPosition="left"
                    onChange={(event) => updateRow("active", "left", event.target.checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[120px_120px_1fr_1fr] items-center gap-x-8">
                <p className="text-lg text-neutral-600">Disabled</p>
                <div className="flex justify-center">
                  <Checkbox checked={rows.disabled.base} disabled />
                </div>
                <div className="flex justify-center">
                  <Checkbox checked={rows.disabled.right} disabled label="Label" />
                </div>
                <div className="flex justify-center">
                  <Checkbox
                    checked={rows.disabled.left}
                    disabled
                    label="Label"
                    labelPosition="left"
                  />
                </div>
              </div>
            </div>
          </PreviewFrame>
        </div>
      </div>
    </section>
  );
}
