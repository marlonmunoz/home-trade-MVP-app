import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, Home, MapPin, Bed, DollarSign } from "lucide-react";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadListings();
  }, [user]);

  const loadListings = () => {
    if (user?.email) {
      // 💾 Load from localStorage (RESTORED FOR GITHUB PAGES DEPLOYMENT)
      const key = `listings_${user.email}`;
      const savedListings = JSON.parse(localStorage.getItem(key)) || [];
      setListings(savedListings);

      // 🌐 Load from JSON Server API - filter by user email (COMMENTED OUT FOR GITHUB PAGES DEPLOYMENT)
      // fetch(`http://localhost:3001/properties?ownerEmail=${user.email}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     setListings(data);
      //   })
      //   .catch(err => {
      //     console.error('Error fetching user properties:', err);
      //     // Fallback to localStorage if API fails
      //     const key = `listings_${user.email}`;
      //     const savedListings = JSON.parse(localStorage.getItem(key)) || [];
      //     setListings(savedListings);
      //   });
    }
  };

  const handleDelete = (propertyId) => {
    if (user?.email) {
      const key = `listings_${user.email}`;
      const updatedListings = listings.filter(listing => listing.id !== propertyId);
      localStorage.setItem(key, JSON.stringify(updatedListings));
      setListings(updatedListings);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-purple-400">
          My Listings
        </h1>
        <Link
          to="/add-property"
          className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                     text-white font-semibold px-6 py-3 rounded-lg shadow-md
                     hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                     transition-all duration-300 flex items-center gap-2"
        >
          <Home size={20} />
          Add New Property
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <Home size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No Properties Listed Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start building your real estate portfolio by adding your first property listing.
            </p>
            <Link
              to="/add-property"
              className="inline-flex items-center gap-2 bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                         text-white font-semibold px-8 py-3 rounded-lg shadow-md
                         hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                         transition-all duration-300"
            >
              <Home size={20} />
              Add Your First Property
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {listings.length} propert{listings.length === 1 ? 'y' : 'ies'}
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((property) => (
              <div
                key={property.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl 
                           transition-all duration-300 p-6 bg-white dark:bg-gray-800 hover:scale-[1.02] 
                           hover:border-blue-300 dark:hover:border-purple-500"
              >
                {/* Property Image */}
                <div className="relative mb-4">
                  {property.imageUrl?.trim() ? (
                    <img
                      src={property.imageUrl.trim()}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Home size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-purple-400 line-clamp-1">
                    {property.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{property.city}{property.state ? `, ${property.state}` : ''}</span>
                    </div>
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>{property.bedrooms} bed{property.bedrooms !== '1' ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <DollarSign size={18} className="text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      {Number(property.price).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 capitalize text-sm">
                    {property.propertyType}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {property.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-2">
                  <Link
                    to={`/property/${property.id}`}
                    className="flex-1 flex items-center justify-center gap-1 
                               bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 
                               font-medium px-3 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 
                               transition-colors text-sm"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  
                  <button
                    onClick={() => alert('Edit functionality coming in backend phase')}
                    className="flex-1 flex items-center justify-center gap-1 
                               bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 
                               font-medium px-3 py-2 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 
                               transition-colors text-sm"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => setDeleteConfirm(property.id)}
                    className="flex items-center justify-center gap-1 
                               bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 
                               font-medium px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 
                               transition-colors text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === property.id && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                      Are you sure you want to delete this property? This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
