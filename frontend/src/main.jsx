import { StrictMode } from 'react'
import React, { createContext, useState } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import App from './App.jsx'
import CheckoutPage from './pages/Cart/CheckoutPage.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AccuracyCard from './pages/Uploads/AccuracyCard.jsx'
import UploadImagesComponent from './pages/Uploads/UploadImagesComponent.jsx'
import AuthModal from './pages/Auth/AuthModal.jsx'
import JewelryUploadComponent from './pages/Uploads/JewelryUploadComponent.jsx'
import  Home from './pages/HomePage.jsx'
import Navbar from './pages/Navbars.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './context/CartContext.jsx'; 
import { WishlistProvider } from "./context/WishlistContext.jsx";
import ProductPage from './pages/ProductPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accuracycard" element={<JewelryUploadComponent />} />
            <Route path="/cart" element={<CheckoutPage />} />
            <Route path="/accuracy" element={<UploadImagesComponent />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          
       
          </Routes>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>,
);

