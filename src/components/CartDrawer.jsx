// src/components/CartDrawer.jsx
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

// import CheckoutModal from "./CheckoutModal.jsx"; // (we'll create this later)

const CartDrawer = ({ open, onClose }) => {
  const { firestore, user, createOrder } = useFirebase();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  // 🟢 Fetch real cart items from Firestore
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(firestore, "cartItems"),
          where("buyerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchCart(); // fetch only when drawer opens
  }, [firestore, user, open]);

  // 🛍️ Buy Now
  const handleBuy = async (item) => {
    if (!user) return alert("Please log in first 🐾");
    setProcessing(item.id);
    try {
      await createOrder({
        petId: item.petId,
        petName: item.petName,
        breed: item.breed,
        price: item.price,
        imageUrl: item.imageUrl,
        buyerId: user.uid,
        buyerEmail: user.email,
      });

      await deleteDoc(doc(firestore, "cartItems", item.id));
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      alert(`✅ Purchased ${item.petName}!`);
    } catch (err) {
      console.error("Buy failed:", err);
    } finally {
      setProcessing(null);
    }
  };

  // 🗑️ Remove from cart
  const handleRemove = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, "cartItems", itemId));
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      alert("🗑️ Removed from cart!");
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <aside className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 p-5 overflow-y-auto animate-slideIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose}>✖️</button>
        </div>

        {loading ? (
          <p>Loading your cart 🐾...</p>
        ) : cartItems.length === 0 ? (
          <p>No items in your cart 🐶</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <img
                  src={item.imageUrl}
                  alt={item.petName}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.petName}</h3>
                  <p className="text-sm text-gray-500">{item.breed}</p>
                  <p className="text-blue-600 font-semibold">${item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={processing === item.id}
                      className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700"
                    >
                      {processing === item.id ? "..." : "Buy Now"}
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
};
export default CartDrawer;

