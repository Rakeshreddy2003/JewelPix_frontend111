import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AuthModal.css";

const LoginPage = ({ onClose , setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };

  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(""), duration);
  };

  const handleAuth = async () => {
    if (!email.trim()) return showMessage("Please enter email");
    setLoading(true);

    try {
      if (!otpSent) {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/verifyLoginOtp`, { email });
        if (res.data.success) {
          setOtpSent(true);
          setOtp("");
          showMessage("OTP sent successfully!");
        } else {
          showMessage("Email not found or OTP failed to send");
        }
      } else {
        if (!otp.trim()) return showMessage("Enter OTP");
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, { email, otp });
        if (res.data.success) {
          showMessage("Login successful");
          setIsLogin(true);
          localStorage.setItem("token", res.data.token);
          setTimeout(() => handleClose(), 1000);
        } else {
          showMessage("Invalid OTP");
        }
      }
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // cleanup on unmount
  }, []);

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2>Login</h2>
        {message && (
          <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>
        )}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || otpSent}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpSent}
        />
        <button className="auth-btn" onClick={handleAuth} disabled={loading}>
          {loading ? "Please wait..." : otpSent ? "Login" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
