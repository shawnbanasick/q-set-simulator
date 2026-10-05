import { useAppStore } from "./appStore";

export default function UserTextInput() {
  const filename = useAppStore((s) => s.filename);
  const updateFilename = useAppStore((s) => s.updateFilename);

  return (
    <div>
      <label
        htmlFor="filename"
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        File name
      </label>
      <div className="relative">
        <input
          id="filename"
          type="text"
          value={filename}
          onChange={(e) => updateFilename(e.target.value)}
          placeholder="my-study"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-9 text-sm text-slate-900 placeholder:text-slate-500 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
        />
        {filename && (
          <button
            type="button"
            onClick={() => updateFilename("")}
            aria-label="Clear file name"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 text-lg leading-none text-slate-500 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700"
          >
            ×
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-600">
        Saved as{" "}
        <span className="tabular-nums">
          {filename || "my-study"}-[date and time]-SIM-26.zip
        </span>
      </p>
    </div>
  );
}
