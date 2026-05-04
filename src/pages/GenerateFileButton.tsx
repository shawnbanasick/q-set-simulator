import { useAppStore } from "./appStore";
import { calculateSortableArray } from "./calculateSortableArray";
import JSZip from "jszip";
import { getDateTime } from "./getDateTime";
import createPqmethodDat from "./createPqmethodDat";
import doArraySwap from "./doArraySwap";
import calcSeedSorts from "./calcSeedSorts";
import ExcelJS from "exceljs";

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

  const generateFile = async () => {
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
      // include seedArray in output?
      if (isOn) {
        masterArray.push(seedArray1);
      }
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
          for (let k = 0; k < numPartThisLevel; k++) {
            newArray = doArraySwap(seedArray1, cutoffs[0], cutoffs[1]);
            masterArray.push(newArray);
          }
        }
      }
    }

    const sortsTextFile = async (masterArray: number[][]) => {
      let textFileKade = "";
      for (let i = 0; i < masterArray.length; i++) {
        textFileKade += `Part_${i + 1}` + "," + masterArray[i].join(",") + "\n";
      }
      return textFileKade;
    };

    const stataDataFile = async (masterArray: number[][]) => {
      const transposedArray: (number | string)[][] = [];
      for (let i = 0; i < masterArray[0].length; i++) {
        const newRow: (number | string)[] = [];
        for (let j = 0; j < masterArray.length; j++) {
          newRow.push(masterArray[j][i]);
        }
        transposedArray.push([...newRow]);
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

    const statementsTextFile = async (masterArray: number[][]) => {
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

    // create Type 1 Excel file
    async function createExcelFile() {
      const workbook = new ExcelJS.Workbook();
      // name sheet
      const worksheet1 = workbook.addWorksheet("name");
      worksheet1.getCell("A1").value = "Project Name";
      worksheet1.getCell("A2").value = projectName;
      // sorts sheet
      const sampleArray = [...masterArray[0]];
      sampleArray.sort((a, b) => a - b);
      const namesRow = ["Participant Name and Q Sort Value:"];
      for (let i = 0; i < masterArray.length; i++) {
        namesRow.push(`Participant-${i + 1}`);
      }
      const worksheet2 = workbook.addWorksheet("sorts");
      const statementsMasterArray: number[][] = [];
      for (let i = 0; i < masterArray.length; i++) {
        const sortedIndices = [...masterArray[i]]
          .map((value, index) => ({ value, index }))
          .sort((a, b) => a.value - b.value)
          .map(({ index }) => index + 1); // +1 to convert from 0-based to 1-based indexing
        statementsMasterArray.push(sortedIndices);
      }
      worksheet2.addRow(namesRow);
      for (let i = 0; i < statementsMasterArray[0].length; i++) {
        const tempRow = [sampleArray[i]];
        for (let j = 0; j < statementsMasterArray.length; j++) {
          tempRow.push(statementsMasterArray[j][i]);
        }
        worksheet2.addRow(tempRow);
      }
      // statements sheet
      const worksheet3 = workbook.addWorksheet("statements");
      worksheet3.getCell("A1").value = "Number";
      worksheet3.getCell("B1").value = "Statements";
      for (let i = 0; i < masterArray[0].length; i++) {
        worksheet3.getCell(`A${i + 2}`).value = i + 1;
        worksheet3.getCell(`B${i + 2}`).value = `Statement${i + 1}`;
      }
      // pattern sheet
      const worksheet4 = workbook.addWorksheet("pattern");
      const row4 = [
        -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      ];
      worksheet4.addRow(row4);
      worksheet4.addRow(pattern);
      // version sheet
      const worksheet5 = workbook.addWorksheet("version");
      worksheet5.getCell("A1").value = "Version";
      worksheet5.getCell("A2").value = "2";
      // type sheet
      const worksheet6 = workbook.addWorksheet("type");
      worksheet6.getCell("A1").value = "Type";
      worksheet6.getCell("A2").value = "1";
      // export workbook to buffer
      const excelBuffer = await workbook.xlsx.writeBuffer();
      return excelBuffer;
    }

    async function createExcelFileType2() {
      const workbook = new ExcelJS.Workbook();
      // name sheet
      const worksheet1 = workbook.addWorksheet("name");
      worksheet1.getCell("A1").value = "Project Name";
      worksheet1.getCell("A2").value = projectName;
      // sorts sheet
      const worksheet2 = workbook.addWorksheet("sorts");
      for (let i = 0; i < masterArray.length; i++) {
        const sortValues: (string | number)[] = [...masterArray[i]];
        sortValues.unshift("Participant-" + (i + 1));
        worksheet2.addRow(sortValues);
      }
      // statements sheet
      const worksheet3 = workbook.addWorksheet("statements");
      worksheet3.getCell("A1").value = "Number";
      worksheet3.getCell("B1").value = "Statements";
      for (let i = 0; i < masterArray[0].length; i++) {
        worksheet3.getCell(`A${i + 2}`).value = i + 1;
        worksheet3.getCell(`B${i + 2}`).value = `Statement${i + 1}`;
      }
      // pattern sheet
      const worksheet4 = workbook.addWorksheet("pattern");
      const row4 = [
        -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      ];
      worksheet4.addRow(row4);
      worksheet4.addRow(pattern);
      // version sheet
      const worksheet5 = workbook.addWorksheet("version");
      worksheet5.getCell("A1").value = "Version";
      worksheet5.getCell("A2").value = "2";
      // type sheet
      const worksheet6 = workbook.addWorksheet("type");
      worksheet6.getCell("A1").value = "Type";
      worksheet6.getCell("A2").value = "2";
      // export workbook to buffer
      const excelBuffer = await workbook.xlsx.writeBuffer();
      return excelBuffer;
    }

    const statementsFile = await statementsTextFile(masterArray);
    const stataDataFileText = await stataDataFile(masterArray);
    const textSorts = await sortsTextFile(masterArray);

    const zip = new JSZip();
    zip.file("sorts.txt", textSorts);
    zip.file("names.txt", projectName);
    zip.file("statements.txt", statementsFile);
    zip.file(`${projectName}_stata_data.csv`, stataDataFileText);
    zip.file(`${projectName}_csv_data.csv`, textSorts);
    zip.file(`${projectName}-Type1.xlsx`, await createExcelFile());
    zip.file(`${projectName}-Type2.xlsx`, await createExcelFileType2());
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
    <div className="flex flex-wrap justify-center items-center bg-gray-300 hover:bg-gray-500 hover:text-white h-12.5 mt-10 w-75 rounded-md">
      <button onClick={generateFile}>Generate File</button>
    </div>
  );
}
