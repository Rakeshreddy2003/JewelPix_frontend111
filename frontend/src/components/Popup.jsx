import React, { useState } from "react";
import UploadImagesComponent from "../pages/Uploads/UploadImagesComponent";

const Popup = ({ onClose }) => {
  const [showUpload, setShowUpload] = useState(false);

  const handlePatentClick = () => {
    setShowUpload(true);
  };

  const handleGuidelinesClick = () => {
    window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
  };

  // 👇 only closes the Upload popup, not the whole thing
  const handleCloseUpload = () => {
    setShowUpload(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close full popup only here */}
        {!showUpload && (
          <button style={styles.closeButton} onClick={onClose}>×</button>
        )}

        {!showUpload ? (
          <>
            <h3 style={styles.title}>Protect Your Design Today</h3>
            <button style={styles.button} onClick={handlePatentClick}>
              Get a Patent
            </button>
            <button style={styles.guidelinesButton} onClick={handleGuidelinesClick}>
              View Guidelines
            </button>
          </>
        ) : (
          // 👇 Pass the close just for Upload
          <UploadImagesComponent onClose={handleCloseUpload} onSuccess={onClose} />

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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    color: "white",
    position: "relative",
    height: "40%",
    width: "350px",
    border:"1px solid goldenrod",
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
    marginTop: "20px"
  },
  button: {
    backgroundColor: "#2c1b24",
    color: "white",
    marginBottom: "10px",
    cursor: "pointer",
  
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    border:"1px solid #b28966",
    borderRadius:"5px",
   
  
  },
  orText: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  guidelinesButton: {
    width: "80%",
    padding: "10px",
    background: "linear-gradient(90deg, #d4af37, #8c5a24)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize:" 16px",
    fontWeight: "bold",
    marginTop: "20px",
  },
    
};

export default Popup;
