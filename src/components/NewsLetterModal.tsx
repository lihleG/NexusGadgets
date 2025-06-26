import React, { useState, useEffect } from "react";

interface NewsletterProps {
  onClose: () => void;
}

const NewsletterComponent: React.FC<NewsletterProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    
    setStatus("submitting");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    
    // Close after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-purple-600 to-purple-900 text-white rounded-2xl w-[95%] max-w-2xl p-8 relative overflow-hidden shadow-xl animate-fade-in-up`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.2),transparent]"></div>
        
        {/* Close button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
          aria-label="Close newsletter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* Image section */}
          <div className="w-full lg:w-1/2">
            <img
              src="/assets/newsLetter.jpeg"
              alt="Special offer for subscribers"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content section */}
          <div className="w-full lg:w-1/2">
            {status !== "success" ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Join NexusGadgets!
                </h2>
                <p className="text-purple-100 mb-6 text-lg">
                  Subscribe for <span className="font-bold text-white">exclusive deals</span> and get <span className="font-bold text-yellow-300">30% OFF</span> your first order!
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-purple-200 text-white backdrop-blur-sm"
                    required
                    disabled={status === "submitting"}
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting" || !email}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${
                      status === "submitting"
                        ? "bg-purple-800 cursor-not-allowed"
                        : "bg-white text-purple-700 hover:bg-purple-100 hover:shadow-lg"
                    }`}
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-purple-100 text-lg">
                  You're now subscribed to NexusGadgets updates.
                </p>
                <p className="text-purple-200 mt-4">
                  Your discount code is on its way!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterComponent;



