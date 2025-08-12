import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserType(null);
        } else {
          setIsLoggedIn(true);
          setUserType(decoded.userType || null);

          if (window.location.pathname === "/") {
            if (decoded.userType === "shopkeeper") {
              navigate("/shopkeeper/dashboard");
            } else if (decoded.userType === "supplier") {
              navigate("/supplier/dashboard");
            }
          }
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserType(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, [navigate]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/login");
  };

  const handleHomeClick = () => {
    if (userType === "shopkeeper") {
      if (window.location.pathname !== "/shopkeeper/dashboard") {
        navigate("/shopkeeper/dashboard");
      }
    } else if (userType === "supplier") {
      if (window.location.pathname !== "/supplier/dashboard") {
        navigate("/supplier/dashboard");
      }
    } else {
      if (window.location.pathname !== "/") {
        navigate("/");  
      }
    }
  };

  const navItemsLoggedOut = (
    <>
      <Link to="/" className="hover:text-yellow-700 transition text-black">
        Home
      </Link>
      <Link to="/features" className="hover:text-yellow-700 transition text-black">
        Features
      </Link>
      <Link to="/pricing" className="hover:text-yellow-700 transition text-black">
        Pricing
      </Link>
      <Link to="/contact" className="hover:text-yellow-700 transition text-black">
        Contact
      </Link>
      <Link to="/signup" className="hover:text-yellow-700 transition text-black">
        Sign Up
      </Link>
    </>
  );

  const navItemsLoggedIn = (
    <>
      <button
        onClick={handleHomeClick}
        className="hover:text-yellow-700 transition text-black"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/contact")}
        className="hover:text-yellow-700 transition text-black"
      >
        Contact
      </button>
      <button
        onClick={handleLogout}
        className="hover:text-yellow-700 transition text-black"
      >
        Logout
      </button>
    </>
  );

  return (
    <header className="bg-gradient-to-r from-gray-100 to-yellow-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        <div
          onClick={handleHomeClick}
          className="mx-2 my-0.5 text-2xl font-bold tracking-wide px-2 py-1 rounded text-black cursor-pointer"
        >
          Expense<span className="text-yellow-300">Minder</span>
        </div>

        <nav className="hidden md:flex space-x-8 font-medium">
          {isLoggedIn ? navItemsLoggedIn : navItemsLoggedOut}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <ChevronUp size={24} className="text-black" />
          ) : (
            <ChevronDown size={24} className="text-black" />
          )}
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={`md:hidden bg-gradient-to-br from-yellow-100 to-gray-200 px-6 py-0 sm:py-4 text-black shadow-md rounded-b-xl text-center transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-screen scale-100"
            : "opacity-0 max-h-0 scale-95 overflow-hidden"
        }`}
      >
        {isLoggedIn ? (
          <>
            <button
              onClick={handleHomeClick}
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Contact
            </button>
            <button
              onClick={handleLogout}
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="block py-2 text-base font-medium hover:text-yellow-700 transition duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
