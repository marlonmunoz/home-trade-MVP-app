import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    bedrooms: "",
    propertyType: "house",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Redirect if not seller
  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "seller") return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListing = {
      ...form,
      id: Date.now(),
      ownerEmail: user.email,
    };

    // 💾 Save to localStorage (RESTORED FOR GITHUB PAGES DEPLOYMENT)
    const key = `listings_${user.email}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(newListing);
    localStorage.setItem(key, JSON.stringify(existing));

    // 🌐 Save to JSON Server API (COMMENTED OUT FOR GITHUB PAGES DEPLOYMENT)
    // fetch('http://localhost:3001/properties', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newListing),
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log("✅ Saved listing to API:", data);
    //   setMessage("✅ Property added successfully!");
    //   setTimeout(() => navigate("/my-listings"), 1500);
    // })
    // .catch(err => {
    //   console.error('Error saving property:', err);
    //   // Fallback to localStorage if API fails
    //   const key = `listings_${user.email}`;
    //   const existing = JSON.parse(localStorage.getItem(key)) || [];
    //   existing.push(newListing);
    //   localStorage.setItem(key, JSON.stringify(existing));
    //   console.log("✅ Saved listing to localStorage:", newListing);
    //   setMessage("✅ Property added successfully!");
    //   setTimeout(() => navigate("/my-listings"), 1500);
    // });

    console.log("✅ Saved listing to localStorage:", newListing);
    setMessage("✅ Property added successfully!");
    setTimeout(() => navigate("/my-listings"), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-purple-400 mb-6 text-center">
        Add New Property
      </h1>

      {message && (
        <p className="text-green-500 text-center mb-4 font-semibold animate-pulse">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />
        <input
          name="price"
          placeholder="Price ($)"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />
        <input
          name="bedrooms"
          placeholder="Bedrooms"
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
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
          rows="3"
        />
        <input
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />

        {/* 🌈 Animated Gradient Submit Button */}
        <button
          type="submit"
          className="w-full bg-button-gradient bg-[length:200%_200%] animate-gradientFlow 
                     text-white py-2 rounded font-semibold 
                     transition-all duration-300 hover:scale-[1.03] 
                     hover:shadow-[0_0_14px_rgba(139,92,246,0.6)] 
                     focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 
                     dark:focus:ring-purple-500"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
