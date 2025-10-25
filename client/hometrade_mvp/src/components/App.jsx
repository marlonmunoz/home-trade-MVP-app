// import '../App.css'
// import '../App.css'

import ThemeToggle from "./ThemeToggle"

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">

        <header className="flex justify-between items-center mb-12">
          
          {/* <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 drop-shadow-lg shadow-white flex items-center gap-3"> */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 via-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl flex items-baseline gap-3 tracking-wider uppercase font-black">
            {/* <svg className="w-9 h-9 mb-1" fill="currentColor" viewBox="0 0 24 24"> */}
            {/* <svg className="w-10 h-10 text-orange-500 hover:scale-110 transition-transform duration-300 animate-bounce" fill="currentColor" viewBox="0 0 24 24"> */}
            <svg className="w-10 h-10 text-orange-500 hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            {/* <svg className="w-10 h-10 hover:rotate-12 hover:scale-110 transition-transform duration-500 ease-out" fill="currentColor" viewBox="0 0 24 24"> */}
            {/* <svg className="w-10 h-10 hover:scale-125 transition-transform duration-200 animate-pulse" fill="currentColor" viewBox="0 0 24 24"> */}
            {/* <svg className="w-10 h-10 hover:animate-bounce transition-all duration-300" fill="currentColor" viewBox="0 0 24 24"> */}
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            HOME TRADE TECH
          </h1>
          <ThemeToggle />
        </header>

        <div className="flex items-center justify-center">
          <div className="text-center">

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              YOUR ONLY REAL STATE PLATFORM
            </p>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg border border-gray-400 dark:border-white transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
