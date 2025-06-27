import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecommendedProducts from "./RecommendedProducts";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";
import { FaHeart } from "react-icons/fa";


interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface TeamProgress {
  [key: number]: number;
}

// Helper function to convert price strings to numbers
const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/,/g, ''));
};

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch: cartDispatch, state: cartState } = useCart();
  const { showToast } = useToast();

  // Wishlist state and functionality
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    // Listen for wishlist updates from other components
    const handleWishlistUpdate = () => {
      const updatedWishlist = localStorage.getItem('wishlist');
      if (updatedWishlist) {
        setWishlist(JSON.parse(updatedWishlist));
      } else {
        setWishlist([]);
      }
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const toggleWishlist = (productId: number) => {
    const productIdStr = productId.toString();
    const newWishlist = wishlist.includes(productIdStr)
      ? wishlist.filter(id => id !== productIdStr)
      : [...wishlist, productIdStr];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));

    // Show toast notification
    const product = products.find(p => p.id === productId);
    if (product) {
      const action = wishlist.includes(productIdStr) ? "removed from" : "added to";
      showToast(`${product.name} ${action} wishlist`, 'success');
    }
  };
  
  const products = [
    {
      id: 1,
      name: "Dell XPS 15",
      description: "4K OLED InfinityEdge display, 11th Gen Intel Core",
      price: "24,999",
      image: "/assets/Dell.png",
      category: "laptops",
    },
    {
      id: 2,
      name: "MacBook Pro 16",
      description: "Apple M1 Pro chip, 16-core GPU, 16GB RAM",
      price: "35,499",
      image: "/assets/Mac.jpg",
      category: "laptops",
    },
    {
      id: 3,
      name: "HP Spectre x360",
      description: "13.5\" 3K2K OLED touch, Intel Evo platform",
      price: "21,799",
      image: "/assets/HP SPectre.png",
      category: "laptops",
    },
    {
      id: 4,
      name: "Lenovo ThinkPad X1",
      description: "14\" 4K display, Intel vPro, MIL-SPEC tested",
      price: "26,899",
      image: "/assets/Lenovo.png",
      category: "laptops",
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus",
      description: "RTX 3080, AMD Ryzen 9, 300Hz display",
      price: "32,499",
      image: "/assets/ASUS.png",
      category: "laptops",
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop 4",
      description: "13.5\" touchscreen, 11th Gen Intel Core i7",
      price: "22,999",
      image: "/assets/Microsoft.png",
      category: "laptops",
    },
     {
    id: 7,
    name: "Samsung Galaxy S24 ultra",
    description: "Latest Samsung flagship, 200MP camera, 8GB RAM",
    price: "12,999",
    image: "/assets/Samsung Galaxy s24.png",
    category: "mobile-phones",
  },
  {
    id: 8,
    name: "Apple iPhone 15",
    description: "Super Retina XDR, A17 Pro chip",
    price: "19,499",
    image: "/assets/Iphone 15.png",
    category: "mobile-phones",
  },
  {
    id: 9,
    name: "Google Pixel 9",
    description: "Tensor G4 chip, excellent computational photography",
    price: "14,299",
    image: "/assets/Google Pixel 9.png",
    category: "mobile-phones",
  },
  {
    id: 10,
    name: "Huawei P60 Pro",
    description: "Leica Quad Camera, Kirin 9900",
    price: "15,199",
    image: "/assets/Huawei p60.png",
    category: "mobile-phones",
  },
  {
    id: 11,
    name: "OnePlus 13 Pro",
    description: "120 Hz Fluid AMOLED, Snapdragon 8 Gen 3",
    price: "13,999",
    image: "/assets/OnePlus.png",
    category: "mobile-phones",
  },
  {
    id: 12,
    name: "Xiaomi Redmi Note 15",
    description: "Affordable with 108MP cam, MediaTek Dimensity",
    price: "7,999",
    image: "/assets/Xoami 10.png",
    category: "mobile-phones",
  },
  {
    id: 13,
    name: "Dr dre beats",
    description: "Dr dre beats white & Rose Gold",
    price: "9,999",
    image:  "/assets/dr-dre-beats.png",
    category: "headphones",
  },
  {
  id: 14,
    name: "Sony Premium Noise-Canceling Headphones",
    description: "Immerse yourself in exceptional Sound Quality",
    price: "3,999",
    image: "/assets/sony headphones.png",
    category: "headphones",
  },
  {
  id: 15,
    name: "Skull Candy Lime Green Headphones",
    description: "Exceptional sound experience for an Exceptional price",
    price: "1,099",
    image: "/assets/skullCandy.png",
    category: "headphones",
  },
  {
  id: 16,
    name: "Marshall Major IV headphones",
    description: "Bluetooth Wireless on-ear Headphones",
    price: "1,3999",
    image: "/assets/Marshall.jpeg",
    category: "headphones",
  },
   {
  id: 17,
    name: "Condere 40 inch Smart TV",
    description: "40-inch Full HD Smart LED TV Remote Control",
    price: "2,499",
    image: "/assets/Condere.png",
    category: "televisions",
  },
   {
  id: 18,
    name: "Hisense 4k smart TV 55-inch",
    description: "4k smart TV 55-inch width HDR & Dolby vision",
    price: "6,899",
    image: "/assets/Hisence.png",
    category: "televisions",
  },
   {
  id: 19,
    name: "lg UT70 4K HDR10 webOs Smart TV",
    description: "2025 uhd AI 50-Inch Smart TV with Magic Remote",
    price: "11,424",
    image: "/assets/LG.png",
    category: "televisions",
  },
   {
  id: 20,
    name: "Sinotec",
    description: "Sinotec STL-32WG6D HD Digital LED TV",
    price: "1,999",
    image: "/assets/Sinotec.png",
    category: "televisions",
  },
   {
  id: 21,
    name: "Fujifilm Instax camera",
    description: "Instant Film Camera capture every moment",
    price: "1,999",
    image: "/assets/instax.jpg",
    category: "cameras",
  },
   {
  id: 22,
    name: "Pentax 17 half frame",
    description: "Anolgue 35mm Film camera",
    price: "9,999",
    image: "/assets/Pentax.jpeg",
    category: "cameras",
  },
   {
  id: 23,
    name: "Canon A0S 2100D",
    description: "Next generation AI powered LCD screen",
    price: "8,999",
    image: "/assets/canon.jpg",
    category: "cameras",
  },
   {
  id: 24,
    name: "Xbox One All Black Console",
    description: "Experience powerful gaming with the sleek Xbox One all Black 1TB drive",
    price: "10,999",
    image: "/assets/xbox 1.png",
    category: "gaming",
  },
   {
  id: 25,
    name: "Custome Anime 1TB PS5",
    description: "Pure gaming experience amplified with Custome Anime theme",
    price: "11,999",
    image: "/assets/Play_station 5 Anime.png",
    category: "gaming",
  },
   {
  id: 26,
    name: "PS 5 Remote",
    description: "Custom all matt purple ps5 remote",
    price: "649,00",
    image: "/assets/ps5 remote.png",
    category: "gaming",
  },
   {
  id: 27,
    name: "Rosegold xbox one remote",
    description: "Custom Rosegold xbox one remote",
    price: "1049,00",
    image: "/assets/RG box.png",
    category: "gaming",
  },
   {
  id: 28,
    name: "Play Station 5 2TB ",
    description: "2TB Play Station 5 with 2 remotes",
    price: "9,999",
    image: "/assets/PlayS.png",
    category: "gaming",
  },
   {
  id: 29,
    name: "Dell S2725H",
    description: "32 inch IPS LED Monitor",
    price: "3,309",
    image: "/assets/Dell s272.jpg",
    category: "monitors",
  },
   {
  id: 30,
    name: "DELL S2425H.jpg",
    description: "(1920x1080) Monitor 100Hz, IPS 4ms built in speakers",
    price: "2,999",
    image: "/assets/DELL S2425H.jpg",
    category: "monitors",
  },
   {
  id: 31,
    name: "Phillips V Line",
    description: "FHD Monitor, 23.8 inch Size",
    price: "2,250",
    image: "/assets/Phillips.jpg",
    category: "monitors",
  },
   {
  id: 32,
    name: "Colmi Smartwatch",
    description: "Ios & Android compatible and fitness tracker",
    price: "699",
    image: "/assets/Colmi.jpg",
    category: "accessories",
  },
   {
  id: 33,
    name: "Curren F60 smartwatch",
    description: "Fitness Track & bluetooth compatible",
    price: "799",
    image: "/assets/curren.jpg",
    category: "accessories",
  },
   {
  id: 34,
    name: "Police Smartwatch",
    description: "Fitness tracker and GPS location enabler",
    price: "1,999",
    image: "/assets/Police.jpg",
    category: "accessories",
  },
   {
  id: 35,
    name: "Colmi I13",
    description: "Colmi smartwatch Rosegold",
    price: "2,199",
    image: "/assets/Colmi 13.png",
    category: "accessories",
  },
  {
  id: 36,
    name: "EchoSphere",
    description: "Your Voice-Activated Companion",
    price: "3,199",
    image: "/assets/EchoSphere.png",
    category: "home-technology",
  },
  {
  id: 37,
    name: "RetroVoice",
    description: "Vintage Charm Meets Modern Intelligence",
    price: "3,599",
    image: "/assets/RetroVoice.png",
    category: "home-technology",
  },
  {
  id: 38,
    name: "NeauralSphere",
    description: "The future of smart sound and smart living",
    price: "1,999",
    image: "/assets/NeuralSphere.png",
    category: "home-technology",
  },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');
  const [teamProgress, setTeamProgress] = useState<TeamProgress>({});

  // Initialize team progress when a product is selected
  useEffect(() => {
    if (selectedProduct && !teamProgress[selectedProduct.id]) {
      setTeamProgress(prev => ({
        ...prev,
        [selectedProduct.id]: 1
      }));
    }
    setActiveTab('individual');
  }, [selectedProduct]);

  // Filter products
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = categoryName
        ? product.category === categoryName.toLowerCase()
        : true;
      const matchesPrice = priceRange
        ? parsePrice(product.price) <= priceRange
        : true;
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [categoryName, priceRange]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add to cart function with price conversion
  const addToCart = (product: Product, isTeamBuy: boolean = false) => {
    cartDispatch({ 
      type: "ADD_ITEM", 
      payload: {
        ...product,
        price: parsePrice(product.price) // Convert price to number
      }
    });
    showToast(`${product.name} added to cart${isTeamBuy ? ' via team buy' : ''}`, 'success');
  };

  const joinTeam = () => {
    if (selectedProduct && teamProgress[selectedProduct.id] < 3) {
      setTeamProgress(prev => ({
        ...prev,
        [selectedProduct.id]: prev[selectedProduct.id] + 1
      }));
    }
  };

  const calculateTeamPrice = (price: string): string => {
    const discountedPrice = parsePrice(price) * 0.6; // 40% discount
    return discountedPrice.toLocaleString();
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

  // Calculate total items in cart
  const totalCartItems = cartState.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const CategoryPromoSection: React.FC = () => {
    const navigate = useNavigate();

    const categories = [
      {
        title: "Health & Fitness",
        subtitle: "Workout wherever",
        buttonText: "Shop Smart Wireless",
        Image: "/assets/health-fitness.jpeg",
        category: "accessories",
      },
      {
        title: "Home Technology",
        subtitle: "Your home smarter",
        buttonText: "Shop Home Technology",
        Image: "/assets/home-technology.jpeg",
        category: "home-technology",
      },
    ];
  
    return (
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Brand news for you
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.Image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.subtitle}</p>
                <button 
                 onClick={() => navigate(`/category/${category.category}`)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  {category.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SmallPrintSection: React.FC = () => {
    return (
      <div className="w-full px-6 py-12 border-t border-gray-200 mt-12 bg-gray-50">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          NexusGadgets
        </h2>
  
        <p className="text-gray-700 italic mb-6 text-center">
          Available in over 18 countries worldwide!
        </p>
        <p className="text-gray-700 mb-10 text-center">
          We provide 2-day shipping to over 18 countries globally.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 p-8 rounded-2xl text-white shadow-lg">
          {[
            { title: "Visit our support center", description: "Expert help & advice" },
            { title: "Check your order status", description: "Updates & tracking" },
            { title: "Returns & exchanges", description: "All you need to know" },
            { title: "Price-match guarantee", description: "Our promise to you" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-purple-700 rounded-xl hover:bg-purple-800 transition-all shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HelpAndAdviceSection: React.FC = () => {
    return (
      <div className="relative bg-gray-100 h-[400px] flex items-center justify-center mt-12">
        <div className="absolute inset-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661299426906-303374213351?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FsbCUyMGNlbnRyZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Help and advice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 bg-white bg-opacity-10 rounded-lg shadow-lg p-6 md:p-10 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Help and Advice
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Need a few things cleared up? Check out our Help and Advice section.
          </p>
          <a 
            href="/help-and-advice" 
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Visit Help & Advice
          </a>
        </div>
      </div>
    );
  };

  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Products in category: {categoryName || "All"}
      </h1>
      
      {/* Cart indicator as a link to cart page */}
      <Link 
        to="/cart" 
        className="fixed top-4 right-4 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-50"
      >
        {totalCartItems}
      </Link>

      {/* Price Filter */}
      <div className="mb-6">
        <label htmlFor="priceRange" className="mr-2 font-semibold">
          Max Price (R):
        </label>
        <input
          type="number"
          id="priceRange"
          value={priceRange ?? ""}
          onChange={(e) =>
            setPriceRange(e.target.value ? parseInt(e.target.value) : null)
          }
          placeholder="Enter max price"
          className="border rounded px-2 py-1 w-32"
          min={0}
        />
        <button
          onClick={() => setPriceRange(null)}
          className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow p-4 hover:shadow-lg flex flex-col h-full"
          >
            <div className="relative mb-2 h-48 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full object-scale-down cursor-pointer"
                onClick={() => openModal(product)}
              />
              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  wishlist.includes(product.id.toString())
                    ? "text-red-500 bg-white"
                    : "text-gray-400 bg-white"
                }`}
              >
                <FaHeart />
              </button>
            </div>

            <h2 
              className="text-lg font-semibold cursor-pointer hover:underline line-clamp-1"
              onClick={() => openModal(product)}
            >
              {product.name}
            </h2>
            
            <p className="text-sm text-gray-600 line-clamp-2 min-h-[3rem]">
              {product.description}
            </p>
            
            <div className="mt-auto"> 
              <p className="text-md font-bold mt-2">R {product.price}</p>
              <button
                onClick={() => openModal(product)}
                className="mt-2 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:from-purple-700 hover:to-pink-700 shadow-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

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
              className="max-h-full object-scale-down cursor-pointer"
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
                  <p className="font-bold text-lg">Price: R {selectedProduct.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeModal();
                    }}
                    className="flex-1 py-3 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      showToast(`Purchased ${selectedProduct.name} individually`, 'success');
                      closeModal();
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
                    <span className="text-gray-500 line-through">R {selectedProduct.price}</span>
                    <span className="text-lg font-bold text-purple-600">40% OFF</span>
                  </div>
                  <p className="text-2xl font-bold">
                    Team Price: R {calculateTeamPrice(selectedProduct.price)}
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

        <div className="w-full">
  <p className="text-center mb-4 font-semibold text-gray-700">
    Invite friends to complete your team:
  </p>

  <div className="flex justify-center gap-6">
    {[
      { 
        platform: 'facebook', 
        icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', 
        bg: 'bg-blue-700' 
      },
      { 
        platform: 'x', 
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/960px-X_logo.jpg', 
        bg: 'bg-black-800' 
      },
      { 
        platform: 'whatsapp', 
        icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', 
        bg: 'bg-green-500' 
      },
      { 
        platform: 'clipboard', 
        icon: 'https://png.pngtree.com/png-vector/20190119/ourmid/pngtree-clipboard-line-filled-icon-png-image_325331.jpg', 
        bg: 'bg-orange-500' 
      }
    ].map((item) => (
      <button
        key={item.platform}
        onClick={() => shareProduct(item.platform)}
        className={`p-3 rounded-full ${item.bg} hover:opacity-90 transition-opacity flex items-center justify-center w-16 h-16 shadow-lg`}
      >
        <img 
          src={item.icon} 
          alt={item.platform} 
          className="w-8 h-8 object-contain"
        />
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
                          closeModal();
                        }}
                        className="flex-1 py-3 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct, true);
                          showToast(`Purchased ${selectedProduct.name} with team discount`, 'success');
                          closeModal();
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
      <HelpAndAdviceSection />
      <RecommendedProducts products={recommendedProducts} openModal={openModal} />
      <CategoryPromoSection />
      <SmallPrintSection />
    </div>
  );
};

export default CategoryPage;

