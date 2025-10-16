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

    </div>
  );
};

export default BuyerDashboard;
