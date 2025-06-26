import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    category: "Camera & Photography",
    name: "Canon Camera",
    price: "5499.00",
    image: "/assets/camera.webp",
    labels: ["New"],
  },
  {
    id: 2,
    category: "Computers & Laptops",
    name: "Hp desktop",
    price: "6499.00",
    originalPrice: "9499.00",
    image: "/assets/computer.jpeg",
    labels: ["Sale", "Best Choice"],
  },
  {
    id: 3,
    category: "Gaming",
    name: "Xbox one Remote",
    price: "899.00",
    image: "/assets/Game remote.png",
    labels: ["New"],
  },
  {
    id: 4,
    category: "Gadgets",
    name: "Apple Smartwatch",
    price: "6499.00",
    image: "/assets/apple watch.webp",
    labels: ["Best Choice"],
  },
];

export default function ElectronicStore() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShopClick = (category: string) => {
    // Map category to routes
    const categoryRoutes: { [key: string]: string } = {
      "Camera & Photography": "/category/cameras",
      "Computers & Laptops": "/category/laptops",
      "Gaming": "/category/gaming",
      "Gadgets": "/category/accessories",
    };

    const route = categoryRoutes[category];
    if (route) {
      navigate(route); // Navigate to the appropriate route
    } else {
      console.error(`No route defined for category: ${category}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.labels && product.labels.length > 0 && (
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.labels.map((label, index) => (
                    <span
                      key={index}
                      className="bg-white text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
              <h3 className="text-lg font-medium mt-1 mb-2">{product.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">R{product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm line-through text-gray-400">
                    R{product.originalPrice}
                  </p>
                )}
              </div>
              <button
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 rounded-md hover:from-purple-700 hover:to-purple-900 transition-colors duration-300"
                onClick={() => handleShopClick(product.category)} // Add onClick handler
              >
                Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
