import NumberInput from "./NumberInput";
import { useAppStore } from "./appStore";

// interface Factor1CardProps {
//     cutoff1: number;
//     cutoff2: number;
//     cutoff3: number;
//     cutoff4: number;
//     cutoff5: number;
// }

export default function Factor1Card() {
  const {
    card1Cutoff1,
    card1Cutoff2,
    card1Cutoff3,
    card1Cutoff4,
    card1Cutoff5,
    card1Cutoff6,
    card1Cutoff7,
    card1Cutoff8,
    card1Cutoff9,
    card1Cutoff10,
  } = useAppStore();
  const {
    updateCard1Cutoff1,
    updateCard1Cutoff2,
    updateCard1Cutoff3,
    updateCard1Cutoff4,
    updateCard1Cutoff5,
    updateCard1Cutoff6,
    updateCard1Cutoff7,
    updateCard1Cutoff8,
    updateCard1Cutoff9,
    updateCard1Cutoff10,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 1</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c1c1"}
          label={"0.9 – 1.00"}
          value={card1Cutoff1}
          onChange={(val: number) => updateCard1Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c2"}
          label={"0.8 – 0.89"}
          value={card1Cutoff2}
          onChange={(val: number) => updateCard1Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c3"}
          label={"0.7 – 0.79"}
          value={card1Cutoff3}
          onChange={(val: number) => updateCard1Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c4"}
          label={"0.6 – 0.69"}
          value={card1Cutoff4}
          onChange={(val: number) => updateCard1Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c5"}
          label={"0.5 – 0.59"}
          value={card1Cutoff5}
          onChange={(val: number) => updateCard1Cutoff5(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c6"}
          label={"0.4 – 0.49"}
          value={card1Cutoff6}
          onChange={(val: number) => updateCard1Cutoff6(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c7"}
          label={"0.3 – 0.39"}
          value={card1Cutoff7}
          onChange={(val: number) => updateCard1Cutoff7(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c8"}
          label={"0.2 – 0.29"}
          value={card1Cutoff8}
          onChange={(val: number) => updateCard1Cutoff8(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c9"}
          label={"0.1 – 0.19"}
          value={card1Cutoff9}
          onChange={(val: number) => updateCard1Cutoff9(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c10"}
          label={"0.01 – 0.09"}
          value={card1Cutoff10}
          onChange={(val: number) => updateCard1Cutoff10(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
