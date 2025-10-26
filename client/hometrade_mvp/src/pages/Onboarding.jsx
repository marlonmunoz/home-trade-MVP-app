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
            </>


          )}
        
        </form>
      </div>

    </div>
  )

}

// const Onboarding = () => {
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto text-center">
//           <h1 className="text-3xl font-bold mb-8">Welcome to HomeTrade Tech!</h1>
//           <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Let's set up your profile and get you started with property trading.
//             </p>
//             <div className="space-y-4">
//               <div className="bg-white dark:bg-gray-700 p-4 rounded">
//                 <p>Step 1: Complete your profile</p>
//               </div>
//               <div className="bg-white dark:bg-gray-700 p-4 rounded">
//                 <p>Step 2: Verify your identity</p>
//               </div>
//               <div className="bg-white dark:bg-gray-700 p-4 rounded">
//                 <p>Step 3: Start exploring properties</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



export default Onboarding;
