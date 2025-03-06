import React, { useEffect } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

interface Child1Props {
  users: User[];
}

const Child1: React.FC<Child1Props> = ({ users }) => {
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
    </div>
  );
};

export default Child1;
