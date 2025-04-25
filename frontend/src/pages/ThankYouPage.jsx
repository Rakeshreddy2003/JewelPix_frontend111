// ThankYouPage.jsx
import React from "react";
import { useNavigate } from 'react-router-dom'; 
import "./styles/ThankYouPage.css"; // Import your CSS file for styling

const ThankYouPage = () => {
  const navigate = useNavigate();

  
  const handleReturnHome = () => {
    navigate("/"); 
  };

  return (
    <div className="thank-you-page">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been successfully placed. We will notify you once it’s on its way.</p>
      <button onClick={handleReturnHome} className="return-home-btn">
        Return to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
