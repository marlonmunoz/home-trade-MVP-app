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
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HomeTrade
        </Link>

        <div className="space-x-4">
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
              {user.role === "seller" && (
                <Link
                  to="/property/:id"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  My Listings
                </Link>
              )}
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
