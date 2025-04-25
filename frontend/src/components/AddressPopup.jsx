import React, { useState } from "react";
import "./styles/AddressPopup.css";

const AddressPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    houseNo: "",
    landmark: "",
    street: "",
    area: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({}); // For error handling

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatKey = (key) => {
    // Format the key to be more user-friendly
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h4>Add Delivery Address</h4>
        <div className="popup-form">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group">
              <input
                name={key}
                placeholder={formatKey(key)}
                value={value}
                onChange={handleChange}
                className={errors[key] ? "error" : ""}
              />
              {errors[key] && <p className="error-message">{errors[key]}</p>}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="auth-btn" onClick={handleSubmit}>Save Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
