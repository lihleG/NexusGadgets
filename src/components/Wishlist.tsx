import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";
import { FaHeart, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const WishlistPage: React.FC = () => {
  const { dispatch: cartDispatch } = useCart();
  const { showToast } = useToast();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const wishlistIds = storedWishlist ? JSON.parse(storedWishlist) : [];
    
    const fetchProducts = async () => {
      try {
        const allProducts: Product[] = [
{ id: 1, name: "Dell XPS 15", description: "4K OLED InfinityEdge display", price: "24,999", image: "/assets/Dell.png", category: "laptops" },
{ id: 2, name: "MacBook Pro 16", description: "Apple M1 Pro chip", price: "35,499", image: "/assets/hp.png", category: "laptops" },
{ id: 3, name:  "HP Spectre x360", description: "13.5 3K2K OLED touch Intel Evo platform", price: "21,799", image: "/assets/HP SPectre.png", category: "laptops"},
{id: 4,  name: "Lenovo ThinkPad X1", description: "14\" 4K display, Intel vPro, MIL-SPEC tested", price: "26,899", image: "/assets/Lenovo.png", category: "laptops"},
{id: 5,  name: "ASUS ROG Zephyrus", description: "RTX 3080, AMD Ryzen 9, 300Hz display", price: "32,499", image: "/assets/ASUS.png", category: "laptops"},
{id: 6,  name: "Microsoft Surface Laptop 4", description: "13.5\" touchscreen, 11th Gen Intel Core i7", price: "22,999", image: "/assets/Microsoft.png", category: "laptops"},
{id: 7,  name: "Samsung Galaxy S24 ultra", description: "Latest Samsung flagship, 200MP camera, 8GB RAM", price: "12,999",image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftc3VuZyUyMGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D",category: "/assets/Samsung Galaxy s24.png"},
{id: 8,  name: "Apple iPhone 15", description: "Super Retina XDR, A17 Pro chip", price: "19,499", image: "/assets/Iphone 15.png", category: "mobile-phones"},
{id: 9,  name: "Google Pixel 9", description: "Tensor G4 chip, excellent computational photography", price: "14,299", image: "https://images.unsplash.com/photo-1587840181242-bf05eb933bbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z29vZ2xlJTIwcGl4ZWx8ZW58MHx8MHx8fDA%3D", category: "/assets/Google Pixel 9.png"}, {id: 10, name: "Huawei P60 Pro", description: "Leica Quad Camera, Kirin 9900", price: "15,199", image: "/assets/Huawei p60.png", category: "mobile-phones"},
{id: 10, name: "Huawei P60 Pro", description: "Leica Quad Camera, Kirin 9900", price: "15,199", image: "/assets/Huawei p60.png", category: "mobile-phones"}, 
 {id: 11, name: "OnePlus 13 Pro", description: "120 Hz Fluid AMOLED, Snapdragon 8 Gen 3", price: "13,999", image: "/assets/OnePlus.png", category: "mobile-phones"},
  {id: 12, name: "Xiaomi Redmi Note 15", description: "Affordable with 108MP cam, MediaTek Dimensity", price: "7,999", image: "/assets/Xoami 10.png", category: "mobile-phones"},
  {id: 13, name: "Dr dre beats", description: "Dr dre beats white & Rose Gold", price: "9,999", image: "/assets/dr-dre-beats.png", category: "headphones"},
  {id: 14, name: "Sony Premium Noise-Canceling Headphones", description: "Immerse yourself in exceptional Sound Quality", price: "3,999", image: "/assets/sony headphones.png", category: "headphones"},
  {id: 15, name: "Skull Candy Lime Green Headphones", description: "Exceptional sound experience for an Exceptional price", price: "1,099", image: "/assets/skullCandy.png", category: "headphones"},
  {id: 16, name: "Marshall Major IV headphones", description: "Bluetooth Wireless on-ear Headphones", price: "1,3999", image: "/assets/Marshall.jpeg", category: "headphones"},
  {id: 17, name: "Condere 40 inch Smart TV", description: "40-inch Full HD Smart LED TV Remote Control", price: "2,499", image: "/assets/Condere.png", category: "televisions"},
  {id: 18, name: "Hisense 4k smart TV 55-inch", description: "4k smart TV 55-inch width HDR & Dolby vision", price: "6,899", image: "/assets/Hisence.png", category: "televisions"},
  {id: 19, name: "lg UT70 4K HDR10 webOs Smart TV", description: "2025 uhd AI 50-Inch Smart TV with Magic Remote", price: "11,424", image: "/assets/LG.png", category: "televisions"},
  {id: 20, name: "Sinotec", description: "Sinotec STL-32WG6D HD Digital LED TV", price: "1,999", image: "/assets/Sinotec.png", category: "televisions"},
  {id: 21, name: "Fujifilm Instax camera", description: "Instant Film Camera capture every moment", price: "1,999", image: "/assets/instax.jpg", category: "cameras"},
  {id: 22, name: "Pentax 17 half frame", description: "Anolgue 35mm Film camera", price: "9,999", image: "/assets/Pentax.jpeg", category: "cameras"},
  {id: 23, name: "Canon A0S 2100D", description: "Next generation AI powered LCD screen", price: "8,999", image: "/assets/canon.jpg", category: "cameras"},
  {id: 24, name: "Xbox One All Black Console", description: "Experience powerful gaming with the sleek Xbox One all Black 1TB drive", price: "10,999", image: "/assets/xbox 1.png", category: "gaming"},
  {id: 25, name: "Custome Anime 1TB PS5", description: "Pure gaming experience amplified with Custome Anime theme", price: "11,999", image: "/assets/Play_station 5 Anime.png", category: "gaming"},
  {id: 26, name: "PS 5 Remote", description: "Custom all matt purple ps5 remote", price: "649,00", image: "/assets/ps5 remote.png", category: "gaming"},
  {id: 27, name: "Rosegold xbox one remote", description: "Custom Rosegold xbox one remote", price: "1049,00", image: "/assets/RG box.png", category: "gaming"},
  {id: 28, name: "Play Station 5 2TB", description: "2TB Play Station 5 with 2 remotes", price: "9,999", image: "/assets/PlayS.png", category: "gaming"},
  {id: 29, name: "Dell S2725H", description: "32 inch IPS LED Monitor", price: "3,309", image: "/assets/Phillips.jpg", category: "monitors"},
  {id: 32, name: "Colmi Smartwatch", description: "Ios & Android compatible and fitness tracker", price: "699", image: "/assets/Colmi.jpg", category: "accessories"},
  {id: 33, name: "Curren F60 smartwatch", description: "Fitness Track & bluetooth compatible", price: "799", image: "/assets/curren.jpg", category: "accessories"},
  {id: 34, name: "Police Smartwatch", description: "Fitness tracker and GPS location enabler", price: "1,999", image: "/assets/Police.jpg", category: "accessories"},
  {id: 35, name: "Colmi I13", description: "Colmi smartwatch Rosegold", price: "2,199", image: "/assets/Colmi 13.png", category: "accessories"}
          
        ];

        const filtered = allProducts.filter(product =>
          wishlistIds.includes(product.id.toString())
        );
        
        setWishlistProducts(filtered);
      } catch (error) {
        console.error("Failed to load products:", error);
        showToast("Failed to load wishlist products", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/,/g, ""));
  };

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlistProducts.filter(item => item.id !== productId);
    setWishlistProducts(updatedWishlist);
    
    const wishlistIds = updatedWishlist.map(item => item.id.toString());
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
    
    window.dispatchEvent(new Event("wishlistUpdated"));
    
    showToast("Product removed from wishlist", "success");
  };

  const addToCart = (product: Product) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        price: parsePrice(product.price),
      },
    });
    showToast(`${product.name} added to cart`, "success");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Wishlist</h1>
      
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <FaHeart className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Your wishlist is empty</p>
          <Link to="/" className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-contain bg-gray-100"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 text-red-500 hover:bg-red-50"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold mb-4">R {product.price}</p>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
