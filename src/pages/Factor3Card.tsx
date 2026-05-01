import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor3Card() {
  const {
    card3Cutoff1,
    card3Cutoff2,
    card3Cutoff3,
    card3Cutoff4,
    card3Cutoff5,
    card3Cutoff6,
    card3Cutoff7,
    card3Cutoff8,
    card3Cutoff9,
    card3Cutoff10,
  } = useAppStore();
  const {
    updateCard3Cutoff1,
    updateCard3Cutoff2,
    updateCard3Cutoff3,
    updateCard3Cutoff4,
    updateCard3Cutoff5,
    updateCard3Cutoff6,
    updateCard3Cutoff7,
    updateCard3Cutoff8,
    updateCard3Cutoff9,
    updateCard3Cutoff10,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 3</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c1c1"}
          label={"0.9 – 1.00"}
          value={card3Cutoff1}
          onChange={(val: number) => updateCard3Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c2"}
          label={"0.8 – 0.89"}
          value={card3Cutoff2}
          onChange={(val: number) => updateCard3Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c3"}
          label={"0.7 – 0.79"}
          value={card3Cutoff3}
          onChange={(val: number) => updateCard3Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c4"}
          label={"0.6 – 0.69"}
          value={card3Cutoff4}
          onChange={(val: number) => updateCard3Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c5"}
          label={"0.5 – 0.59"}
          value={card3Cutoff5}
          onChange={(val: number) => updateCard3Cutoff5(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c6"}
          label={"0.4 – 0.49"}
          value={card3Cutoff6}
          onChange={(val: number) => updateCard3Cutoff6(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c7"}
          label={"0.3 – 0.39"}
          value={card3Cutoff7}
          onChange={(val: number) => updateCard3Cutoff7(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c8"}
          label={"0.2 – 0.29"}
          value={card3Cutoff8}
          onChange={(val: number) => updateCard3Cutoff8(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c9"}
          label={"0.1 – 0.19"}
          value={card3Cutoff9}
          onChange={(val: number) => updateCard3Cutoff9(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c10"}
          label={"0.01 – 0.09"}
          value={card3Cutoff10}
          onChange={(val: number) => updateCard3Cutoff10(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
