import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const AllProperties = () => {
  const { theme } = useTheme();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    city: "",
  });

  const [showFilterBar, setShowFilterBar] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(false);

  const lastScrollY = useRef(0);

  // 🧭 Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowFilterBar(false);
      } else {
        setShowFilterBar(true);
      }

      setShowScrollTop(currentScrollY > 500);
      lastScrollY.current = currentScrollY;

      // 🎉 Trigger pulse when reaching 100%
      if (scrollPercent >= 99.5 && !pulse) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pulse]);

  // 🏠 Load listings from localStorage
  // useEffect(() => {
  //   const allKeys = Object.keys(localStorage);
  //   const allListings = [];

  //   allKeys.forEach((key) => {
  //     if (key.startsWith("listings_")) {
  //       const data = JSON.parse(localStorage.getItem(key)) || [];
  //       allListings.push(...data);
  //     }
  //   });

  //   setListings(allListings);
  //   setFiltered(allListings);
  // }, []);

  // 🌐 Load listings from JSON Server API (COMMENTED OUT FOR GITHUB PAGES DEPLOYMENT)
  // useEffect(() => {
  //   fetch('http://localhost:3001/properties')
  //     .then(res => res.json())
  //     .then(data => {
  //       setListings(data);
  //       setFiltered(data);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching properties:', err);
  //       // Fallback to localStorage if API fails
  //       const allKeys = Object.keys(localStorage);
  //       const allListings = [];
  //       allKeys.forEach((key) => {
  //         if (key.startsWith("listings_")) {
  //           const data = JSON.parse(localStorage.getItem(key)) || [];
  //           allListings.push(...data);
  //         }
  //       });
  //       setListings(allListings);
  //       setFiltered(allListings);
  //     });
  // }, []);

  // 📦 Load listings from static JSON file (FOR GITHUB PAGES DEPLOYMENT)
  useEffect(() => {
    fetch('/home-trade-MVP-app/db.json')
      .then(res => res.json())
      .then(data => {
        setListings(data.properties);
        setFiltered(data.properties);
      })
      .catch(err => {
        console.error('Error fetching static properties:', err);
        // Fallback to localStorage if static file fails
        const allKeys = Object.keys(localStorage);
        const allListings = [];
        allKeys.forEach((key) => {
          if (key.startsWith("listings_")) {
            const data = JSON.parse(localStorage.getItem(key)) || [];
            allListings.push(...data);
          }
        });
        setListings(allListings);
        setFiltered(allListings);
      });
  }, []);

  // 🔍 Filtering logic
  useEffect(() => {
    let filteredResults = listings;

    if (search.trim()) {
      const term = search.toLowerCase();
      filteredResults = filteredResults.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term)
      );
    }

    if (filters.propertyType) {
      filteredResults = filteredResults.filter(
        (p) => p.propertyType === filters.propertyType
      );
    }

    if (filters.bedrooms) {
      filteredResults = filteredResults.filter(
        (p) => Number(p.bedrooms) === Number(filters.bedrooms)
      );
    }

    if (filters.city.trim()) {
      filteredResults = filteredResults.filter((p) =>
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filteredResults = filteredResults.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filteredResults = filteredResults.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    setFiltered(filteredResults);
  }, [search, filters, listings]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      city: "",
    });
    setSearch("");
    setFiltered(listings);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-10 relative">
      {/* 🌈 Scroll Progress Bar with gradient + pulse */}
      <div
        className={`fixed top-0 left-0 h-1 z-50 transition-all duration-200 ease-out
          ${pulse ? "animate-glowPulse" : ""}
          ${
            theme === "dark"
              ? "bg-[linear-gradient(90deg,#8b5cf6,#ec4899,#3b82f6,#8b5cf6)]"
              : "bg-[linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)]"
          }
          bg-[length:200%_200%] animate-gradientFlow`}
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* 🧮 Floating Percentage Label */}
      <div
        className="fixed top-2 z-50 flex flex-col items-center transition-opacity duration-300"
        style={{
          left: `${Math.min(scrollProgress, 96)}%`,
          opacity: scrollProgress > 2 && scrollProgress < 98 ? 1 : 0,
          transform: "translateX(-50%)",
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span
          className={`text-xs font-bold px-2 py-1 rounded shadow-md ${
            theme === "dark"
              ? "bg-purple-600 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {Math.round(scrollProgress)}%
        </span>

        {showTooltip && (
          <div
            className={`absolute top-6 text-xs px-2 py-1 rounded opacity-90 shadow-md transition-opacity duration-200 ${
              theme === "dark"
                ? "bg-gray-700 text-purple-300"
                : "bg-gray-200 text-blue-600"
            }`}
          >
            {scrollProgress >= 99
              ? "🎉 You've reached the end!"
              : `Scrolled ${Math.round(scrollProgress)}% of page`}
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center dark:text-purple-400">
        All Properties
      </h1>

      {/* 🔧 Sticky Filter Bar */}
      <div
        className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-8 flex flex-wrap gap-3 justify-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 transition-transform duration-500 ease-in-out ${
          showFilterBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <input
          type="text"
          placeholder="Search by title or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded w-full sm:w-1/4 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />

        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded w-full sm:w-1/5 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>

        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded w-full sm:w-1/6 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        >
          <option value="">Any Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>

        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded w-full sm:w-1/6 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded w-full sm:w-1/6 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
        />

        {/* 🌈 Gradient Reset Button */}
        <button
          onClick={handleReset}
          className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                     text-white font-medium px-4 py-2 rounded shadow-md
                     hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                     transition-all duration-300 focus:ring-2 focus:ring-offset-2
                     focus:ring-pink-400 dark:focus:ring-purple-500"
        >
          Reset Filters
        </button>
      </div>

      {/* 🏡 Property Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No properties match your filters.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white dark:bg-gray-800"
            >
              {p.imageUrl?.trim() ? (
                <img
                  src={p.imageUrl.trim()}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded mb-3"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x250?text=No+Image';
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/400x250?text=No+Image"
                  alt="Placeholder"
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold mb-1 text-blue-600 dark:text-purple-400">
                {p.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 capitalize">
                {p.propertyType}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                📍 {p.city}
              </p>
              <p className="text-gray-700 dark:text-gray-200 font-bold mt-2">
                ${p.price}
              </p>
              {p.bedrooms && (
                <p className="text-sm text-gray-500 mt-1">
                  {p.bedrooms} Bedrooms
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {p.description}
              </p>
              
              {/* View Details Button */}
              <Link
                to={`/property/${p.id}`}
                className="mt-4 inline-block bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                           text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md
                           hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                           transition-all duration-300 text-center w-full"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ⬆️ Back-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg 
          transition-all transform hover:scale-110 ${
            theme === "dark"
              ? "bg-[linear-gradient(90deg,#8b5cf6,#ec4899,#3b82f6,#8b5cf6)]"
              : "bg-[linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)]"
          } bg-[length:200%_200%] animate-gradientFlow ${
          showScrollTop
            ? "opacity-100 visible animate-bounceOnce"
            : "opacity-0 invisible pointer-events-none"
        } duration-500 ease-in-out hover:shadow-[0_0_16px_rgba(139,92,246,0.7)]`}
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
};

export default AllProperties;
