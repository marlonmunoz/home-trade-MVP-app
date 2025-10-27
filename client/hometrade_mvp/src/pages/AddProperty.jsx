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

  // ✅ Fix: Redirect inside useEffect
  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
    }
  }, [user, navigate]);

  // stop rendering form while redirecting
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

    const key = `listings_${user.email}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(newListing);
    localStorage.setItem(key, JSON.stringify(existing));

    console.log("✅ Saved listing:", newListing);
    setMessage("✅ Property added successfully!");
    setTimeout(() => navigate("/my-listings"), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
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
          className="border rounded w-full p-2"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="price"
          placeholder="Price ($)"
          value={form.price}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="bedrooms"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="border rounded w-full p-2"
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
          className="border rounded w-full p-2"
          rows="3"
        />
        <input
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
