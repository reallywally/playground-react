import { useMemo, useState } from "react";

function ProductList({ products, category }) {
  // 카테고리에 따라 상품 필터링
  const filteredProducts = useMemo(() => {
    console.log("상품 필터링 중...");
    return products.filter((product) => product.category === category);
  }, [products, category]);

  return (
    <div>
      <h2>{category} 상품 목록</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ₩{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

const UseMemoTest = () => {
  const [products] = useState([
    { id: 1, name: "노트북", price: 1200000, category: "전자제품" },
    { id: 2, name: "스마트폰", price: 800000, category: "전자제품" },
    { id: 3, name: "청바지", price: 50000, category: "의류" },
    { id: 4, name: "티셔츠", price: 30000, category: "의류" },
    // ... 더 많은 상품
  ]);

  const [category, setCategory] = useState("전자제품");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "라이트 모드" : "다크 모드"}
      </button>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="전자제품">전자제품</option>
        <option value="의류">의류</option>
      </select>

      <ProductList products={products} category={category} />
    </div>
  );
};

export default UseMemoTest;
