import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <img
            src="/Lapis-Legit/Logo.jpeg"
            alt="Lapis Legit Kedaton Logo"
            className="h-10 mr-2"
          />
          <span className="font-serif text-lg hover:text-yellow-300 transition duration-300">
            Lapis Legit Kedaton
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-yellow-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300">About</Link>
          </li>
          <li>
            <Link to="/product" className="hover:text-yellow-300">Product</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
          </li>

          {/* Profile - Ikon saja di desktop */}
          <li>
            <Link 
              to="/profile" 
              className="hover:text-yellow-300 focus:outline-none" 
              aria-label="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </li>

          {/* Cart Button with Badge */}
          <li>
            <div className="relative">
              <Link
                to="/cart"
                className="bg-yellow-400 text-black text-xl py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300"
              >
                🛒
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
          </li>

          <li>
            <LoginButton />
          </li>
        </ul>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4 bg-blue-700 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
          <li>
            <Link
              to="/"
              onClick={toggleMenu}
              className="block hover:text-yellow-300 py-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block hover:text-yellow-300 py-2"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              onClick={toggleMenu}
              className="block hover:text-yellow-300 py-2"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block hover:text-yellow-300 py-2"
            >
              Contact
            </Link>
          </li>

          {/* Profile - Tampilkan ikon + teks di mobile */}
          <li>
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="flex items-center hover:text-yellow-300 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </Link>
          </li>

          {/* Cart Button with Badge (Mobile) */}
          <li>
            <div className="relative w-fit">
              <Link
                to="/cart"
                onClick={toggleMenu}
                className="block bg-yellow-400 text-black text-xl py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300"
              >
                🛒
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
          </li>

          <li>
            <LoginButton />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar; 