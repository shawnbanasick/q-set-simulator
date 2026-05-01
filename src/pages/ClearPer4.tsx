import { useAppStore } from "./appStore";

export default function ClearAllButton() {
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

  const clearAll = () => {
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
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[30px] mt-2 w-[150px] rounded-md ml-5">
      <button onClick={clearAll}>Clear Perspective 4</button>
    </div>
  );
}
