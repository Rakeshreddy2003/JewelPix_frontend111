// import React, { createContext, useState } from "react";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const addToWishlist = (item) => {
//     const exists = wishlist.find((i) => i._id === item._id);
//     if (!exists) {
//       setWishlist((prev) => [...prev, item]);
//     }
//   };

//   const removeFromWishlist = (itemId) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== itemId));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };





import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Use useCallback to prevent triggering infinite renders in useEffect
 const fetchWishlist = useCallback(async () => {
  try {
    setLoading(true);
    
    const response = await axios.get(`${API_URL}/api/wishlist`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
   
    
    // Process and sanitize the wishlist data
    let wishlistData = [];
    
    // Handle the response data properly
    if (response.data && response.data.items) {
      wishlistData = response.data.items;
    } else if (Array.isArray(response.data)) {
      wishlistData = response.data;
    }
    
    // Filter out invalid items
    const sanitizedWishlist = wishlistData.filter(item => {
      // Check if item is valid
      if (!item) return false;
      
      // Check productId structure
      if (item.productId) {
        // If productId is an object, it should have _id
        if (typeof item.productId === 'object') {
          return item.productId && item.productId._id;
        }
        // If productId is a string, it should be non-empty
        return typeof item.productId === 'string' && item.productId.trim() !== '';
      }
      
      // If no productId, check if item itself has an _id
      return item._id !== undefined;
    });
    
  
    
    setWishlist(sanitizedWishlist);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch wishlist:", err);
    setError("Failed to load wishlist: " + (err.message || "Unknown error"));
    setWishlist([]);
  } finally {
    
    setLoading(false);
  }
}, [API_URL]);


  // Check if product exists in wishlist - IMPROVED VERSION
  const isProductInWishlist = useCallback((productId) => {
    return wishlist.some(item => {
      // Handle both nested and direct structure
      const id = item.productId?._id || item.productId || item._id;
      return id === productId;
    });
  }, [wishlist]);

  const addToWishlist = async (productId) => {
    if (!productId) {
      console.error("No productId provided to addToWishlist");
      setError("Cannot add: Invalid product ID");
      return false;
    }

    // Check if product is already in the wishlist BEFORE making API call
    if (isProductInWishlist(productId)) {
      setError("Product already in wishlist");
      return false;
    }

    try {
      setLoading(true);
    ;

      const response = await axios.post(
        `${API_URL}/api/wishlist`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    

      // Update local state with server response for consistency
      if (response.data) {
        if (response.data.items) {
          setWishlist(response.data.items);
        } else {
          // If response structure is different, fetch the updated wishlist
          await fetchWishlist();
        }
      }

      setError(null);
      return true;
    } catch (err) {
      if (err.response?.status === 400) {
        console.warn("Product already in wishlist (server response):", err);
        setError("Product already in wishlist");
      } else {
        console.error("Failed to add to wishlist:", err);
        setError("Failed to add to wishlist: " + (err.message || "Unknown error"));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  // Update the removeFromWishlist function to handle null/undefined productId better
  const removeFromWishlist = async (productId) => {
    if (!productId) {
      console.error("No productId provided to removeFromWishlist");
      setError("Cannot remove: Invalid product ID");
      return false;
    }

    try {
      setLoading(true);
      

      // Optimistic update - remove from local state first for better UX
      setWishlist(prevWishlist =>
        prevWishlist.filter(item => {
          const id = item.productId?._id || item.productId || item._id;
          return id !== productId;
        })
      );

      await axios.delete(`${API_URL}/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      // Clear any errors since the operation succeeded
      setError(null);
      return true;
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      setError("Failed to remove from wishlist: " + (err.message || "Unknown error"));
      // Revert optimistic update on failure
      await fetchWishlist();
      return false;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchWishlist();
    } else {
    
    }
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isProductInWishlist,
      loading,
      error,
      refreshWishlist: fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};