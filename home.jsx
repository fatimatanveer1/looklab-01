import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const outfitterLogo = "/outfitters.png";
const nikeLogo = "/nike.png";
const adidasLogo = "/adidas.png";

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const faqData = [
    { question: "What is color analysis?", answer: "Color analysis helps determine which colors complement your skin tone." },
    { question: "How does the chatbot work?", answer: "The chatbot provides style recommendations based on your preferences." },
    { question: "Can I give feedback?", answer: "Yes! Use the contact section to share your thoughts." }
  ];

  return (
    <div className="app">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="logo">LookLab</div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      {/* ✅ Shop Section */}
      <section className="shop-section" id="shop">
        <h2>Shop Your Favorite Styles</h2>
        <button className="shop-button" onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </section>

      {/* ✅ Brand Scroller */}
      <div className="brand-scroller">
        <div className="brand-track">
          <img src={outfitterLogo} alt="Outfitter" onClick={() => navigate("/shop/outfitter")} />
          <img src={nikeLogo} alt="Nike" onClick={() => navigate("/shop/nike")} />
          <img src={adidasLogo} alt="Adidas" onClick={() => navigate("/shop/adidas")} />
          {/* Repeat for smooth scrolling */}
          <img src={outfitterLogo} alt="Outfitter" onClick={() => navigate("/shop/outfitter")} />
          <img src={nikeLogo} alt="Nike" onClick={() => navigate("/shop/nike")} />
          <img src={adidasLogo} alt="Adidas" onClick={() => navigate("/shop/adidas")} />
        </div>
      </div>

      {/* ✅ Features Section */}
      <section className="features" id="features">
        <div className="feature-card blue">
          <h3>Color Analysis</h3>
          <h2>Find Your Palette</h2>
          <div className="icon">🎨</div>
          <button>Analyze Now</button>
          <p>Discover colors that complement your skin tone.</p>
        </div>
        <div className="feature-card light-blue">
          <h3>Build Outfits</h3>
          <h2>Style Made Easy</h2>
          <div className="icon">🔗</div>
          <button>Analyze Now</button>
          <p>Create stunning looks with our outfit builder.</p>
        </div>
        <div className="feature-card dark-blue">
          <h3>Image Search</h3>
          <h2>Snap & Style</h2>
          <div className="icon">👕</div>
          <button>Analyze Now</button>
          <p>Upload images to find similar outfits.</p>
        </div>
      </section>

      {/* ✅ FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">{faq.question}</div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
