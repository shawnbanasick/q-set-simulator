import { useAppStore, type StrengthOption } from "./appStore";

const OPTIONS: StrengthOption[] = [
  "very close",
  "close",
  "far",
  "very far",
  "random",
];

function StrengthSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: StrengthOption;
  onChange: (val: StrengthOption) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as StrengthOption)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
      >
        <option value="" disabled>
          Select distance
        </option>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StrengthSelects() {
  const s = useAppStore();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <StrengthSelect
        id="p12"
        label="Perspective 1 and 2"
        value={s.p1p2Strength}
        onChange={s.updateP1P2Strength}
      />
      <StrengthSelect
        id="p23"
        label="Perspective 2 and 3"
        value={s.p2p3Strength}
        onChange={s.updateP2P3Strength}
      />
      <StrengthSelect
        id="p34"
        label="Perspective 3 and 4"
        value={s.p3p4Strength}
        onChange={s.updateP3P4Strength}
      />
      <StrengthSelect
        id="p45"
        label="Perspective 4 and 5"
        value={s.p4p5Strength}
        onChange={s.updateP4P5Strength}
      />
    </div>
  );
}
