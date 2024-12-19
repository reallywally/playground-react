import React from "react";
import Child1 from "./Child1";

export default function Parent() {
  console.log("Parent rendered");
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Doe", age: 30 },
  ];

  return (
    <div>
      Parent
      <Child1 data={data} />
    </div>
  );
}
