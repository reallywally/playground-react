import { useEffect, useMemo, useState } from "react";

function ExpensiveComponent({ value }) {
  useEffect(() => {
    console.log("rendered");
  });
  return <div>{value + 100}</div>;
}

const UseMemoTest = () => {
  const [value, setValue] = useState(0);
  const [, triggerRendering] = useState(false);

  const MemoizedComponent = useMemo(
    () => <ExpensiveComponent value={value} />,
    [value]
  );

  const handleCange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    triggerRendering((prev) => !prev);
  };

  return (
    <>
      <input value={value} onChange={handleCange} />
      <button onClick={handleClick}>Re-render</button>
      {MemoizedComponent}
    </>
  );
};

export default UseMemoTest;
