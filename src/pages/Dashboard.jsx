import React from "react";
import { Package, Heart, Bell, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "My Orders",
      value: "12",
      icon: <Package size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: <Heart size={24} />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Notifications",
      value: "5",
      icon: <Bell size={24} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Cart Items",
      value: "3",
      icon: <ShoppingCart size={24} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome Back 🐾</h1>
      <p className="text-gray-600 mb-6">
        Here’s an overview of your pet store account activity.
      </p>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div className={`icon-wrapper ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-semibold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="orders-section">
        <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>
        <div className="order-card">
          <p className="font-medium text-gray-800">🐶 Puppy Food Pack</p>
          <span className="text-sm text-green-600">Delivered</span>
        </div>
        <div className="order-card">
          <p className="font-medium text-gray-800">🐱 Cat Litter</p>
          <span className="text-sm text-yellow-600">In Progress</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
