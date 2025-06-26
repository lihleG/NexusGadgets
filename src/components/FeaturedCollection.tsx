import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCollection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      title: "Summer Tech Essentials",
      description: "Must-have gadgets for the season",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      items: 24,
      link: "/category/laptops",
    },
    {
      id: 2,
      title: "Gaming Gear Bundle",
      description: "Complete setup for pro gamers",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      items: 15,
      link: "/category/gaming",
    },
    {
      id: 3,
      title: "Home Office Solutions",
      description: "Boost your productivity",
      image: "https://images.unsplash.com/photo-1624505055403-b215ee23f4a4?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 32,
      link: "/category/accessories",
    },
    {
      id: 4,
      title: "Audio & Headphones",
      description: "Premium sound experience",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      items: 18,
      link: "category/headphones",
    }
  ];

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Collections
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Curated selections of our best products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  {collection.title}
                </h3>
                <p className="text-gray-200 mt-1">{collection.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-300">
                    {collection.items} items
                  </span>
                  <button
                  onClick={() => handleNavigate(collection.link)}
                    className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
                  >
                    View Collection
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Browse All Collections
            <svg
              className="ml-3 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;