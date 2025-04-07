// Cart.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

const Cart = ({ image, name, price, stockStatus, quantity, onQuantityChange, onRemove }) => {
  return (
    <div className="card product-card shadow-sm position-relative">
      <button className="btn-close position-absolute top-0 end-0 m-2" onClick={onRemove} aria-label="Close"></button>
      <img src={image} className="card-img-top product-image" alt={name} />
      <div className="card-body">
        <h5 className="card-title product-name">{name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text product-price">₹ {price}</p>
          <span className={`stock-status ${stockStatus === 'In stock' ? 'text-success' : 'text-danger'}`}>{stockStatus}</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <span className="me-2">Qty:</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>-</button>
          <span className="mx-2">{quantity}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onQuantityChange(quantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
