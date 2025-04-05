import React, { useState } from "react";
import ApplyPatentButton from "./ApplyPatentButton";
import "./Uploads.css";

const UploadImagesComponent = ({ onImagesUpload }) => {
  const [images, setImages] = useState({
    topView: { file: null, preview: null },
    frontView: { file: null, preview: null },
    sideView: { file: null, preview: null },
  });

  const handleFileChange = (event, view) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [view]: { file: file.name, preview: URL.createObjectURL(file) },
      }));
    }
  };

  const handleVerifyDesign = () => {
    const uploadedImages = [
      { src: images.topView.preview, label: "Top View" },
      { src: images.frontView.preview, label: "Front View" },
      { src: images.sideView.preview, label: "Side View" },
    ].filter((img) => img.src); // Filter out empty values

    if (uploadedImages.length === 3) {
      onImagesUpload(uploadedImages);
    } else {
      alert("Please upload all three views before verifying.");
    }
  };

  return (
    <div className="upload-modal">
      <h2>Upload Images</h2>

      {/* Top View Upload */}
      <label className="upload-label">
        <span>Top View</span>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "topView")} />
        {images.topView.file && <p className="file-name">{images.topView.file}</p>}
      </label>

      {/* Front View Upload */}
      <label className="upload-label">
        <span>Front View</span>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "frontView")} />
        {images.frontView.file && <p className="file-name">{images.frontView.file}</p>}
      </label>

      {/* Side View Upload */}
      <label className="upload-label">
        <span>Side View</span>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "sideView")} />
        {images.sideView.file && <p className="file-name">{images.sideView.file}</p>}
      </label>

      <div className="upload-box">
        <p>Click each above field to upload images</p>
      </div>

      <ApplyPatentButton onClick={handleVerifyDesign} />
    </div>
  );
};

export default UploadImagesComponent;
