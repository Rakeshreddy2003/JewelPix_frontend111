import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext.jsx";
import Cards from "../components/Cards";
import "./styles/Wishlist.css";
import { ClipLoader } from "react-spinners";
import LoginPage from '../pages/Auth/LoginPage';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, loading, error, refreshWishlist } = useContext(WishlistContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  // Debug logs with more detailed inspection of each item
  useEffect(() => {


    // Log each item individually for better debugging
    if (wishlist && wishlist.length > 0) {

      wishlist.forEach((item, index) => {
        const itemId = item?.productId?._id || item?.productId || item?._id || 'undefined';

      });
    }
  }, [wishlist, loading, error]);

  // Enhanced function to safely extract product data and validate it
  const getProductData = (item) => {
    try {
      // If item is null or undefined, return null
      if (!item) return null;

      // Check if item has productId property (nested structure from API)
      if (item.productId && typeof item.productId === 'object') {
        return item.productId;
      }

      // If productId is a string (just the ID), the item might be malformed
      if (item.productId && typeof item.productId === 'string') {
        console.warn("Item has productId as string instead of object:", item);
        // Return a minimal valid product to avoid errors
        return {
          _id: item.productId,
          name: "Product information unavailable",
          image: "https://via.placeholder.com/150?text=Missing+Image", // Placeholder image
          price: 0,
          stock: "Unknown"
        };
      }

      // If no productId but item itself has _id, assume it's a product
      if (item._id) {
        return item;
      }

      // If we reach here, the item is invalid
      console.error("Invalid wishlist item structure:", item);
      return null;

    } catch (err) {
      console.error("Error extracting product data:", err, item);
      return null;
    }
  };

  // Function to generate a unique key for each wishlist item
  const getUniqueKey = (item, index) => {
    const product = getProductData(item);
    if (product && product._id) {
      return `wishlist-${product._id}`;
    } else {
      // Fallback to using array index if ID is unavailable
      return `wishlist-item-${index}`;
    }
  };

  const renderWishlistContent = () => {
    if (loading) {
      return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px"
        }}>
          <ClipLoader color="#fff" size={40} />
          <span style={{ color: "white", marginLeft: "10px" }}>Loading your wishlist...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p style={{ color: "#ff6b6b" }}>{error}</p>
          <button
          className="login-btn"
            onClick={handleShowLogin}
           
          >
            Login
          </button>

          {/* Login Modal */}
          {
            showLogin && (
              <div className="auth-modal-overlay">
                <LoginPage
                  onClose={() => setShowLogin(false)}
                  setIsLogin={(isLoggedIn) => {
                    if (isLoggedIn) {
                      refreshWishlist();
                    }
                    setShowLogin(false);
                  }}
                  switchToSignup={() => {
                    setShowLogin(false);
                    // If you have a setShowSignup function, call it here
                    // setShowSignup(true);
                  }}
                />
              </div>
            )
          }
        </div >
      );
    }


    // Filter out invalid items before rendering
    const validWishlistItems = wishlist.filter(item => {
      const product = getProductData(item);
      return product !== null && product._id !== undefined;
    });

    if (validWishlistItems.length === 0) {
      return (
        <>
          <p style={{ color: "white", textAlign: "center" }}>Your wishlist is empty.</p>
          <p style={{ color: "white", textAlign: "center" }}>Add items to your wishlist to save them for later.</p>
          {wishlist.length > 0 && validWishlistItems.length === 0 && (
            <p style={{ color: "#ff6b6b", textAlign: "center" }}>
              Note: Some items in your wishlist are invalid and have been filtered out.
              <button
                onClick={refreshWishlist}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#4dabf7",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginLeft: "5px"
                }}
              >
                Refresh
              </button>
            </p>
          )}
        </>
      );
    }

    return (
      <div className="wishlist-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {validWishlistItems.map((item, index) => {
          const product = getProductData(item);

          // Skip rendering if product is invalid (should already be filtered out)
          if (!product || !product._id) return null;

          return (
            <div key={getUniqueKey(item, index)} style={{ position: "relative" }}>
              <Cards
                id={product._id}
                image={product.image}
                name={product.name || product.title || "Unknown Product"}
                price={typeof product.price === 'number' ? product.price : 0}
                stockStatus={product.stockStatus || product.stock || "Status unknown"}
              />
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="remove-from-wishlist-btn"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "1px",
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "0.5rem",
                  cursor: "pointer",
                }}
                title="Remove from wishlist"
              >
                ❌
              </button>
            </div>
          );
        })}

        {/* Show a message if some items were filtered out */}
        {wishlist.length > validWishlistItems.length && (
          <div style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>
            <p style={{ color: "#ff6b6b" }}>
              {wishlist.length - validWishlistItems.length} invalid item(s) have been filtered from your wishlist.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="wishlist-page" style={{ padding: "2rem", backgroundColor: "#542c41", minHeight: "60vh" }}>
      <h2 style={{ color: "white", marginTop: "1rem", textAlign: "center" }}>Your Wishlist</h2>
      {renderWishlistContent()}
    </div>
  );
};

export default WishlistPage;