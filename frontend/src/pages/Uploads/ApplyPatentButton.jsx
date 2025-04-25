import React from "react";
import './Uploads.css';

const ApplyPatentButton = ({ onClick, disabled, loading, label = "Apply for Patent", className = ""  }) => {
  return (
    <button className={`verify-btn ${className}`} onClick={onClick} disabled={disabled}>
      {loading ? "Processing..." : label}
    </button>
  );
};

export default ApplyPatentButton;
