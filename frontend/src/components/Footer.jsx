// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'; // Import icons from react-icons
import './styles/Footer.css'; // Import custom CSS

const Footer = () => {
  return (
    <div className="footer-container background">
      <div className="container">
        <div className="row py-4">
          {/* Copyright Section */}
          <div className="col-md-3">
            <p className="footer-text">
              © Copyright Team name <br />
              ALL RIGHTS RESERVED
            </p>
          </div>

          {/* About Section */}
          <div className="col-md-3">
            <h5 className="footer-heading">About</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">JewPix Stories</a></li>
            </ul>
          </div>

          {/* Customer Policies Section */}
          <div className="col-md-3">
            <h5 className="footer-heading">CUSTOMER POLICIES</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">TERMS & Conditions</a></li>
              <li><a href="#" className="footer-link">Privacy policy</a></li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3">
            <h5 className="footer-heading">USEFUL LINKS</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Add to cart</a></li>
              <li className="d-flex gap-3 mt-2">
                <a href="#" className="footer-link"><FaInstagram size={24} /></a>
                <a href="#" className="footer-link"><FaWhatsapp size={24} /></a>
                <a href="#" className="footer-link"><FaYoutube size={24} /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;