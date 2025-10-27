import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const key = `listings_${user.email}`;
      const savedListings = JSON.parse(localStorage.getItem(key)) || [];
      setListings(savedListings);
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        My Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any properties yet.{" "}
          <Link to="/add-property" className="text-blue-500 hover:underline">
            Add one now
          </Link>
          .
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white dark:bg-gray-800"
            >
              {/* ✅ Robust image rendering with fallback */}
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

              <h2 className="text-xl font-semibold mb-1 text-blue-600">
                {p.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {p.propertyType} in {p.city}
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

              {/* Future step: Add "View Details" */}
              {/* <Link
                to={`/property/${p.id}`}
                className="text-blue-500 hover:underline text-sm mt-2 inline-block"
              >
                View Details →
              </Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
