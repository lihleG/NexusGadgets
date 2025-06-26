import React from 'react';

const PopularDepartments = () => {
  const departments = [
    {
      title: "Home Audio",
      items: ["Amps", "Audio Accessories", "DACs & Streamers", "Surround Sound", "Loudspeakers"],
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Shop all",
      items: ["Smart Tech", "Fitness trackers", "Heart rate sensors", "Home Technology", "Smart watches", "Thermostats"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Digital Cameras",
      items: ["DSLR Cameras", "Point & Shoot Cameras", "Mirrorless Cameras", "Flashes & Lenses", "Camera Accessories"],
      image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Computing",
      items: ["Desktops", "Laptops", "External Hard Drives", "Monitors", "Storage"],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Shop all",
      items: ["Shop all"],
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
          Popular departments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {departments.map((department, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-xl p-6 border border-purple-900 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-purple-900/20"
            >
              {/* Added image container */}
              <div className="mb-4 h-40 w-full overflow-hidden rounded-lg">
                <img 
                  src={department.image} 
                  alt={department.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">{department.title}</h3>
              <ul className="space-y-2">
                {department.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors duration-200 group-hover:underline decoration-purple-500"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDepartments;