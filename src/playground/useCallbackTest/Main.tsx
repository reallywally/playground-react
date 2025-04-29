import { useState, useCallback } from "react";

function UseCallBackTest() {
  const [count, setCount] = useState(0);

  // count가 변경될 때만 함수가 재생성됨
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // 의존성 배열이 빈 배열이므로 컴포넌트 최초 렌더링 시 한 번만 생성됨
  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>증가</button>
      <button onClick={resetCount}>리셋</button>
    </div>
  );
}

export default UseCallBackTest;
