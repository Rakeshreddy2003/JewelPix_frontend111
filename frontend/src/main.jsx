import { StrictMode } from 'react'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<AuthModal />} />
        <Route path="/accuracycard" element={<JewelryUploadComponent />} />
        <Route path="/cart" element={<CheckoutPage/>}/> 
        <Route path="/accuracy" element={<UploadImagesComponent/>}/> 

      </Routes>
      <Footer/>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
