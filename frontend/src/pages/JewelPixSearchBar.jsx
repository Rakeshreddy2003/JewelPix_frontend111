import React, { useState } from "react";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import { Search, Camera } from "lucide-react";
import "./JewelPixSearchBar.css";

const JewelPixSearchBar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="search-container">
      <h1 className="jewelpix-title">JewelPix</h1>
      <p className="jewelpix-tagline">Snap & find the perfect jewelry instantly</p>
        <InputGroup>
          <InputGroup.Text className="search-icon" onClick={handleOpenPopup}>
            <Search size={24} color="#FFD700" />
          </InputGroup.Text>
          <Form.Control
            placeholder="search any jewellery......."
            className="search-input"
          />
          <InputGroup.Text className="camera-icon" onClick={handleOpenPopup}>
            <Camera size={24} color="#333" />
          </InputGroup.Text>
        </InputGroup>
      </div>

      {/* Popup Modal */}
      <Modal show={showPopup} onHide={handleClosePopup} centered>
        <Modal.Body>
          <div className="popup-content">
            <Button className="popup-button">Search 📷</Button>
            <p>or</p>
            <Button className="popup-button">Upload 🖼️</Button>
            <Button className="done-button" onClick={handleClosePopup}>Done</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JewelPixSearchBar;
