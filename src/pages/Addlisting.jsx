import React, { useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";

const AddListing = () => {
  const { uploadImage, addPetListing } = useFirebase();

  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Upload image to Cloudinary
      const imageUrl = await uploadImage(image);

      // 2️⃣ Add to Firestore
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
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">🐕 Add New Pet Listing</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-input"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-input"
          required
        />

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Uploading..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListing;
