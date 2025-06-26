// src/components/WishlistIcon.tsx
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistIcon: React.FC = () => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Function to update wishlist count
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlistItems = JSON.parse(savedWishlist);
        setWishlistCount(wishlistItems.length);
      } else {
        setWishlistCount(0);
      }
    };

    // Load initial count
    updateWishlistCount();
    
    // Listen for wishlist updates from any page
    window.addEventListener('storage', updateWishlistCount);
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    
    return () => {
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  return (
    <Link to="/wishlist" className="relative mr-4">
      <FaHeart className="text-xl hover:text-white transition-colors" />
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;