import React, { useEffect, useState, useRef } from "react"; // 🆕 added useRef

const AllProperties = () => {
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

  const [showFilterBar, setShowFilterBar] = useState(true); // 🆕 for show/hide animation
  const lastScrollY = useRef(0); // 🆕 keep track of scroll direction

  // 🆕 Scroll listener to toggle filter bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setShowFilterBar(false);
      } else {
        // scrolling up
        setShowFilterBar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load listings
  useEffect(() => {
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
  }, []);

  // Filtering logic
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

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        All Properties
      </h1>

      {/* 🆕 Sticky + Animated Filter Bar */}
      <div
        className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-8 flex flex-wrap gap-3 justify-center
          sticky top-0 z-40 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 
          transition-transform duration-500 ease-in-out 
          ${showFilterBar ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* 🔍 Search bar */}
        <input
          type="text"
          placeholder="Search by title or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        />

        {/* 🏠 Property type filter */}
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-1/5"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>

        {/* 🛏 Bedrooms filter */}
        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-1/6"
        >
          <option value="">Any Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>

        {/* 💰 Min and Max Price */}
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="border p-2 rounded w-full sm:w-1/6"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="border p-2 rounded w-full sm:w-1/6"
        />
      </div>

      {/* 🏡 Filtered Results */}
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
                      "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/400x250?text=No+Image"
                  alt="Placeholder"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
