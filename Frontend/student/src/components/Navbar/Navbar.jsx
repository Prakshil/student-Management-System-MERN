import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              StudentMS
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-neutral-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Dashboard
                </motion.button>
                {user.role === 'admin' && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin')}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Admin Panel
                  </motion.button>
                )}
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-white hover:text-blue-400 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 space-y-2 border-t border-white/10">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium"
                >
                  Dashboard
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      navigate('/admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white rounded-lg font-medium"
                  >
                    Admin Panel
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;