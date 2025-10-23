import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.user) {
      handleRedirect(firebase.user.uid);
    }
  }, [firebase.isLoggedIn, firebase.user]);

  // 🔹 Redirect user based on role
  const handleRedirect = async (uid) => {
    const role = await firebase.getUserRole(uid);
    if (role === "seller") navigate("/");
    else if (role === "buyer") navigate("/all-pets");
  };

  // 🔹 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const result = await firebase.loginUser(email, password);
      const loggedUser = result.user;

      setMessage({
        type: "success",
        text: `🎉 Welcome back, ${loggedUser.email}`,
      });

      setTimeout(() => handleRedirect(loggedUser.uid), 1200);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await firebase.signInWithGoogle();
      const loggedUser = result.user;

      setMessage({
        type: "success",
        text: `🎉 Logged in with Google as ${loggedUser.displayName}`,
      });

      setTimeout(() => handleRedirect(loggedUser.uid), 1200);
    } catch (error) {
      console.error("❌ Google login failed:", error.message);
      setMessage({
        type: "error",
        text: `❌ ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="register-form bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="form-title text-2xl font-bold mb-6 text-center text-gray-800">
          Login To Your Account 🐾
        </h2>

        {/* ✅ Message Alert */}
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
        <div className="form-group mb-4">
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
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="cursor-pointer mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 w-full hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{loading ? "Please wait..." : "Sign in with Google"}</span>
        </button>

        <p className="text-center mt-4 text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
