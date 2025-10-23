import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";

const Mylisting = () => {
  const { getMyListings, user, addOrder } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      if (user) {
        const data = await getMyListings(user.uid);
        setPets(data);
        setLoading(false);
      }
    };
    fetchListings();
  }, [user, getMyListings]);

  // ✅ Handle Buy Button Click
  const handleBuy = async (pet) => {
    setBuying(pet.id);
    const success = await addOrder({
      petName: pet.petName,
      petImage: pet.imageUrl,
      price: pet.price,
      sellerId: pet.userId,
    });
    setBuying(null);
    if (success) {
      alert("🎉 Pet purchased successfully!");
    } else {
      alert("❌ Something went wrong while buying.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-xl text-gray-600">
        🐾 Loading your pet listings...
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500 text-lg">
        😿 No listings yet. Add your first pet!
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🐕 My Pet Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={pet.imageUrl}
              alt={pet.petName}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <h3 className="text-lg font-bold text-gray-700">{pet.petName}</h3>
            <p className="text-gray-500">{pet.breed}</p>
            <p className="text-blue-600 font-semibold mt-2">
              💰 Rs {pet.price}
            </p>

            {/* 🛒 Buy Button */}
            {/* <button
              onClick={() => handleBuy(pet)}
              disabled={buying === pet.id}
              className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition-all ${buying === pet.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {buying === pet.id ? "Processing..." : "Buy Now 🛍️"}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mylisting;
