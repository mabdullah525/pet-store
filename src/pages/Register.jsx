import React, { useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { Link } from "react-router-dom"; // ✅ For navigation link

const Register = () => {
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const result = await firebase.registerUser(email, password);
      // console.log("User created successfully!", result);

      setMessage({
        type: "success",
        text: `🎉 Account created successfully! Welcome ${email}`,
      });

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Your Account 🐾</h2>

        {message.text && (
          <div
            className={`text-center p-3 mb-4 rounded-lg font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Account
        </button>

        {/* ✅ Link to Login Page */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
