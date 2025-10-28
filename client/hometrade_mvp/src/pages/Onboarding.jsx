import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    city: "",
    budget: "",
    bedrooms: "",
    propertyType: "",
    contact: "",
  });

  // 🚦 Redirect if no logged-in user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = "${value}"`);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 Save onboarding data to localStorage
    const onboardingKey = `onboarding_${user.email}`;
    localStorage.setItem(onboardingKey, JSON.stringify(form));

    console.log("✅ Saved to localStorage:", JSON.stringify(form, null, 2));

    // 🚀 Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg animate-fade-in-scale">
        <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome, {user.name.split(" ")[0]} 👋
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Let’s personalize your experience as a{" "}
          <span className="font-semibold text-blue-600 dark:text-purple-400">
            {user.role}
          </span>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🏡 Buyer Onboarding */}
          {user.role === "buyer" && (
            <>
              <input
                name="city"
                placeholder="Preferred City"
                value={form.city}
                onChange={handleChange}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              />
              <input
                name="budget"
                placeholder="Max Budget ($)"
                value={form.budget}
                onChange={handleChange}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              />
              <input
                name="bedrooms"
                placeholder="Minimum Bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              />
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
              </select>
            </>
          )}

          {/* 🏠 Seller Onboarding */}
          {user.role === "seller" && (
            <>
              <input
                name="city"
                type="text"
                placeholder="Property City"
                value={form.city}
                onChange={handleChange}
                required
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              />
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                required
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              >
                <option value="">Select Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
              </select>
              <input
                name="contact"
                type="tel"
                placeholder="Contact Phone Number"
                value={form.contact}
                onChange={handleChange}
                required
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
              />
            </>
          )}

          {/* 🌈 Animated Gradient Submit Button */}
          <button
            type="submit"
            className="w-full bg-button-gradient bg-[length:200%_200%] animate-gradientFlow 
                       text-white font-semibold py-2 rounded transition-all duration-300 
                       hover:scale-[1.03] hover:shadow-[0_0_14px_rgba(139,92,246,0.6)] 
                       focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 
                       dark:focus:ring-purple-500"
          >
            Finish Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
