import { useAppStore } from "./appStore";
import React from "react";

export const Toggle: React.FC = () => {
  const { isOn, toggleIsOn } = useAppStore();

  return (
    <div className="flex flex-col items-center gap-3 font-mono mb-4">
      <span className="w-[150px] text-center text-xs font-semibold tracking-widest text-gray-700 transition-colors duration-200">
        {isOn ? "Seed Included" : "Seed Not Included"}
      </span>
      <button
        role="switch"
        aria-checked={isOn}
        onClick={() => toggleIsOn(isOn)}
        className={`relative inline-flex h-7 w-16 cursor-pointer items-center rounded-full border-none px-1 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          isOn ? "bg-gradient-to-br from-teal-400 to-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`h-5 w-7 shrink-0 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isOn ? "translate-x-7 shadow-blue-400/60" : "translate-x-0 shadow-black/20"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
