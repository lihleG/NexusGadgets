import React from "react";

// Import payment method images
import visaImage from "/assets/visa.png";
import mastercardImage from "/assets/mastercard.png";
import paypalImage from "/assets/paypal.png";
import discoverImage from "/assets/discover.png";
import amexImage from "/assets/amex.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Delivery & Returns Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Delivery & returns</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Shipping information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Returns & refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Track your order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Help & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* About NexusGadgets Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About NexusGadgets</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Our brands
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Advice & Reforms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Sign up to our newsletter</h2>
            <p className="mb-4">
              Sign up for exclusive offers, original stories, events, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-400 flex-grow"
              />
              <button className="bg-purple-800 text-white px-4 py-2 rounded-r hover:bg-gray-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-semibold mb-4">We Accept</h3>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Use imported images */}
            <img
              src={visaImage}
              alt="Visa"
              className="w-12 h-8 object-contain border border-gray-200 rounded"
            />
            <img
              src={mastercardImage}
              alt="MasterCard"
              className="w-12 h-8 object-contain border border-gray-200 rounded"
            />
            <img
              src={paypalImage}
              alt="PayPal"
              className="w-12 h-8 object-contain border border-gray-200 rounded"
            />
            <img
              src={discoverImage}
              alt="Discover"
              className="w-12 h-8 object-contain border border-gray-200 rounded"
            />
            <img
              src={amexImage}
              alt="American Express"
              className="w-12 h-8 object-contain border border-gray-200 rounded"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm"></p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">South Africa (ZAR R)</span>
            </div>
            <div className="flex items-center">
              <span>English</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            © 2025 NexusGadgets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
