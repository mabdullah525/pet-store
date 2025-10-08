import React, { useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom"; // ✅ For redirect after login

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate(); // redirect hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // reset message before submit

    try {
      // ✅ Call loginUser from Firebase Context
      const result = await firebase.loginUser(email, password);
      console.log("User logged in successfully!", result.user);

      setMessage({
        type: "success",
        text: `🎉 Login successful! Welcome back, ${result.user.email}`,
      });

      // ✅ Optional: Clear input fields
      setEmail("");
      setPassword("");

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/"); // or "/dashboard"
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Login To Your Account 🐾</h2>

        {/* ✅ Message Box */}
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

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
