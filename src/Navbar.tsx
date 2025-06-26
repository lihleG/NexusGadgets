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
  FaTimes
} from "react-icons/fa";
import { useAuthState, useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "./firebase/firebase";
import logo from './assets/logo.png';

const categories = [
  { icon: <FaLaptop className="text-xl" />, label: "laptops" },
  { icon: <FaMobileAlt className="text-xl" />, label: "mobile-phones" },
  { icon: <FaHeadphones className="text-xl" />, label: "headphones" },
  { icon: <FaTv className="text-xl" />, label: "televisions" },
  { icon: <FaCamera className="text-xl" />, label: "cameras" },
  { icon: <FaGamepad className="text-xl" />, label: "gaming" },
  { icon: <FaDesktop className="text-xl" />, label: "monitors" },
  { icon: <FaPlug className="text-xl" />, label: "accessories" },
];

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDropdownOpen && !(e.target as HTMLElement).closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
      
      if (isMobileMenuOpen && mobileMenuRef.current && 
          !mobileMenuRef.current.contains(e.target as Node) &&
          !navbarRef.current?.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, isMobileMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div 
        ref={navbarRef} 
        className="sticky top-0 z-50 force-gradient navbar-container"
      >
        <nav className="text-white">
          <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
            <button 
              className="mobile-menu-toggle md:hidden text-white p-2 rounded-lg hover:bg-white/20"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>

            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>

            <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for electronics..."
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-l-full pl-5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-5 py-2"
              >
                <FaSearch />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/find-store" 
                className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Find a Store</span>
              </Link>
              <Link 
                to="/" 
                className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Home</span>
              </Link>
              
              <Link 
                to="/wishlist" 
                className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2"
              >
                <FaHeart className="text-lg" />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>
              
              <div className="relative user-dropdown">
                <div 
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FaUser className="text-lg" />
                  </div>
                  {user && (
                    <span className="hidden xl:inline text-sm font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                      Hi, {user.displayName?.split(' ')[0] || "Friend"}!
                    </span>
                  )}
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            Hi, {user.displayName?.split(' ')[0] || "Friend"}!
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Account Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleGoogleLogin}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center justify-center w-5 h-5 bg-white border border-gray-300 rounded-full mr-2">
                            <div className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G</span>
                            </div>
                          </div>
                          Sign in with Google
                        </button>
                        <div className="px-4 py-2 text-xs text-gray-500 text-center">
                          Or <Link to="/login" className="text-blue-600 hover:underline">use email</Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl hover:text-white transition-colors" />
              </Link>
            </div>

            <div className="flex md:hidden items-center space-x-4">
              <div className="relative user-dropdown">
                <div 
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FaUser className="text-lg" />
                  </div>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            Hi, {user.displayName?.split(' ')[0] || "Friend"}!
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Account Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:极bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleGoogleLogin}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center justify-center w-5 h-5 bg-white border border-gray-300 rounded-full mr-2">
                            <div className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G</span>
                            </div>
                          </div>
                          Sign in with Google
                        </button>
                        <div className="px-4 py-2 text-xs text-gray-500 text-center">
                          Or <Link to="/login" className="text-blue-600 hover:underline">use email</Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu - Updated with scrollable area */}
          <div 
            ref={mobileMenuRef}
            className={`md:hidden force-gradient z-40 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
            }`}
          >
            {/* Sticky search bar */}
            <div className="p-4 border-b border-white/20 sticky top-0 bg-gradient-to-r from-purple-700 to-blue-700">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search for electronics..."
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-l-full pl-5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-5 py-2"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className="py-2">
              <Link 
                to="/find-store" 
                className="block py-3 px-6 text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find a Store
              </Link>
              <Link 
                to="/" 
                className="block py-3 px-6 text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/wishlist" 
                className="block py-3 px-6 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHeart className="text-lg" /> Wishlist
              </Link>
            </div>

            {/* Categories with sticky header */}
            <div className="py-4 px-2">
              <h3 className="px-4 py-2 text-white font-bold text-lg sticky top-0 bg-gradient-to-r from-purple-700 to-blue-700 z-10">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2 px-2">
                {categories.map((item, index) => (
                  <Link
                    to={`/category/${item.label}`} 
                    key={index}
                    className="flex items-center p-3 bg-transparent rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mr-3">
                      {item.icon}
                    </div>
                    <span className="text-white font-medium capitalize">
                      {item.label.replace(/-/g, ' ')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Category Navigation */}
          <div className="hidden md:block py-4">
            <div className="container mx-auto px-6 flex justify-center overflow-x-auto space-x-8 pb-2 scrollbar-hide">
              {categories.map((item, index) => (
                <Link
                  to={`/category/${item.label}`} 
                  key={index}
                  className="flex-shrink-0 text-center space-y-2 cursor-pointer group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg group-hover:bg-white/30 transition-all mx-auto">
                    <span className="text-white group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {item.label.replace(/-/g, ' ')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Welcome Banner */}
          {user && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-2 text-center">
              <div className="container mx-auto flex justify-center items-center">
                <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center mr-2 backdrop-blur-sm">
                  <FaUser className="text-xs text-white" />
                </div>
                <p className="text-white font-medium text-sm">
                  Welcome back, {user.displayName}! Enjoy your shopping experience.
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


