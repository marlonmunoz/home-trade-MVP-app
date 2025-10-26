// This is the Navigation bar that appear on all pages

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    HomeTrade
                </Link>

                <div className="space-x-4">
                    <Link
                        to="/"
                        className={`${
                            location.pathname === "/" ? "text-blue-600" : "text-gray-700"
                        }   hover:text-blue-600 font-medium`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Login
                    </Link>

                    <Link
                        to="register"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;