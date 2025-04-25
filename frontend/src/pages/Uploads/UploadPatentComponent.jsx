import React from "react";

const UploadPatentComponent = ({ images = {} }) => {
  const views = Object.entries(images); 

  return (
    <div className="uploaded-images-section">
      <h3 className="upload-views">Uploaded Views</h3>

      {views.length > 0 ? (
        <>
          {/* Mobile View: Horizontal Scroll */}
          <div className="d-md-none d-flex flex-nowrap overflow-auto gap-3 px-2" style={{ scrollSnapType: 'x mandatory' }}>
            {views.map(([view, data], index) => (
              <div key={index} className="uploaded-image-card" style={{ scrollSnapAlign: 'start' }}>
                <p className="image-label">{view.replace(/([A-Z])/g, " $1")}</p>
                <img src={data.preview} alt={`${view}-preview`} className="uploaded-preview" />
              </div>
            ))}
          </div>

          {/* Desktop View: 3 in a row */}
          <div className="d-none d-md-flex flex-wrap justify-content-center gap-4 uploaded-images-grid">
            {views.map(([view, data], index) => (
              <div key={index} className="uploaded-image-card">
                <p className="image-label">{view.replace(/([A-Z])/g, " $1")}</p>
                <img src={data.preview} alt={`${view}-preview`} className="uploaded-preview" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-uploaded-images">No images uploaded.</p>
      )}
    </div>
  );
};

export default UploadPatentComponent;
