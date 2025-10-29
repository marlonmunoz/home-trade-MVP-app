import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Home, DollarSign, Mail, Phone } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from static JSON file (GitHub Pages deployment)
        const response = await fetch('/home-trade-MVP-app/db.json');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        
        const data = await response.json();
        const foundProperty = data.properties.find(p => p.id === parseInt(id));
        
        if (!foundProperty) {
          setError('Property not found');
        } else {
          setProperty(foundProperty);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-purple-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading property details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold mb-2 text-red-500">{error}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error === 'Property not found' 
                  ? "The property you're looking for doesn't exist or has been removed."
                  : "There was a problem loading the property details. Please try again."
                }
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/properties')}
                  className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                             text-white font-semibold px-6 py-3 rounded-lg shadow-md
                             hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                             transition-all duration-300"
                >
                  Browse All Properties
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="border border-gray-400 dark:border-gray-600 
                             text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-lg
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no property data (shouldn't happen with proper error handling)
  if (!property) {
    return null;
  }
  // If no property data (shouldn't happen with proper error handling)
  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/properties')}
            className="flex items-center gap-2 text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to All Properties
          </button>
        </div>

        {/* Property Details Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Property Image */}
          <div className="relative h-64 md:h-96">
            {property.imageUrl?.trim() ? (
              <img
                src={property.imageUrl.trim()}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=No+Image+Available';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Home size={48} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">No Image Available</p>
                </div>
              </div>
            )}
            
            {/* Price Overlay */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-md">
              <div className="flex items-center gap-1">
                <DollarSign size={20} className="text-green-600" />
                <span className="font-bold text-xl text-green-600">
                  ${parseInt(property.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="p-6 md:p-8">
            {/* Title and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-purple-400">
                {property.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span className="capitalize">{property.city}</span>
                </div>
                
                {property.bedrooms && (
                  <div className="flex items-center gap-1">
                    <Bed size={18} />
                    <span>{property.bedrooms} Bedroom{property.bedrooms !== '1' ? 's' : ''}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Home size={18} />
                  <span className="capitalize">{property.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Contact Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                             text-white font-semibold px-6 py-3 rounded-lg shadow-md
                             hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                             transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  {showContactForm ? 'Hide Contact Form' : 'Contact Seller'}
                </button>
                
                <Link
                  to="/properties"
                  className="border border-gray-400 dark:border-gray-600 
                             text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-lg
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                             flex items-center justify-center gap-2"
                >
                  <Home size={20} />
                  View More Properties
                </Link>
              </div>
            </div>

            {/* Contact Form (conditionally rendered) */}
            {showContactForm && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                                 rounded-lg w-full p-3 text-gray-900 dark:text-white 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                                 transition-colors duration-200"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                                 rounded-lg w-full p-3 text-gray-900 dark:text-white 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                                 transition-colors duration-200"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                               rounded-lg w-full p-3 text-gray-900 dark:text-white 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                               transition-colors duration-200"
                  />
                  <textarea
                    placeholder="Your message about this property..."
                    rows="4"
                    className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                               rounded-lg w-full p-3 text-gray-900 dark:text-white 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                               transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                               text-white font-semibold px-6 py-3 rounded-lg shadow-md
                               hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                               transition-all duration-300 flex items-center gap-2"
                  >
                    <Mail size={20} />
                    Send Message
                  </button>
                </form>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> This is a demo contact form. In a real application, this would send your message to {property.ownerEmail}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
