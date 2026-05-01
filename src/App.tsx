import "./App.scss";
// import { useTranslation } from "react-i18next";
// import { useAppStore } from "./pages/appStore";
import NumberInput from "./pages/NumberInput";
import { useAppStore } from "./pages/appStore";
import TotalStatements from "./pages/TotalStatements";
// import { calculateSortableArray } from "./pages/calculateSortableArray";
// import getPqmethodCorrelation from "./pages/calcPearsonCorrels";
import * as _ from "lodash";
import UserTextInput from "./pages/UserTextInput";
import Factor1Card from "./pages/Factor1Card";
import Factor2Card from "./pages/Factor2Card";
import Factor3Card from "./pages/Factor3Card";
import Factor4Card from "./pages/Factor4Card";
import Factor5Card from "./pages/Factor5Card";
import TotalParticipants from "./pages/TotalParticipants";
import GenerateFileButton from "./pages/GenerateFileButton";
import Toggle from "./pages/Toggle";
import StrengthSelects from "./pages/StrengthSelects";
import ClearAllButton from "./pages/ClearAllButton";
import ClearPer1 from "./pages/ClearPer1";
import ClearPer2 from "./pages/ClearPer2";
import ClearPer3 from "./pages/ClearPer3";
import ClearPer4 from "./pages/ClearPer4";
import ClearPer5 from "./pages/ClearPer5";

export default function App() {
  //   const { t, i18n } = useTranslation();
  const { pattern, labelArray } = useAppStore();
  console.log(pattern);
  console.log(pattern.length);
  const updatePattern = useAppStore((state) => state.updatePattern);
  const label = labelArray;

  const handleChange = (val: number, i: number) => {
    const newPattern = [...pattern];
    newPattern[i] = val;
    updatePattern(newPattern);
  };

  return (
    <>
      <div id="appDiv" className="flex flex-col  justify-center items-center mt-10 mb-10">
        <h1 className="text-3xl font-bold">Q Sort Simulator</h1>
        <div id="decideLableDiv" className="flex w-[80%] mt-10 justify-center items-center gap-2">
          Decide Q Sort Pattern and Number of Statements
        </div>
        <div className="flex flex-wrap w-[80%]">
          <div className="flex flex-wrap bg-white border border-slate-200 rounded-xl shadow-sm p-2 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {pattern.map((value, i) => (
                <NumberInput
                  key={i}
                  label={label[i]}
                  value={value}
                  onChange={(val) => handleChange(val, i)}
                  min={0}
                  max={127}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <TotalStatements />
        </div>
        <div className="flex flex-row mt-5 w-[1000px]">
          <Factor1Card />
          <Factor2Card />
          <Factor3Card />
          <Factor4Card />
          <Factor5Card />
          <div className="flex flex-col">
            <Toggle />
            <StrengthSelects />
            <ClearPer1 />
            <ClearPer2 />
            <ClearPer3 />
            <ClearPer4 />
            <ClearPer5 />
            <ClearAllButton />
          </div>
        </div>
        <div className="flex flex-row mt-5 items-center justify-center w-[800px]">
          <TotalParticipants />
        </div>
        <div id="filenameInput" className="w-[800px] mt-4">
          <UserTextInput />
        </div>
        <GenerateFileButton />
      </div>
    </>
  );
}
