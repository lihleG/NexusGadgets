import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './components/Footer';
import HomePage from './HomePage';
import CategoryPage from './components/CategoryPage';
import SearchResults from './components/SearchResults';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import { ToastProvider } from './components/ToastContext';
import EcommerceChatbot from './components/EcommerceChatbot';
import Wishlist from './components/Wishlist';
import HelpAndAdvice from './components/HelpAndAdvice';

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Prevent double mounting caused by React.StrictMode in dev
    const timeout = setTimeout(() => setShowChatbot(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CartProvider>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/help-and-advice" element={<HelpAndAdvice />} />

        </Routes>
        <Footer />
        {showChatbot && <EcommerceChatbot />}
      </ToastProvider>
    </CartProvider>
  );
};

export default App;


