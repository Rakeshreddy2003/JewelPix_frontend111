import React, { useContext, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Cart';
import './Cart.css';
import { CartContext } from '../../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  // useMemo ensures recalculation whenever cartItems change
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const cleanPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + cleanPrice * quantity;
    }, 0);
  }, [cartItems]);

  const discount = 5649;
  const deliveryCharges = 80;
  const protectPromiseFee = 9;
  const finalAmount = totalPrice > 0 ? totalPrice - discount + deliveryCharges + protectPromiseFee : 0;

  return (
    <div className="checkout-page p-3">
      <div className="container">
        <div className="mb-4">
          <h5 className="section-heading">Enter delivery Address</h5>
          <input type="text" className="form-control delivery-input" placeholder="Enter delivery address" />
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Cart
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  stockStatus={item.stockStatus}
                  quantity={item.quantity}
                  onQuantityChange={(newQty) => updateCartItemQuantity(item._id, newQty)}
                  onRemove={() => removeFromCart(item._id)}
                />
              ))
            ) : (
              <p className="text-mute" style={{color:"white"}}>Your cart is empty.</p>
            )}
          </div>

          <div className="col-md-6 mb-4">
            <div className="price-details-card p-4 shadow-sm">
              <h5 className="section-heading">Price details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>₹ {totalPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span>- ₹ {discount}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>₹ {deliveryCharges}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Protect Promise Fee</span>
                <span>₹ {protectPromiseFee}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>TOTAL</span>
                <span>₹ {finalAmount}</span>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="text-end mt-3">
                <button className="btn place-order-btn">PLACE ORDER</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
