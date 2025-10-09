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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-[90%] max-w-3xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🐾 Buyer Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome, <span className="font-semibold">{user?.email}</span>
        </p>
      </div>

      {/* Browse Pets Button */}
      <Link
        to="/listings"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow mb-10 transition-all"
      >
        🐕 Browse Pets
      </Link>

      {/* Orders Section */}
      <div className="w-[90%] max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🛒 My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-lg transition-all"
              >
                <img
                  src={order.petImage}
                  alt={order.petName}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {order.petName}
                </h3>
                <p className="text-gray-600">Price: ${order.price}</p>
                <p className="text-sm text-gray-500">
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
