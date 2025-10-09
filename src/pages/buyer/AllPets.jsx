import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";


const AllPets = () => {
  const { user, firestore } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Firestore se pets fetch karna
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const snapshot = await import("firebase/firestore").then(({ getDocs, collection }) =>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
