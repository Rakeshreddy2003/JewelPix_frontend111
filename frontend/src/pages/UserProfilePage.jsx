import React, { useEffect, useState } from "react";
import { Offcanvas, Image } from "react-bootstrap";
import "../components/styles/NavbarStyles.css"; // Adjust the path as necessary
import defaulUserImage from "../assets/boy.svg"; // Default user image

const UserProfileSidebar = ({ show, onClose, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const resProfile = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dataProfile = await resProfile.json();
        if (resProfile.ok) {
          setUserData(dataProfile.user);
        } else {
          console.error("Error fetching user profile:", dataProfile.message);
        }

        // Fetch user orders
        const resOrders = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dataOrders = await resOrders.json();
        console.log("Fetched orders:", dataOrders); // Log the orders data

        if (dataOrders && dataOrders.length > 0) {
          setOrders(dataOrders); // Set the fetched orders to the state
        } else {
          console.error("No orders found or invalid response");
        }

      } catch (err) {
        console.error("Error fetching profile or orders:", err);
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
          <div className="orders-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} className="order-item">
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Items:</strong> {order.items.join(", ")}</p> {/* Join items with a comma */}
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No recent orders</p>
            )}
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserProfileSidebar;
