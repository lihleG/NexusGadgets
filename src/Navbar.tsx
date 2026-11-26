
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
  FaTv,
  FaCamera,
  FaGamepad,
  FaDesktop,
  FaPlug,
  FaSignOutAlt,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";

import { auth, googleProvider } from "./firebase/firebase";
import logo from "./assets/logo.png";

const categories = [
  { icon: <FaLaptop />, label: "laptops" },
  { icon: <FaMobileAlt />, label: "mobile-phones" },
  { icon: <FaHeadphones />, label: "headphones" },
  { icon: <FaTv />, label: "televisions" },
  { icon: <FaCamera />, label: "cameras" },
  { icon: <FaGamepad />, label: "gaming" },
  { icon: <FaDesktop />, label: "monitors" },
  { icon: <FaPlug />, label: "accessories" },
];

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);

  const navigate = useNavigate();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((previous) => !previous);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
    setIsDropdownOpen(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isDropdownOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        navbarRef.current &&
        !navbarRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const AccountDropdown = () => (
    <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-xl shadow-2xl py-2 z-[100] border border-gray-100 text-gray-800">
      {user ? (
        <>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900">
              Welcome, {user.displayName?.split(" ")[0] || "Friend"}!
            </p>
            <p className="text-xs text-gray-500 truncate mt-1">
              {user.email}
            </p>
          </div>

          <Link
            to="/account"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-purple-50 transition"
          >
            <FaUser className="text-purple-600" />
            Account Settings
          </Link>

          <Link
            to="/orders"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-purple-50 transition"
          >
            <FaShoppingCart className="text-purple-600" />
            My Orders
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-purple-50 transition"
          >
            <FaHeart className="text-purple-600" />
            My Wishlist
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-gray-900">
              Welcome to Nexus Gadgets
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Sign in to manage your account and orders.
            </p>
          </div>

          <Link
            to="/login"
            onClick={() => setIsDropdownOpen(false)}
            className="block mx-3 my-3 text-center bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Sign In / Register
          </Link>

          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-3 flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition"
          >
            <span className="font-bold text-blue-600 text-lg">G</span>
            Continue with Google
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div
        ref={navbarRef}
        className="sticky top-0 z-50 force-gradient navbar-container"
      >
        <nav className="text-white">

          {/* Main Navbar */}
          <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Nexus Gadgets"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleSearch()
                }
                placeholder="Search for electronics..."
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-l-full pl-5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-5 py-2 transition"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">

              <Link
                to="/find-store"
                className="text-sm font-medium hover:text-white/75 transition"
              >
                Find a Store
              </Link>

              <Link
                to="/"
                className="text-sm font-medium hover:text-white/75 transition"
              >
                Home
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm hover:text-white/75 transition"
              >
                <FaHeart className="text-lg" />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>

              {/* Account Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  disabled={loading}
                  className="flex items-center gap-2 bg-white text-purple-800 hover:bg-purple-50 px-4 py-2.5 rounded-full font-bold shadow-md transition whitespace-nowrap"
                >
                  <FaUser />

                  <span>
                    {loading
                      ? "Loading..."
                      : user
                        ? user.displayName?.split(" ")[0] || "My Account"
                        : "Sign In / Register"}
                  </span>
                </button>

                {isDropdownOpen && <AccountDropdown />}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:text-white/75 transition"
                aria-label="Shopping cart"
              >
                <FaShoppingCart className="text-xl" />
              </Link>
            </div>

            {/* Mobile Account and Cart */}
            <div className="flex md:hidden items-center gap-3">

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  disabled={loading}
                  className="flex items-center gap-2 bg-white text-purple-800 px-3 py-2 rounded-full font-bold text-xs shadow-md hover:bg-purple-50 transition"
                >
                  <FaUser />

                  {loading
                    ? "..."
                    : user
                      ? "Account"
                      : "Sign In"}
                </button>

                {isDropdownOpen && <AccountDropdown />}
              </div>

              <Link
                to="/cart"
                className="p-2 hover:text-white/75 transition"
                aria-label="Shopping cart"
              >
                <FaShoppingCart className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden force-gradient transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-[80vh] overflow-y-auto"
                : "max-h-0 overflow-hidden"
            }`}
          >

            {/* Mobile Search */}
            <div className="p-4 border-b border-white/20 sticky top-0 bg-gradient-to-r from-purple-700 to-blue-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && handleSearch()
                  }
                  placeholder="Search for electronics..."
                  className="bg-white/20 text-white border border-white/30 rounded-l-full pl-5 py-2 w-full focus:outline-none placeholder-white/70"
                />

                <button
                  onClick={handleSearch}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-5 py-2"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="py-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-6 hover:bg-white/10"
              >
                Home
              </Link>

              <Link
                to="/find-store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-6 hover:bg-white/10"
              >
                Find a Store
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-6 hover:bg-white/10"
              >
                <FaHeart />
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-6 hover:bg-white/10"
              >
                <FaShoppingCart />
                Shopping Cart
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="py-4 px-2 border-t border-white/20">
              <h3 className="px-4 py-2 font-bold text-lg">
                Shop Categories
              </h3>

              <div className="grid grid-cols-2 gap-2 px-2">
                {categories.map((item) => (
                  <Link
                    to={`/category/${item.label}`}
                    key={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center p-3 rounded-lg hover:bg-white/10 transition"
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 border border-white/30 mr-3">
                      {item.icon}
                    </div>

                    <span className="font-medium capitalize text-sm">
                      {item.label.replace(/-/g, " ")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Account Actions */}
            <div className="p-4 border-t border-white/20">
              {user ? (
                <>
                  <p className="text-sm text-white/80 mb-3">
                    Signed in as {user.displayName || user.email}
                  </p>

                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center bg-white text-purple-800 font-bold py-3 rounded-lg mb-3"
                  >
                    Account Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-white/40 py-3 rounded-lg hover:bg-white/10"
                  >
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center text-sm text-white/80 mb-3">
                    Join Nexus Gadgets today.
                  </p>

                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center bg-white text-purple-800 font-bold py-3 rounded-lg hover:bg-purple-50 transition"
                  >
                    Sign In / Create Account
                  </Link>

                  <button
                    onClick={handleGoogleLogin}
                    className="w-full mt-3 flex items-center justify-center gap-3 bg-white/10 border border-white/40 py-3 rounded-lg hover:bg-white/20 transition"
                  >
                    <span className="font-bold text-lg">G</span>
                    Continue with Google
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Desktop Category Navigation */}
          <div className="hidden md:block py-4">
            <div className="container mx-auto px-6 flex justify-center overflow-x-auto space-x-8 pb-2 scrollbar-hide">
              {categories.map((item) => (
                <Link
                  to={`/category/${item.label}`}
                  key={item.label}
                  className="flex-shrink-0 text-center space-y-2 cursor-pointer group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg group-hover:bg-white/30 transition-all mx-auto">
                    <span className="text-white text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                  </div>

                  <span className="text-sm font-medium text-white/90 group-hover:text-white capitalize">
                    {item.label.replace(/-/g, " ")}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Welcome Banner */}
          {user && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-2 text-center">
              <div className="container mx-auto flex justify-center items-center px-3">
                <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  <FaUser className="text-xs text-white" />
                </div>

                <p className="text-white font-medium text-sm">
                  Welcome back, {user.displayName || "Friend"}! Enjoy your shopping experience.
                </p>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;



