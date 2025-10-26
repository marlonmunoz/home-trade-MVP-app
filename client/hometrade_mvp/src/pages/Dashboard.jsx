import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You are logged in as a <span className="font-semibold">{user.role}</span>.
        </p>

        {user.role === "buyer" ? (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-2 text-blue-500">
              Buyer Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Here you'll see your saved properties, viewed listings, and upcoming recommendations.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-2 text-purple-500">
              Seller Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Here you'll manage your property listings and track interested buyers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
