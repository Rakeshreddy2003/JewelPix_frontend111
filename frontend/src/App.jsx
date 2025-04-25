import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbars from './components/Navbars.jsx'
import Footer from './components/Footer.jsx'
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
