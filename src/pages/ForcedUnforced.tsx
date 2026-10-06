// import { useAppStore, type StrengthOption } from "./appStore";
import UnforcedNumberInput from "./UnforcedNumberInput";
import UnforcedNumberInput2 from "./UnforcedNumberInput2";
import { useAppStore } from "./appStore";

// import Toggle from "./Toggle";
import UnforcedToggle from "./UnforcedToggle";

const handlePatternChange = (val: number) => {
  console.log("handlePatternChange", val);
  //   updatePattern(next);
};

export default function StrengthSelects() {
  const s = useAppStore();
  //   const s = useAppStore();
  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="flex flex-col">
      <UnforcedToggle text1="Transform to include unforced sorts" />
      <UnforcedNumberInput
        className="flex flex-row ml-8 items-center w-100  mt-4"
        name="unforced-sorts"
        label="Number of unforced sorts"
        unit="sorts"
        min={0}
        max={300}
        step={1}
        defaultValue={s.numUnforcedSorts}
        onChange={handlePatternChange}
      />
      <UnforcedNumberInput2
        className="flex flex-row ml-8 items-center w-100  mt-4"
        name="unforced-sorts"
        label="Number of values to change in each unforced sort"
        unit="values"
        min={0}
        max={300}
        step={1}
        defaultValue={s.numValuesToChange}
        onChange={handlePatternChange}
      />
    </div>
  );
}
