import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  
  // Check if user is logged in
  const isLoggedIn = useCallback(() => {
    return localStorage.getItem("token") !== null;
  }, []);
  
  // Save cart to localStorage for guest users
  const saveLocalCart = useCallback((items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  }, []);
  
  // Get cart from localStorage for guest users
  const getLocalCart = useCallback(() => {
    const localCart = localStorage.getItem("guestCart");
    return localCart ? JSON.parse(localCart) : [];
  }, []);

  // Fetch cart data (from API for logged-in users, localStorage for guests)
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
  
        const res = await fetch(`${API_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
     
        const localCartItems = getLocalCart();
        setCartItems(localCartItems);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      
      // Fallback to localStorage if API fails
      if (isLoggedIn()) {
        const localCartItems = getLocalCart();
        setCartItems(localCartItems);
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL, isLoggedIn, getLocalCart]);

  // Add to cart logic
  const addToCart = async (productData) => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
        // For logged in users - API call
        const productId = productData._id;
        const res = await fetch(`${API_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
        // For guest users - localStorage
        const currentCart = getLocalCart();
        
        // Check if item already exists in cart
        const existingItemIndex = currentCart.findIndex(item => 
          item.productId._id === productData._id
        );
        
        if (existingItemIndex >= 0) {
          // Increment quantity if item already in cart
          currentCart[existingItemIndex].quantity += 1;
        } else {
          // Add new item with full product data
          currentCart.push({
            productId: productData, // Store the complete product object
            quantity: 1,
          });
        }
        
        // Update localStorage and state
        saveLocalCart(currentCart);
        setCartItems(currentCart);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart logic
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
        // For logged in users - API call
        const res = await fetch(`${API_URL}/api/cart/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
        // For guest users - localStorage
        const currentCart = getLocalCart();
        const updatedCart = currentCart.filter(item => 
          item.productId._id !== productId
        );
        
        // Update localStorage and state
        saveLocalCart(updatedCart);
        setCartItems(updatedCart);
      }
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity logic
  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
        // For logged in users - API call
        const res = await fetch(`${API_URL}/api/cart/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ quantity }),
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
        // For guest users - localStorage
        const currentCart = getLocalCart();
        const updatedCart = currentCart.map(item => {
          if (item.productId._id === productId) {
            return { ...item, quantity };
          }
          return item;
        });
        
        // Update localStorage and state
        saveLocalCart(updatedCart);
        setCartItems(updatedCart);
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart logic
  const clearCart = async () => {
    try {
      setLoading(true);
      
      if (isLoggedIn()) {
        // For logged in users - API call
        await fetch(`${API_URL}/api/cart/clear`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      
      // For all users - clear localStorage and state
      localStorage.removeItem("guestCart");
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Merge guest cart with user cart on login
  const mergeCartsAfterLogin = async (token) => {
    try {
      const localCart = getLocalCart();
      
      // If guest cart is empty, no need to merge
      if (!localCart.length) return;
      
      // Add each item from local cart to the server
      for (const item of localCart) {
        await fetch(`${API_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            productId: item.productId._id,
            quantity: item.quantity 
          }),
        });
      }
      
      // Clear local storage cart after merging
      localStorage.removeItem("guestCart");
      
      // Fetch the updated cart
      fetchCart();
    } catch (err) {
      console.error("Failed to merge carts:", err);
    }
  };

  // Load cart when component mounts or authentication status changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        loading,
        fetchCart,
        mergeCartsAfterLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;