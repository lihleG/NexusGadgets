import React from "react";

const TopBrands: React.FC = () => {
  const brandLogos = [
    { name: "apple", src: "/assets/apple.png" },
    { name: "samsung", src: "/assets/samsung.png" },
    { name: "fitbit", src: "/assets/fitbit.png" },
    { name: "garmin", src: "/assets/garmin.png" },
    { name: "hp", src: "/assets/hp.png" },
    { name: "hisense", src: "/assets/Hisense.jpeg" },
    { name: "LG", src: "/assets/LG.jpeg" },
    { name: "sony", src: "/assets/sony.png" },
    { name: "xbox", src: "/assets/xbox.png" },
  ];

  const featuredBrands = [
    { name: "Apple", src: "/assets/apple1.jpeg" },
    { name: "Samsung", src: "/assets/samsung1.jpeg" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Top Brands</h2>

      {/* Featured Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 md:px-20">
        {featuredBrands.map((brand, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
            />
            <span className="absolute bottom-4 left-4 text-white text-lg font-semibold bg-black bg-opacity-60 px-4 py-2 rounded">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      {/* Scrolling Brand Logos */}
      <div className="mt-14 overflow-hidden">
        <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
          {brandLogos.concat(brandLogos).map((brand, index) => (
            <img
              key={index}
              src={brand.src}
              alt={brand.name}
              className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300 mx-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;

