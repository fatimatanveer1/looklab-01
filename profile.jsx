import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, db, storage } from "./firebase"; 
import { getDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";

import "./Profile.css";

const Profile = ({ user }) => { 
  const [profilePic, setProfilePic] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome!");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userInfo = userSnap.data();
          setUserData(userInfo);
          setProfilePic(userInfo.profilePic || "default-avatar.png");
          setWelcomeMessage("Welcome back!");
        } else {
          setWelcomeMessage("Hi!");
          await setDoc(userRef, {
            firstName: "",
            lastName: "",
            phone: "",
            quizResults: {},
            colorAnalysis: {},
            recommendations: [],
            profilePic: "default-avatar.png",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      setProfilePic(photoURL);
      await setDoc(doc(db, "users", user.uid), { profilePic: photoURL }, { merge: true });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/register");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>{welcomeMessage}</h1>
      <div className="profile-section">
        <label htmlFor="profile-pic-upload" className="profile-pic-label">
          <img src={profilePic || "default-avatar.png"} alt="Profile" className="profile-pic" />
        </label>
        <input id="profile-pic-upload" type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: "none" }} />
        <h2>{userData.firstName} {userData.lastName}</h2>
        <p>{user.email}</p>
        <p>{userData.phone}</p>
      </div>

      <div className="your-style-section">
        <h2>Your Style</h2>
        <div className="personal-recommendations">
          {userData.recommendations?.length ? "Your recommendations here" : "No recommendations yet"}
        </div>
        <button onClick={() => navigate("/quiz")} className="take-quiz">Take Quiz</button>
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
