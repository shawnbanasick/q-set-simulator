import { useAppStore } from "./appStore";

export default function UserTextInput() {
  const { filename, updateFilename } = useAppStore();

  return (
    <div className="flex items-center justify-center font-mono">
      <div className="w-full max-w-md px-8">
        {/* Card */}
        <div className="p-2 shadow-2xl">
          {/* Field */}
          <div className="group">
            <label
              htmlFor="filename"
              className="block text-xs tracking-[0.25em] uppercase text-black mb-1"
            >
              Filename:
            </label>

            <div className="relative">
              <input
                id="filename"
                type="text"
                value={filename}
                onChange={(e) => updateFilename(e.target.value)}
                placeholder="filename"
                className="
                  w-full 
                  text-black placeholder-gray-500 border-2 border-gray-500
                  px-4 py-3 text-sm tracking-wide
                  outline-none
                  focus:border-amber-500
                  transition-colors duration-200
                  pr-10
                "
              />

              {/* Clear button */}
              {filename && (
                <button
                  onClick={() => updateFilename("")}
                  aria-label="Clear"
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-zinc-600 hover:text-amber-500
                    transition-colors duration-150
                    text-lg leading-none
                  "
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
