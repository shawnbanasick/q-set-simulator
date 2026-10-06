export interface CellChange {
  /** Position within the sub-array that was overwritten */
  index: number;
  /** Value before this change */
  oldValue: number;
  /** Value after this change */
  newValue: number;
}

export interface RowChanges {
  /** Index of the modified sub-array in the outer array */
  rowIndex: number;
  /** Every change applied to this row, in the order they happened */
  changes: CellChange[];
}

export interface UnforcedSortsResult {
  result: number[][];
  changes: RowChanges[];
}

export function createUnforcedSorts(
  arrays: number[][],
  x: number,
  y: number,
): UnforcedSortsResult {
  // Work on a copy so the original input isn't modified
  const result: number[][] = arrays.map((row) => [...row]);
  const changes: RowChanges[] = [];

  // Pick y distinct row indices at random (partial Fisher-Yates shuffle)
  const indices: number[] = result.map((_, i) => i);
  const count: number = Math.min(y, indices.length);
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (indices.length - i));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Apply x changes to each selected row
  for (const rowIdx of indices.slice(0, count)) {
    const row = result[rowIdx];
    const rowChanges: CellChange[] = [];

    for (let n = 0; n < x; n++) {
      // If every value is identical, no real change is possible, so stop
      if (new Set(row).size < 2) break;

      let target: number;
      let source: number;
      do {
        target = Math.floor(Math.random() * row.length);
        source = Math.floor(Math.random() * row.length);
      } while (row[source] === row[target]); // redo if the value would be replaced by itself

      rowChanges.push({
        index: target,
        oldValue: row[target],
        newValue: row[source],
      });

      row[target] = row[source];
    }

    // Only log rows where something actually changed
    if (rowChanges.length > 0) {
      changes.push({ rowIndex: rowIdx, changes: rowChanges });
    }
  }

  return { result, changes };
}

// Example usage:
// const { result, changes } = createUnforcedSorts([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 2, 2);
// changes might look like:
// [
//   { rowIndex: 2, changes: [
//       { index: 0, oldValue: 7, newValue: 9 },
//       { index: 1, oldValue: 8, newValue: 7 },
//   ]},
//   { rowIndex: 0, changes: [
//       { index: 2, oldValue: 3, newValue: 1 },
//       { index: 0, oldValue: 1, newValue: 2 },
//   ]},
// ]
