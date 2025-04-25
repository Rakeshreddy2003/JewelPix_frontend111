import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Initialize cart from localStorage if it exists
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Sync cartItems with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  // Function to clear the cart after an order is placed
  const clearCart = () => {
    setCartItems([]); // Clear the state
    localStorage.removeItem("cartItems"); // Remove cart from localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
