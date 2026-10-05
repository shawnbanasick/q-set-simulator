import { useAppStore } from "./appStore";

export default function Toggle() {
  const isOn = useAppStore((s) => s.isOn);
  const toggleIsOn = useAppStore((s) => s.toggleIsOn);

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        id="seed-toggle"
        aria-checked={isOn}
        onClick={toggleIsOn}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
          isOn ? "bg-teal-700" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
            isOn ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
      <label htmlFor="seed-toggle" className="cursor-pointer">
        <div className="text-sm font-medium text-slate-900">
          Include seed sorts
        </div>
        <div className="text-sm text-slate-600">
          Adds the 5 original perspective sorts to the output file.
        </div>
      </label>
    </div>
  );
}
