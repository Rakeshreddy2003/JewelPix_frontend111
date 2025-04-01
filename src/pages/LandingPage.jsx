import React from 'react'
import bgImg from '../assets/bgimg.png'
import JewelPixSearchBar from './JewelPixSearchBar'
import LandingCards from './LandingCards'
import { Pagination } from 'react-bootstrap'

const Landingpage = () => {
  return (
    <>
    <div className='Herosection'><img src={bgImg} alt="" /></div>
    <JewelPixSearchBar/>
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

    </>
  )
}

export default Landingpage