import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [text, setText] = useState("looklab.");
  const [showCursor, setShowCursor] = useState(true);

  // Cursor animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Login successful!`, { position: "top-center" });
      navigate("/profile");
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="login-container">
      {/* Left Side (Animated Logo) */}
      <div className="logo-container">
        <h1 className="logo">
          {text}
          <span className="cursor">{showCursor ? "|" : " "}</span>
        </h1>
      </div>

      {/* Right Side (Login Form) */}
      <div className="form-container">
        <h2>Create your account</h2>

        <button className="google-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
               alt="Google Icon" 
               className="google-icon" />
          Login with Google
        </button>

        <p className="divider">or</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn login-submit">Sign Up</button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="signup-link">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
