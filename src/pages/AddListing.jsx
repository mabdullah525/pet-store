import React, { useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";


const Addlisting = () => {
  const { uploadImage, addPetListing } = useFirebase();

  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("❌ Please select an image first!");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);

      if (!imageUrl) {
        alert("❌ Image upload failed!");
        setLoading(false);
        return;
      }

      const success = await addPetListing({
        petName,
        breed,
        price,
        imageUrl,
      });

      if (success) {
        alert("🐾 Pet Listing Added Successfully!");
        setPetName("");
        setBreed("");
        setPrice("");
        setImage(null);
      } else {
        alert("❌ Failed to add listing!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="addListing-container">
      <h2 className="addListing-title">🐕 Add New Pet Listing</h2>

      <form onSubmit={handleSubmit} className="addListing-form">
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="addListing-input"
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="addListing-input"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="addListing-input"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="addListing-input"
          required
        />

        <button type="submit" className="addListing-button" disabled={loading}>
          {loading ? "Uploading..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default Addlisting;
