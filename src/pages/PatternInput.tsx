import { useState, useRef, useCallback } from "react";

interface PatternInputProps {
  controlledValue?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

function PatternInput({
  controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  disabled = false,
  onChange,
}: PatternInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const value = controlledValue ?? internalValue;
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const setValue = useCallback(
    (v: number | ((prev: number) => number)) => {
      const raw = typeof v === "function" ? v(value) : v;
      const clamped = clamp(Math.round(raw / step) * step);
      if (controlledValue === undefined) setInternalValue(clamped);
      onChange?.(clamped);
    },
    [controlledValue, min, max, step, onChange, value],
  );

  const startContinuous = (dir: "up" | "down") => {
    setValue(value + (dir === "up" ? step : -step));
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setValue((prev) => prev + (dir === "up" ? step : -step));
      }, 80);
    }, 380);
  };

  const stopContinuous = () => {
    clearTimeout(timeoutRef.current ?? undefined);
    clearInterval(intervalRef.current ?? undefined);
  };

  const commitInput = () => {
    const parsed = parseFloat(inputStr);
    if (!isNaN(parsed)) setValue(parsed);
    setIsEditing(false);
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="flex flex-col items-center gap-0.5">
      {label && (
        <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-400 select-none truncate w-full text-center">
          {label}
        </span>
      )}
      <div
        className={[
          "flex items-stretch rounded-md overflow-hidden border transition-all duration-150",
          focused
            ? "border-sky-400 shadow-[0_0_0_2px_rgba(56,189,248,0.2)] bg-white"
            : "border-slate-200 bg-white shadow-sm hover:border-slate-300",
          disabled ? "opacity-40" : "",
        ].join(" ")}
      >
        {/* Decrement */}
        <button
          type="button"
          disabled={disabled || atMin}
          onMouseDown={() => !disabled && !atMin && startContinuous("down")}
          onMouseUp={stopContinuous}
          onMouseLeave={stopContinuous}
          className={[
            "flex items-center justify-center w-5 text-slate-400 border-r border-slate-200 transition-colors duration-100 select-none",
            atMin || disabled
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-slate-50 hover:text-slate-700 active:bg-slate-100 cursor-pointer",
          ].join(" ")}
          aria-label="Decrease"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="5" x2="8" y2="5" />
          </svg>
        </button>

        {/* Value */}
        <div className="flex items-center justify-center" style={{ width: 36 }}>
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              onBlur={commitInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitInput();
                if (e.key === "Escape") setIsEditing(false);
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setValue(value + step);
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setValue(value - step);
                }
              }}
              className="w-full text-center bg-transparent text-slate-800 font-mono text-xs font-semibold outline-none caret-sky-500 py-1"
            />
          ) : (
            <button
              type="button"
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onClick={() => {
                if (!disabled) {
                  setInputStr(String(value));
                  setIsEditing(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setValue(value + step);
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setValue(value - step);
                }
              }}
              className="w-full text-slate-800 font-mono text-xs font-semibold text-center select-none focus:outline-none cursor-text py-1"
            >
              {value}
            </button>
          )}
        </div>

        {/* Increment */}
        <button
          type="button"
          disabled={disabled || atMax}
          onMouseDown={() => !disabled && !atMax && startContinuous("up")}
          onMouseUp={stopContinuous}
          onMouseLeave={stopContinuous}
          className={[
            "flex items-center justify-center w-5 text-slate-400 border-l border-slate-200 transition-colors duration-100 select-none",
            atMax || disabled
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-slate-50 hover:text-slate-700 active:bg-slate-100 cursor-pointer",
          ].join(" ")}
          aria-label="Increase"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="5" y1="2" x2="5" y2="8" />
            <line x1="2" y1="5" x2="8" y2="5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const CHANNEL_LABELS = [
  "Kick",
  "Snare",
  "Hi-Hat",
  "Clap",
  "Tom 1",
  "Tom 2",
  "Ride",
  "Crash",
  "Bass",
  "Lead",
  "Pad",
  "Arp",
  "FX 1",
  "FX 2",
  "Vox",
  "Perc",
  "Send A",
  "Send B",
  "Master L",
  "Master R",
];

export default function App() {
  const [values, setValues] = useState(() =>
    CHANNEL_LABELS.map(() => Math.floor(Math.random() * 80) + 10),
  );

  const update = (i: number, v: number) =>
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center">
        <h1 className="text-slate-700 text-lg font-bold tracking-tight">Channel Levels</h1>
        <p className="text-slate-400 text-xs font-mono mt-0.5">20 inputs · compact light mode</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {CHANNEL_LABELS.map((label, i) => (
            <PatternInput
              key={label}
              label={label}
              controlledValue={values[i]}
              onChange={(v) => update(i, v)}
              min={0}
              max={127}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 text-xs font-mono text-slate-400">
        <span>min: {Math.min(...values)}</span>
        <span>max: {Math.max(...values)}</span>
        <span>avg: {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}</span>
      </div>
    </div>
  );
}
