const createPQMethodDAT = (
  sorts: number[][],
  multiplierArray: number[],
  projectName: string,
  numStatements: number,
): string => {
  const projectNameText = projectName.substring(0, 60);
  const numSortsText = sorts.length.toString().padStart(3, " ");
  const numStatementsText = numStatements.toString().padStart(3, " ");

  const refArray = [
    -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ];
  const minMaxArray: number[] = [];

  multiplierArray.forEach((value, index) => {
    if (value !== 0) {
      minMaxArray.push(refArray[index]);
    }
  });

  const participantNames: string[] = [];
  for (let i = 0; i < sorts.length; ++i) {
    const name = `part${i + 1}`;
    participantNames.push(name);
  }

  const minValueText = Math.min(...minMaxArray)
    .toString()
    .padStart(3, " ");
  const maxValueText = Math.max(...minMaxArray)
    .toString()
    .padStart(3, " ");

  let multiplierArrayText = "";
  multiplierArray.forEach((value) => {
    multiplierArrayText += value.toString().padStart(3, " ");
  });

  const sortsTextArray: string[] = sorts.map((item) =>
    item.reduce(
      (sortText, value) => sortText + value.toString().padStart(2, " "),
      "",
    ),
  );

  const participantNamesText: string[] = sorts.map(
    (_, index) =>
      `${participantNames[index].padEnd(10, " ")}${sortsTextArray[index]}\n`,
  );

  let result =
    `  0${numSortsText}${numStatementsText} ${projectNameText}\n` +
    `${minValueText}${maxValueText}${multiplierArrayText}\n`;

  participantNamesText.forEach((line) => {
    result += line;
  });

  return result;
};

export default createPQMethodDAT;
