import React, { useState } from "react";

const Addlisting = () => {
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ petName, breed, price, description, image });
    alert("🐾 Listing added successfully!");
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

        <button type="submit" className="form-button">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default Addlisting;
