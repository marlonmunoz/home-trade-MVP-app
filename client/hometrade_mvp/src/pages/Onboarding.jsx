import React from 'react';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Welcome to HomeTrade Tech!</h1>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Let's set up your profile and get you started with property trading.
            </p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded">
                <p>Step 1: Complete your profile</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded">
                <p>Step 2: Verify your identity</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded">
                <p>Step 3: Start exploring properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
