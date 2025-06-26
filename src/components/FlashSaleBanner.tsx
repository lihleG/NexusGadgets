// components/StoreHeader.tsx
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const StoreHeader: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 8,
    minutes: 6,
    seconds: 14
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.days * 86400 + prev.hours * 3600 + 
                          prev.minutes * 60 + prev.seconds - 1;
        
        return {
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number): string => 
    String(value).padStart(2, '0');

  return (
    <header className="px-4">
      {/* Enhanced Flash Sale Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-600 text-white p-6 rounded-xl shadow-xl mb-6 transform transition-all hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200">
                FLASH SALE!
              </span>
            </h2>
            <p className="text-purple-100 text-lg md:text-xl font-medium">
              ⚡ Limited-time deals on premium electronics ⚡
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              {Object.entries(timeLeft).map(([unit, value]) => (
                value > 0 && (
                  <React.Fragment key={unit}>
                    <div className="bg-black bg-opacity-30 px-5 py-3 rounded-xl backdrop-blur-sm border border-purple-300 border-opacity-30">
                      <span className="font-mono font-black text-3xl block">
                        {formatTime(value)}
                      </span>
                      <span className="text-xs uppercase text-purple-200 font-bold tracking-wider mt-1 block">
                        {unit}
                      </span>
                    </div>
                    {unit !== 'seconds' && (
                      <span className="text-purple-200 text-2xl font-bold animate-pulse">:</span>
                    )}
                  </React.Fragment>
                )
              ))}
            </div>
            <div className="bg-black bg-opacity-40 px-4 py-2 rounded-full mt-3">
              <p className="text-base font-bold">
                USE CODE: <span className="text-yellow-300 text-lg animate-pulse">FLASH30</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;