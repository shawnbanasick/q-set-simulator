import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

const BAND_LABELS = [
  "0.90 – 1.00",
  "0.80 – 0.89",
  "0.70 – 0.79",
  "0.60 – 0.69",
  "0.50 – 0.59",
  "0.40 – 0.49",
  "0.30 – 0.39",
  "0.20 – 0.29",
  "0.10 – 0.19",
  "0.01 – 0.09",
];

export default function FactorCard({ index }: { index: number }) {
  const row = useAppStore((s) => s.loopArray[index]);
  const updateCutoff = useAppStore((s) => s.updateCutoff);
  const clearPerspective = useAppStore((s) => s.clearPerspective);
  const total = row.reduce((a, b) => a + b, 0);

  return (
    <div
      id={`FactorCard-${index + 1}`}
      className="rounded-lg border border-slate-200 w-[200px]"
    >
      <div className="flex items-center justify-between rounded-t-lg border-b border-slate-200 bg-slate-50 px-3 py-2">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Perspective {index + 1}
          </div>
          <div className="text-xs tabular-nums text-slate-600">
            {total} {total === 1 ? "participant" : "participants"}
          </div>
        </div>
        <button
          type="button"
          onClick={() => clearPerspective(index)}
          disabled={total === 0}
          className="rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Clear
        </button>
      </div>

      <ul className="divide-y divide-slate-100">
        {BAND_LABELS.map((label, band) => (
          <li
            key={label}
            className="flex items-center justify-between gap-2 px-3 py-1.5"
          >
            <span className="text-sm tabular-nums text-slate-700">{label}</span>
            <NumberInput
              value={row[band]}
              onChange={(val) => updateCutoff(index, band, val)}
              min={0}
              max={127}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
