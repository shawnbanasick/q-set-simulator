function getCorrelation(arr1: number[], arr2: number[]): number {
  const n = arr1.length;
  const mean1 = [...arr1].reduce((a, b) => a + b) / n;
  const mean2 = [...arr2].reduce((a, b) => a + b) / n;

  let num = 0,
    den1 = 0,
    den2 = 0;
  for (let i = 0; i < n; i++) {
    const d1 = arr1[i] - mean1;
    const d2 = arr2[i] - mean2;
    num += d1 * d2;
    den1 += d1 * d1;
    den2 += d2 * d2;
  }
  return num / Math.sqrt(den1 * den2);
}

export default function generateCorrelatedPermutation(
  original: number[],
  minCorr: number = 0.7,
  maxCorr: number = 0.9,
): number[] {
  const current = [...original];
  const n = current.length;
  let iterations = 0;
  const maxIterations = 50000;

  while (iterations < maxIterations) {
    const currCorr = getCorrelation(original, current);

    if (currCorr >= minCorr && currCorr <= maxCorr) {
      break;
    }

    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    [current[i], current[j]] = [current[j], current[i]];

    const newCorr = getCorrelation(original, current);

    if (currCorr > maxCorr) {
      if (newCorr > currCorr)
        [current[i], current[j]] = [current[j], current[i]];
    } else if (currCorr < minCorr) {
      if (newCorr < currCorr)
        [current[i], current[j]] = [current[j], current[i]];
    }

    iterations++;
  }
  return current;
}
