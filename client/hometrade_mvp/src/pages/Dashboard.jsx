import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  DollarSign, 
  Bed, 
  Home, 
  Phone, 
  Edit,
  CheckCircle 
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState(null);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`onboarding_${user.email}`);
      if (saved) {
        setOnboardingData(JSON.parse(saved));
      }
    }
  }, [user]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            ⚠️ You are not logged in
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please log in or register to access your dashboard.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="mt-4 px-6 py-2 bg-button-gradient bg-[length:200%_200%] animate-gradientFlow 
                       text-white rounded hover:scale-[1.03] transition-all 
                       hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-purple-400 mb-4">
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You're logged in as a{" "}
          <span className="font-semibold">{user.role}</span>.
        </p>

        {onboardingData ? (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
            {/* Header with role-based styling */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-green-400 to-green-600">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Your Profile
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {user.role} Details
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/onboarding")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              {onboardingData.city && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {user.role === "buyer" ? "Preferred City" : "Property Location"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">
                      {onboardingData.city}
                    </p>
                  </div>
                </div>
              )}

              {/* Budget (Buyer only) */}
              {user.role === "buyer" && onboardingData.budget && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Maximum Budget
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ${parseInt(onboardingData.budget).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Bedrooms (Buyer only) */}
              {user.role === "buyer" && onboardingData.bedrooms && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Bed className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Minimum Bedrooms
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {onboardingData.bedrooms}+ Bedrooms
                    </p>
                  </div>
                </div>
              )}

              {/* Property Type */}
              {onboardingData.propertyType && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {user.role === "buyer" ? "Preferred Property Type" : "Property Type"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">
                      {onboardingData.propertyType}
                    </p>
                  </div>
                </div>
              )}

              {/* Contact (Seller only) */}
              {user.role === "seller" && onboardingData.contact && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                    <Phone className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Contact Number
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {onboardingData.contact}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Completion Status */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-700 dark:text-green-300">
                  Profile Complete
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Your {user.role} profile is set up and ready to go!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-2 text-yellow-600 dark:text-yellow-400">
              No onboarding data found
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Let's complete your setup so we can personalize your experience.
            </p>
            <button
              onClick={() => navigate("/onboarding")}
              className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow 
                         text-white px-4 py-2 rounded 
                         hover:scale-[1.03] transition-all 
                         hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            >
              Complete Onboarding
            </button>
          </div>
        )}

        <button
          onClick={logout}
          className="mt-10 text-red-500 font-semibold hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
