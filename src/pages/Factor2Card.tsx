import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor2Card() {
  const { card2Cutoff1, card2Cutoff2, card2Cutoff3, card2Cutoff4, card2Cutoff5 } = useAppStore();
  const {
    updateCard2Cutoff1,
    updateCard2Cutoff2,
    updateCard2Cutoff3,
    updateCard2Cutoff4,
    updateCard2Cutoff5,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 2</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c2c1"}
          label={"0.7 – 0.9"}
          value={card2Cutoff1}
          onChange={(val: number) => updateCard2Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c2"}
          label={"0.5 – 0.7"}
          value={card2Cutoff2}
          onChange={(val: number) => updateCard2Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c3"}
          label={"0.3 – 0.5"}
          value={card2Cutoff3}
          onChange={(val: number) => updateCard2Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c4"}
          label={"0.1 – 0.3"}
          value={card2Cutoff4}
          onChange={(val: number) => updateCard2Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c5"}
          label={"0.1 – 0.3"}
          value={card2Cutoff5}
          onChange={(val: number) => updateCard2Cutoff5(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
