import React, { useState, useRef } from 'react';
import { products } from './product';

const ProductGrid = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const scrollContainerRef = useRef(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleImageError = (e) => {
    e.target.src = '/assets/fallback-image.jpg';
    e.target.alt = 'Product image not available';
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 4);
    setTimeout(() => {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="relative px-2 py-1">
      {/* Categories Header */}
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-lg font-medium">All Categories</h2>
        <p className="text-sm text-gray-500">What are you looking for?</p>
      </div>

      {/* Scrollable Product Row */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          style={{ marginLeft: '-12px' }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Product Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth py-2 px-2 space-x-3 no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 border border-gray-100 p-2 rounded hover:shadow transition-all"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 rounded overflow-hidden mb-1">
                <div className="pt-[100%] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`absolute top-0 left-0 w-full h-full object-contain p-2 transition-transform duration-200 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="text-[0.65rem] uppercase text-gray-400 tracking-wide">
                {product.category || 'ELECTRONICS'}
              </div>
              <h3 className="text-sm font-medium line-clamp-1 mt-0.5">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-bold">
                  R{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-[0.7rem] text-gray-400 line-through">
                    R{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Labels */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {['New', 'Sale', 'Bestseller'].filter(label => 
                  product.labels?.includes(label)
                ).map((label) => (
                  <span
                    key={label}
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      label === 'New' ? 'bg-green-100 text-green-800' :
                      label === 'Sale' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          style={{ marginRight: '-12px' }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreProducts}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium underline flex items-center justify-center mx-auto"
          >
            View More Products
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;