import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { projectAtom } from "../../atoms/projectAtom";

interface User {
  id: number;
  name: string;
  age: number;
}

interface Child1Props {
  users: User[];
}

const Child1: React.FC<Child1Props> = ({ users }) => {
  const [project] = useAtom(projectAtom);

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>

      <div>
        <h2>Project: {project}</h2>
      </div>
    </div>
  );
};

export default Child1;
