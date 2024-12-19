import React from "react";

interface Item {
  name: string;
  age: number;
}
interface Child1Props {
  items: Item[];
}

export default function Child1: React.FC<Child1Props> = ( {items}) {
  return <div>Child1</div>;
}
