import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 via-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl tracking-wider uppercase font-black">
            HOME TRADE TECH
          </h1>
        </header>

        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              YOUR ONLY REAL ESTATE PLATFORM
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                         text-white font-semibold px-6 py-3 rounded-lg shadow-md
                         hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                         transition-all duration-300 border border-gray-400 dark:border-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
