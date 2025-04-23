import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const Cards = ({ image, name, price, stockStatus, id }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent navigation on button click
    const item = { _id: id, image, name, price, stockStatus };
    addToCart(item);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="card product-card shadow-sm"
      onClick={handleCardClick}
      style={{
        backgroundColor: "#3A1929",
        border: "1px solid #8D4F61",
        width: "250px", // fixed width for horizontal scroll
        flex: "0 0 auto", // prevents shrink/stretch
        cursor: "pointer",
        minHeight: "350px",
      }}
    >
      <div style={{ padding: "1rem", objectFit: "cover" }}>
        <img src={image} className="card-img-top product-image" alt={name} />
      </div>
      <div className="card-body">
        <h5 className="card-title product-name" style={{ color: "white" }}>{name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text product-price" style={{ color: "white" }}>₹{price}</p>
          <span style={{ color: "white" }} className={`stock-status ${stockStatus === "Out of stock" ? "text-danger" : "text-success"}`}>
            {stockStatus}
          </span>
        </div>
      </div>
     
      <div className="button-container">
        <button className="add-to-cart-btn h-40 w-80" onClick={handleAddToCart}>Add to cart</button>
      </div>
     
    </div>
  );
};

export default Cards;
