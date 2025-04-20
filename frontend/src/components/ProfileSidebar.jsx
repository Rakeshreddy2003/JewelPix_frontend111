// ProfileSidebar.js
import React from "react";
import { Navbar, Offcanvas, Image } from "react-bootstrap";

const ProfileSidebar = ({ show, onHide }) => {
  return (
    <Navbar.Offcanvas show={show} onHide={onHide} placement="end" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>User Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="profile-section">
          <Image src={"profileImage"} roundedCircle className="profile-img" />
          <p className="username">User</p>
        </div>
        <div className="order-history">
          <h5>Order History</h5>
          <ul>
            <li>Recent Order 1</li>
            <li>Recent Order 2</li>
            <li>Recent Order 3</li>
            <li>Recent Order 4</li>
            <li>Recent Order 5</li>
          </ul>
        </div>

        <button className="logout-btn">Logout</button>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

export default ProfileSidebar;
