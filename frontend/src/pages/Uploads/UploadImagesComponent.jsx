import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplyPatentButton from "./ApplyPatentButton";
import "./Uploads.css";

const UploadImagesComponent = ({ onClose, onSuccess }) => {
  const [images, setImages] = useState({
    topView: { file: null, preview: null },
    frontView: { file: null, preview: null },
    sideView: { file: null, preview: null },
  });

  const [isReadyToApply, setIsReadyToApply] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allUploaded = Object.values(images).every(img => img.file !== null);
    setIsReadyToApply(allUploaded);
  }, [images]);

  const handleFileChange = (event, view) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [view]: { file, preview: URL.createObjectURL(file) },
      }));
    }
  };

  const handleVerifyDesign = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", images.frontView.file);

      const response = await fetch("https://tired-kimmie-gajala-sonic-solutions-2de32759.koyeb.app/api/visual-search", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to scan image");

      const result = await response.json();

      if (onSuccess) onSuccess(); // closes full popup
      navigate("/accuracycard", {
        state: {
          scanResult: result,
          uploadedImages: images,
        },
      });

    } catch (error) {
      console.error("Error scanning image:", error);
      alert("please only upload jewellery images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-modal" >
      <button className="upload-close-btn" onClick={onClose}>×</button>
      <h2 >Upload Images</h2>


      {["topView", "frontView", "sideView"].map((view) => {
        const label = view.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());

        return (
          <label className="upload-label" key={view}>
            <span>{label}</span>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, view)} />
            {images[view].file && <p className="file-name">{images[view].file.name}</p>}
          </label>
        );
      })}

      <div className="upload-box">
        <p>Click each above field to upload images</p>
      </div>

      <ApplyPatentButton
        onClick={handleVerifyDesign}
        disabled={!isReadyToApply || loading}
        loading={loading}
        label="Verify Design"
        className="w-100"
      />

    </div>
  );
};

export default UploadImagesComponent;
