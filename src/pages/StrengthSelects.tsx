import React from "react";
import { useAppStore, type StrengthOption } from "./appStore";

const STRENGTH_OPTIONS: StrengthOption[] = ["very close", "close", "far", "very far", "random"];

// --- Reusable Select Component ---
interface StrengthSelectProps {
  label: string;
  value: StrengthOption;
  onChange: (val: StrengthOption) => void;
}

const StrengthSelect: React.FC<StrengthSelectProps> = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 ml-4">
    <label className="text-xs font-semibold tracking-wide text-gray-600 uppercase">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as StrengthOption)}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    >
      <option value="" disabled>
        Select distance…
      </option>
      {STRENGTH_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

// --- Composed Component ---
export const StrengthSelects: React.FC = () => {
  const {
    p1p2Strength,
    p2p3Strength,
    p3p4Strength,
    p4p5Strength,
    updateP1P2Strength,
    updateP2P3Strength,
    updateP3P4Strength,
    updateP4P5Strength,
  } = useAppStore();

  return (
    <div className="flex flex-col gap-2">
      <StrengthSelect label="P1-P2" value={p1p2Strength} onChange={updateP1P2Strength} />
      <StrengthSelect label="P2-P3" value={p2p3Strength} onChange={updateP2P3Strength} />
      <StrengthSelect label="P3-P4" value={p3p4Strength} onChange={updateP3P4Strength} />
      <StrengthSelect label="P4-P5" value={p4p5Strength} onChange={updateP4P5Strength} />
    </div>
  );
};

export default StrengthSelects;
