import React from 'react'
import bgImg from '../assets/bgimg.png'
import JewelPixSearchBar from './JewelPixSearchBar'
import LandingCards from './LandingCards'
import { Pagination } from 'react-bootstrap'

const Landingpage = () => {
  return (
    <>
<<<<<<< HEAD
      <div className='Herosection'>
        <JewelPixSearchBar />
      </div>

      <LandingCards/>

      <div className="pagination-div" style={{ backgroundColor: "#3A1929" }}>
        <Pagination className="pagination-container">
          <Pagination.Prev className='prev' />
          <Pagination.Item className='page-item' active>{1}</Pagination.Item>
          <Pagination.Item className='page-item'>{2}</Pagination.Item>
          <Pagination.Item className='page-item'>{3}</Pagination.Item>
          <Pagination.Next className='next'/>
        </Pagination>
      </div>
=======
    <div className='Herosection'><img src={bgImg} alt="" />
    <JewelPixSearchBar/></div>
    
    <LandingCards/>
    <div className="pagination-div" style={{backgroundColor:"#3A1929",}}>
      <Pagination className="pagination-container">
        <Pagination.Prev className='prev' />
        <Pagination.Item className='page-item' active>{1}</Pagination.Item>
        <Pagination.Item className='page-item'>{2}</Pagination.Item>
        <Pagination.Item className='page-item'>{3}</Pagination.Item>
        <Pagination.Next className='next'/>
      </Pagination>
    </div>

>>>>>>> 67225f9395b758dd26408ce34ee21d3fc41218f0
    </>
  )
}

<<<<<<< HEAD
export default Landingpage
=======
export default Landingpage
>>>>>>> 67225f9395b758dd26408ce34ee21d3fc41218f0
