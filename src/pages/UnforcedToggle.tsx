import { useAppStore } from "./appStore";

export default function Toggle(text: { text1: string; text2?: string }) {
  const isUnforcedOn = useAppStore((s) => s.isUnforcedOn);
  const toggleIsUnforcedOn = useAppStore((s) => s.toggleIsUnforcedOn);

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        id="unforced-toggle"
        aria-checked={isUnforcedOn}
        onClick={toggleIsUnforcedOn}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
          isUnforcedOn ? "bg-teal-700" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
            isUnforcedOn ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
      <label htmlFor="unforced-toggle" className="cursor-pointer">
        <div className="text-sm font-medium text-slate-900">{text.text1}</div>
        <div className="text-sm text-slate-600">{text.text2}</div>
      </label>
    </div>
  );
}
