import { useAppStore } from "./appStore";
import { calculateSortableArray } from "./calculateSortableArray";
import JSZip from "jszip";
import { getDateTime } from "./getDateTime";
import createPqmethodDat from "./createPqmethodDat";
import doArraySwap from "./doArraySwap";
import calcSeedSorts from "./calcSeedSorts";
import ExcelJS from "exceljs";
import { toast } from "sonner";
import { createUnforcedSorts } from "./createUnforcedSorts";

export default function GenerateFileButton(props: { characteristics: any }) {
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
    numUnforcedSorts,
    numValuesToChange,
    isUnforcedOn,
  } = useAppStore();

  console.log(props.characteristics, "props.characteristics");

  const { criticalValue, statements, simulated } = props.characteristics;

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

  const total = loopArray.flat().reduce((a, b) => a + b, 0) + (isOn ? 5 : 0);

  const generateFile = async () => {
    if (total === 0) return;
    const sortableArray = calculateSortableArray(pattern, patternValues);
    let masterArray: number[][] = [];

    console.log("num values to change", numValuesToChange);
    console.log("num forced sorts", numUnforcedSorts);

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

    // console.log("masterArray", JSON.stringify(masterArray));
    console.log(isUnforcedOn, "isUnforcedOn");
    console.log(numValuesToChange, "numValuesToChange");
    console.log(numUnforcedSorts, "numUnforcedSorts");

    let characteristicsFile = `Number of Statements: ${statements}\n Critical Value: ${criticalValue}\n Pattern: ${pattern.join(",")}\nFilename: ${filename}\n Number of Simulated Sorts: ${simulated}\nIncluded Seed Sorts: ${isOn}\n Number of Unforced Sorts: ${numUnforcedSorts}\nNumber of Values to Change in Each Unforced Sort: ${numValuesToChange}\nInclude Unforced Sorts: ${isUnforcedOn}\n`;

    let changesRecords = [];
    // let unforcedChangesTextFile = "";
    if (isUnforcedOn) {
      const { result, changes } = createUnforcedSorts(
        masterArray,
        numValuesToChange,
        numUnforcedSorts,
      );

      masterArray = [...result];
      // console.log("changes", JSON.stringify(changes, null, 2));
      changesRecords = [...changes];

      // unforcedChangesTextFile += "RowIndex, Index,  OldValue,  NewValue\n";
      for (const change of changesRecords) {
        console.log("change", change, null, 2);
        for (const item of change.changes) {
          characteristicsFile += `Participant ${change.rowIndex + 1},  Value Index: ${item.index + 1}, Old Value: ${item.oldValue},  New Value:  ${item.newValue}\n`;
        }
      }
    }

    console.log(characteristicsFile, "characteristicsFile");

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

    let downloadName;
    if (isUnforcedOn) {
      downloadName = `${filename}-${projectName}-SIM-26-unforced.zip`;
    } else {
      downloadName = `${filename}-${projectName}-SIM-26`;
    }

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
      element.download = downloadName;
      document.body.appendChild(element);
      element.click();
      toast.success("File generated");
      document.body.removeChild(element);
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={generateFile}
        disabled={total === 0}
        className="w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
      >
        Generate file
      </button>
      {total === 0 && (
        <p className="mt-2 text-sm text-slate-600">
          Add participants in step 2 or include seed sorts to enable export.
        </p>
      )}
    </div>
  );
}
