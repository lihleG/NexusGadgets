import React from "react";

const VideoBanner: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-black">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/assets/applewatch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        {/* Transparent Block */}
        <div className="bg-black bg-opacity-70 p-6 md:p-10 rounded-lg shadow-lg text-center max-w-md">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-500 mb-4">
            Apple Series 10
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Stay Connected, Stay Ahead
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all">
            Coming Soon!
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;

