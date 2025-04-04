import React, { useState } from "react";
import UploadImagesComponent from "../pages/Uploads/UploadImagesComponent";
const Popup = ({ onClose }) => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        {!showUpload ? (
          <>
            <h3 style={styles.title}>Protect Your Design Today</h3>
            <button style={styles.button}>Get a Patent</button>
            <p style={styles.orText}>or</p>
            <button style={styles.button}>Copyright Your Design</button>
            <button 
              style={styles.guidelinesButton} 
              onClick={() => setShowUpload(true)}
            >
              Upload Design
            </button>
          </>
        ) : (
          <UploadImagesComponent />
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#4c2d41",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
    color: "white",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  title: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#2c1b24",
    border: "1px solid goldenrod",
    color: "white",
    padding: "10px",
    width: "100%",
    borderRadius: "20px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  orText: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  guidelinesButton: {
    background: "linear-gradient(to right, #d4af37, #8b5e3b)",
    color: "white",
    padding: "10px",
    width: "100%",
    borderRadius: "20px",
    cursor: "pointer",
    border: "none",
  },
};

export default Popup;
