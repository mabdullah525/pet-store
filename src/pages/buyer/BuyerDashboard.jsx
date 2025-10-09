import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
import { Link } from "react-router-dom";


const BuyerDashboard = () => {
  const { user, getMyOrders } = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const myOrders = await getMyOrders();
      setOrders(myOrders);
    };
    fetchOrders();
  }, []);

  return (
    <div className="buyer-dashboard">
      {/* Header */}
      <div className="buyer-header">
        <h1>🐾 Buyer Dashboard</h1>
        <p>
          Welcome, <span>{user?.email}</span>
        </p>
      </div>

      {/* Browse Pets Button */}
      <Link to="/all-pets" className="browse-btn">
        🐕 Browse Pets
      </Link>

      {/* Orders Section */}
      <div className="orders-section">
        <h2>🛒 My Orders</h2>

        {orders.length === 0 ? (
          <p className="no-orders">You haven’t placed any orders yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <img src={order.petImage} alt={order.petName} />
                <h3>{order.petName}</h3>
                <p>Price: ${order.price}</p>
                <p>
                  Purchased on:{" "}
                  {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
