import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, triggerThemeTransition } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${rect.left + rect.width / 2}px`;
    const y = `${rect.top + rect.height / 2}px`;
    triggerThemeTransition(x, y);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Tooltip BELOW button */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-16 left-[-100%] -translate-x-1/2 px-2 py-1 rounded text-xs shadow-lg whitespace-nowrap ${
              theme === "dark"
                ? "bg-gray-800 text-purple-300"
                : "bg-gray-100 text-blue-600"
            }`}
          >
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 
                   hover:bg-gray-300 dark:hover:bg-gray-600 
                   border border-gray-400 dark:border-gray-500 
                   transition-all duration-300 flex items-center justify-center shadow-sm"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            // 🌙 Moon
            <motion.svg
              key="moon"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1e293b"
              className="w-5 h-5"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.58 9.79z" />
            </motion.svg>
          ) : (
            // ☀️ Sun
            <motion.svg
              key="sun"
              initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 360, scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
