import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 🧠 Detect stored or system theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (systemDark ? "dark" : "light"));

    // 🔄 Listen for OS theme changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => !saved && setTheme(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 🎨 Apply and remember theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.backgroundColor = theme === "dark" ? "#111827" : "#ffffff";
    document.body.classList.add("transition-colors", "duration-500", "ease-in-out");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🌗 Fade cross-transition
  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
      setTimeout(() => setIsTransitioning(false), 400);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* ✨ Gradient overlay for theme crossfade */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="theme-fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`
              fixed inset-0 z-[9999] pointer-events-none 
              bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-900
              dark:from-purple-900 dark:via-blue-800 dark:to-gray-900
              opacity-90 blur-sm
            `}
          />
        )}
      </AnimatePresence>

      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
