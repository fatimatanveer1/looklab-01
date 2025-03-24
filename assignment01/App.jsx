import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./components/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import Shop from "./components/shop"; 
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import Home from "./components/home"; 
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/profile" /> : <SignUp />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
