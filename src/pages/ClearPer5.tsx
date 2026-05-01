import { useAppStore } from "./appStore";

export default function ClearAllButton() {
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
      <button onClick={clearAll}>Clear Perspective 5</button>
    </div>
  );
}
