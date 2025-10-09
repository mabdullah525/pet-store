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
      // ✅ Register user and save role to Firestore
      await firebase.registerUser(email, password, role);

      setMessage({
        type: "success",
        text: `🎉 Account created successfully as a ${role}!`,
      });

      // Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("buyer");

      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error creating user:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <div className="register-container flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="register-form bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="form-title text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account 🐾
        </h2>

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

        {/* Full Name */}
        <div className="form-group mb-3">
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div className="form-group mb-3">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Password */}
        <div className="form-group mb-3">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
