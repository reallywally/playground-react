import React from "react";
import Child1 from "./Child1";

const ParentComponent: React.FC = () => {
  const users = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Doe", age: 30 },
  ];

  return (
    <div>
      <h1>Parent Component</h1>
      <Child1 users={users} />
    </div>
  );
};

export default ParentComponent;
