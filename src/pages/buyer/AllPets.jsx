import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
import BuyerNavbar from "../buyer/BuyerNavbar.jsx";

const AllPets = () => {
  const { firestore, user, addOrder, addToCart } = useFirebase();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  // 🔹 Pets fetch karna Firestore se
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

  // 🛒 Add to Cart handler
  const handleAddToCart = async (pet) => {
    if (!user) {
      alert("Please login first to add to cart 🐾");
      return;
    }

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

      if (success) {
        alert(`✅ ${pet.petName} added to your cart!`);
      } else {
        alert("❌ Failed to add item to cart.");
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("Something went wrong!");
    }
    setProcessing(null);
  };

  // 💳 Buy Now handler
  const handleBuyNow = async (pet) => {
    if (!user) {
      alert("Please login first to place an order 🐾");
      return;
    }

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

      if (success) {
        alert(`✅ You purchased ${pet.petName} successfully!`);
      } else {
        alert("❌ Order placement failed!");
      }
    } catch (err) {
      console.error("❌ Error in handleBuyNow:", err);
      alert("Something went wrong!");
    }
    setProcessing(null);
  };

  return (
    <div>
      <BuyerNavbar />
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
                  <p className="allPets-price">Price: Rs.{pet.price}</p>

                  <div className="allPets-btn-group">
                    <button
                      className="addToCart-btn"
                      onClick={() => handleAddToCart(pet)}
                      disabled={processing === pet.id}
                    >
                      {processing === pet.id
                        ? "Adding..."
                        : "Add to Cart 🛍️"}
                    </button>

                    {/* <button
                      className="buyNow-btn"
                      onClick={() => handleBuyNow(pet)}
                      disabled={processing === pet.id}
                    >
                      {processing === pet.id
                        ? "Processing..."
                        : "Buy Now 🛒"}
                    </button> */}
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

export default AllPets;
