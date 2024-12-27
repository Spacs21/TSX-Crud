import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-200">
            DarkFoods
          </a>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:text-blue-400 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-blue-400 transition duration-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 transform hover:scale-105">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

