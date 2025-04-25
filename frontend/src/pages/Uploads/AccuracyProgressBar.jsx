import React from "react";
import "./Uploads.css"; // Assuming you have a CSS file for styles

const AccuracyProgressBar = ({ accuracy }) => {
  return (
    <div className="container">
      <p className="accuracy-text">Accuracy: {accuracy}%</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${accuracy}%`, backgroundColor: accuracy < 50 ? "red" : "green" }}
        ></div>
      </div>
    </div>
  );
};

export default AccuracyProgressBar;
