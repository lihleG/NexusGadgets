import React, { useState, useEffect } from "react";
import SpinningWheel from "./components/SpinningWheel";
import Slideshow from "./components/Slideshow";
import ProductGrid from "./components/ProductGrid";
import FlashSaleBanner from "./components/FlashSaleBanner";
import ElectronicStore from "./components/ElectronicStore";
import { ElectronicSale as SaleCategory } from "./components/SaleCategory";
import FeaturedCollection from "./components/FeaturedCollection";
import VideoBanner from "./components/VideoBanner";
import PopularDepartments from "./components/PopularDepartments";
import TopBrands from "./components/TopBrands";
import TestimonialSection from "./components/TestimonialSection";
import Confetti from "react-confetti";

const HomePage = () => {
  const [showWheel, setShowWheel] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  useEffect(() => {
    const spun = localStorage.getItem("hasSpun") === "true";
    setHasSpun(spun);
    setShowWheel(!spun);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpinComplete = () => {
    setHasSpun(true);
    localStorage.setItem("hasSpun", "true");
  };

  const handleWin = (result: string, value: number | "bonus", coupon?: string) => {
    setResult(result);
    if (coupon) {
      localStorage.setItem("discountCoupon", coupon);
    }
  };

  const handleCloseWheel = () => {
    setShowWheel(false);
  };

  const resetSpin = () => {
    localStorage.removeItem("hasSpun");
    setHasSpun(false);
    setResult(null);
    setShowWheel(true);
  };

  return (
    <>
      {showWheel && result && result !== "Try Again" && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={600}
          gravity={0.2}
        />
      )}

      {showWheel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4">
          <SpinningWheel
            onWin={handleWin}
            hasSpun={hasSpun}
            onSpinComplete={handleSpinComplete}
            onClose={handleCloseWheel}
          />
        </div>
      )}

      {/* Reset Spin Button */}
      <button
        onClick={resetSpin}
        className="fixed bottom-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        RESET SPIN
      </button>

      <div>
        <Slideshow />
        <ProductGrid />
        <FlashSaleBanner />
        <ElectronicStore />
        <SaleCategory />
        <FeaturedCollection />
        <VideoBanner />
        <PopularDepartments />
        <TopBrands />
        <TestimonialSection />
      </div>
    </>
  );
};

export default HomePage;




