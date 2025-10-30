import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    city: "",
    state: "",
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
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full p-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        >
          <option value="">Select State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
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
