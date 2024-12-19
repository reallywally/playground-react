import React from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

interface Child1Props {
  users: User[];
}

const Child1: React.FC<Child1Props> = ({ users }) => {
  console.log("Child1 rendered");
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Child1;
