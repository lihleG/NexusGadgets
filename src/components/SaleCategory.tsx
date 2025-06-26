import React from "react";
import { useNavigate } from "react-router-dom";

const saleItems = [
  { 
    name: "Smart Speakers", 
    image: "https://images.unsplash.com/photo-1586078875290-c22eb791ad5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "/category/accessories" 
  },
  { 
    name: "Open-Box TVs", 
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    route: "/category/television"
  },
  { 
    name: "Gaming Consoles", 
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    route: "/category/gaming" 
  },
  { 
    name: "Mobile Accessories", 
    image: "https://images.unsplash.com/photo-1573739022854-abceaeb585dc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "/category/mobilephones"
  },
  { 
    name: "Laptops", 
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    route: "/category/laptops"
  },
];

export function ElectronicSale() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl shadow-lg inline-block">
          Electronics Super Sale
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Limited time offers on premium electronics
        </p>
      </div>

      {/* Sale Items Grid with Product Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {saleItems.map((item) => (
          <div
            key={item.name}
            className="group flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
          >
            {/* Product Image */}
            <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-gray-800 font-semibold text-lg text-center">
              {item.name}
            </span>
            <button
              className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              onClick={() => navigate(item.route)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>

      {/* Featured Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            title="iPhone 14 Pro" 
            price="R18,999.00" 
            originalPrice="R24,199.60" 
            category="COMPUTERS & LAPTOPS"
            image="https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            route="/category/mobile-phones"
          />
          <ProductCard 
            title="Camera" 
            price="R5,499.00" 
            category="CAMERA & PHOTOGRAPHY"
            image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            route="/category/cameras"
          />
          <ProductCard 
            title="Xbox One" 
            price="R8999.00" 
            category="GAMING"
            image="https://images.unsplash.com/photo-1612801799890-4ba4760b6590?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            route="/category/gaming"
          />
          <ProductCard 
            title="Apple Smartwatch" 
            price="R6,499.00" 
            category="GADGETS"
            image="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            route="/category/accessories"
          />
        </div>
      </div>
    </div>
  );
}

// Enhanced ProductCard with images and navigation
const ProductCard = ({ title, price, originalPrice, category, image, route }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex-grow">
        <span className="text-sm text-purple-600 font-medium">{category}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <div className="mt-3">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-4">
        <button 
          className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
          onClick={() => navigate(route)}
        >
          Shop
        </button>
      </div>
    </div>
  );
};