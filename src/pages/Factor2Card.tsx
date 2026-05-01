import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

export default function Factor2Card() {
  const {
    card2Cutoff1,
    card2Cutoff2,
    card2Cutoff3,
    card2Cutoff4,
    card2Cutoff5,
    card2Cutoff6,
    card2Cutoff7,
    card2Cutoff8,
    card2Cutoff9,
    card2Cutoff10,
  } = useAppStore();
  const {
    updateCard2Cutoff1,
    updateCard2Cutoff2,
    updateCard2Cutoff3,
    updateCard2Cutoff4,
    updateCard2Cutoff5,
    updateCard2Cutoff6,
    updateCard2Cutoff7,
    updateCard2Cutoff8,
    updateCard2Cutoff9,
    updateCard2Cutoff10,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 2</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c2c1"}
          label={"0.9 – 1.00"}
          value={card2Cutoff1}
          onChange={(val: number) => updateCard2Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c2"}
          label={"0.8 – 0.89"}
          value={card2Cutoff2}
          onChange={(val: number) => updateCard2Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c3"}
          label={"0.7 – 0.79"}
          value={card2Cutoff3}
          onChange={(val: number) => updateCard2Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c4"}
          label={"0.6 – 0.69"}
          value={card2Cutoff4}
          onChange={(val: number) => updateCard2Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c5"}
          label={"0.5 – 0.59"}
          value={card2Cutoff5}
          onChange={(val: number) => updateCard2Cutoff5(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c6"}
          label={"0.4 – 0.49"}
          value={card2Cutoff6}
          onChange={(val: number) => updateCard2Cutoff6(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c7"}
          label={"0.3 – 0.39"}
          value={card2Cutoff7}
          onChange={(val: number) => updateCard2Cutoff7(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c8"}
          label={"0.2 – 0.29"}
          value={card2Cutoff8}
          onChange={(val: number) => updateCard2Cutoff8(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c9"}
          label={"0.1 – 0.19"}
          value={card2Cutoff9}
          onChange={(val: number) => updateCard2Cutoff9(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c2c10"}
          label={"0.01 – 0.09"}
          value={card2Cutoff10}
          onChange={(val: number) => updateCard2Cutoff10(val)}
          min={0}
          max={127}
        />{" "}
      </div>
    </div>
  );
}
