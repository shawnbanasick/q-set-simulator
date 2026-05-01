import doArraySwap from "./doArraySwap";
import _ from "lodash";

export default function calcSeedSorts(
  sortableArray: number[],
  p1p2Strength: string,
  p2p3Strength: string,
  p3p4Strength: string,
  p4p5Strength: string,
): number[][] {
  const returnArray: number[][] = [];
  const strengthArray = [p1p2Strength, p2p3Strength, p3p4Strength, p4p5Strength];
  let array: number[] = [];

  let referenceArray: number[] = _.shuffle([...sortableArray]);
  returnArray.push([...referenceArray]);

  strengthArray.forEach((item) => {
    if (item === "very close") {
      console.log("very close");
      array = doArraySwap([...referenceArray], 0.7, 0.9);
      returnArray.push(array);
      referenceArray = [...array];
    }
    if (item === "close") {
      console.log("close");
      array = doArraySwap([...referenceArray], 0.5, 0.7);
      returnArray.push(array);
      referenceArray = [...array];
    }
    if (item === "far") {
      console.log("far");
      array = doArraySwap([...referenceArray], 0.3, 0.5);
      returnArray.push(array);
      referenceArray = [...array];
    }
    if (item === "very far") {
      console.log("very far");
      array = doArraySwap([...referenceArray], 0.1, 0.3);
      returnArray.push(array);
      referenceArray = [...array];
    }
    if (item === "random" || item === "") {
      console.log("random");
      array = _.shuffle([...referenceArray]);
      returnArray.push(array);
      referenceArray = [...array];
    }
  });

  return returnArray;
}
