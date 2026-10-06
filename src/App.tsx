import NumberInput from "./pages/NumberInput";
import { useAppStore, PERSPECTIVES } from "./pages/appStore";
import { getCriticalValue } from "./pages/getCriticalValue";
import FactorCard from "./pages/FactorCard";
// import StrengthSelects from "./pages/StrengthSelects";
import Toggle from "./pages/Toggle";
import UserTextInput from "./pages/UserTextInput";
import GenerateFileButton from "./pages/GenerateFileButton";
import { Section, StatTile } from "./pages/Section";
import ForcedUnforced from "./pages/ForcedUnforced";

export default function App() {
  const pattern = useAppStore((s) => s.pattern);
  const labelArray = useAppStore((s) => s.labelArray);
  const loopArray = useAppStore((s) => s.loopArray);
  const isOn = useAppStore((s) => s.isOn);
  const updatePattern = useAppStore((s) => s.updatePattern);
  const clearAll = useAppStore((s) => s.clearAllPerspectives);

  const statements = pattern.reduce((a, b) => a + b, 0);
  const criticalValue = getCriticalValue(statements);
  const simulated = loopArray.flat().reduce((a, b) => a + b, 0);
  const seeds = isOn ? PERSPECTIVES : 0;

  const handlePatternChange = (val: number, i: number) => {
    const next = [...pattern];
    next[i] = val;
    updatePattern(next);
  };

  const propsObject = {
    pattern,
    statements,
    criticalValue,
    simulated,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Q Sort Simulator
          </h1>
          <p className="mt-1 max-w-prose text-slate-600">
            Generate simulated Q sort data for KADE and PQMethod.
          </p>
        </header>

        <Section
          step={1}
          title="Q sort pattern"
          hint="Set how many statements go in each column of the distribution."
        >
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-2">
            <div className="flex min-w-max gap-2">
              {pattern.map((value, i) => (
                <NumberInput
                  key={i}
                  label={labelArray[i]}
                  value={value}
                  onChange={(val) => handlePatternChange(val, i)}
                  min={0}
                  max={127}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatTile label="Total statements" value={statements} />
            <StatTile
              label="Significant correlation threshold"
              value={criticalValue}
            />
          </div>
        </Section>

        <Section
          step={2}
          title="Participants per perspective"
          hint="Choose how many simulated participants correlate with each perspective at each strength."
          action={
            <button
              type="button"
              onClick={clearAll}
              disabled={simulated === 0}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear all
            </button>
          }
        >
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"> */}
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: PERSPECTIVES }, (_, p) => (
              <FactorCard key={p} index={p} />
            ))}
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section
            step={3}
            title="Q Sort Modifications"
            hint="Create unforced sorts or add seed sorts to the simulation."
          >
            <div className="space-y-6">
              {/* <StrengthSelects /> */}
              <ForcedUnforced />

              <Toggle
                text1="Include seed sorts"
                text2="Adds the 5 original perspective sorts to the output file."
              />
            </div>
          </Section>

          <Section step={4} title="Export">
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <StatTile label="Simulated" value={simulated} />
                <StatTile label="Seeds" value={seeds} />
                <StatTile label="Total" value={simulated + seeds} />
              </div>
              <UserTextInput />
              <GenerateFileButton characteristics={propsObject} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
