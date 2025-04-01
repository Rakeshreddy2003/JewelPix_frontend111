import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search, Camera } from "lucide-react";
import "./JewelPixSearchBar.css";

const JewelPixSearchBar = () => {
  return (
    <div className="jewelpix-container">
      <h1 className="jewelpix-title">JewelPix</h1>
      <p className="jewelpix-tagline">Snap & find the perfect jewelry instantly</p>
      
      <div className="search-container">
        <InputGroup>
          <InputGroup.Text className="search-icon">
            <Search size={24} color="#FFD700" />
          </InputGroup.Text>
          <Form.Control
            placeholder="search any jewellery......."
            className="search-input"
          />
          <InputGroup.Text className="camera-icon">
            <Camera size={24} color="#333" />
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
};

export default JewelPixSearchBar;