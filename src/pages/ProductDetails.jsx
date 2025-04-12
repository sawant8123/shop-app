// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // ✅ for popup

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Define handleAddToCart function
  const handleAddToCart = () => {
    console.log("Add to Cart clicked");
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.title} className="product-details-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* ✅ Show popup if true */}
      {showPopup && <div className="popup">Product added to cart!</div>}
    </div>
  );
};

export default ProductDetails;
