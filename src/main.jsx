import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import App from './App.jsx'
import Cart from './pages/Cart/Cart.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart/>}/> 
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)
