import React, { useEffect, useState } from "react";

const AllProperties = () =>{
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // 🏗 Gather every seller’s listings from localStorage
        const allKeys = Object.keys(localStorage);
        const allListings = [];

        allKeys.forEach((key) => {
            if (key.startsWith("listings_")) {
                const data = JSON.parse(localStorage.getItem(key));
                allListings.push(...data);
            }
        });

        setListings(allListings);
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                All Properties
            </h1>

            {listings.length === 0 ? (
                <p className="text-center text-gray-500">
                    No Properties available yet. 
                </p>
            ) : (
                <div>
                    {listings.map((p) => (
                        <div
                            key={p.id}
                            className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white dark:bg-gray-800"
                        >
                            {p.imageURL && (
                                <img 
                                    src={p.imageURL} 
                                    alt={p.title}
                                    className="w-full h-48 object-cover rounded mb-3" 
                                />
                            )}
                            <h2>
                                <p className="text-xl font-semibold mb-1 text-blue-600">
                                    {p.title}
                                </p>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {p.propertyTypes} in {p.city}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-bold mt-2">
                                $ {p.price}
                            </p>
                            {p.bedrooms && (
                                <p>
                                    {p.bedrooms} Bedrooms
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">{p.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProperties;
