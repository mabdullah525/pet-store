import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      // ✅ Create user and store role in Firestore
      const userCredential = await firebase.registerUser(email, password, role);
      const user = userCredential.user;

      setMessage({
        type: "success",
        text: `🎉 Account created successfully as a ${role}!`,
      });

      // ✅ Auto redirect based on role
      setTimeout(() => {
        if (role === "seller") navigate("/");
        else navigate("/all-pets");
      }, 1500);

      // Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("buyer");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    }
  };

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (firebase.isLoggedIn && firebase.user) {
      const checkRole = async () => {
        const role = await firebase.getUserRole(firebase.user.uid);
        if (role === "seller") navigate("/");
        else navigate("/all-pets");
      };
      checkRole();
    }
  }, [firebase, navigate]);

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Your Account 🐾</h2>

        {/* ✅ Success/Error Message */}
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

        {/* Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* ✅ Buyer or Seller selection */}
        <div className="form-group">
          <label>Select Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="buyer">Buyer 🐶</option>
            <option value="seller">Seller 🐾</option>
          </select>
        </div>

        {/* Submit */}
        <button type="submit">Create Account</button>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
