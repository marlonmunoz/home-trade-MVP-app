import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // 💾 Load from localStorage (commented out)
      // const key = `listings_${user.email}`;
      // const savedListings = JSON.parse(localStorage.getItem(key)) || [];
      // setListings(savedListings);

      // 🌐 Load from JSON Server API - filter by user email
      fetch(`http://localhost:3001/properties?ownerEmail=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setListings(data);
        })
        .catch(err => {
          console.error('Error fetching user properties:', err);
          // Fallback to localStorage if API fails
          const key = `listings_${user.email}`;
          const savedListings = JSON.parse(localStorage.getItem(key)) || [];
          setListings(savedListings);
        });
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-purple-400 mb-6 text-center">
        My Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You haven’t added any properties yet.{" "}
          <Link
            to="/add-property"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold hover:underline"
          >
            Add one now
          </Link>
          .
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl shadow hover:shadow-xl transition-all duration-300 
                         p-4 bg-white dark:bg-gray-800 hover:scale-[1.02] hover:border-transparent 
                         hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 
                         dark:hover:from-gray-800 dark:hover:to-purple-900/20"
            >
              {/* 🖼 Robust image rendering with fallback */}
              {p.imageUrl?.trim() ? (
                <img
                  src={p.imageUrl.trim()}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded mb-3 border border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/400x250?text=No+Image"
                  alt="Placeholder"
                  className="w-full h-48 object-cover rounded mb-3 border border-gray-200 dark:border-gray-700"
                />
              )}

              <h2 className="text-xl font-semibold mb-1 text-blue-600 dark:text-purple-400">
                {p.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 capitalize">
                {p.propertyType}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                📍 {p.city}
              </p>

              <p className="text-gray-700 dark:text-gray-200 font-bold mt-2">
                ${p.price}
              </p>

              {p.bedrooms && (
                <p className="text-sm text-gray-500 mt-1">
                  {p.bedrooms} Bedrooms
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {p.description}
              </p>

              {/* 🌈 Gradient Action Button */}
              <Link
                to="/add-property"
                className="mt-4 inline-block bg-button-gradient bg-[length:200%_200%] animate-gradientFlow 
                           text-white text-sm font-semibold px-4 py-2 rounded 
                           hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)] 
                           transition-all duration-300"
              >
                + Add Another Property
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
