import { useAppStore } from "./appStore";

export default function ClearAllButton() {
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

  const clearAll = () => {
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
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[30px] mt-2 w-[150px] rounded-md ml-5">
      <button onClick={clearAll}>Clear Perspective 2</button>
    </div>
  );
}
