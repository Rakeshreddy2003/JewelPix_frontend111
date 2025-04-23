import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext.jsx";
import Cards from "../components/Cards";
import "./Wishlist.css";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]);

  return (

    <div className="wishlist-page" style={{ padding: "2rem", backgroundColor: "#542c41", minHeight: "60vh" }}>


      <h2 style={{ color: "white", marginBottom: "2rem" }}>Your Wishlist</h2>
      {console.log(wishlist)}

      {wishlist.length === 0 ? (
        <p style={{ color: "white" }}>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {wishlist.map((item) => (
            <div key={item._id} style={{ position: "relative" }}>
              <Cards
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price.toLocaleString()}
                stockStatus={item.stockStatus}
              />
              <button
                onClick={() => removeFromWishlist(item._id)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
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
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
