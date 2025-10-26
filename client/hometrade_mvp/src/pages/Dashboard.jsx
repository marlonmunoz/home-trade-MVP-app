import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your properties here
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trades</h2>
            <p className="text-gray-600 dark:text-gray-400">
              View your trade history
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track your performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
