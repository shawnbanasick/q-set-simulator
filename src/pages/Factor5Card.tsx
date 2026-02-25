import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor5Card() {
  const { card5Cutoff1, card5Cutoff2, card5Cutoff3, card5Cutoff4, card5Cutoff5 } = useAppStore();
  const {
    updateCard5Cutoff1,
    updateCard5Cutoff2,
    updateCard5Cutoff3,
    updateCard5Cutoff4,
    updateCard5Cutoff5,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 5</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c5c1"}
          label={"0.7 – 0.9"}
          value={card5Cutoff1}
          onChange={(val: number) => updateCard5Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c5c2"}
          label={"0.5 – 0.7"}
          value={card5Cutoff2}
          onChange={(val: number) => updateCard5Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c5c3"}
          label={"0.3 – 0.5"}
          value={card5Cutoff3}
          onChange={(val: number) => updateCard5Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c5c4"}
          label={"0.1 – 0.3"}
          value={card5Cutoff4}
          onChange={(val: number) => updateCard5Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c5c5"}
          label={"0.1 – 0.3"}
          value={card5Cutoff5}
          onChange={(val: number) => updateCard5Cutoff5(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
