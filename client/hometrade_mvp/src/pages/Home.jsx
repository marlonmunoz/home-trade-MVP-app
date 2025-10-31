import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home as HomeIcon, DollarSign, Zap, Search, Smartphone, Shield } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  // Feature carousel state
  const features = [
    { 
      icon: HomeIcon, 
      text: "Direct buyer-seller connections without agents or escrow delays", 
      highlight: "Connect Directly",
      color: "text-blue-500 dark:text-blue-400",
      savings: "Save $15,000+ in agent fees"
    },
    { 
      icon: DollarSign, 
      text: "Transparent pricing with no hidden blockchain or crypto fees", 
      highlight: "Save Money",
      color: "text-green-500 dark:text-green-400",
      savings: "3% total fees vs 6% traditional"
    },
    { 
      icon: Zap, 
      text: "Close deals in days without complex AI escrow processes", 
      highlight: "Move Fast",
      color: "text-yellow-500 dark:text-yellow-400",
      savings: "30 days faster than traditional"
    },
    { 
      icon: Search, 
      text: "Smart property matching with blockchain-verified transactions", 
      highlight: "Smart Search",
      color: "text-purple-500 dark:text-purple-400",
      savings: "Blockchain-secured deals"
    },
    { 
      icon: Smartphone, 
      text: "Mobile-first platform built for regular people, not agents", 
      highlight: "Mobile Ready",
      color: "text-pink-500 dark:text-pink-400",
      savings: "Consumer-friendly design"
    },
    { 
      icon: Shield, 
      text: "Secure blockchain transactions with smart contract verification", 
      highlight: "Stay Safe",
      color: "text-indigo-500 dark:text-indigo-400",
      savings: "Blockchain-level security"
    }
  ];

  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-rotate features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleNotifySignup = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    // Save to localStorage for now (in production, this would go to a backend)
    const existingEmails = JSON.parse(localStorage.getItem("launch_notifications") || "[]");
    
    if (existingEmails.includes(email)) {
      setMessage("You're already signed up for notifications!");
      return;
    }

    existingEmails.push(email);
    localStorage.setItem("launch_notifications", JSON.stringify(existingEmails));

    setIsSubmitted(true);
    setMessage("🎉 Thank you! We'll notify you when we launch!");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage("");
    }, 5000);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900/50 overflow-hidden text-gray-900 dark:text-white transition-colors">
      
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
        {/* <div className="container mx-auto px-4 py-8 sm:py-16 min-h-screen flex items-center justify-center"> */}
        <div className="container mx-auto px-4 py-8 sm:py-16 min-h-screen flex items-center justify-center">
          <div className="text-center w-full max-w-4xl">
            {/* Marquee Text - Hidden on very small screens */}
            <div className="overflow-hidden whitespace-nowrap mb-2 sm:mb-4 hidden sm:block">
              <p className="inline-block animate-marquee text-gray-600 dark:text-gray-400 uppercase text-sm sm:text-lg md:text-xl">
                Be the first to know when we launch • Revolutionary real estate platform • Join the future of property trading • Be the first to know when we launch • Revolutionary real estate platform • Join the future of property trading • 
              </p>
            </div>
            
            {/* Main Title - Responsive sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientFlow bg-clip-text text-transparent drop-shadow-2xl tracking-wider font-black mb-4 leading-tight"> 
              HomeTrade TECHNOLOGIES
            </h1>
            
            {/* Subtitle - Responsive sizing */}
            <p className="text-gray-400 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-4 max-w-2xl mx-auto px-2">
              YOUR ONLY REAL ESTATE PLATFORM
            </p>
            
            {/* Competitive Differentiation */}
            <div className="mb-6 sm:mb-8">
              <p className="text-blue-600 dark:text-purple-400 text-lg sm:text-xl font-semibold mb-2">
                Skip the middlemen. Trade homes directly.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Secure blockchain transactions • No agent commissions • Direct peer-to-peer trading
              </p>
            </div>
            {/* Dynamic Feature Carousel */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-blue-200/60 dark:border-gray-700/50 shadow-lg shadow-blue-100/50 dark:shadow-gray-900/50">
                {/* Feature Icon and Highlight */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 bg-white/40 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm border border-blue-100 dark:border-gray-600 shadow-sm">
                    {React.createElement(features[currentFeature].icon, {
                      size: 28,
                      className: `${features[currentFeature].color} animate-pulse`
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-purple-400">
                    {features[currentFeature].highlight}
                  </h3>
                </div>
                
                {/* Feature Description with Fade Animation */}
                <p 
                  key={currentFeature} 
                  className="text-gray-600 dark:text-gray-300 animate-fade-in text-lg mb-2"
                >
                  {features[currentFeature].text}
                </p>
                
                {/* Savings Highlight */}
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                  {features[currentFeature].savings}
                </p>
                
                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentFeature 
                          ? 'bg-blue-500 dark:bg-purple-400 w-6' 
                          : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Feature ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quick Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-500 dark:text-purple-400">61+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-500">
                    {Object.keys(localStorage).filter(key => key.startsWith('listings_')).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-pink-500">50</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">States</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons Container - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-6 sm:mb-8 max-w-2xl mx-auto">
              
              {/* Email Signup Form */}
              {!isSubmitted ? (
                <form onSubmit={handleNotifySignup} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for launch updates"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:border-blue-500 dark:focus:border-purple-500 focus:outline-none
                               text-base sm:text-lg transition-colors duration-200
                               placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  
                  <button
                    type="submit"
                    className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                               text-white font-semibold px-6 py-3 rounded-lg shadow-md
                               hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                               transition-all duration-300 border border-gray-400 dark:border-white
                               text-base sm:text-lg whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 
                                  rounded-lg px-6 py-4 text-green-700 dark:text-green-400">
                    <p className="text-lg font-semibold">✅ You're on the list!</p>
                    <p className="text-sm">We'll email you when HomeTrade launches</p>
                  </div>
                </div>
              )}

              {/* Message Display */}
              {message && !isSubmitted && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center w-full">
                  {message}
                </p>
              )}
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300
                           font-medium text-base sm:text-lg underline decoration-2 underline-offset-4
                           hover:decoration-blue-700 dark:hover:decoration-purple-300 transition-colors"
              >
                Already have an account? Login
              </button>
              
              <span className="hidden sm:block text-gray-400">•</span>
              
              <button
                onClick={() => navigate("/register")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200
                           font-medium text-base sm:text-lg underline decoration-2 underline-offset-4
                           transition-colors"
              >
                Create Account Now
              </button>
            </div>
            
            {/* Additional Info for Mobile */}
            <div className="block sm:hidden">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Join the revolutionary real estate platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
