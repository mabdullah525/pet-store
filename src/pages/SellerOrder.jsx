import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../context/Firebase";

const SellerOrder = () => {
  const { firestore, user } = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(firestore, "orders"), where("sellerId", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });

    return () => unsub();
  }, [firestore, user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📦 Orders Received</h1>

      {orders.length === 0 ? (
        <p className="text-center">No Order Found 😿</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 shadow rounded-xl">
              <img src={order.imageUrl} alt={order.petName} className="w-full h-40 object-cover rounded-md" />
              <h2 className="font-semibold mt-2">{order.petName}</h2>
              <p>Buyer: {order.buyerEmail}</p>
              <p>Price: ${order.price}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrder;
