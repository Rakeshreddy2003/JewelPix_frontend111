import React from "react";
import UploadPatentComponent from "./UploadPatentComponent ";
import AccuracyProgressBar from "./AccuracyProgressBar";
import ApplyPatentButton from "./ApplyPatentButton";
import "./Uploads.css"; 

const AccuracyCard = ({ images, accuracy }) => {
  return (
    <div className="accuracy-card">
      <UploadPatentComponent images={images} />
      <AccuracyProgressBar accuracy={accuracy} />
      <p className="unique-message">✅ Your design is unique! 🎉</p>
      <p className="secure-message">Secure your creation with a patent now.</p>
      <ApplyPatentButton onClick={() => alert("Applying for Patent")} />
    </div>
  );
};

export default AccuracyCard;
