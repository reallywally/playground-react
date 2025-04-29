import { useMemo, useState } from "react";

function ExpensiveCalculation({ number }) {
  // 복잡한 계산을 시뮬레이션
  const calculateFactorial = (num) => {
    console.log("계산 중...");
    if (num <= 1) return 1;

    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  // useMemo를 사용하여 number가 변경될 때만 계산 실행
  const factorial = useMemo(() => calculateFactorial(number), [number]);

  return (
    <div>
      {number}의 팩토리얼: {factorial}
    </div>
  );
}

const UseMemoTest = () => {
  const [number, setNumber] = useState(5);
  const [count, setCount] = useState(0);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <ExpensiveCalculation number={number} />

      <button onClick={() => setCount(count + 1)}>
        카운트 증가 (현재: {count})
      </button>
    </div>
  );
};

export default UseMemoTest;
