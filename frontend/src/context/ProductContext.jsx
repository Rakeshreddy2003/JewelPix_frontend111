import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], brands: [], priceRanges: [] });

  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/filters`);
      setFilters(res.data);
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  const fetchProducts = async (query = "") => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, filters, fetchProducts, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};