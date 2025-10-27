import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🏠 Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          HomeTrade
        </Link>

        {/* 🌐 Navigation Links */}
        <div className="space-x-4 flex items-center">
          {/* 👤 Guest view (no user logged in) */}
          {!user ? (
            <>
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600 font-medium`}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-blue-600"
                    : "text-gray-700"
                } hover:text-blue-600 font-medium`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* 👋 Logged-in user view */}
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Hi, {user.name.split(" ")[0]}
              </span>

              <Link
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard"
                    ? "text-blue-600"
                    : "text-gray-700"
                } hover:text-blue-600 font-medium`}
              >
                Dashboard
              </Link>

              {/* 🏠 Seller-only links */}
              {user.role === "seller" && (
                <>
                  <Link
                    to="/add-property"
                    className={`${
                      location.pathname === "/add-property"
                        ? "text-blue-600"
                        : "text-gray-700"
                    } hover:text-blue-600 font-medium`}
                  >
                    Add Property
                  </Link>

                  <Link
                    to="/my-listings"
                    className={`${
                      location.pathname === "/my-listings"
                        ? "text-blue-600"
                        : "text-gray-700"
                    } hover:text-blue-600 font-medium`}
                  >
                    My Listings
                  </Link>
                </>
              )}

              {/* 🚪 Logout button */}
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
