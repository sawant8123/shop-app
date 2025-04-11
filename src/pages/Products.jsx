// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    setCategories(["all", ...data]);
  };

  const fetchProducts = async (category) => {
    const url =
      category && category !== "all"
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-container">
      <h2>All Products</h2>

      <div className="controls">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option value={cat} key={idx}>{cat.toUpperCase()}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
