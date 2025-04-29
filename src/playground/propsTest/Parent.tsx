import React, { useState } from "react";
import { useAtom } from "jotai";
import { projectAtom, projectListAtom } from "../../atoms/projectAtom";
import Child1 from "./Child1";

const ParentComponent: React.FC = () => {
  const [projectList] = useAtom(projectListAtom);
  const [, setProject] = useAtom(projectAtom);
  const initData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Doe", age: 30 },
  ];
  const [users, setUsers] = useState(initData);

  return (
    <div>
      <h1>Parent Component</h1>
      <button
        onClick={() => {
          setUsers([...users, { id: 3, name: "Jane", age: 22 }]);
          setProject(projectList[0].value);
        }}
      >
        add user
      </button>
      <Child1 users={users} />
    </div>
  );
};

export default ParentComponent;
