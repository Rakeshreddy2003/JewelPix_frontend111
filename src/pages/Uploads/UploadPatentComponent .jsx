import React from "react";

const UploadPatentComponent = ({ images }) => {
  return (
    <div className="upload-container">
      {images.map((image, index) => (
        <div key={index} className="image-box">
          <img src={image.src} alt={`IMG ${index + 1}`} />
          <p>{image.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UploadPatentComponent;
