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

// Measures how far a correlation value is outside [min, max]. Returns 0 if within bounds.
function corrViolation(corr: number, min: number, max: number): number {
  if (corr < min) return min - corr;
  if (corr > max) return corr - max;
  return 0;
}

export default function generateCorrelatedPermutation(
  original: number[],
  minCorr: number = 0.7,
  maxCorr: number = 0.9,
  refArray: number[],
  refMinCorr: number = 0.1,
  refMaxCorr: number = 0.3,
): number[] {
  const current = [...original];
  const n = current.length;
  let iterations = 0;
  const maxIterations = 500000;

  while (iterations < maxIterations) {
    const currCorr = getCorrelation(original, current);
    const currRefCorr = getCorrelation(refArray, current);

    const origViolation = corrViolation(currCorr, minCorr, maxCorr);
    const refViolation = corrViolation(currRefCorr, refMinCorr, refMaxCorr);

    // Both constraints satisfied
    if (origViolation === 0 && refViolation === 0) {
      console.log("currCorr", currCorr, "currRefCorr", currRefCorr);
      break;
    }

    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    [current[i], current[j]] = [current[j], current[i]];

    const newCorr = getCorrelation(original, current);
    const newRefCorr = getCorrelation(refArray, current);

    const newOrigViolation = corrViolation(newCorr, minCorr, maxCorr);
    const newRefViolation = corrViolation(newRefCorr, refMinCorr, refMaxCorr);

    // Revert the swap if the total violation didn't improve
    if (newOrigViolation + newRefViolation >= origViolation + refViolation) {
      [current[i], current[j]] = [current[j], current[i]];
    }

    iterations++;
  }
  return current;
}
