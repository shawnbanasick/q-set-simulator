import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor5Card() {
  const {
    card5Cutoff1,
    card5Cutoff2,
    card5Cutoff3,
    card5Cutoff4,
    card5Cutoff5,
    card5Cutoff6,
    card5Cutoff7,
    card5Cutoff8,
    card5Cutoff9,
    card5Cutoff10,
  } = useAppStore();
  const {
    updateCard5Cutoff1,
    updateCard5Cutoff2,
    updateCard5Cutoff3,
    updateCard5Cutoff4,
    updateCard5Cutoff5,
    updateCard5Cutoff6,
    updateCard5Cutoff7,
    updateCard5Cutoff8,
    updateCard5Cutoff9,
    updateCard5Cutoff10,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 5</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c1c1"}
          label={"0.9 – 1.00"}
          value={card5Cutoff1}
          onChange={(val: number) => updateCard5Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c2"}
          label={"0.8 – 0.89"}
          value={card5Cutoff2}
          onChange={(val: number) => updateCard5Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c3"}
          label={"0.7 – 0.79"}
          value={card5Cutoff3}
          onChange={(val: number) => updateCard5Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c4"}
          label={"0.6 – 0.69"}
          value={card5Cutoff4}
          onChange={(val: number) => updateCard5Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c5"}
          label={"0.5 – 0.59"}
          value={card5Cutoff5}
          onChange={(val: number) => updateCard5Cutoff5(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c6"}
          label={"0.4 – 0.49"}
          value={card5Cutoff6}
          onChange={(val: number) => updateCard5Cutoff6(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c7"}
          label={"0.3 – 0.39"}
          value={card5Cutoff7}
          onChange={(val: number) => updateCard5Cutoff7(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c8"}
          label={"0.2 – 0.29"}
          value={card5Cutoff8}
          onChange={(val: number) => updateCard5Cutoff8(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c9"}
          label={"0.1 – 0.19"}
          value={card5Cutoff9}
          onChange={(val: number) => updateCard5Cutoff9(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c10"}
          label={"0.01 – 0.09"}
          value={card5Cutoff10}
          onChange={(val: number) => updateCard5Cutoff10(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
