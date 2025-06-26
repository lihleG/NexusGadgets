import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface TeamProgress {
  [key: number]: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');
  const [teamProgress, setTeamProgress] = useState<TeamProgress>({});

  const products: Product[] = [
    {
      id: 1,
      name: "Dell XPS 15",
      description: "4K OLED InfinityEdge display, 11th Gen Intel Core",
      price: 24999,
      image: "/assets/Dell.png",
      category: "laptops",
    },
    {
      id: 2,
      name: "MacBook Pro 16",
      description: "Apple M1 Pro chip, 16-core GPU, 16GB RAM",
      price: 35499,
      image: "/assets/Mac.jpg",
      category: "laptops",
    },
    {
      id: 3,
      name: "HP Spectre x360",
      description: "13.5\" 3K2K OLED touch, Intel Evo platform",
      price: 21799,
      image: "/assets/HP SPectre.png",
      category: "laptops",
    },
    {
      id: 4,
      name: "Lenovo ThinkPad X1",
      description: "14\" 4K display, Intel vPro, MIL-SPEC tested",
      price: 26899,
      image: "/assets/Lenovo.png",
      category: "laptops",
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus",
      description: "RTX 3080, AMD Ryzen 9, 300Hz display",
      price: 32499,
      image: "/assets/ASUS.png",
      category: "laptops",
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop 4",
      description: "13.5\" touchscreen, 11th Gen Intel Core i7",
      price: 22999,
      image: "/assets/Microsoft.png",
      category: "laptops",
    },
     {
    id: 7,
    name: "Samsung Galaxy S24 ultra",
    description: "Latest Samsung flagship, 200MP camera, 8GB RAM",
    price: 12999,
    image: "/assets/Samsung Galaxy s24.png",
    category: "/assets/Samsung Galaxy s24.png",
  },
  {
    id: 8,
    name: "Apple iPhone 15",
    description: "Super Retina XDR, A17 Pro chip",
    price: 19499,
    image: "/assets/Iphone 15.png",
    category: "mobile-phones",
  },
  {
    id: 9,
    name: "Google Pixel 9",
    description: "Tensor G4 chip, excellent computational photography",
    price: 14299,
    image: "/assets/Google Pixel 9.png",
    category: "/assets/Google Pixel 9.png",
  },
  {
    id: 10,
    name: "Huawei P60 Pro",
    description: "Leica Quad Camera, Kirin 9900",
    price: 15199,
    image: "/assets/Huawei p60.png",
    category: "mobile-phones",
  },
  {
    id: 11,
    name: "OnePlus 13 Pro",
    description: "120 Hz Fluid AMOLED, Snapdragon 8 Gen 3",
    price: 13999,
    image: "/assets/OnePlus.png",
    category: "mobile-phones",
  },
  {
    id: 12,
    name: "Xiaomi Redmi Note 15",
    description: "Affordable with 108MP cam, MediaTek Dimensity",
    price: 7999,
    image: "/assets/Xoami 10.png",
    category: "mobile-phones",
  },
  {
    id: 13,
    name: "Dr dre beats Headphones",
    description: "Dr dre beats white & Rose Gold",
    price: 9999,
    image:  "/assets/dr-dre-beats.png",
    category: "headphones",
  },
  {
  id: 14,
    name: "Sony Premium Noise-Canceling Headphones",
    description: "Immerse yourself in exceptional Sound Quality",
    price: 3999,
    image: "/assets/sony headphones.png",
    category: "headphones",
  },
  {
  id: 15,
    name: "Skull Candy Lime Green Headphones",
    description: "Exceptional sound experience for an Exceptional price",
    price: 1099,
    image: "/assets/skullCandy.png",
    category: "headphones",
  },
  {
  id: 16,
    name: "Marshall Major IV headphones",
    description: "Bluetooth Wireless on-ear Headphones",
    price: 13999,
    image: "/assets/Marshall.jpeg",
    category: "headphones",
  },
   {
  id: 17,
    name: "Condere 40 inch Smart TV",
    description: "40-inch Full HD Smart LED TV Remote Control",
    price: 2499,
    image: "/assets/Condere.png",
    category: "televisions",
  },
   {
  id: 18,
    name: "Hisense 4k smart TV 55-inch",
    description: "4k smart TV 55-inch width HDR & Dolby vision",
    price: 6899,
    image: "/assets/Hisence.png",
    category: "televisions",
  },
   {
  id: 19,
    name: "lg UT70 4K HDR10 webOs Smart TV",
    description: "2025 uhd AI 50-Inch Smart TV with Magic Remote",
    price: 11424,
    image: "/assets/LG.png",
    category: "televisions",
  },
   {
  id: 20,
    name: "Sinotec",
    description: "Sinotec STL-32WG6D HD Digital LED TV",
    price: 1999,
    image: "/assets/Sinotec.png",
    category: "televisions",
  },
   {
  id: 21,
    name: "Fujifilm Instax camera",
    description: "Instant Film Camera capture every moment",
    price: 1999,
    image: "/assets/instax.jpg",
    category: "cameras",
  },
   {
  id: 22,
    name: "Pentax 17 half frame",
    description: "Anolgue 35mm Film camera",
    price: 9999,
    image: "/assets/Pentax.jpeg",
    category: "cameras",
  },
   {
  id: 23,
    name: "Canon A0S 2100D",
    description: "Next generation AI powered LCD screen",
    price: 8999,
    image: "/assets/canon.jpg",
    category: "cameras",
  },
   {
  id: 24,
    name: "Xbox One All Black Console",
    description: "Experience powerful gaming with the sleek Xbox One all Black 1TB drive",
    price: 10999,
    image: "/assets/xbox 1.png",
    category: "gaming",
  },
   {
  id: 25,
    name: "Custome Anime 1TB PS5",
    description: "Pure gaming experience amplified with Custome Anime theme",
    price: 11999,
    image: "/assets/Play_station 5 Anime.png",
    category: "gaming",
  },
   {
  id: 26,
    name: "PS 5 Remote",
    description: "Custom all matt purple ps5 remote",
    price: 649,
    image: "/assets/ps5 remote.png",
    category: "gaming",
  },
   {
  id: 27,
    name: "Rosegold xbox one remote",
    description: "Custom Rosegold xbox one remote",
    price: 1049,
    image: "/assets/RG box.png",
    category: "gaming",
  },
   {
  id: 28,
    name: "Play Station 5 2TB ",
    description: "2TB Play Station 5 with 2 remotes",
    price: 9999,
    image: "/assets/PlayS.png",
    category: "gaming",
  },
   {
  id: 29,
    name: "Dell S2725H",
    description: "32 inch IPS LED Monitor",
    price: 3309,
    image: "/assets/Dell s272.jpg",
    category: "monitors",
  },
   {
  id: 30,
    name: "DELL S2425H.jpg",
    description: "(1920x1080) Monitor 100Hz, IPS 4ms built in speakers",
    price: 2999,
    image: "/assets/DELL S2425H.jpg",
    category: "monitors",
  },
   {
  id: 31,
     name: "Phillips V Line",
    description: "FHD Monitor, 23.8 inch Size",
    price: 2250,
    image: "/assets/Phillips.jpg",
    category: "monitors",
  },
   {
  id: 32,
   name: "Colmi Smartwatch",
    description: "Ios & Android compatible and fitness tracker",
    price: 699,
    image: "/assets/Colmi.jpg",
    category: "accessories",
  },
   {
  id: 33,
    name: "Curren F60 smartwatch",
    description: "Fitness Track & bluetooth compatible",
    price: 799,
    image: "/assets/curren.jpg",
    category: "accessories",
  },
   {
  id: 34,
    name: "Police Smartwatch",
    description: "Fitness tracker and GPS location enabler",
    price: 1999,
    image: "/assets/Police.jpg",
    category: "accessories",
  },
   {
  id: 35,
    name: "Colmi I13",
    description: "Colmi smartwatch Rosegold",
    price: 2199,
    image: "/assets/Colmi 13.png",
    category: "accessories",
  },
  ];

  // Filter products based on the query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  // Initialize team progress when a product is selected
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    
    // Initialize team progress if not already set
    if (!teamProgress[product.id]) {
      setTeamProgress(prev => ({
        ...prev,
        [product.id]: 1
      }));
    }
    
    setActiveTab('individual');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (product: Product, isTeamBuy: boolean = false) => {
    alert(`${product.name} added to cart ${isTeamBuy ? 'via team buy' : ''}`);
    closeModal();
    navigate('/cart');
  };

  const joinTeam = () => {
    if (selectedProduct && teamProgress[selectedProduct.id] < 3) {
      setTeamProgress(prev => ({
        ...prev,
        [selectedProduct.id]: prev[selectedProduct.id] + 1
      }));
    }
  };

  const calculateTeamPrice = (price: number): string => {
    const discountedPrice = price * 0.6; // 40% discount
    return new Intl.NumberFormat("en-ZA", { 
      style: "currency", 
      currency: "ZAR",
      maximumFractionDigits: 0
    }).format(discountedPrice);
  };

  const shareProduct = (platform: string) => {
    const productName = selectedProduct?.name || 'this amazing product';
    const message = `Join my team buy for ${productName} and save 40%!`;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + window.location.href)}`,
      link: window.location.href
    };

    if (platform === 'clipboard') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
  };

  // Get current progress for selected product
  const getCurrentProgress = () => {
    if (!selectedProduct) return 1;
    return teamProgress[selectedProduct.id] || 1;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Search Results for: "{query}"
      </h1>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">
                  {new Intl.NumberFormat("en-ZA", { 
                    style: "currency", 
                    currency: "ZAR",
                    maximumFractionDigits: 0
                  }).format(product.price)}
                </p>
                <button
                  onClick={() => openModal(product)}
                  className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products found for "{query}"</p>
          <p className="mt-2 text-gray-400">Try different keywords</p>
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="mb-4">{selectedProduct.description}</p>
            
            {/* Purchase Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'individual' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('individual')}
              >
                Individual Purchase
              </button>
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'team' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('team')}
              >
                Team Buy
              </button>
            </div>
            
            {/* Individual Purchase Tab */}
            {activeTab === 'individual' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-lg">
                    Price: {new Intl.NumberFormat("en-ZA", { 
                      style: "currency", 
                      currency: "ZAR",
                      maximumFractionDigits: 0
                    }).format(selectedProduct.price)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                    }}
                    className="flex-1 py-3 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:from-purple-700 hover:to-pink-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}
            
            {/* Team Buy Tab */}
            {activeTab === 'team' && (
              <div>
                <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 line-through">
                      {new Intl.NumberFormat("en-ZA", { 
                        style: "currency", 
                        currency: "ZAR",
                        maximumFractionDigits: 0
                      }).format(selectedProduct.price)}
                    </span>
                    <span className="text-lg font-bold text-purple-600">40% OFF</span>
                  </div>
                  <p className="text-2xl font-bold">
                    Team Price: {calculateTeamPrice(selectedProduct.price)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Gather a team of 3 to unlock this discount
                  </p>
                </div>
                
                {/* Team Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span>Team Progress ({getCurrentProgress()}/3)</span>
                    <span>{3 - getCurrentProgress()} more needed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-purple-600 h-4 rounded-full" 
                      style={{ width: `${(getCurrentProgress() / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                {getCurrentProgress() < 3 ? (
                  <div>
                    <button
                      onClick={joinTeam}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:from-purple-700 hover:to-pink-700 mb-4"
                    >
                      Join Team ({3 - getCurrentProgress()} spots left)
                    </button>
                    
                    <div className="mb-4">
                      <p className="text-center mb-2 font-semibold">Invite friends to complete your team:</p>
                      <div className="flex justify-center gap-3">
                        {['facebook', 'twitter', 'whatsapp', 'clipboard'].map((platform) => (
                          <button
                            key={platform}
                            onClick={() => shareProduct(platform)}
                            className={`p-3 rounded-lg ${
                              platform === 'facebook' ? 'bg-blue-700' :
                              platform === 'twitter' ? 'bg-blue-400' :
                              platform === 'whatsapp' ? 'bg-green-500' : 'bg-gray-500'
                            } text-white flex flex-col items-center justify-center w-16`}
                          >
                            {platform === 'facebook' ? (
                              <span>FB</span>
                            ) : platform === 'twitter' ? (
                              <span>TW</span>
                            ) : platform === 'whatsapp' ? (
                              <span>WA</span>
                            ) : (
                              <span>Copy</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-purple-600 font-bold text-center mb-4">
                      Team complete! You got 40% discount!
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct, true);
                        }}
                        className="flex-1 py-3 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct, true);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:from-purple-700 hover:to-pink-700"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
               
                )}
              </div>
            )}
          </div>
        </div>
      )}
       
    </div>
  );
};

export default SearchResults;
  