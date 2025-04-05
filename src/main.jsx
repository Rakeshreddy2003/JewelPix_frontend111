import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import App from './App.jsx'
import CheckoutPage from './pages/Cart/Checkoutpage.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AccuracyCard from './pages/Uploads/AccuracyCard.jsx'
import UploadImagesComponent from './pages/Uploads/UploadImagesComponent.jsx'
import AuthModal from './pages/Auth/AuthModal.jsx'
import JewelryUploadComponent from './pages/Uploads/JewelryUploadComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/security" element={<AuthModal />} />
        <Route path="/accuracycard" element={<JewelryUploadComponent />} />
        <Route path="/cart" element={<CheckoutPage/>}/> 
        <Route path="/accuracy" element={<UploadImagesComponent/>}/> 

      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
