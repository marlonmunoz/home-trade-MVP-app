import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || form.password.length < 6) {
      setError("Please fill in all fields. Password must be at least 6 characters.");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      role: form.role,
    };

    // ✅ Show success message first
    setSuccess(true);
    setError("");

    // ✅ Simulate a brief delay (like waiting for backend)
    setTimeout(() => {
      login(newUser, "fake-jwt-token");
      navigate("/dashboard");
    }, 1500); // 1.5 seconds delay
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-center pt-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md transition-all duration-500"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Create Account
          </h2>

          {/* ✅ Show messages */}
          {error && (
            <p className="text-red-500 text-center mb-3 font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-center mb-3 font-medium animate-pulse">
              ✅ Account created successfully! Redirecting...
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 mb-3 text-gray-800 dark:text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 mb-3 text-gray-800 dark:text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 mb-3 text-gray-800 dark:text-white"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={success}
            className="border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 mb-4 text-gray-800 dark:text-white"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button
            type="submit"
            disabled={success}
            className={`w-full ${
              success ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded transition-all duration-300`}
          >
            {success ? "Redirecting..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
