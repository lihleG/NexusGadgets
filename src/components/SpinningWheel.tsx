import React, { useRef, useState, useEffect } from "react";
import { FaTimes, FaCopy } from "react-icons/fa";
import Confetti from "react-confetti";

const segments = ["Try Again", "R500", "R1000", "R2000"];
const colors = ["#FF5252", "#69F0AE", "#40C4FF", "#FF9800"];

const SpinningWheel = ({ onWin, onSpinComplete, hasSpun, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const wheelRef = useRef(null);
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    spinSoundRef.current = new Audio("/assets/spin.mp3");
    winSoundRef.current = new Audio("/assets/win.mp3");
    spinSoundRef.current.volume = 0.6;
    winSoundRef.current.volume = 1.0;
  }, []);

  const spin = () => {
    if (spinning || hasSpun) return;

    const extraSpin = 360 * (Math.floor(Math.random() * 5) + 5);
    const newRotation = rotation + extraSpin;

    setRotation(newRotation);
    setSpinning(true);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.25, 0.8, 0.5, 1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    if (spinSoundRef.current) spinSoundRef.current.play();
  };

  const getSegment = () => {
    const normalizedRotation = rotation % 360;
    const pointerAngle = 270;
    const adjustedAngle = (normalizedRotation + pointerAngle) % 360;
    const segmentIndex = Math.floor(adjustedAngle / (360 / segments.length));
    return segments[segmentIndex];
  };

  const generateCoupon = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `NEXUS-${code}`;
  };

  const handleTransitionEnd = () => {
    const selected = getSegment();
    setResult(selected);

    if (selected !== "Try Again") {
      const newCoupon = generateCoupon();
      setCoupon(newCoupon);
      onWin(selected, parseInt(selected.slice(1)), newCoupon);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      if (winSoundRef.current) winSoundRef.current.play();
    } else {
      onWin(selected, 0);
    }

    onSpinComplete();
    setSpinning(false);
  };

  useEffect(() => {
    const el = wheelRef.current;
    if (el) el.addEventListener("transitionend", handleTransitionEnd);
    return () => el && el.removeEventListener("transitionend", handleTransitionEnd);
  }, [rotation]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[1000]">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          confettiSource={{
            x: 0,
            y: -50,
            w: windowSize.width,
            h: 10,
          }}
          initialVelocityY={8}
        />
      )}

      <div className="relative p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-white max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          onClick={() => !spinning && onClose()}
          disabled={spinning}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          🎉 Spin to Win!
        </h2>

        <div className="relative w-[280px] h-[280px] mx-auto mb-6">
          <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500 shadow-lg"></div>
            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-md"></div>
          </div>

          <div
            ref={wheelRef}
            className="absolute inset-0 flex justify-center items-center rounded-full border-8 border-white shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden"
            style={{
            width: "280px",
            height: "280px",
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.25, 0.8, 0.5, 1)" : "none",
  }}
>
            <svg viewBox="0 0 300 300" width="280" height="280">
              <defs>
                <radialGradient id="gloss" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {segments.map((segment, i) => {
                const startAngle = i * 90;
                const endAngle = startAngle + 90;
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                const x1 = 150 + 140 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 150 + 140 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 150 + 140 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 150 + 140 * Math.sin((endAngle * Math.PI) / 180);

                const midAngle = (startAngle + endAngle) / 2;
                const textX = 150 + (140 - 40) * Math.cos((midAngle * Math.PI) / 180);
                const textY = 150 + (140 - 40) * Math.sin((midAngle * Math.PI) / 180);

                return (
                  <g key={i}>
                    <path
                      d={`M150,150 L${x1},${y1} A140,140 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                      fill={colors[i]}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      className="drop-shadow-md"
                    >
                      {segment}
                    </text>
                  </g>
                );
              })}

              <circle cx="150" cy="150" r="40" fill="#ffffff" stroke="#e0e0e0" strokeWidth="4" />
              <circle cx="150" cy="150" r="25" fill="#FF5252" stroke="#e0e0e0" strokeWidth="2" />
              <circle cx="150" cy="150" r="12" fill="#ffffff" />

              <circle cx="150" cy="150" r="140" fill="url(#gloss)" />
            </svg>
          </div>
        </div>

        {!spinning && !result && (
          <button
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-xl font-bold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={spin}
            disabled={hasSpun}
          >
            {hasSpun ? "ALREADY SPUN" : "SPIN NOW"}
          </button>
        )}

        {result && (
          <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-purple-100">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {result === "Try Again" 
                ? "😢 You got: Try Again" 
                : <><span className="text-4xl">🎉</span> You won: <span className="text-purple-600">{result}</span></>
              }
            </p>

            {coupon && (
              <div className="mt-4 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border-2 border-dashed border-yellow-300">
                <p className="text-gray-700 font-medium mb-2">Your coupon code:</p>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-yellow-200">
                  <span className="text-green-600 text-lg font-mono font-bold tracking-wider">
                    {coupon}
                  </span>
                  <button
                    className="ml-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(coupon);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <FaCopy className="mr-1" /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Use this code at checkout for your discount!
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {result !== "Try Again" && (
                <button
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex-1"
                  onClick={onClose}
                >
                  Claim Prize
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex-1"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinningWheel;







