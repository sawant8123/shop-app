import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-logo">ShopApp</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">
            Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
