import { useAppStore } from "./appStore";
import { calculateSortableArray } from "./calculateSortableArray";
import _ from "lodash";
import JSZip from "jszip";
import { getDateTime } from "./getDateTime";
import createPqmethodDat from "./createPqmethodDat";
// import { t } from "i18next";
import doArraySwap from "./doArraySwap";
import calcSeedSorts from "./calcSeedSorts";

export default function GenerateFileButton() {
  const {
    pattern,
    patternValues,
    loopArray,
    filename,
    isOn,
    p1p2Strength,
    p2p3Strength,
    p3p4Strength,
    p4p5Strength,
  } = useAppStore();

  console.log("isOn", isOn);
  console.log("p1p2", p1p2Strength);

  const cutoffsArray: [number, number][] = [
    [0.7, 0.9],
    [0.5, 0.7],
    [0.3, 0.5],
    [0.1, 0.3],
    [0.01, 0.1],
  ];
  // loopArray = [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]]

  const generateFile = () => {
    console.log(JSON.stringify(loopArray));
    console.log("clicked");
    const sortableArray = calculateSortableArray(pattern, patternValues);
    const masterArray: number[][] = [];

    // Iterate through 5 Perspectives data arrays
    for (let i = 0; i < loopArray.length; i++) {
      const arrayOfSeeds = calcSeedSorts(
        [...sortableArray],
        p1p2Strength,
        p2p3Strength,
        p3p4Strength,
        p4p5Strength,
      );

      console.log("seed", JSON.stringify(arrayOfSeeds.length));

      // const seedArray1: number[] = _.shuffle([...sortableArray]);
      const seedArray1 = [...arrayOfSeeds[i]];

      if (isOn) {
        masterArray.push(seedArray1);
      }

      console.log("seedArray1", seedArray1);
      console.log("masterArray", masterArray);
      console.log(loopArray);
      const perspectives = loopArray[i];
      if (!perspectives) continue;
      // [0, 0, 3, 3, 0]

      // for each perspective, iterate to get appropriate number of arrays to produce
      for (let j = 0; j < 5; j++) {
        const cutoffs = cutoffsArray[i];

        console.log("loopArray", loopArray[j][i]);

        const comparisonValue = loopArray[j][i];
        if (comparisonValue > 0) {
          console.log("values", j, i, comparisonValue, cutoffs[0], cutoffs[1]);
          for (let k = 0; k < comparisonValue; k++) {
            const newArray: number[] = doArraySwap(seedArray1, cutoffs[0], cutoffs[1]);
            masterArray.push(newArray);
            console.log("pushed", k);
          }
        }
      }
    }

    const sortsTextFile = (masterArray: number[][]) => {
      let textFile = "";
      for (let i = 0; i < masterArray.length; i++) {
        textFile += `Part_${i + 1}` + "," + masterArray[i].join(",") + "\n";
      }
      return textFile;
    };

    const statementsTextFile = (masterArray: number[][]) => {
      let textFile = "";
      for (let i = 0; i < masterArray[0].length; i++) {
        if (i === masterArray[0].length - 1) {
          textFile += `Statement${i + 1}` + "\n";
        } else {
          textFile += `Statement${i + 1}` + "\n";
        }
      }
      return textFile;
    };

    // create PQMethod files

    const projectName = getDateTime();
    const pqDatFile = createPqmethodDat(
      [...masterArray],
      [...pattern],
      projectName,
      masterArray[0].length,
    );

    const statementsFile = statementsTextFile(masterArray);

    const zip = new JSZip();
    zip.file("sorts.txt", sortsTextFile(masterArray));
    zip.file("names.txt", "test");
    zip.file("statements.txt", statementsFile);
    zip.file(`${projectName}.STA`, statementsFile);
    zip.file(`${projectName}.DAT`, pqDatFile);
    zip.file("pattern.txt", pattern.join(",") + "\n");
    zip.generateAsync({ type: "blob" }).then((content) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = `${filename}-${projectName}-SIM-26.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 h-[50px] mt-10 w-[300px]">
      <button onClick={generateFile}>Generate File</button>
    </div>
  );
}
