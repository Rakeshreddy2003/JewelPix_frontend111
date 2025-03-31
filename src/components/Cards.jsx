import React from 'react';

const Cards = ({ image, name, price, stockStatus }) => {
  return (
    <div className="card product-card shadow-sm" style={{backgroundColor:"#3A1929", border:"1px solid #8D4F61"}}>
      {/* Product Image */}
      <div style={{padding: "1rem"}}><img src={image} className="card-img-top product-image" alt={name} /></div>
      

      {/* Card Body */}
      <div className="card-body">
        {/* Product Name */}
        <h5 className="card-title product-name" style={{color: "white"}}>{name}</h5>

        {/* Price and Stock Status */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text product-price" style={{color: "white"}}>{price}</p>
          <span style={{color: "white"}}     className={`stock-status ${stockStatus === "Out of stock" ? "text-danger" : "text-success"} `}>
            {stockStatus}
          </span>
        </div>

        {/* Add to Cart Button */}
      </div>
      <div className="button-container">
      <button className=" add-to-cart-btn h-40 w-80 ">Add to cart</button>
      </div>
       
    </div>
  );
};

export default Cards;
