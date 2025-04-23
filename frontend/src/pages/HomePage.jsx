import React, { useState } from "react";
import JewelPixSearchBar from "./JewelPixSearchBar";
import LandingCards from "./LandingCards";
import bgImg from '../assets/bgimg.png';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <>
      <div className='Herosection' style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 20px'
      }}>
        <JewelPixSearchBar onSearchResults={setSearchResults} />
      </div>

      {/* Pass searchResults to LandingCards */}
      <LandingCards searchResults={searchResults} />
    </>
  );
};

export default HomePage;
