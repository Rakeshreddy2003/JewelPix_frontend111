import React, { useState, useContext } from "react";
import { Navbar, Container, Button, Badge, Offcanvas, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarStyles.css";
import { BsCart3 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import Logo from "../assets/logo.png";
import wishlisticon from "../assets/e-commerce.svg";
import LoginPage from "./Auth/LoginPage";
import SignupPage from "./Auth/SignupPage";

const Navbars = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalWishlistItems = wishlist.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const navigateToCart = () => navigate("/cart");
  const navigateToWishlist = () => navigate("/wishlist");

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Left Section: Logo + Create Button */}
          <div className="d-flex align-items-center gap-2">
            <Navbar.Brand>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                <img src={Logo} alt="logo" height={50} />
              </Link>
            </Navbar.Brand>
            <Button variant="outline-light" className="create-btn gold-border">
              + Create
            </Button>
          </div>

          {/* Right Section: Auth Buttons + Cart */}
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-light"
              onClick={() => setShowLogin(true)}
              className="gold-border"
            >
              Login
            </Button>
            <Button
              variant="outline-light"
              onClick={() => setShowSignup(true)}
              className="gold-border"
            >
              Sign Up
            </Button>

            <div style={{ position: "relative" }}>
              <BsCart3
                onClick={navigateToCart}
                style={{ color: "white", width: "2rem", height: "2rem", cursor: "pointer" }}
              />
              {totalItems > 0 && (
                <Badge pill bg="danger" style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  fontSize: "0.6rem",
                  padding: "0.3em 0.45em",
                }}>
                  {totalItems}
                </Badge>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <img
                src={wishlisticon}
                alt="wishlist"
                onClick={navigateToWishlist}
                style={{ color: "white", width: "2rem", height: "2rem", cursor: "pointer" }}
              />
              {totalWishlistItems > 0 && (
                <Badge pill bg="danger" style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  fontSize: "0.6rem",
                  padding: "0.3em 0.45em",
                }}>
                  {totalWishlistItems}
                </Badge>
              )}
            </div>

            {/* User Profile Sidebar Toggle */}
            <Button variant="outline-light" onClick={() => setShowProfileSidebar(true)}>
              User Profile
            </Button>

          </div>
        </Container>
      </Navbar>

      {/* User Profile Sidebar (Offcanvas) */}
      <Navbar.Offcanvas
        show={showProfileSidebar}
        onHide={() => setShowProfileSidebar(false)}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="profile-section">
            <Image
              src={"profileImage"} // Replace with dynamic profile image
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

          <button className="logout-btn">Logout</button>
        </Offcanvas.Body>
      </Navbar.Offcanvas>

      {/* Login Modal */}
      {showLogin && (
        <div className="auth-modal">
          <div className="auth-container">
            <LoginPage onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="auth-modal">
          <div className="auth-container">
            <SignupPage onClose={() => setShowSignup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbars;
