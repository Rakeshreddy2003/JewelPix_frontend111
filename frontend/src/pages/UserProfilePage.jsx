// components/UserProfileSidebar.jsx
import React, { useEffect, useState } from "react";
import { Offcanvas, Image } from "react-bootstrap";
import "./NavbarStyles.css";
import defaulUserImage from "../assets/boy.svg"; // Default user image

const UserProfileSidebar = ({ show, onClose, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data.user);
          setOrders(data.orders);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (show) fetchUserProfile();
  }, [show]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>User Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="profile-section">
          <Image
            src={userData?.userImage || defaulUserImage}
            roundedCircle
            className="profile-img"
          />
          <p className="username">{userData?.userName || "User"}</p>
        </div>

        <div className="order-history">
          <h5>Order History</h5>
          <ul>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <li key={index}>{order}</li>
              ))
            ) : (
              <li>No recent orders</li>
            )}
          </ul>
        </div>

        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserProfileSidebar;
