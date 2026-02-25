import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor3Card() {
  const { card3Cutoff1, card3Cutoff2, card3Cutoff3, card3Cutoff4, card3Cutoff5 } = useAppStore();
  const {
    updateCard3Cutoff1,
    updateCard3Cutoff2,
    updateCard3Cutoff3,
    updateCard3Cutoff4,
    updateCard3Cutoff5,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 3</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c3c1"}
          label={"0.7 – 0.9"}
          value={card3Cutoff1}
          onChange={(val: number) => updateCard3Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c3c2"}
          label={"0.5 – 0.7"}
          value={card3Cutoff2}
          onChange={(val: number) => updateCard3Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c3c3"}
          label={"0.3 – 0.5"}
          value={card3Cutoff3}
          onChange={(val: number) => updateCard3Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c3c4"}
          label={"0.1 – 0.3"}
          value={card3Cutoff4}
          onChange={(val: number) => updateCard3Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c3c5"}
          label={"0.1 – 0.3"}
          value={card3Cutoff5}
          onChange={(val: number) => updateCard3Cutoff5(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
