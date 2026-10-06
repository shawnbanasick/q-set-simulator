import { useState, useRef, useCallback, useEffect, useId } from "react";
import { useAppStore, type number } from "./appStore";

interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string; // e.g. "kg", "px", "%"
  name?: string; // include in native form submissions
  hint?: string; // helper text under the field
  disabled?: boolean;
  className?: string; // sizing/placement, e.g. "w-48"
  onChange?: (value: number) => void;
}

// Number of decimals in step (0.25 -> 2) so we can avoid 0.1 + 0.2 style drift
const decimalsOf = (n: number) => {
  const s = String(n);
  return s.includes(".") ? s.split(".")[1].length : 0;
};

export default function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  unit,
  name,
  hint,
  disabled = false,
  className = "w-44",
  onChange,
}: NumberInputProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const value = controlledValue ?? internalValue;

  const s = useAppStore();

  // Always holds the latest value so press-and-hold nev
  // er reads a stale one
  const valueRef = useRef(value);
  valueRef.current = value;

  const precision = Math.max(decimalsOf(step), 0);

  const commit = useCallback(
    (raw: number) => {
      const base = Number.isFinite(min) ? min : 0;
      const snapped = base + Math.round((raw - base) / step) * step;
      const clamped = Math.min(max, Math.max(min, snapped));
      const next = Number(clamped.toFixed(precision));
      if (next === valueRef.current) return;
      valueRef.current = next;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
      s.updateNumValuesToChange(next);
    },
    [controlledValue, min, max, step, precision, onChange, s],
  );

  const nudge = (dir: 1 | -1) => commit(valueRef.current + dir * step);

  const stopContinuous = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const startContinuous = (dir: 1 | -1) => {
    stopContinuous();
    nudge(dir);
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => nudge(dir), 80);
    }, 380);
  };

  useEffect(() => stopContinuous, [stopContinuous]);

  // Stop repeating once a limit is reached
  const atMin = value <= min;
  const atMax = value >= max;
  useEffect(() => {
    if (atMin || atMax || disabled) stopContinuous();
  }, [atMin, atMax, disabled, stopContinuous]);

  const finishEditing = (apply: boolean) => {
    if (apply) {
      const parsed = parseFloat(inputStr.replace(",", "."));
      if (!isNaN(parsed)) commit(parsed);
    }
    setIsEditing(false);
  };

  const onArrowKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudge(1);
      if (isEditing) setInputStr(String(valueRef.current));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nudge(-1);
      if (isEditing) setInputStr(String(valueRef.current));
    }
  };

  const stepButton = (dir: 1 | -1) => {
    const blocked = disabled || (dir === 1 ? atMax : atMin);
    return (
      <button
        type="button"
        tabIndex={-1}
        disabled={blocked}
        onMouseDown={() => startContinuous(dir)}
        onMouseUp={stopContinuous}
        onMouseLeave={stopContinuous}
        onTouchStart={() => startContinuous(dir)}
        onTouchEnd={stopContinuous}
        className={[
          "flex items-center justify-center shrink-0 bg-white text-slate-400",
          "w-9 transition-colors duration-100 select-none",
          dir === 1 ? "border-l" : "border-r",
          "border-slate-200",
          blocked
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-slate-50 hover:text-slate-600 active:bg-slate-100 cursor-pointer",
        ].join(" ")}
        aria-label={dir === 1 ? "Increase" : "Decrease"}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="2" y1="5" x2="8" y2="5" />
          {dir === 1 && <line x1="5" y1="2" x2="5" y2="8" />}
        </svg>
      </button>
    );
  };

  return (
    <div
      className={`flex flex-col gap-1 min-w-0 ${disabled ? "opacity-40" : ""} ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 w-[500px]"
        >
          {label}
        </label>
      )}

      <div
        className={[
          "flex items-stretch rounded-md overflow-hidden border transition-all duration-150 w-full",
          focused || isEditing
            ? "border-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
            : "border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:border-slate-400",
        ].join(" ")}
      >
        {stepButton(-1)}

        <div className="flex items-center justify-center bg-white flex-1 min-w-0 gap-1 px-1">
          {isEditing ? (
            <input
              id={id}
              autoFocus
              type="text"
              inputMode={precision > 0 || min < 0 ? "decimal" : "numeric"}
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => {
                finishEditing(true);
                setFocused(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing(true);
                if (e.key === "Escape") finishEditing(false);
                onArrowKeys(e);
              }}
              className="w-full min-w-0 text-center bg-transparent text-slate-800 font-mono text-base font-semibold outline-none caret-sky-500 py-2"
            />
          ) : (
            <button
              id={id}
              type="button"
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onClick={() => {
                setInputStr(String(value));
                setIsEditing(true);
              }}
              onKeyDown={(e) => {
                onArrowKeys(e);
                if (e.key === "Enter") {
                  setInputStr(String(value));
                  setIsEditing(true);
                }
              }}
              className="w-full min-w-0 text-slate-800 font-mono text-base font-semibold text-center select-none focus:outline-none cursor-text py-2 truncate"
            >
              {value.toFixed(precision)}
            </button>
          )}
          {unit && (
            <span className="text-sm text-slate-400 shrink-0 select-none">
              {unit}
            </span>
          )}
        </div>

        {stepButton(1)}
      </div>

      {hint && <span className="text-xs text-slate-500">{hint}</span>}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
