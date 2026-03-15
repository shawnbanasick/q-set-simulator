import { useAppStore } from "./appStore";
import { calculateSortableArray } from "./calculateSortableArray";
import getPqmethodCorrelation from "./calcPearsonCorrels";
import _ from "lodash";
import JSZip from "jszip";
import { getDateTime } from "./getDateTime";
import createPqmethodDat from "./createPqmethodDat";
import { t } from "i18next";

export default function GenerateFileButton() {
  const { pattern, patternValues, loopArray } = useAppStore();

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
      const seedArray1: number[] = _.shuffle([...sortableArray]);
      // masterArray.push([...seedArray1]);
      console.log("seedArray1", seedArray1);
      console.log("masterArray", masterArray);
      const perspectives = loopArray[i];
      if (!perspectives) continue;
      // [0, 0, 3, 3, 0]

      // for each perspective array, iterate to get appropriate number of arrays
      for (let j = 0; j < 5; j++) {
        //
        let breakLoop = false;
        let loopCounter = 0;
        let generatedArrayCount = 0;
        console.log(breakLoop, loopCounter, generatedArrayCount);

        const cutoffs = cutoffsArray[j];

        do {
          //     // randomize array Q-sort order (fisher-yates)
          const newArray = _.shuffle([...seedArray1]);

          //     // get correlation between arrays
          const corrValue = getPqmethodCorrelation(seedArray1, newArray, true) as number;
          if (!corrValue) continue;
          // console.log("Correlation", corrValue);

          if (corrValue > cutoffs[0] && corrValue < cutoffs[1]) {
            // add new array to results
            generatedArrayCount += 1;
            masterArray.push(newArray);
          }

          // break loop checks
          if (generatedArrayCount === perspectives[j]) {
            breakLoop = true;
          }

          // infinite loop catch
          loopCounter += 1;
          // console.log("loopCounter", loopCounter);
          if (loopCounter === 5000000 - 1) {
            console.log("loopCounter limit");
          }
        } while (loopCounter < 5000000 && generatedArrayCount < perspectives[j]);
      }
    }
    // console.log("MasterArray", JSON.stringify(masterArray));

    const sortsTextFile = (masterArray: number[][]) => {
      let textFile = "";
      for (let i = 0; i < masterArray.length; i++) {
        textFile += `Participant${i + 1}` + "," + masterArray[i].join(",") + "\n";
      }
      return textFile;
    };

    const statementsTextFile = (masterArray: number[][]) => {
      let textFile = "";
      for (let i = 0; i < masterArray[0].length; i++) {
        textFile += `Statement${i + 1}` + "\n";
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
    // console.log(pqDatFile);

    const statementsFile = statementsTextFile(masterArray);

    const zip = new JSZip();
    zip.file("sorts.txt", sortsTextFile(masterArray));
    zip.file("names.txt", "test");
    zip.file("statements.txt", statementsFile);
    zip.file(`${projectName}.STA`, statementsFile);
    zip.file(`${projectName}.DAT`, pqDatFile);
    zip.file("pattern.txt", pattern.join(","));
    zip.generateAsync({ type: "blob" }).then((content) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = "sorts.zip";
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
