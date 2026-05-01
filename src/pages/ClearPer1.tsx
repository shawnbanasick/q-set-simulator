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
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[30px] mt-2 w-[150px] rounded-md ml-5">
      <button onClick={clearAll}>Clear Perspective 1</button>
    </div>
  );
}
