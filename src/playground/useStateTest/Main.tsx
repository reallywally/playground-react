import { useState } from "react";

const UseStateTest = () => {
  const [count, setCount] = useState(0);

  // const [count, setCount] = useState(window.localStorage.getItem("count"));
  // const [count, setCount] = useState(() =>
  //   window.localStorage.getItem("count")
  // );

  function increment() {
    setCount((count) => count + 1);
    console.log(count);
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
