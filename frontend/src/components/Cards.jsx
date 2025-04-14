import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cards = ({ image, name, price, stockStatus, id }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    console.log("clicked add");
    const item = { _id: id, image, name, price, stockStatus };
    addToCart(item);
  };

  return (
    <div className="card product-card shadow-sm" style={{ backgroundColor: "#3A1929", border: "1px solid #8D4F61", minWidth: "250px" }}>
      <div style={{ padding: "1rem", objectFit: "cover" }}>
        <img src={image} className="card-img-top product-image" alt={name} />
      </div>
      <div className="card-body">
        <h5 className="card-title product-name" style={{ color: "white" }}>{name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text product-price" style={{ color: "white" }}>{price}</p>
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
