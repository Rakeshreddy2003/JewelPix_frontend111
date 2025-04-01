import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DesignUniqueCheck from './components/DesignUniqueCheck'
import ImagePlaceholder from './components/ImagePlaceholder'
import Navbars from './pages/Navbars.jsx'
import Landingpage from './pages/Landingpage.jsx'
import Footer from './pages/Footer.jsx'
import JewelPixSearchBar from './pages/JewelPixSearchBar.jsx'
function App() {

  return (
    <>
      <div>
        {/* <DesignUniqueCheck/> */}
        {/* <ImagePlaceholder/> */}
        <Navbars/>
        <Landingpage/>
        <Footer/>
      </div>
    </>
  )
}

export default App
