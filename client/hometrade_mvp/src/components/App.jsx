// import '../App.css'
// import '../App.css'

import ThemeToggle from "./ThemeToggle"

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400">
            HOME TRADE TECH
          </h1>
          <ThemeToggle />
        </header>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Your only real state platform
            </p>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
