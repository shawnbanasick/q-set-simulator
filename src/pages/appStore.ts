import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type StrengthOption =
  | "very close"
  | "close"
  | "far"
  | "very far"
  | "random"
  | "";

export const PERSPECTIVES = 5;
export const BANDS = 10;

const emptyGrid = (): number[][] =>
  Array.from({ length: PERSPECTIVES }, () => Array(BANDS).fill(0));

const isValidGrid = (g: unknown): g is number[][] =>
  Array.isArray(g) &&
  g.length === PERSPECTIVES &&
  g.every((row) => Array.isArray(row) && row.length === BANDS);

interface AppState {
  pattern: number[];
  patternValues: number[];
  labelArray: string[];
  /** loopArray[perspective][band] = number of participants. Same name GenerateFileButton already reads. */
  loopArray: number[][];
  isOn: boolean;
  isUnforcedOn: boolean;
  filename: string;
  p1p2Strength: StrengthOption;
  p2p3Strength: StrengthOption;
  p3p4Strength: StrengthOption;
  p4p5Strength: StrengthOption;
  numUnforcedSorts: number;
  numValuesToChange: number;
  shouldIncludeUnforcedSorts: boolean;

  updatePattern: (pattern: number[]) => void;
  updateCutoff: (perspective: number, band: number, value: number) => void;
  clearPerspective: (perspective: number) => void;
  clearAllPerspectives: () => void;
  toggleIsOn: () => void;
  toggleIsUnforcedOn: () => void;
  updateFilename: (filename: string) => void;
  updateP1P2Strength: (val: StrengthOption) => void;
  updateP2P3Strength: (val: StrengthOption) => void;
  updateP3P4Strength: (val: StrengthOption) => void;
  updateP4P5Strength: (val: StrengthOption) => void;
  updateNumUnforcedSorts: (val: number) => void;
  updateNumValuesToChange: (val: number) => void;
  updateShouldIncludeUnforcedSorts: (val: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        pattern: [0, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
        patternValues: [
          -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        ],
        labelArray: Array.from({ length: 20 }, (_, i) => String(i - 6)),
        loopArray: emptyGrid(),
        isOn: false,
        filename: "",
        p1p2Strength: "",
        p2p3Strength: "",
        p3p4Strength: "",
        p4p5Strength: "",
        numUnforcedSorts: 5,
        numValuesToChange: 2,
        shouldIncludeUnforcedSorts: false,
        isUnforcedOn: false,
        updatePattern: (pattern) => set({ pattern }),
        updateCutoff: (perspective, band, value) =>
          set((s) => ({
            loopArray: s.loopArray.map((row, p) =>
              p === perspective
                ? row.map((v, b) => (b === band ? value : v))
                : row,
            ),
          })),
        clearPerspective: (perspective) =>
          set((s) => ({
            loopArray: s.loopArray.map((row, p) =>
              p === perspective ? Array(BANDS).fill(0) : row,
            ),
          })),
        clearAllPerspectives: () => set({ loopArray: emptyGrid() }),
        toggleIsOn: () => set((s) => ({ isOn: !s.isOn })),
        toggleIsUnforcedOn: () =>
          set((s) => ({ isUnforcedOn: !s.isUnforcedOn })),
        updateFilename: (filename) => set({ filename }),
        updateP1P2Strength: (p1p2Strength) => set({ p1p2Strength }),
        updateP2P3Strength: (p2p3Strength) => set({ p2p3Strength }),
        updateP3P4Strength: (p3p4Strength) => set({ p3p4Strength }),
        updateP4P5Strength: (p4p5Strength) => set({ p4p5Strength }),
        updateNumUnforcedSorts: (numUnforcedSorts) => set({ numUnforcedSorts }),
        updateNumValuesToChange: (numValuesToChange) =>
          set({ numValuesToChange }),
        updateShouldIncludeUnforcedSorts: (shouldIncludeUnforcedSorts) =>
          set({ shouldIncludeUnforcedSorts }),
      }),
      {
        name: "app-storage",
        version: 2,
        // Old saved state had card1Cutoff1... fields; drop them and keep a valid grid.
        migrate: (persisted: any) => ({
          pattern: persisted?.pattern,
          filename: persisted?.filename ?? "",
          isOn: persisted?.isOn ?? false,
          p1p2Strength: persisted?.p1p2Strength ?? "",
          p2p3Strength: persisted?.p2p3Strength ?? "",
          p3p4Strength: persisted?.p3p4Strength ?? "",
          p4p5Strength: persisted?.p4p5Strength ?? "",
          numUnforcedSorts: persisted?.numUnforcedSorts ?? 5,
          numValuesToChange: persisted?.numValuesToChange ?? 2,
          shouldIncludeUnforcedSorts:
            persisted?.shouldIncludeUnforcedSorts ?? false,
          labelArray: persisted?.labelArray ?? [],
          patternValues: persisted?.patternValues ?? [],
          loopArray: isValidGrid(persisted?.loopArray)
            ? persisted.loopArray
            : emptyGrid(),
        }),
      },
    ),
  ),
);
