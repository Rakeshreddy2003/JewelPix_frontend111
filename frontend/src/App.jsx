import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DesignUniqueCheck from './components/DesignUniqueCheck'
import ImagePlaceholder from './components/ImagePlaceholder'
import Navbars from './pages/Navbars.jsx'
import Landingpage from './pages/LandingPage.jsx'
import Footer from './components/Footer.jsx'
import JewelPixSearchBar from './pages/JewelPixSearchBar.jsx'
import HomePage from './pages/HomePage.jsx'
function App() {

  return (
    <>
      <div>
        {/* <DesignUniqueCheck/> */}
        {/* <ImagePlaceholder/> */}
        <Navbars/>
        {/* <Landingpage/> */}
        <HomePage/>
        <Footer/>
      </div>
    </>
  )
}

export default App
