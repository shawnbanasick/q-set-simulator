import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type StrengthOption = "very close" | "close" | "far" | "very far" | "random" | "";

interface AppState {
  count: number;
  card1Cutoff1: number;
  card1Cutoff2: number;
  card1Cutoff3: number;
  card1Cutoff4: number;
  card1Cutoff5: number;
  card1Cutoff6: number;
  card1Cutoff7: number;
  card1Cutoff8: number;
  card1Cutoff9: number;
  card1Cutoff10: number;
  card2Cutoff1: number;
  card2Cutoff2: number;
  card2Cutoff3: number;
  card2Cutoff4: number;
  card2Cutoff5: number;
  card2Cutoff6: number;
  card2Cutoff7: number;
  card2Cutoff8: number;
  card2Cutoff9: number;
  card2Cutoff10: number;
  card3Cutoff1: number;
  card3Cutoff2: number;
  card3Cutoff3: number;
  card3Cutoff4: number;
  card3Cutoff5: number;
  card3Cutoff6: number;
  card3Cutoff7: number;
  card3Cutoff8: number;
  card3Cutoff9: number;
  card3Cutoff10: number;
  card4Cutoff1: number;
  card4Cutoff2: number;
  card4Cutoff3: number;
  card4Cutoff4: number;
  card4Cutoff5: number;
  card4Cutoff6: number;
  card4Cutoff7: number;
  card4Cutoff8: number;
  card4Cutoff9: number;
  card4Cutoff10: number;
  card5Cutoff1: number;
  card5Cutoff2: number;
  card5Cutoff3: number;
  card5Cutoff4: number;
  card5Cutoff5: number;
  card5Cutoff6: number;
  card5Cutoff7: number;
  card5Cutoff8: number;
  card5Cutoff9: number;
  card5Cutoff10: number;
  isOn: boolean;
  loopArray: number[][];
  pattern: number[];
  patternValues: number[];
  sortableArray: number[];
  filename: string;
  p1p2Strength: StrengthOption;
  p2p3Strength: StrengthOption;
  p3p4Strength: StrengthOption;
  p4p5Strength: StrengthOption;
  updateP1P2Strength: (val: StrengthOption) => void;
  updateP2P3Strength: (val: StrengthOption) => void;
  updateP3P4Strength: (val: StrengthOption) => void;
  updateP4P5Strength: (val: StrengthOption) => void;
  updateFilename: (filename: string) => void;
  updatePattern: (pattern: number[]) => void;
  updateSortableArray: (sortableArray: number[]) => void;
  updateCard1Cutoff1: (card1Cutoff1: number) => void;
  updateCard1Cutoff2: (card1Cutoff2: number) => void;
  updateCard1Cutoff3: (card1Cutoff3: number) => void;
  updateCard1Cutoff4: (card1Cutoff4: number) => void;
  updateCard1Cutoff5: (card1Cutoff5: number) => void;
  updateCard1Cutoff6: (card1Cutoff6: number) => void;
  updateCard1Cutoff7: (card1Cutoff7: number) => void;
  updateCard1Cutoff8: (card1Cutoff8: number) => void;
  updateCard1Cutoff9: (card1Cutoff9: number) => void;
  updateCard1Cutoff10: (card1Cutoff10: number) => void;
  updateCard2Cutoff1: (card2Cutoff1: number) => void;
  updateCard2Cutoff2: (card2Cutoff2: number) => void;
  updateCard2Cutoff3: (card2Cutoff3: number) => void;
  updateCard2Cutoff4: (card2Cutoff4: number) => void;
  updateCard2Cutoff5: (card2Cutoff5: number) => void;
  updateCard2Cutoff6: (card2Cutoff6: number) => void;
  updateCard2Cutoff7: (card2Cutoff7: number) => void;
  updateCard2Cutoff8: (card2Cutoff8: number) => void;
  updateCard2Cutoff9: (card2Cutoff9: number) => void;
  updateCard2Cutoff10: (card2Cutof10: number) => void;
  updateCard3Cutoff1: (card3Cutoff1: number) => void;
  updateCard3Cutoff2: (card3Cutoff2: number) => void;
  updateCard3Cutoff3: (card3Cutoff3: number) => void;
  updateCard3Cutoff4: (card3Cutoff4: number) => void;
  updateCard3Cutoff5: (card3Cutoff5: number) => void;
  updateCard3Cutoff6: (card3Cutoff6: number) => void;
  updateCard3Cutoff7: (card3Cutoff7: number) => void;
  updateCard3Cutoff8: (card3Cutoff8: number) => void;
  updateCard3Cutoff9: (card3Cutoff9: number) => void;
  updateCard3Cutoff10: (card3Cutoff10: number) => void;
  updateCard4Cutoff1: (card4Cutoff1: number) => void;
  updateCard4Cutoff2: (card4Cutoff2: number) => void;
  updateCard4Cutoff3: (card4Cutoff3: number) => void;
  updateCard4Cutoff4: (card4Cutoff4: number) => void;
  updateCard4Cutoff5: (card4Cutoff5: number) => void;
  updateCard4Cutoff6: (card4Cutoff6: number) => void;
  updateCard4Cutoff7: (card4Cutoff7: number) => void;
  updateCard4Cutoff8: (card4Cutoff8: number) => void;
  updateCard4Cutoff9: (card4Cutoff9: number) => void;
  updateCard4Cutoff10: (card4Cutoff10: number) => void;
  updateCard5Cutoff1: (card5Cutoff1: number) => void;
  updateCard5Cutoff2: (card5Cutoff2: number) => void;
  updateCard5Cutoff3: (card5Cutoff3: number) => void;
  updateCard5Cutoff4: (card5Cutoff4: number) => void;
  updateCard5Cutoff5: (card5Cutoff5: number) => void;
  updateCard5Cutoff6: (card5Cutoff6: number) => void;
  updateCard5Cutoff7: (card5Cutoff7: number) => void;
  updateCard5Cutoff8: (card5Cutoff8: number) => void;
  updateCard5Cutoff9: (card5Cutoff9: number) => void;
  updateCard5Cutoff10: (card5Cutoff10: number) => void;
  updateLoopArray: (loopArray: number[][]) => void;
  toggleIsOn: (isOn: boolean) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  labelArray: string[];
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        pattern: [0, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
        patternValues: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        sortableArray: [],
        filename: "",
        card1Cutoff1: 0,
        card1Cutoff2: 0,
        card1Cutoff3: 0,
        card1Cutoff4: 0,
        card1Cutoff5: 0,
        card1Cutoff6: 0,
        card1Cutoff7: 0,
        card1Cutoff8: 0,
        card1Cutoff9: 0,
        card1Cutoff10: 0,
        card2Cutoff1: 0,
        card2Cutoff2: 0,
        card2Cutoff3: 0,
        card2Cutoff4: 0,
        card2Cutoff5: 0,
        card2Cutoff6: 0,
        card2Cutoff7: 0,
        card2Cutoff8: 0,
        card2Cutoff9: 0,
        card2Cutoff10: 0,
        card3Cutoff1: 0,
        card3Cutoff2: 0,
        card3Cutoff3: 0,
        card3Cutoff4: 0,
        card3Cutoff5: 0,
        card3Cutoff6: 0,
        card3Cutoff7: 0,
        card3Cutoff8: 0,
        card3Cutoff9: 0,
        card3Cutoff10: 0,
        card4Cutoff1: 0,
        card4Cutoff2: 0,
        card4Cutoff3: 0,
        card4Cutoff4: 0,
        card4Cutoff5: 0,
        card4Cutoff6: 0,
        card4Cutoff7: 0,
        card4Cutoff8: 0,
        card4Cutoff9: 0,
        card4Cutoff10: 0,
        card5Cutoff1: 0,
        card5Cutoff2: 0,
        card5Cutoff3: 0,
        card5Cutoff4: 0,
        card5Cutoff5: 0,
        card5Cutoff6: 0,
        card5Cutoff7: 0,
        card5Cutoff8: 0,
        card5Cutoff9: 0,
        card5Cutoff10: 0,
        loopArray: [],
        increment: () => set((s) => ({ count: s.count + 1 })),
        decrement: () => set((s) => ({ count: s.count - 1 })),
        reset: () => set({ count: 0 }),
        labelArray: [
          "-6",
          "-5",
          "-4",
          "-3",
          "-2",
          "-1",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
        ],
        isOn: false,
        p1p2Strength: "",
        p2p3Strength: "",
        p3p4Strength: "",
        p4p5Strength: "",
        updateP1P2Strength: (val) => set({ p1p2Strength: val }),
        updateP2P3Strength: (val) => set({ p2p3Strength: val }),
        updateP3P4Strength: (val) => set({ p3p4Strength: val }),
        updateP4P5Strength: (val) => set({ p4p5Strength: val }),
        toggleIsOn: () => set((s) => ({ isOn: !s.isOn }) as Partial<AppState>),
        updateFilename: (filename: string) => set(() => ({ filename })),
        updatePattern: (pattern: number[]) => set(() => ({ pattern })),
        updateSortableArray: (sortableArray: number[]) => set(() => ({ sortableArray })),
        updateCard1Cutoff1: (card1Cutoff1: number) => set(() => ({ card1Cutoff1 })),
        updateCard1Cutoff2: (card1Cutoff2: number) => set(() => ({ card1Cutoff2 })),
        updateCard1Cutoff3: (card1Cutoff3: number) => set(() => ({ card1Cutoff3 })),
        updateCard1Cutoff4: (card1Cutoff4: number) => set(() => ({ card1Cutoff4 })),
        updateCard1Cutoff5: (card1Cutoff5: number) => set(() => ({ card1Cutoff5 })),
        updateCard1Cutoff6: (card1Cutoff6: number) => set(() => ({ card1Cutoff6 })),
        updateCard1Cutoff7: (card1Cutoff7: number) => set(() => ({ card1Cutoff7 })),
        updateCard1Cutoff8: (card1Cutoff8: number) => set(() => ({ card1Cutoff8 })),
        updateCard1Cutoff9: (card1Cutoff9: number) => set(() => ({ card1Cutoff9 })),
        updateCard1Cutoff10: (card1Cutoff10: number) => set(() => ({ card1Cutoff10 })),
        updateCard2Cutoff1: (card2Cutoff1: number) => set(() => ({ card2Cutoff1 })),
        updateCard2Cutoff2: (card2Cutoff2: number) => set(() => ({ card2Cutoff2 })),
        updateCard2Cutoff3: (card2Cutoff3: number) => set(() => ({ card2Cutoff3 })),
        updateCard2Cutoff4: (card2Cutoff4: number) => set(() => ({ card2Cutoff4 })),
        updateCard2Cutoff5: (card2Cutoff5: number) => set(() => ({ card2Cutoff5 })),
        updateCard2Cutoff6: (card2Cutoff6: number) => set(() => ({ card2Cutoff6 })),
        updateCard2Cutoff7: (card2Cutoff7: number) => set(() => ({ card2Cutoff7 })),
        updateCard2Cutoff8: (card2Cutoff8: number) => set(() => ({ card2Cutoff8 })),
        updateCard2Cutoff9: (card2Cutoff9: number) => set(() => ({ card2Cutoff9 })),
        updateCard2Cutoff10: (card2Cutoff10: number) => set(() => ({ card2Cutoff10 })),
        updateCard3Cutoff1: (card3Cutoff1: number) => set(() => ({ card3Cutoff1 })),
        updateCard3Cutoff2: (card3Cutoff2: number) => set(() => ({ card3Cutoff2 })),
        updateCard3Cutoff3: (card3Cutoff3: number) => set(() => ({ card3Cutoff3 })),
        updateCard3Cutoff4: (card3Cutoff4: number) => set(() => ({ card3Cutoff4 })),
        updateCard3Cutoff5: (card3Cutoff5: number) => set(() => ({ card3Cutoff5 })),
        updateCard3Cutoff6: (card3Cutoff6: number) => set(() => ({ card3Cutoff6 })),
        updateCard3Cutoff7: (card3Cutoff7: number) => set(() => ({ card3Cutoff7 })),
        updateCard3Cutoff8: (card3Cutoff8: number) => set(() => ({ card3Cutoff8 })),
        updateCard3Cutoff9: (card3Cutoff9: number) => set(() => ({ card3Cutoff9 })),
        updateCard3Cutoff10: (card3Cutoff10: number) => set(() => ({ card3Cutoff10 })),
        updateCard4Cutoff1: (card4Cutoff1: number) => set(() => ({ card4Cutoff1 })),
        updateCard4Cutoff2: (card4Cutoff2: number) => set(() => ({ card4Cutoff2 })),
        updateCard4Cutoff3: (card4Cutoff3: number) => set(() => ({ card4Cutoff3 })),
        updateCard4Cutoff4: (card4Cutoff4: number) => set(() => ({ card4Cutoff4 })),
        updateCard4Cutoff5: (card4Cutoff5: number) => set(() => ({ card4Cutoff5 })),
        updateCard4Cutoff6: (card4Cutoff6: number) => set(() => ({ card4Cutoff6 })),
        updateCard4Cutoff7: (card4Cutoff7: number) => set(() => ({ card4Cutoff7 })),
        updateCard4Cutoff8: (card4Cutoff8: number) => set(() => ({ card4Cutoff8 })),
        updateCard4Cutoff9: (card4Cutoff9: number) => set(() => ({ card4Cutoff9 })),
        updateCard4Cutoff10: (card4Cutoff10: number) => set(() => ({ card4Cutoff10 })),
        updateCard5Cutoff1: (card5Cutoff1: number) => set(() => ({ card5Cutoff1 })),
        updateCard5Cutoff2: (card5Cutoff2: number) => set(() => ({ card5Cutoff2 })),
        updateCard5Cutoff3: (card5Cutoff3: number) => set(() => ({ card5Cutoff3 })),
        updateCard5Cutoff4: (card5Cutoff4: number) => set(() => ({ card5Cutoff4 })),
        updateCard5Cutoff5: (card5Cutoff5: number) => set(() => ({ card5Cutoff5 })),
        updateCard5Cutoff6: (card5Cutoff6: number) => set(() => ({ card5Cutoff6 })),
        updateCard5Cutoff7: (card5Cutoff7: number) => set(() => ({ card5Cutoff7 })),
        updateCard5Cutoff8: (card5Cutoff8: number) => set(() => ({ card5Cutoff8 })),
        updateCard5Cutoff9: (card5Cutoff9: number) => set(() => ({ card5Cutoff9 })),
        updateCard5Cutoff10: (card5Cutoff10: number) => set(() => ({ card5Cutoff10 })),
        updateLoopArray: (loopArray: number[][]) => set(() => ({ loopArray })),
      }),
      { name: "app-storage" },
    ),
  ),
);

/*
port { useTranslation } from 'react-i18next'
import { useAppStore } from './store/useAppStore'

export default function App() {
  const { t, i18n } = useTranslation()
  const { count, increment, decrement, reset } = useAppStore()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        {t('hello', { name: 'World' })}
      </h1>

      <p className="text-lg text-gray-600">{t('counter', { count })}</p>

      <div className="flex gap-2">
        <button onClick={decrement} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">−</button>
        <button onClick={reset}     className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Reset</button>
        <button onClick={increment} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">+</button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => i18n.changeLanguage('en')} className="text-sm underline text-blue-500">EN</button>
        <button onClick={() => i18n.changeLanguage('es')} className="text-sm underline text-blue-500">ES</button>
      </div>
    </main>
    */
