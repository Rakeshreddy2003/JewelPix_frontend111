import React from "react";
import { CardData } from "../Data/cardsData";
import Cards from "../components/Cards";

const LandingCards = () => {
  return (
    <div className="landing-page-cards background">
      {/* Filters */}
      <div className="filters">
        <span className="filters-dropdowns">
          <select className="dropdown-select">
            <option>Category</option>
          </select>
        </span>
        <span className="filters-dropdowns">
          <select className="dropdown-select">
            <option>Brand</option>
          </select>
        </span>
        <span className="filters-dropdowns">
          <select className="dropdown-select">
            <option>Price</option>
          </select>
        </span>
        <span className="filters-dropdowns dropdown-select">
          <button className="reset-button">Apply Filters</button>
        </span>
      </div>

      {/* Cards Grid */}
      <div className="cards-div d-flex flex-wrap gap-3">
        {CardData.map((item) => (
          <Cards
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            stockStatus={item.stockStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingCards;
