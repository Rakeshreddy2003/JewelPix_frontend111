import React, { useState } from "react";
import "./AuthModal.css"; // Custom CSS

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {!isLogin && <input type="text" placeholder="Enter Name" />}
        <input type="email" placeholder="Enter email" />
        <input type="password" placeholder="Enter password" />

        {isLogin && <p className="forgot-password">Forgot password?</p>}

        <button className="auth-btn">{isLogin ? "Login" : "Signup"}</button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
