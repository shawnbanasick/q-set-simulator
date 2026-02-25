export const calculateSortableArray = (pattern: number[], patternValues: number[]) => {
  const sortableArray: number[] = [];
  pattern.map((value, index) => {
    if (value > 0) {
      for (let i = 0; i < value; i++) {
        sortableArray.push(patternValues[index]);
      }
    }
  });
  return sortableArray;
};
