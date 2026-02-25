import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  count: number;
  card1Cutoff1: number;
  card1Cutoff2: number;
  card1Cutoff3: number;
  card1Cutoff4: number;
  card1Cutoff5: number;
  card2Cutoff1: number;
  card2Cutoff2: number;
  card2Cutoff3: number;
  card2Cutoff4: number;
  card2Cutoff5: number;
  card3Cutoff1: number;
  card3Cutoff2: number;
  card3Cutoff3: number;
  card3Cutoff4: number;
  card3Cutoff5: number;
  card4Cutoff1: number;
  card4Cutoff2: number;
  card4Cutoff3: number;
  card4Cutoff4: number;
  card4Cutoff5: number;
  card5Cutoff1: number;
  card5Cutoff2: number;
  card5Cutoff3: number;
  card5Cutoff4: number;
  card5Cutoff5: number;
  loopArray: number[][];
  pattern: number[];
  patternValues: number[];
  sortableArray: number[];
  filename: string;
  updateFilename: (filename: string) => void;
  updatePattern: (pattern: number[]) => void;
  updateSortableArray: (sortableArray: number[]) => void;
  updateCard1Cutoff1: (card1Cutoff1: number) => void;
  updateCard1Cutoff2: (card1Cutoff2: number) => void;
  updateCard1Cutoff3: (card1Cutoff3: number) => void;
  updateCard1Cutoff4: (card1Cutoff4: number) => void;
  updateCard1Cutoff5: (card1Cutoff5: number) => void;
  updateCard2Cutoff1: (card2Cutoff1: number) => void;
  updateCard2Cutoff2: (card2Cutoff2: number) => void;
  updateCard2Cutoff3: (card2Cutoff3: number) => void;
  updateCard2Cutoff4: (card2Cutoff4: number) => void;
  updateCard2Cutoff5: (card2Cutoff5: number) => void;
  updateCard3Cutoff1: (card3Cutoff1: number) => void;
  updateCard3Cutoff2: (card3Cutoff2: number) => void;
  updateCard3Cutoff3: (card3Cutoff3: number) => void;
  updateCard3Cutoff4: (card3Cutoff4: number) => void;
  updateCard3Cutoff5: (card3Cutoff5: number) => void;
  updateCard4Cutoff1: (card4Cutoff1: number) => void;
  updateCard4Cutoff2: (card4Cutoff2: number) => void;
  updateCard4Cutoff3: (card4Cutoff3: number) => void;
  updateCard4Cutoff4: (card4Cutoff4: number) => void;
  updateCard4Cutoff5: (card4Cutoff5: number) => void;
  updateCard5Cutoff1: (card5Cutoff1: number) => void;
  updateCard5Cutoff2: (card5Cutoff2: number) => void;
  updateCard5Cutoff3: (card5Cutoff3: number) => void;
  updateCard5Cutoff4: (card5Cutoff4: number) => void;
  updateCard5Cutoff5: (card5Cutoff5: number) => void;
  updateLoopArray: (loopArray: number[][]) => void;
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
        pattern: [0, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        patternValues: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        sortableArray: [],
        filename: "",
        card1Cutoff1: 0,
        card1Cutoff2: 0,
        card1Cutoff3: 0,
        card1Cutoff4: 0,
        card1Cutoff5: 0,
        card2Cutoff1: 0,
        card2Cutoff2: 0,
        card2Cutoff3: 0,
        card2Cutoff4: 0,
        card2Cutoff5: 0,
        card3Cutoff1: 0,
        card3Cutoff2: 0,
        card3Cutoff3: 0,
        card3Cutoff4: 0,
        card3Cutoff5: 0,
        card4Cutoff1: 0,
        card4Cutoff2: 0,
        card4Cutoff3: 0,
        card4Cutoff4: 0,
        card4Cutoff5: 0,
        card5Cutoff1: 0,
        card5Cutoff2: 0,
        card5Cutoff3: 0,
        card5Cutoff4: 0,
        card5Cutoff5: 0,
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
        updateFilename: (filename: string) => set(() => ({ filename })),
        updatePattern: (pattern: number[]) => set(() => ({ pattern })),
        updateSortableArray: (sortableArray: number[]) => set(() => ({ sortableArray })),
        updateCard1Cutoff1: (card1Cutoff1: number) => set(() => ({ card1Cutoff1 })),
        updateCard1Cutoff2: (card1Cutoff2: number) => set(() => ({ card1Cutoff2 })),
        updateCard1Cutoff3: (card1Cutoff3: number) => set(() => ({ card1Cutoff3 })),
        updateCard1Cutoff4: (card1Cutoff4: number) => set(() => ({ card1Cutoff4 })),
        updateCard1Cutoff5: (card1Cutoff5: number) => set(() => ({ card1Cutoff5 })),
        updateCard2Cutoff1: (card2Cutoff1: number) => set(() => ({ card2Cutoff1 })),
        updateCard2Cutoff2: (card2Cutoff2: number) => set(() => ({ card2Cutoff2 })),
        updateCard2Cutoff3: (card2Cutoff3: number) => set(() => ({ card2Cutoff3 })),
        updateCard2Cutoff4: (card2Cutoff4: number) => set(() => ({ card2Cutoff4 })),
        updateCard2Cutoff5: (card2Cutoff5: number) => set(() => ({ card2Cutoff5 })),
        updateCard3Cutoff1: (card3Cutoff1: number) => set(() => ({ card3Cutoff1 })),
        updateCard3Cutoff2: (card3Cutoff2: number) => set(() => ({ card3Cutoff2 })),
        updateCard3Cutoff3: (card3Cutoff3: number) => set(() => ({ card3Cutoff3 })),
        updateCard3Cutoff4: (card3Cutoff4: number) => set(() => ({ card3Cutoff4 })),
        updateCard3Cutoff5: (card3Cutoff5: number) => set(() => ({ card3Cutoff5 })),
        updateCard4Cutoff1: (card4Cutoff1: number) => set(() => ({ card4Cutoff1 })),
        updateCard4Cutoff2: (card4Cutoff2: number) => set(() => ({ card4Cutoff2 })),
        updateCard4Cutoff3: (card4Cutoff3: number) => set(() => ({ card4Cutoff3 })),
        updateCard4Cutoff4: (card4Cutoff4: number) => set(() => ({ card4Cutoff4 })),
        updateCard4Cutoff5: (card4Cutoff5: number) => set(() => ({ card4Cutoff5 })),
        updateCard5Cutoff1: (card5Cutoff1: number) => set(() => ({ card5Cutoff1 })),
        updateCard5Cutoff2: (card5Cutoff2: number) => set(() => ({ card5Cutoff2 })),
        updateCard5Cutoff3: (card5Cutoff3: number) => set(() => ({ card5Cutoff3 })),
        updateCard5Cutoff4: (card5Cutoff4: number) => set(() => ({ card5Cutoff4 })),
        updateCard5Cutoff5: (card5Cutoff5: number) => set(() => ({ card5Cutoff5 })),
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
