import { useAppStore } from "./appStore";

export default function ClearAllButton() {
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

  const clearAll = () => {
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
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[30px] mt-2 w-[150px] rounded-md ml-5">
      <button onClick={clearAll}>Clear Perspective 3</button>
    </div>
  );
}
