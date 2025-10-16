import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import BuyerNavbar from "../buyer/BuyerNavbar.jsx";

const Cart = () => {
  const { firestore, user, createOrder } = useFirebase();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  // 🟢 Fetch cart items for logged-in user
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
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [firestore, user]);

  // 🛒 Buy Now handler
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
        orderDate: new Date().toISOString(),
        status: "pending",
      });

      // Remove from cart after purchase
      await deleteDoc(doc(firestore, "cartItems", item.id));

      setCartItems((prev) => prev.filter((cart) => cart.id !== item.id));
      alert(`✅ Purchased ${item.petName} successfully!`);
    } catch (error) {
      console.error("❌ Error buying item:", error);
      alert("Something went wrong while buying!");
    } finally {
      setProcessing(null);
    }
  };

  // 🗑️ Delete item from cart
  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, "cartItems", itemId));
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      alert("🗑️ Item removed from cart!");
    } catch (error) {
      console.error("❌ Error removing item:", error);
      alert("Failed to remove item!");
    }
  };

  return (
    <div>
      <BuyerNavbar />

      <div className="cart-container">
        <h1 className="cart-title">🛍️ My Cart</h1>

        {loading ? (
          <p>Loading your cart 🐾...</p>
        ) : cartItems.length === 0 ? (
          <p>No items in your cart 🐶</p>
        ) : (
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img
                  src={item.imageUrl}
                  alt={item.petName}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h2>{item.petName}</h2>
                  <p>Breed: {item.breed}</p>
                  <p>Price: ${item.price}</p>

                  <div className="cart-actions">
                    <button
                      className="buyNow-btn"
                      onClick={() => handleBuy(item)}
                      disabled={processing === item.id}
                    >
                      {processing === item.id
                        ? "Processing..."
                        : "Buy Now 🛒"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
