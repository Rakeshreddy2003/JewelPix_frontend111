import React, { useState, useContext, useEffect } from "react";
import Popup from "../components/Popup.jsx"
import {
  Navbar,
  Container,
  Button,
  Badge,
  Offcanvas,
  Image,
  Nav,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarStyles.css";
import { BsCart3 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import Logo from "../assets/logo.png";
import wishlisticon from "../assets/e-commerce.svg";
import menuicon from "../assets/menus (2).svg";
import LoginPage from "./Auth/LoginPage";
import SignupPage from "./Auth/SignupPage";
import UserProfileSidebar from "./UserProfilePage";
import axios from "axios";

const Navbars = () => {
  const [islogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);



  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalWishlistItems = wishlist.length;
  const handleCreateClick = () => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   alert("Please login first to create.");
    //   setShowLogin(true); // show login modal
    //   return;
    // } else{
    //   console.log("Token found:", token); // Log the token for debugging
    // }}
    setShowPopup(true); // Show the popup
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Get the token from local storage

      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set Bearer token in header
          },
        });
        setUser(response.data);


      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, [islogin]);




  return (
    <>
      <Navbar expand="lg" className="custom-navbar px-3">
        <Container fluid className="d-flex justify-content-between align-items-center">

          {/* Left: Logo & Mobile Menu Icon */}
          <div className="d-flex align-items-center gap-4">
            <img
              src={menuicon}
              alt="menu"
              className="d-lg-none"
              style={{ width: "30px", cursor: "pointer" }}
              onClick={() => setShowMobileMenu(true)}
            />
            <Navbar.Brand>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                <img src={Logo} alt="logo" height={50} />
              </Link>
            </Navbar.Brand>
            <Button variant="outline-light" className="create-btn gold-border d-none d-lg-block" onClick={handleCreateClick}>
              + Create
            </Button>
          </div>

          {/* Right Side: Desktop View Only */}
          <div className="d-none d-lg-flex align-items-center gap-3">

            {!islogin && (
              <>
                <Button variant="outline-dark" className="outline" onClick={() => { setShowLogin(true); setShowMobileMenu(false); }}>Login</Button>
                <Button variant="outline-dark" className="outline" onClick={() => { setShowSignup(true); setShowMobileMenu(false); }}>Sign Up</Button>
              </>
            )}

            <div style={{ position: "relative" }}>
              <BsCart3 onClick={() => navigate("/cart")} style={{ color: "white", width: "2rem", height: "2rem", cursor: "pointer" }} />
              {totalItems > 0 && (
                <Badge pill bg="danger" style={{ position: "absolute", top: "-5px", right: "-5px", fontSize: "0.6rem", padding: "0.3em 0.45em" }}>
                  {totalItems}
                </Badge>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <img src={wishlisticon} alt="wishlist" onClick={() => navigate("/wishlist")} style={{ width: "2rem", height: "2rem", cursor: "pointer" }} />
              {totalWishlistItems > 0 && (
                <Badge pill bg="danger" style={{ position: "absolute", top: "-5px", right: "-5px", fontSize: "0.6rem", padding: "0.3em 0.45em" }}>
                  {totalWishlistItems}
                </Badge>
              )}
            </div>

            <Button variant="outline-light" className="gold-border" onClick={() => setShowProfileSidebar(true)}>
              Profile
            </Button>
          </div>

          {/* User Profile Toggle (Visible always) */}
          <div className="d-lg-none">
            <Button variant="outline-light" className="gold-border" onClick={() => setShowProfileSidebar(true)}>
              Profile
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Menu Offcanvas */}
      <Offcanvas className="outer-line" show={showMobileMenu} onHide={() => setShowMobileMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column text-center gap-3">
            <Button variant="outline-dark" className="outline" onClick={() => { navigate("/"); setShowMobileMenu(false); }}>Home</Button>
            <Button variant="outline-light" className="outline" onClick={() => { handleCreateClick(); setShowMobileMenu(false); }}>
              + Create
            </Button>
            {!islogin && (
              <>
                <Button variant="outline-light" onClick={() => { setShowLogin(true); setShowMobileMenu(false); }} className="gold-border">Login</Button>
                <Button variant="outline-light" onClick={() => { setShowSignup(true); setShowMobileMenu(false); }} className="gold-border">Sign Up</Button>
              </>
            )}

            <Button variant="outline-dark" className="outline" onClick={() => { navigate("/cart"); setShowMobileMenu(false); }}>
              Cart {totalItems > 0 && <Badge bg="danger" className="ms-2">{totalItems}</Badge>}
            </Button>
            <Button variant="outline-dark" className="outline" onClick={() => { navigate("/wishlist"); setShowMobileMenu(false); }}>
              Wishlist {totalWishlistItems > 0 && <Badge bg="danger" className="ms-2">{totalWishlistItems}</Badge>}
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* User Profile Sidebar */}
      <UserProfileSidebar show={showProfileSidebar} onClose={() => setShowProfileSidebar(false)} />

      {/* Login Modal */}
      {showLogin && (
        <div className="auth-modal">
          <div className="auth-container">
            <LoginPage onClose={() => setShowLogin(false)} setIsLogin={setIsLogin} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="auth-modal">
          <div className="auth-container">
            <SignupPage onClose={() => setShowSignup(false)} setIsLogin={setIsLogin} />
          </div>
        </div>
      )}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Navbars;
