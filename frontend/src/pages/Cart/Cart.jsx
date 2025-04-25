import React from 'react';
import './Cart.css';

const Cart = ({ image, name, price, stockStatus, quantity, onQuantityChange, onRemove }) => {
  const cleanPrice = price || 0;
  const total = cleanPrice * quantity;

  return (
    <div className="card mb-3 cart-card shadow-sm ">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <img src={image} alt={name} className="img-fluid rounded cart-image" />
        </div>
        <div className="col-md-8">
          <div className="card-body p-3">
            <h5 className="card-title">{name}</h5>
            <p className="card-text mb-1"><strong>Price:</strong> ₹{cleanPrice}</p>
            <p className="card-text mb-1"><strong>Status:</strong> {stockStatus}</p>

            <div className="d-flex align-items-center mb-2">
              <label className="me-2"><strong>Quantity:</strong></label>
              <select
                value={quantity}
                onChange={(e) => onQuantityChange(Number(e.target.value))}
                className="form-select form-select-sm w-auto"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <p className="card-text mb-1"><strong>Total:</strong> ₹{total}</p>

            <button className="btn btn-danger btn-sm" onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
