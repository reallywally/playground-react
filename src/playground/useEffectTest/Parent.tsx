import React, { useState, useEffect } from "react";

const ParentComponent: React.FC = () => {
  console.log("ParentComponent rendered");
  const [product, setProduct] = useState({
    name: "Product 1",
    desc: "dd",
    status: "active",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <div>
        <input name="name" value={product.name} onChange={changeHandler} />
        <input name="desc" value={product.desc} onChange={changeHandler} />
        <input
          type="radio"
          name="status"
          value="active"
          onChange={changeHandler}
        />
        활성
        <input
          type="radio"
          name="status"
          value="inactive"
          onChange={changeHandler}
        />
        비활성
        <div>
          product: {product.name} + {product.desc} + {product.status}
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
