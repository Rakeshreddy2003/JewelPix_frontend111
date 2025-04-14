import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i._id === item._id);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
