import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import { Search, Camera } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/JewelPixSearchBar.css";

const JewelPixSearchBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleTextSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search?query=${searchQuery}`);
      setProducts(res.data); // Update products in context
      navigate(`/?query=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error("Text search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSearch = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://tired-kimmie-gajala-sonic-solutions-2de32759.koyeb.app/api/visual-search`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProducts(res.data.results); // Update products in context
      setShowPopup(false);
    } catch (error) {
      console.error("Image search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <InputGroup className="search">
        <InputGroup.Text className="search-icon" onClick={handleTextSearch}>
          <Search size={24} color="#FFD700" />
        </InputGroup.Text>
        <Form.Control
        className="search-input"
          placeholder="search any jewellery......."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleTextSearch()}
        />
        <InputGroup.Text className="camera-icon" onClick={() => setShowPopup(true)}>
          <Camera size={24} color="#FFD700" />
        </InputGroup.Text>
      </InputGroup>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Body>
          {/* Modal Content */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JewelPixSearchBar;