import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password.length >= 6) {
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: form.email,
        role: "buyer",
      };
      setSuccess(true);
      setError("");
      setTimeout(() => {
        login(mockUser, "fake-jwt-token");
        navigate("/dashboard");
      }, 1500);
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-center pt-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md transition-all duration-500"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-purple-400">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-3 font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-center mb-3 font-medium animate-pulse">
              ✅ Login successful! Redirecting...
            </p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 mb-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 mb-4 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
          />

          {/* 🌈 Gradient Login Button */}
          <button
            type="submit"
            disabled={success}
            className={`w-full ${
              success
                ? "bg-green-500"
                : "bg-button-gradient bg-[length:200%_200%] animate-gradientFlow hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            } text-white py-2 rounded transition-all duration-300`}
          >
            {success ? "Redirecting..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
