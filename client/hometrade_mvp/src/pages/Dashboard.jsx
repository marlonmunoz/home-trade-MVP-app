import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-green-500">
              Your Onboarding Details
            </h2>
            <pre className="text-left text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded p-4 overflow-x-auto">
              {JSON.stringify(onboardingData, null, 2)}
            </pre>
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
