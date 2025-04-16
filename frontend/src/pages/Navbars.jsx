import React, { useState, useContext } from "react";
import { Navbar, Container, Button, Offcanvas, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarStyles.css";
import Popup from "../components/Popup";
import AuthModal from "../pages/Auth/AuthModal";
import { BsCart3 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import Badge from "react-bootstrap/Badge";

const expand = false;

const Navbars = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
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
            <Navbar.Brand className="brand">
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Jewel pix
              </Link>
            </Navbar.Brand>
            <Button
              variant="outline-light"
              className="create-btn gold-border"
              onClick={() => setShowPopup(true)}
            >
              + Create
            </Button>
          </div>

          {/* Right Section: Cart, Auth Buttons, Toggle */}
          <div className="d-flex align-items-center gap-2">
            <div style={{ position: "relative" }}>
              <BsCart3
                onClick={() => navigate("/cart")}
                style={{
                  color: "white",
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                }}
              />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    fontSize: "0.6rem",
                    padding: "0.3em 0.45em",
                  }}
                >
                  {totalItems}
                </Badge>
              )}
            </div>

            <div className="auth-buttons d-flex gap-2">
              <Button
                variant="outline-light"
                className="gold-border"
                onClick={() => handleAuthClick("login")}
              >
                Login
              </Button>
              <Button
                variant="outline-light"
                className="gold-border"
                onClick={() => handleAuthClick("signup")}
              >
                Sign Up
              </Button>
            </div>

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
      </Navbar>

      {/* Popup for Create */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
        />
      )}
    </>
  );
};

export default Navbars;
