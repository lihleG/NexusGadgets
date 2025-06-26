import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alexandra Van Wyk",
      role: "Loyal Customer",
      comment: "The quality of service I received was exceptional. The team went above and beyond to meet my needs and delivered exactly what I was looking for.",
      rating: 5,
      avatar: "AV"
    },
    {
      id: 2,
      name: "Jessica Small",
      role: "Happy Client",
      comment: "Using this product transformed my daily routine. The results exceeded my expectations and I couldn't be happier with my purchase!",
      rating: 5,
      avatar: "SW"
    },
    {
      id: 3,
      name: "Isaac Thuwe",
      role: "Satisfied User",
      comment: "The product is incredibly well-designed and easy to use. It solved my problem efficiently and I would definitely recommend it to others.",
      rating: 4,
      avatar: "IT"
    },
    {
      id: 4,
      name: "Busisiwe Ndlovu",
      role: "Repeat Customer",
      comment: "The attention to detail and quality of this product is outstanding. It perfectly aligned with what I needed and I'll be buying again.",
      rating: 5,
      avatar: "BN"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-purple-500' : 'text-gray-700'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from real people who love our products and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-900 rounded-2xl p-6 border border-purple-900 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 shadow-lg shadow-purple-900/20"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-300 italic mb-6">
                "{testimonial.comment}"
              </p>
              
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-700 to-purple-900 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/30">
            Read More Customer Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;