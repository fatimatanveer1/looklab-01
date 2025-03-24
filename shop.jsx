import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure correct import path
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        console.log("📡 Fetching shop items...");
        const querySnapshot = await getDocs(collection(db, "shopItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("✅ Fetched shop items:", items);
        setShopItems(items);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching shop items:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  return (
    <div className="shop-page">
      
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h2 className="logo">🛍️ LookLab</h2>

        {/* ✅ Hamburger Menu for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/features" className="nav-link">Features</NavLink>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
          <NavLink to="/contact" className="nav-link">Contact Me</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </div>
      </nav>

      <h2 className="shop-title">🛍️ Shop Collection</h2>

      {/* Display error if any */}
      {error && <p className="error-message">⚠️ Error: {error}</p>}

      {/* Loading message */}
      {loading ? (
        <p className="loading-message">Loading shop items...</p>
      ) : shopItems.length === 0 ? (
        <p className="no-items-message">No items available.</p>
      ) : (
        <div className="shop-container">
          <div className="shop-grid">
            {shopItems.map((item, index) => (
              <div key={index} className="shop-item">
                {/* Display Image */}
                {item.image_urls && Array.isArray(item.image_urls) && item.image_urls.length > 0 ? (
                  <img src={item.image_urls[0]} alt={item.product_name || "No Name"} className="product-image" />
                ) : (
                  <p>🚫 No image available</p>
                )}

                {/* Display Product Information */}
                <h3 className="product-name">{item.product_name || "Unknown Product"}</h3>
                <p className="product-detail"><strong>Brand:</strong> {item.brand || "N/A"}</p>
                <p className="product-detail"><strong>Category:</strong> {item.fit || "N/A"}</p>
                <p className="product-detail"><strong>Price:</strong> {item.current_price || "Not available"}</p>
                <p className="product-detail"><strong>Sale:</strong> {item.sale_percentage || "No Sale"}</p>

                {/* 🔗 Product Link */}
                <a href={`${item.product_url}?source=looklab`} className="view-product">
                  🔗 View Product
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
