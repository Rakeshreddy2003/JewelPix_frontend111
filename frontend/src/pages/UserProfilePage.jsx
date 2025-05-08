import React, { useEffect, useState } from "react";
import { Offcanvas, Image, Button } from "react-bootstrap";
import "../components/styles/NavbarStyles.css"; // Adjust the path as necessary
import defaulUserImage from "../assets/boy.svg"; // Default user image

const UserProfileSidebar = ({ show, onClose, onLogout, onLogin, islogin, user }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Invalid orders response");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (show) fetchOrders();
  }, [show]);
  useEffect(() => {
    if (!islogin) {
      setOrders([]); // Clear orders when user logs out
    }
  }, [islogin]);


  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>User Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="sidebar-body-content">
          <div>
            <div className="profile-section md:mt-0 ">
              <Image
                src={user?.userImage || defaulUserImage}
                roundedCircle
                className="profile-img"
              />
              <p className="username">{user?.userName || "User"}</p>
            </div>

            <div className="order-history">
              <h5>Order History</h5>
              <div className="orders-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {orders && orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div key={index} className="order-item">
                      <p><strong>Order ID:</strong> {order.orderId}</p>
                      <p><strong>Items:</strong> {order.items.join(", ")}</p>
                      <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No recent orders</p>
                )}
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={islogin ? onLogout : onLogin}>
            {islogin ? "Logout" : "Login"}
          </button>
        </div>
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default UserProfileSidebar;
