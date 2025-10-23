import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";

const BuyerDashboard = () => {
  const { firestore, user, addOrder, addToCart } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  // 🔹 Fetch pets from Firestore
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const snapshot = await import("firebase/firestore").then(
          ({ getDocs, collection }) =>
            getDocs(collection(firestore, "petListings"))
        );

        const fetchedPets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(fetchedPets);
      } catch (error) {
        console.error("❌ Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [firestore]);

  // 🛒 Add to Cart
  const handleAddToCart = async (pet) => {
    if (!user) return alert("Please login first 🐾");

    setProcessing(pet.id);
    try {
      const success = await addToCart({
        petId: pet.id,
        petName: pet.petName,
        breed: pet.breed,
        price: pet.price,
        imageUrl: pet.imageUrl,
        buyerId: user.uid,
        buyerEmail: user.email,
        addedAt: new Date().toISOString(),
      });

      alert(success ? `✅ ${pet.petName} added to cart!` : "❌ Failed to add.");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Something went wrong!");
    }
    setProcessing(null);
  };

  // 💳 Buy Now
  const handleBuyNow = async (pet) => {
    if (!user) return alert("Please login first 🐾");

    setProcessing(pet.id);
    try {
      const success = await addOrder({
        petId: pet.id,
        petName: pet.petName,
        breed: pet.breed,
        price: pet.price,
        imageUrl: pet.imageUrl,
        buyerId: user.uid,
        buyerEmail: user.email,
        orderDate: new Date().toISOString(),
      });

      alert(success ? `✅ Purchased ${pet.petName}!` : "❌ Order failed!");
    } catch (err) {
      console.error("❌ Error in handleBuyNow:", err);
      alert("Something went wrong!");
    }
    setProcessing(null);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        🐾 Browse Available Pets
      </h1>

      {loading ? (
        <p className="text-gray-500 text-lg">Loading pets...</p>
      ) : pets.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No pets available right now 🐶
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-200 p-4 flex flex-col"
            >
              <img
                src={pet.imageUrl}
                alt={pet.petName}
                className="h-48 w-full object-cover rounded-xl"
              />

              <div className="mt-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {pet.petName}
                </h2>
                <p className="text-sm text-gray-500">
                  Breed: {pet.breed || "N/A"}
                </p>
                <p className="mt-1 text-lg font-bold text-blue-600">
                  Rs. {pet.price}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(pet)}
                  disabled={processing === pet.id}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {processing === pet.id ? "Adding..." : "Add to Cart 🛍️"}
                </button>

                <button
                  onClick={() => handleBuyNow(pet)}
                  disabled={processing === pet.id}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {processing === pet.id ? "Processing..." : "Buy Now 🐾"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BuyerDashboard;
