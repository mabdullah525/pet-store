import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";

const AllPets = () => {
  const { getAllPets, addOrder, user } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      const data = await getAllPets();
      setPets(data);
      setLoading(false);
    };
    fetchPets();
  }, [getAllPets]);

  const handleBuy = async (pet) => {
    if (!user) {
      alert("Please login to buy this pet 🐾");
      return;
    }

    setBuying(pet.id);
    const success = await addOrder({
      petName: pet.petName,
      petImage: pet.imageUrl,
      price: pet.price,
      sellerId: pet.userId,
    });
    setBuying(null);

    if (success) {
      alert("🎉 Order placed successfully!");
    } else {
      alert("❌ Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600 text-xl">
        🐾 Loading available pets...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🐶 Available Pets for Adoption / Sale
      </h2>

      {pets.length === 0 ? (
        <div className="text-center text-gray-500">No pets available yet 😿</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4"
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
              <button
                onClick={() => handleBuy(pet)}
                disabled={buying === pet.id}
                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
                  buying === pet.id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {buying === pet.id ? "Processing..." : "Buy Now 🛍️"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
