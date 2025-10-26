import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"


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

  // If no logged-in user → redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save onboarding data locally (simulate DB)
    const onboardingKey = `onboarding_${user.email}`;
    localStorage.setItem(onboardingKey, JSON.stringify(form));

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1>
          Welcome, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Let's personalize your experience as a {" "}
          <span className='"font-semibold'>{user.role}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buyer onboarding */}
          {user.role === "buyer" && (
            <>
              <input
                name='city'
                placeholder='Preferred city'
                value={form.city}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'
              />
              <input
                name='budget'
                placeholder='Max Budget ($)'
                value={form.budget}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'
              />
              <input
                name='bedrooms'
                placeholder='Minimun Bedrooms'
                value={form.bedrooms}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'
              />
              <select
                name='propertyType'
                value={form.propertyType}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'
              >
                <option value="">Property Type</option>
                <option value="">Apartment</option>
                <option value="">House</option>
                <option value="">Condo</option>
              </select>
            </>
          )}

          {/* Seller onboarding */}
          {user.role === 'seller' && (
            <>
              <input
                name='city'
                placeholder='Property City'
                value={form.city}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'              
              />
              <input
                name='propertyType'
                placeholder='Property Type (House, Condo, etc.)'
                value={form.propertyType}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'              
              />
              <input
                name='contact'
                placeholder='Contact Phone Number'
                value={form.contact}
                onChange={handleChange}
                className='border border-gray-300 dark:border-gray-600 bg-transparent rounded w-full p-2 text-gray-800 dark:text-white'              
              />
            </>
          )}

          <button
            type='submit'
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Finish Setup
          </button>
        
        </form>
      </div>

    </div>
  );
};

export default Onboarding;


