import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Property Details</h1>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Property ID: {id}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Property Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed property information will be displayed here.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Trade Options</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trading options and forms will be available here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
