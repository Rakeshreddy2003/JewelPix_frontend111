import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    const exists = wishlist.find((i) => i._id === item._id);
    if (!exists) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== itemId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
