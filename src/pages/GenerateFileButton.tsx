import { useAppStore } from "./appStore";
import { calculateSortableArray } from "./calculateSortableArray";
// import _ from "lodash";
import JSZip from "jszip";
import { getDateTime } from "./getDateTime";
import createPqmethodDat from "./createPqmethodDat";
// import { t } from "i18next";
import doArraySwap from "./doArraySwap";
import calcSeedSorts from "./calcSeedSorts";
// import doLimitedArraySwap from "./doLimitedArraySwap";

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
    [0.9, 1.0],
    [0.8, 0.89],
    [0.7, 0.79],
    [0.6, 0.69],
    [0.5, 0.59],
    [0.4, 0.49],
    [0.3, 0.39],
    [0.2, 0.29],
    [0.1, 0.19],
    [0.01, 0.09],
  ];

  const generateFile = () => {
    console.log(JSON.stringify(loopArray));
    const sortableArray = calculateSortableArray(pattern, patternValues);
    const masterArray: number[][] = [];

    const arrayOfSeeds = calcSeedSorts(
      [...sortableArray],
      p1p2Strength,
      p2p3Strength,
      p3p4Strength,
      p4p5Strength,
    );

    // Iterate through 5 Perspectives data arrays
    // for each perspective, iterate to get appropriate number of arrays of each level to produce
    for (let j = 0; j < 5; j++) {
      // get seed arrays
      const seedArray1 = [...arrayOfSeeds[j]];
      let seedArray2: number[] = [];
      if (j > 0) {
        seedArray2 = [...arrayOfSeeds[j - 1]];
      }

      // include seedArray in output?
      if (isOn) {
        masterArray.push(seedArray1);
      }
      console.log("seedArray1", seedArray1);
      console.log("masterArray", masterArray);
      console.log(loopArray);

      // get number of participants at each level for this perspective
      const perspectives = loopArray[j]; // example = [0, 0, 3, 3, 0, 0, 0, 0, 0, 0]
      // error check
      if (!perspectives) continue;

      let newArray: number[];

      // iterate through perspective levels
      for (let i = 0; i < 10; i++) {
        const numPartThisLevel = loopArray[j][i];
        const cutoffs = cutoffsArray[i];

        if (numPartThisLevel > 0) {
          console.log("cutoffs", cutoffs);
          for (let k = 0; k < numPartThisLevel; k++) {
            console.log("what", seedArray2.length, j);
            // if (seedArray2.length === 0) {
            //   newArray = doArraySwap(seedArray1, cutoffs[0], cutoffs[1]);
            // } else {
            //   newArray = doLimitedArraySwap(
            //     seedArray1,
            //     cutoffs[0],
            //     cutoffs[1],
            //     seedArray2,
            //     0.1,
            //     0.3,
            //   );
            // }
            newArray = doArraySwap(seedArray1, cutoffs[0], cutoffs[1]);

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

    const stataDataFile = (masterArray: number[][]) => {
      console.log("masterArray", JSON.stringify(masterArray));
      const transposedArray: (number | string)[][] = [];
      for (let i = 0; i < masterArray[0].length; i++) {
        const newRow: (number | string)[] = [];
        for (let j = 0; j < masterArray.length; j++) {
          newRow.push(masterArray[j][i]);
        }
        transposedArray.push(newRow);
      }

      for (let i = 0; i < transposedArray.length; i++) {
        transposedArray[i].push("statement" + (i + 1));
        transposedArray[i].unshift(i + 1);
      }

      const headerRow = [
        "StatNo",
        ...transposedArray[0].slice(1, -1).map((_, i) => `p${i + 1}`),
        "statement",
      ];

      transposedArray.unshift(headerRow);

      let textFile = "";
      for (let i = 0; i < transposedArray.length; i++) {
        for (let j = 0; j < transposedArray[i].length; j++) {
          if (j === transposedArray[i].length - 1) {
            textFile += transposedArray[i][j] + "\n";
          } else {
            textFile += transposedArray[i][j] + ",";
          }
        }
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

    const stataDataFileText = stataDataFile(masterArray);

    const zip = new JSZip();
    zip.file("sorts.txt", sortsTextFile(masterArray));
    zip.file("names.txt", "test");
    zip.file("statements.txt", statementsFile);
    zip.file(`${projectName}_stata_data.csv`, stataDataFileText);
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
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-[50px] mt-10 w-[300px] rounded-md">
      <button onClick={generateFile}>Generate File</button>
    </div>
  );
}
