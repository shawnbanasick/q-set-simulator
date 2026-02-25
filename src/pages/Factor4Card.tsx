import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor4Card() {
  const { card4Cutoff1, card4Cutoff2, card4Cutoff3, card4Cutoff4, card4Cutoff5 } = useAppStore();
  const {
    updateCard4Cutoff1,
    updateCard4Cutoff2,
    updateCard4Cutoff3,
    updateCard4Cutoff4,
    updateCard4Cutoff5,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 4</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c4c1"}
          label={"0.7 – 0.9"}
          value={card4Cutoff1}
          onChange={(val: number) => updateCard4Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c4c2"}
          label={"0.5 – 0.7"}
          value={card4Cutoff2}
          onChange={(val: number) => updateCard4Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c4c3"}
          label={"0.3 – 0.5"}
          value={card4Cutoff3}
          onChange={(val: number) => updateCard4Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c4c4"}
          label={"0.1 – 0.3"}
          value={card4Cutoff4}
          onChange={(val: number) => updateCard4Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c4c5"}
          label={"0.1 – 0.3"}
          value={card4Cutoff5}
          onChange={(val: number) => updateCard4Cutoff5(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
