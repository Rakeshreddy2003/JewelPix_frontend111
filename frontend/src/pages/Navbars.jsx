import React, { useState } from "react";
import { Navbar, Container, Button, Offcanvas, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavbarStyles.css";
import Popup from "../components/Popup";
import { BsCart3 } from "react-icons/bs";

const expand = false;

const Navbars = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth check
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const navigateToSecurity = () => {
    navigate("/security");
  };

  return (
    <>
      <Navbar key={expand} expand={expand} className="custom-navbar">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          {/* Left Section: Logo + Create Button */}
          <div className="d-flex align-items-center gap-2">
            <Navbar.Brand className="brand">Jiwel pix</Navbar.Brand>
            <Button
              variant="outline-light"
              className="create-btn gold-border"
              onClick={() => setShowPopup(true)}
            >
              + Create
            </Button>
          </div>

          {/* Right Section: Auth Buttons + Toggle */}
          {/* Right Section: Cart, Auth Buttons, Toggle */}
          <div className="d-flex align-items-center gap-2">
            {isLoggedIn && (
              <BsCart3
                style={{
                  color: "white",
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                }}
              />
            )}

            {!isLoggedIn && (
              <div className="auth-buttons d-flex gap-2">
                <Button
                  variant="outline-light"
                  onClick={navigateToSecurity}
                  className="gold-border"
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  onClick={navigateToSecurity}
                  className="gold-border"
                >
                  Sign Up
                </Button>
              </div>
            )}

            <Navbar.Toggle
              className="custom-toggle"
              aria-controls="offcanvasNavbar"
            />
          </div>
        </Container>

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          placement="end"
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>User Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="profile-section">
              <Image
                src={"profileImage"}
                roundedCircle
                className="profile-img"
              />
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

        {/* Popup */}
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </Navbar>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Navbars;
