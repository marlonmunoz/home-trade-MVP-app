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
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg border border-gray-400 dark:border-white transition-colors"
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
