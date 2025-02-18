import { useState } from "react";

const UseStateTest = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => {
      const newCount = prev + 1;

      if (newCount > 5) {
        alert("count is greater than 5");
      }

      return newCount;
    });
  }

  return (
    <div>
      <h1>Count Component</h1>
      {count}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default UseStateTest;
