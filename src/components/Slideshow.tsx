import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GadgetsImage from '../assets/Gadgets.jpg';
import SmartTvImage from '../assets/smart Tv.jpg';
import SmartwatchesImage from '../assets/smartwatches.jpg';

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    const slides = [
        {
            image: SmartwatchesImage,
            title: 'Next-Gen Wearable Tech',
            text: 'Track your fitness, monitor health metrics and stay connected',
            route: '/category/accessories',
        },
        {
            image: SmartTvImage,
            title: 'Cinematic Experience at Home',
            text: '4K QLED Display with Dolby Atmos|Voice-controlled Smart Hub',
            route: '/category/televisions',
        },
        {
            image: GadgetsImage,
            title: 'Cutting-Edge Gadgets for 2025',
            text: 'Exclusive extra 15% off first order',
            route: '/category/gadgets',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleNavigation = (route: string) => {
        if (route) {
            navigate(route); // Navigate to the specified route
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-4 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/60 text-white p-4 rounded-lg max-w-xs md:max-w-md z-10">
                            <h2 className="text-xl md:text-2xl font-bold mb-2">{slide.title}</h2>
                            <p className="text-sm md:text-base mb-3">{slide.text}</p>
                            {slide.route && (
                                <button
                                    onClick={() => handleNavigation(slide.route)}
                                    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-800 transition-colors"
                                >
                                    Go to {slide.title}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center space-x-2 py-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;


     
