import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor4Card() {
  const {
    card4Cutoff1,
    card4Cutoff2,
    card4Cutoff3,
    card4Cutoff4,
    card4Cutoff5,
    card4Cutoff6,
    card4Cutoff7,
    card4Cutoff8,
    card4Cutoff9,
    card4Cutoff10,
  } = useAppStore();
  const {
    updateCard4Cutoff1,
    updateCard4Cutoff2,
    updateCard4Cutoff3,
    updateCard4Cutoff4,
    updateCard4Cutoff5,
    updateCard4Cutoff6,
    updateCard4Cutoff7,
    updateCard4Cutoff8,
    updateCard4Cutoff9,
    updateCard4Cutoff10,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 4</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c1c1"}
          label={"0.9 – 1.00"}
          value={card4Cutoff1}
          onChange={(val: number) => updateCard4Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c2"}
          label={"0.8 – 0.89"}
          value={card4Cutoff2}
          onChange={(val: number) => updateCard4Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c3"}
          label={"0.7 – 0.79"}
          value={card4Cutoff3}
          onChange={(val: number) => updateCard4Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c4"}
          label={"0.6 – 0.69"}
          value={card4Cutoff4}
          onChange={(val: number) => updateCard4Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c5"}
          label={"0.5 – 0.59"}
          value={card4Cutoff5}
          onChange={(val: number) => updateCard4Cutoff5(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c6"}
          label={"0.4 – 0.49"}
          value={card4Cutoff6}
          onChange={(val: number) => updateCard4Cutoff6(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c7"}
          label={"0.3 – 0.39"}
          value={card4Cutoff7}
          onChange={(val: number) => updateCard4Cutoff7(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c8"}
          label={"0.2 – 0.29"}
          value={card4Cutoff8}
          onChange={(val: number) => updateCard4Cutoff8(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c9"}
          label={"0.1 – 0.19"}
          value={card4Cutoff9}
          onChange={(val: number) => updateCard4Cutoff9(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c10"}
          label={"0.01 – 0.09"}
          value={card4Cutoff10}
          onChange={(val: number) => updateCard4Cutoff10(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
