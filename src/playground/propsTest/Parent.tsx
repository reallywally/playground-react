import React, { useState } from "react";
import Child1 from "./Child1";

const ParentComponent: React.FC = () => {
  const initData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Doe", age: 30 },
  ];
  const [users, setUsers] = useState(initData);

  return (
    <div>
      <h1>Parent Component</h1>
      <button
        onClick={() => setUsers([...users, { id: 3, name: "Jane", age: 22 }])}
      >
        add user
      </button>
      <Child1 users={users} />
    </div>
  );
};

export default ParentComponent;
