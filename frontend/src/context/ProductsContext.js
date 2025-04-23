// src/contexts/ProductsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios.get('/api/products')
        .then(res => {
          setProducts(res.data);
          setLoaded(true);
        })
        .catch(err => console.error('Failed to load products', err));
    }
  }, [loaded]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
