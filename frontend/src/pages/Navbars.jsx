import React, { useState } from "react";
import { Navbar, Container, Button, Offcanvas, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavbarStyles.css";
import Popup from "../components/Popup";

const expand = false;

const Navbars = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const navigateToSecurity = () => {
    navigate("/security");
  };

  return (
    <>
      <Navbar key={expand} expand={expand} className="custom-navbar">
        <Container fluid className="navbar-container">
          <Navbar.Brand className="brand">Jiwel pix</Navbar.Brand>
          <Button 
            variant="outline-light" 
            className="me-2" 
            onClick={() => setShowPopup(true)}
          >
            Upload
          </Button>
          <div className="auth-buttons">
            <Button variant="outline-light" className="me-2" onClick={navigateToSecurity}>
              Login
            </Button>
            <Button variant="outline-light" onClick={navigateToSecurity}>
              Sign Up
            </Button>
          </div>
          <Navbar.Toggle className="custom-toggle" aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end" className="custom-offcanvas">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>User Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="profile-section">
                <Image src={"profileImage"} roundedCircle className="profile-img" />
                <p className="username">User</p>
              </div>
              <div className="order-history">
                <h5>Order History</h5>
                <ul>
                  <li>Recent Order 1</li>
                  <li>Recent Order 2</li>
                  <li>Recent Order 3</li>
                  <li>Recent Order 4</li>
                  <li>Recent Order 5</li>
                </ul>
              </div>
              <Button className="logout-btn">Logout</Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Navbars;
