import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./patentApplication.css";

const PatentApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadedImage = location.state?.image || "";
  const userId = location.state?.userId || "";

  const [formData, setFormData] = useState({
    userId,
    designImage: uploadedImage,
    type: "patent",
    title: "",
    description: "",
    inventorName: "",
    country: "",
    priorityClaim: false,
    priorityDetails: {
      previousApplicationNumber: "",
      previousFilingDate: "",
      previousCountry: ""
    },
    supportingDocuments: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("priorityDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        priorityDetails: {
          ...prev.priorityDetails,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // TODO: send `formData` to the backend API
    navigate("/confirmation");
  };

  const handleBack = () => {
    navigate("/accuracycard", {
      state: {
        uploadedImages: location.state?.uploadedImages,
        scanResult: location.state?.scanResult
      }
    });
  };

  return (
    <div className="patent-form">
      <div className="patent-form-container">
        <div className="form-header">
          <button className="back-btn" onClick={handleBack}>← Back</button>
          <h2>Patent Application Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="form-fields">
          <input type="text" name="title" placeholder="Design Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input type="text" name="inventorName" placeholder="Inventor Name" onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} required />

          <div className="checkbox-wrapper">
            <input
            className="checkbox-input"
              type="checkbox"
              name="priorityClaim"
              id="priorityClaim"
              checked={formData.priorityClaim}
              onChange={handleChange}
            />
            <label htmlFor="priorityClaim">Claim Priority</label>
          </div>


          {formData.priorityClaim && (
            <>
              <input
                type="text"
                name="priorityDetails.previousApplicationNumber"
                placeholder="Previous Application Number"
                onChange={handleChange}
              />
              <input
                type="date"
                name="priorityDetails.previousFilingDate"
                onChange={handleChange}
              />
              <input
                type="text"
                name="priorityDetails.previousCountry"
                placeholder="Previous Country"
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit"  className="auth-btn">Submit Application</button>
        </form>
      </div>
    </div>

  );
};

export default PatentApplicationForm;
