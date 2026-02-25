// import evenRound from "../../../Utils/evenRound";
import * as _ from "lodash";

export default function getPqmethodCorrelation(
  xArray: number[],
  yArray: number[],
  singleValue: boolean = false,
) {
  // todo - check this eslint error message
  const n = xArray.length;

  if (n === 0) {
    return 0;
  }

  let sum1 = 0;
  for (let i = 0; i < n; i += 1) {
    sum1 += xArray[i];
  }

  let sum2 = 0;
  for (let j = 0; j < n; j += 1) {
    sum2 += yArray[j];
  }

  let sum1Sq = 0;
  for (let k = 0; k < n; k += 1) {
    sum1Sq += xArray[k] ** 2;
  }

  let sum2Sq = 0;
  for (let m = 0; m < n; m += 1) {
    sum2Sq += yArray[m] ** 2;
  }

  let pSum = 0;
  for (let p = 0; p < n; p += 1) {
    pSum += xArray[p] * yArray[p];
  }

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt((sum1Sq - sum1 ** 2 / n) * (sum2Sq - sum2 ** 2 / n));

  if (den === 0) {
    return 0;
  }

  const answer = num / den;

  // Convert r to t-statistic, then to p-value
  const t = answer * Math.sqrt((n - 2) / (1 - answer * answer));

  function lgamma(x: number): number {
    // Lanczos approximation
    const g = 7;
    const c = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
      -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
      1.5056327351493116e-7,
    ];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
    x -= 1;
    let a = c[0];
    const t = x + g + 0.5;
    for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }

  function incompleteBeta(a: number, b: number, x: number): number {
    // Continued fraction approximation (Lentz's algorithm)
    const maxIter = 200;
    const eps = 3e-7;
    const lbeta = lgamma(a) + lgamma(b) - lgamma(a + b);

    if (x < 0 || x > 1) throw new Error("x must be in [0,1]");
    if (x === 0) return 0;
    if (x === 1) return 1;

    const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lbeta) / a;

    // Use symmetry relation if needed
    if (x > (a + 1) / (a + b + 2)) {
      return 1 - incompleteBeta(b, a, 1 - x);
    }

    let c = 1.0,
      d = 1 - ((a + b) * x) / (a + 1);
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1 / d;
    let h = d;

    for (let m = 1; m <= maxIter; m++) {
      for (let step = 0; step <= 1; step++) {
        let numerator: number;
        if (step === 0) {
          numerator = (m * (b - m) * x) / ((a + 2 * m - 1) * (a + 2 * m));
        } else {
          numerator = (-(a + m) * (a + b + m) * x) / ((a + 2 * m) * (a + 2 * m + 1));
        }

        d = 1 + numerator * d;
        if (Math.abs(d) < 1e-30) d = 1e-30;
        c = 1 + numerator / c;
        if (Math.abs(c) < 1e-30) c = 1e-30;
        d = 1 / d;
        h *= d * c;
      }
      if (Math.abs(d * c - 1) < eps) break;
    }

    return front * h;
  }

  // Approximation of the Student's t-distribution CDF (two-tailed p-value)
  function tDistPValue(t: number, df: number): number {
    // Beta function approximation using the incomplete beta function
    const x = df / (df + t * t);
    return incompleteBeta(df / 2, 0.5, x);
  }

  const pValue = tDistPValue(Math.abs(t), n - 2);

  if (singleValue) {
    return _.round(answer, 5);
  }

  const returnArray: number[] = [_.round(answer, 5), _.round(answer * 100, 0), _.round(pValue, 2)];

  return returnArray;
}
