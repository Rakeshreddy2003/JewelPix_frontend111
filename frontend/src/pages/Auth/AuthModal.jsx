import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

const AuthModal = ({ onClose, defaultMode = "login" }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(defaultMode === "login");
  }, [defaultMode]);

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={handleClose}>
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
