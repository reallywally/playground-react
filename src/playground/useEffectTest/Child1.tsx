import React from "react";

interface Item {
  id: number;
  name: string;
  age: number;
}
interface Child1Props {
  items: Item[];
}

const Child1: React.FC<Child1Props> = ({ data }) => {
  console.log("Child1 rendered");
  return (
    <div>
      Child1
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.age}</p>
        </div>
      ))}
    </div>
  );
};

export default Child1;
