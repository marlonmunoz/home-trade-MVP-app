import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900/50 overflow-hidden text-gray-900 dark:text-white transition-colors">
      
      {/* Geometric Buildings Background */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-20 dark:opacity-5 pointer-events-none">
        {/* Building 1 */}
        <div className="absolute bottom-0 left-[10%] w-16 h-40 bg-gradient-to-t from-blue-400 to-blue-300 transform rotate-1"></div>
        <div className="absolute bottom-0 left-[12%] w-4 h-32 bg-blue-200"></div>
        
        {/* Building 2 */}
        <div className="absolute bottom-0 left-[20%] w-20 h-56 bg-gradient-to-t from-purple-400 to-purple-300 transform -rotate-1"></div>
        <div className="absolute bottom-0 left-[22%] w-6 h-48 bg-purple-200"></div>
        
        {/* Building 3 */}
        <div className="absolute bottom-0 left-[35%] w-14 h-44 bg-gradient-to-t from-indigo-400 to-indigo-300"></div>
        <div className="absolute bottom-0 left-[36%] w-3 h-36 bg-indigo-200"></div>
        
        {/* Building 4 */}
        <div className="absolute bottom-0 left-[50%] w-24 h-64 bg-gradient-to-t from-pink-400 to-pink-300 transform rotate-1"></div>
        <div className="absolute bottom-0 left-[53%] w-8 h-56 bg-pink-200"></div>
        
        {/* Building 5 */}
        <div className="absolute bottom-0 left-[70%] w-18 h-48 bg-gradient-to-t from-blue-400 to-blue-300 transform -rotate-2"></div>
        <div className="absolute bottom-0 left-[72%] w-5 h-40 bg-blue-200"></div>
        
        {/* Building 6 */}
        <div className="absolute bottom-0 left-[85%] w-16 h-52 bg-gradient-to-t from-purple-400 to-purple-300"></div>
        <div className="absolute bottom-0 left-[87%] w-4 h-44 bg-purple-200"></div>
      </div>
      
      {/* Floating Real Estate Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Home Icon 1 */}
        <div className="absolute top-[20%] left-[15%] opacity-15 dark:opacity-3 animate-float">
          <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        
        {/* Key Icon */}
        <div className="absolute top-[35%] right-[20%] opacity-15 dark:opacity-3 animate-float-delayed">
          <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Building Icon */}
        <div className="absolute top-[60%] left-[75%] opacity-15 dark:opacity-3 animate-float">
          <svg className="w-14 h-14 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Home Icon 2 */}
        <div className="absolute top-[45%] left-[5%] opacity-15 dark:opacity-3 animate-float-delayed">
          <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        
        {/* Location Pin */}
        <div className="absolute top-[25%] right-[10%] opacity-15 dark:opacity-3 animate-float">
          <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-3 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Main Content with Backdrop Blur */}
      <div className="relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 via-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl tracking-wider uppercase font-black mb-8">
              HOME TRADE TECH
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
              YOUR ONLY REAL ESTATE PLATFORM
            </p>
            
            <button
              onClick={() => navigate("/register")}
              className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                         text-white font-semibold px-8 py-4 rounded-lg shadow-md
                         hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                         transition-all duration-300 border border-gray-400 dark:border-white
                         text-lg md:text-xl"
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
