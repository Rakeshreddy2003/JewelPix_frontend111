import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const SignupPage = ({ onClose,setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const isReadyForOtp = name.trim() && email.trim() && mobile.trim();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(""), duration);
  };

  const handleAuth = async () => {
    if (!isReadyForOtp) return showMessage("Please fill all fields");

    if (!otpSent) {
      try {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/verifyOtp`, { email,  mobile, userName: name });
        if (res.data.success) {
          setOtpSent(true);
          setOtp("");
          showMessage("OTP sent successfully!");
        } else {
          showMessage(res.data.message || "Failed to send OTP");
        }
      } catch (err) {
        console.error(err);
        showMessage("failed to send OTP");
        showMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    } else {
      if (!otp.trim()) return showMessage("Enter OTP");

      try {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, {
          userName:name,
          email,
          mobile,
          otp,
        });

        if (res.data.success) {
          showMessage("Signup successful");
          setTimeout(() => handleClose(), 1000);
        } else {
          showMessage("Invalid OTP");
        }
      } catch (err) {
        console.error(err);
        showMessage(err.response?.data?.message || "Something went wrong");
        showMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // cleanup on unmount
  }, []);

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2>Signup</h2>

        {message && (
          <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>
        )}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={otpSent}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpSent}
        />

        <button className="auth-btn" onClick={handleAuth} disabled={loading}>
          {loading ? "Please wait..." : otpSent ? "Signup" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
