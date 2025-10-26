import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyListing = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (user && user.role === "seller") {
            const key = `listings_${user.email}`;
            const saved = JSON.parse(localStorage.getItem(key)) || [];
            setListings(saved);
        } else {
            navigate("/login")
        }
    }, [user, navigate]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                My Listings
            </h1>

            {listings.length === 0 ? (
                <div>
                    No listings yet. {" "}
                    <button
                        onClick={() => navigate("/add-property")}
                        className="text-blue-600 font-semibold hover:uderlined"
                    >
                        Add one now
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <h2 className="text-xl font-semibold mb-1 text-blue-600">
                                {p.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {p.propertyType} in {p.city}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 font-bold mt-2">
                                $ {p.price}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{p.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListing;
