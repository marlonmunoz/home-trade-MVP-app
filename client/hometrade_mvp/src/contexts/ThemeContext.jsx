import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pulseOrigin, setPulseOrigin] = useState({ x: "50%", y: "50%" }); // center by default

  // 🧠 Detect saved or system theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (systemDark ? "dark" : "light"));

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => !saved && setTheme(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 🎨 Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.backgroundColor = theme === "dark" ? "#111827" : "#ffffff";
    document.body.classList.add("transition-colors", "duration-500", "ease-in-out");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ⚡ Triggered by ThemeToggle
  const triggerThemeTransition = (x, y) => {
    setPulseOrigin({ x, y });
    setIsTransitioning(true);

    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
      setTimeout(() => setIsTransitioning(false), 600);
    }, 200);
  };

  return (
    <ThemeContext.Provider value={{ theme, triggerThemeTransition }}>
      {/* 🌈 Overlay and energy pulse */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Fade gradient overlay */}
            <motion.div
              key="theme-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`
                fixed inset-0 z-[9998] pointer-events-none 
                bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-900
                dark:from-purple-900 dark:via-blue-800 dark:to-gray-900
                blur-sm
              `}
            />

            {/* Energy pulse originating from toggle */}
            <motion.div
              key="glow-pulse"
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{
                scale: [0, 1.2, 2.5],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
              style={{
                left: pulseOrigin.x,
                top: pulseOrigin.y,
                transform: "translate(-50%, -50%)",
              }}
              className={`
                fixed rounded-full w-[200vw] h-[200vw]
                bg-gradient-radial from-blue-400/40 via-purple-500/25 to-transparent
                dark:from-purple-700/30 dark:via-blue-400/20 dark:to-transparent
                blur-3xl z-[9999]
              `}
            />
          </>
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
