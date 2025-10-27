import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  PlusCircle,
  List,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <nav className="hidden md:flex bg-white dark:bg-gray-900 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Home className="w-6 h-6" /> HomeTrade
          </Link>

          <div className="space-x-4 flex items-center">
            {/* --- Guest Links --- */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <UserPlus size={18} /> Register
                </Link>
              </>
            ) : (
              <>
                {/* --- Logged-in User --- */}
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Hi, {user.name.split(" ")[0]}
                </span>

                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1 ${
                    location.pathname === "/dashboard"
                      ? "text-blue-600"
                      : "text-gray-700"
                  } hover:text-blue-600 font-medium`}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                {/* --- Seller-only Links --- */}
                {user.role === "seller" && (
                  <>
                    <Link
                      to="/add-property"
                      className={`flex items-center gap-1 ${
                        location.pathname === "/add-property"
                          ? "text-blue-600"
                          : "text-gray-700"
                      } hover:text-blue-600 font-medium`}
                    >
                      <PlusCircle size={18} /> Add Property
                    </Link>

                    <Link
                      to="/my-listings"
                      className={`flex items-center gap-1 ${
                        location.pathname === "/my-listings"
                          ? "text-blue-600"
                          : "text-gray-700"
                      } hover:text-blue-600 font-medium`}
                    >
                      <List size={18} /> My Listings
                    </Link>
                  </>
                )}

                {/* --- Logout --- */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 font-semibold hover:underline"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* --- Mobile Bottom Bar with Tooltips --- */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-3 z-50">
          {/* Home */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/"
              className="flex flex-col items-center text-gray-700 dark:text-gray-200"
            >
              <Home size={22} />
            </Link>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Home
            </span>
          </div>

          {/* Dashboard */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/dashboard"
              className="flex flex-col items-center text-gray-700 dark:text-gray-200"
            >
              <LayoutDashboard size={22} />
            </Link>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Dashboard
            </span>
          </div>

          {/* Seller-only Buttons */}
          {user.role === "seller" && (
            <>
              <div className="relative group flex flex-col items-center">
                <Link
                  to="/add-property"
                  className="flex flex-col items-center text-gray-700 dark:text-gray-200"
                >
                  <PlusCircle size={22} />
                </Link>
                <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
                  Add Property
                </span>
              </div>

              <div className="relative group flex flex-col items-center">
                <Link
                  to="/my-listings"
                  className="flex flex-col items-center text-gray-700 dark:text-gray-200"
                >
                  <List size={22} />
                </Link>
                <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
                  My Listings
                </span>
              </div>
            </>
          )}

          {/* Logout */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center text-red-600"
            >
              <LogOut size={22} />
            </button>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Logout
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
