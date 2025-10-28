/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        // existing fade-in, bounceOnce, glowPulse, gradientFlow …
        gradientFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.2s ease-out forwards",
        bounceOnce: "bounceOnce 0.8s ease-out",
        glowPulse: "glowPulse 1.6s ease-in-out",
        gradientFlow: "gradientFlow 4s ease infinite",
      },
      backgroundImage: {
        // 🔹 Animated gradient for buttons and scroll bar
        "scroll-gradient":
          "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
        "button-gradient":
          "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
      },
    },
  },
  plugins: [],
};
