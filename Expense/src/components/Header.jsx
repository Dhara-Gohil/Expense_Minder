// Header.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-100 to-yellow-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
      <a href="/" className="text-2xl font-bold tracking-wide  px-2 py-1 rounded text-black">
  Expense<span className="text-yellow-300">Minder</span>
</a>
        <nav className="hidden md:flex space-x-8 font-medium">
          <a href="/" className="hover:text-yellow-700 transition text-black">Home</a>
          <a href="/features" className="hover:text-yellow-700 transition text-black">Features</a>
          <a href="/pricing" className="hover:text-yellow-700 transition text-black">Pricing</a>
          <a href="/contact" className="hover:text-yellow-700 transition text-black">Contact</a>
          <a href="/signup" className="hover:text-yellow-700 transition text-black">Sign Up</a>
          <a href="/login" className="hover:text-yellow-700 transition text-black">Login</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`md:hidden bg-gradient-to-br from-yellow-100 to-gray-200 px-6 py-4 text-black shadow-md rounded-b-xl text-center transform transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 max-h-screen scale-100' : 'opacity-0 max-h-0 scale-95 overflow-hidden'
        }`}
        >
        <a href="/" className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200">Home</a>
        <a href="/features" className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200">Features</a>
        <a href="/pricing" className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200">Pricing</a>
        <a href="/signup" className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200">Sign Up</a>
        <a href="/login" className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200">Login</a>
        </div>

    </header>
  );
}