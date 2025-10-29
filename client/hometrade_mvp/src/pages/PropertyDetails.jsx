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
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  // Contact form handlers
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Basic validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission (in real app, this would send to backend)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Success
      setSubmitMessage('✅ Message sent successfully! The seller will contact you soon.');
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Hide form after success
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitMessage('');
      }, 3000);
      
    } catch (error) {
      setSubmitMessage('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
              All Properties
            </Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Property Details
            </span>
          </div>
        </nav>

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

            {/* Property Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Property Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Price</p>
                    <p className="text-gray-600 dark:text-gray-300">${parseInt(property.price).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Property Type</p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{property.propertyType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{property.city}</p>
                  </div>
                </div>

                {property.bedrooms && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Bed className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Bedrooms</p>
                      <p className="text-gray-600 dark:text-gray-300">{property.bedrooms} Bedroom{property.bedrooms !== '1' ? 's' : ''}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <Mail className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Listed By</p>
                    <p className="text-gray-600 dark:text-gray-300">{property.ownerEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Property ID</p>
                    <p className="text-gray-600 dark:text-gray-300">#{property.id}</p>
                  </div>
                </div>
              </div>
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
                
                {/* Submit Message */}
                {submitMessage && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    submitMessage.includes('✅') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      disabled={isSubmitting}
                      required
                      className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                                 rounded-lg w-full p-3 text-gray-900 dark:text-white 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      disabled={isSubmitting}
                      required
                      className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                                 rounded-lg w-full p-3 text-gray-900 dark:text-white 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone (Optional)"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    disabled={isSubmitting}
                    className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                               rounded-lg w-full p-3 text-gray-900 dark:text-white 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                               transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <textarea
                    name="message"
                    placeholder="Your message about this property... *"
                    rows="4"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    disabled={isSubmitting}
                    required
                    className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 
                               rounded-lg w-full p-3 text-gray-900 dark:text-white 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                               transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                               text-white font-semibold px-6 py-3 rounded-lg shadow-md
                               hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                               transition-all duration-300 flex items-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={20} />
                        Send Message
                      </>
                    )}
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
