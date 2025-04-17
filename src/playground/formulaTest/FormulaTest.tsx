import { useState, useRef } from "react";
import { parse } from "mathjs";

const variables = ["cost", "price", "revenue"] as const;
type Variable = (typeof variables)[number];

const FormulaTest = () => {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const insertVariable = (variable: Variable) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const newFormula = formula.slice(0, start) + variable + formula.slice(end);

    setFormula(newFormula);

    // 커서 위치 조정
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + variable.length, start + variable.length);
    });

    // 수식 평가
    try {
      parse(newFormula);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormula(value);

    try {
      parse(value);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div>
        <p className="mb-2 font-semibold">변수를 클릭해서 수식에 추가하세요:</p>
        <div className="flex gap-2 flex-wrap">
          {variables.map((v) => (
            <button
              key={v}
              onClick={() => insertVariable(v)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">수식 입력:</label>
        <input
          ref={inputRef}
          type="text"
          value={formula}
          onChange={handleFormulaChange}
          className="border p-2 rounded w-full"
          placeholder="예: cost * 0.8 + price"
        />
      </div>

      {error ? (
        <p className="text-red-500">⚠️ 오류: {error}</p>
      ) : formula ? (
        <p className="text-green-600">✅ 결과: {result}</p>
      ) : null}
    </div>
  );
};

export default FormulaTest;
