import { useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
}

const MindMapTest = () => {
  const [nodes, setNodes] = useState<Node[]>([{ id: 1, x: 200, y: 200 }]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);

  const addNode = (x: number, y: number) => {
    const newNode: Node = { id: nodes.length + 1, x, y };
    setNodes([...nodes, newNode]);
    setEdges([...edges, { from: nodes[0].id, to: newNode.id }]);
  };

  const startDrag = (id: number) => setDragging(id);
  const stopDrag = () => setDragging(null);

  const onDrag = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dragging !== null) {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === dragging ? { ...node, x: e.clientX, y: e.clientY } : node
        )
      );
    }
  };

  return (
    <svg
      width="100vw"
      height="100vh"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      style={{ border: "1px solid #ccc" }}
    >
      {edges.map((edge, index) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        return fromNode && toNode ? (
          <line
            key={index}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="black"
          />
        ) : null;
      })}

      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={20}
          fill="blue"
          onMouseDown={() => startDrag(node.id)}
          onDoubleClick={(e) => addNode(e.clientX, e.clientY)}
        />
      ))}
    </svg>
  );
};

export default MindMapTest;
