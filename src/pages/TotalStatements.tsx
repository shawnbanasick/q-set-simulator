import { useAppStore } from "./appStore";
import { getCriticalValue } from "./getCriticalValue";

export default function TotalStatements() {
  const { pattern } = useAppStore();
  const statements = pattern.reduce((a, b) => a + b, 0);
  const criticalValue = getCriticalValue(statements);

  return (
    <div className="flex flex-wrap justify-center items-center w-[600px]">
      Total Statements: {statements}
      <br />
      Significant Correlation Cutoff: {criticalValue}
    </div>
  );
}
