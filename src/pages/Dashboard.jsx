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
        // 🐶 Fetch my pets
        const pets = await getMyListings();
        setMyPetsCount(pets.length);

        // 🛒 Fetch my orders
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
      value: myOrdersCount,
      icon: <Package size={28} />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "My Pet Listings",
      value: myPetsCount,
      icon: <ClipboardList size={28} />,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Notifications",
      value: "5",
      icon: <Bell size={28} />,
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Cart Items",
      value: "3",
      icon: <ShoppingCart size={28} />,
      gradient: "from-pink-500 to-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome Back 🐾
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Here’s an overview of your pet store activity.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-md p-6 bg-gradient-to-br ${item.gradient} text-white transform transition hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-xl">{item.icon}</div>
                <h2 className="text-3xl font-bold">{item.value}</h2>
              </div>
              <p className="mt-4 text-white/90 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
