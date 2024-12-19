import React, { useState, useEffect } from "react";
import Child1 from "./Child1";

const ParentComponent: React.FC = () => {
  console.log("ParentComponent rendered");
  const [users, setUsers] = useState([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Doe", age: 30 },
  ]);

  useEffect(() => {
    console.log("useEffect");

    const testMethod = async () => {
      setUsers([
        ...users,
        { id: 3, name: "Jane", age: 35 },
        { id: 4, name: "Smith", age: 40 },
      ]);
    };

    testMethod();
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      <Child1 users={users} />
    </div>
  );
};

export default ParentComponent;
