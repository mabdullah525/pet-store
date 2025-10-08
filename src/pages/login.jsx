import React, { useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const result = await firebase.loginUser(email, password);
      console.log("User logged in successfully!", result.user);

      setMessage({
        type: "success",
        text: `🎉 Login successful! Welcome back, ${result.user.email}`,
      });

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    }
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await firebase.signInWithGoogle();
      console.log("Google login successful:", result.user);

      setMessage({
        type: "success",
        text: `🎉 Logged in with Google as ${result.user.displayName}`,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
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
            className={`text-center p-3 mb-4 rounded-lg font-medium ${message.type === "success"
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

        {/* ✅ Google Login Button */}
        <button
          type="button"
          onClick={firebase.signInWithGoogle}
          className="cursor-pointer google-btn mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 w-full hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>

        {/* ✅ Register Link */}
        <p className="text-center mt-4 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
