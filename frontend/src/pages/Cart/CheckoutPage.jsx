// CheckoutPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Cart';
import './Cart.css';
import img from '../../assets/JewelleryImages/img2.png';

const initialProducts = [
  {
    id: 1,
    image: img,
    name: "The Finder — Björg Jewellery",
    price: 190000,
    stockStatus: "In stock",
    quantity: 1,
  },
  {
    id: 2,
    image: img,
    name: "The Finder — Björg Jewellery",
    price: 190000,
    stockStatus: "In stock",
    quantity: 1,
  },
];

const CheckoutPage = () => {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const removeItem = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 5649;
    const deliveryCharges = 80;
    const protectPromiseFee = 9;
    return totalPrice - discount + protectPromiseFee;
  };

  return (
    <div className="checkout-page">
      <div className="container my-5">
        <div className="mb-4">
          <h5 className="section-heading">Enter delivery Address</h5>
          <input type="text" className="form-control delivery-input" placeholder="Enter delivery address" />
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            {products.map((item) => (
              <Cart
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                stockStatus={item.stockStatus}
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          <div className="col-md-6 mb-4">
            <div className="price-details-card p-4 shadow-sm">
              <h5 className="section-heading">Price details</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({products.length} items)</span>
                <span>₹ {calculateTotal()}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>TOTAL</span>
                <span>₹ {calculateTotal()}</span>
              </div>
            </div>
            <div className="text-end">
          <button className="btn place-order-btn">PLACE ORDER</button>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CheckoutPage;