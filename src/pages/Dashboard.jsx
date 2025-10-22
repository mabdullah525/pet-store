import React, { useEffect, useState } from "react";
import { Package, ClipboardList, Bell, ShoppingCart } from "lucide-react";
import { useFirebase } from "../context/Firebase.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const { getMyListings, firestore, user } = useFirebase();
  const [myPetsCount, setMyPetsCount] = useState(0);
  const [myOrdersCount, setMyOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // ✅ Fetch pet listings
        const pets = await getMyListings();
        setMyPetsCount(pets.length);

        // ✅ Fetch orders for this user
        const q = query(
          collection(firestore, "orders"),
          where("buyerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        setMyOrdersCount(snapshot.size);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [getMyListings, firestore, user]);

  const stats = [
    {
      title: "My Orders",
      value: myOrdersCount, // 👈 now dynamic
      icon: <Package size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "My Pet Listings",
      value: myPetsCount, // 👈 dynamic
      icon: <ClipboardList size={24} />,
      color: "bg-green-100 text-green-600",
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
    </div>
  );
};

export default Dashboard;
