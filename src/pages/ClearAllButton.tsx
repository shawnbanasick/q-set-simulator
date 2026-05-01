import { useAppStore } from "./appStore";

export default function ClearAllButton() {
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

  const clearAll = () => {
    updateCard1Cutoff1(0);
    updateCard1Cutoff2(0);
    updateCard1Cutoff3(0);
    updateCard1Cutoff4(0);
    updateCard1Cutoff5(0);
    updateCard1Cutoff6(0);
    updateCard1Cutoff7(0);
    updateCard1Cutoff8(0);
    updateCard1Cutoff9(0);
    updateCard1Cutoff10(0);

    updateCard2Cutoff1(0);
    updateCard2Cutoff2(0);
    updateCard2Cutoff3(0);
    updateCard2Cutoff4(0);
    updateCard2Cutoff5(0);
    updateCard2Cutoff6(0);
    updateCard2Cutoff7(0);
    updateCard2Cutoff8(0);
    updateCard2Cutoff9(0);
    updateCard2Cutoff10(0);

    updateCard3Cutoff1(0);
    updateCard3Cutoff2(0);
    updateCard3Cutoff3(0);
    updateCard3Cutoff4(0);
    updateCard3Cutoff5(0);
    updateCard3Cutoff6(0);
    updateCard3Cutoff7(0);
    updateCard3Cutoff8(0);
    updateCard3Cutoff9(0);
    updateCard3Cutoff10(0);

    updateCard4Cutoff1(0);
    updateCard4Cutoff2(0);
    updateCard4Cutoff3(0);
    updateCard4Cutoff4(0);
    updateCard4Cutoff5(0);
    updateCard4Cutoff6(0);
    updateCard4Cutoff7(0);
    updateCard4Cutoff8(0);
    updateCard4Cutoff9(0);
    updateCard4Cutoff10(0);

    updateCard5Cutoff1(0);
    updateCard5Cutoff2(0);
    updateCard5Cutoff3(0);
    updateCard5Cutoff4(0);
    updateCard5Cutoff5(0);
    updateCard5Cutoff6(0);
    updateCard5Cutoff7(0);
    updateCard5Cutoff8(0);
    updateCard5Cutoff9(0);
    updateCard5Cutoff10(0);
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[30px] mt-2 w-[150px] rounded-md ml-5">
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}
