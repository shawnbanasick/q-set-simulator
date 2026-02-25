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
  const { card1Cutoff1, card1Cutoff2, card1Cutoff3, card1Cutoff4, card1Cutoff5 } = useAppStore();
  const {
    updateCard1Cutoff1,
    updateCard1Cutoff2,
    updateCard1Cutoff3,
    updateCard1Cutoff4,
    updateCard1Cutoff5,
  } = useAppStore();

  return (
    <div className="flex flex-col w-[150px]  items-center justify-center">
      <div className="">Perspective 1</div>
      <div className="flex flex-col gap-2">
        <NumberInput
          key={"c1c1"}
          label={"0.7 – 0.9"}
          value={card1Cutoff1}
          onChange={(val: number) => updateCard1Cutoff1(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c2"}
          label={"0.5 – 0.7"}
          value={card1Cutoff2}
          onChange={(val: number) => updateCard1Cutoff2(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c3"}
          label={"0.3 – 0.5"}
          value={card1Cutoff3}
          onChange={(val: number) => updateCard1Cutoff3(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c4"}
          label={"0.1 – 0.3"}
          value={card1Cutoff4}
          onChange={(val: number) => updateCard1Cutoff4(val)}
          min={0}
          max={127}
        />
        <NumberInput
          key={"c1c5"}
          label={"0.1 – 0.3"}
          value={card1Cutoff5}
          onChange={(val: number) => updateCard1Cutoff5(val)}
          min={0}
          max={127}
        />
      </div>
    </div>
  );
}
