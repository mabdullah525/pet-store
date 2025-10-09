import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";


const AllPets = () => {
  const { firestore, user, addOrder } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null);

  // 🟢 Firestore se pets fetch karna
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const snapshot = await import("firebase/firestore").then(
          ({ getDocs, collection }) => getDocs(collection(firestore, "petListings"))
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

  // 🛒 Buy Now click handler
  const handleBuyNow = async (pet) => {
    if (!user) {
      alert("Please login first to place an order 🐾");
      return;
    }

    setBuying(pet.id);

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

      if (success) {
        alert(`✅ You purchased ${pet.petName} successfully!`);
      } else {
        alert("❌ Order placement failed!");
      }
    } catch (err) {
      console.error("❌ Error in handleBuyNow:", err);
      alert("Something went wrong!");
    }

    setBuying(null);
  };

  return (
    <div className="allPets-container">
      <h1 className="allPets-title">🐾 Browse Pets</h1>

      {loading ? (
        <p className="allPets-loading">🐾 Loading available pets...</p>
      ) : pets.length === 0 ? (
        <p className="allPets-empty">No pets available right now 🐶</p>
      ) : (
        <div className="allPets-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="allPets-card">
              <img
                src={pet.imageUrl}
                alt={pet.petName}
                className="allPets-image"
              />
              <div className="allPets-details">
                <h2 className="allPets-name">{pet.petName}</h2>
                <p className="allPets-breed">Breed: {pet.breed}</p>
                <p className="allPets-price">Price: ${pet.price}</p>
                <button
                  className="buyNow-btn"
                  onClick={() => handleBuyNow(pet)}
                  disabled={buying === pet.id}
                >
                  {buying === pet.id ? "Processing..." : "Buy Now 🛒"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
