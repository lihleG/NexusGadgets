import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yulmrhkavfnpoltnorhk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bG1yaGthdmZucG9sdG5vcmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTk2NTMsImV4cCI6MjA2MzM5NTY1M30.gokkDwMUnfz1oHUGwR05fLEUmu7jB5X7gNu1fYxWIMk"
);

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  label?: string;
  discount?: number;
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("isNewArrival", true);

      if (error) {
        console.error(error);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-3">New Arrivals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white"
          >
            {/* Fixed aspect ratio image container */}
            <div className="relative pt-[100%] mb-2 bg-gray-50 rounded">
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            {product.label && (
              <span className="inline-block text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded mb-1">
                {product.label}
              </span>
            )}
            
            <h3 className="text-sm font-semibold line-clamp-2 h-10">{product.name}</h3>
            
            <div className="mt-1">
              {product.discount ? (
                <div className="flex items-center gap-2">
                  <span className="text-purple-800 font-bold">R{product.discount}</span>
                  <span className="text-xs text-gray-400 line-through">R{product.price}</span>
                </div>
              ) : (
                <span className="text-purple-800 font-bold">R{product.price}</span>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mt-1">Stock: {product.stock}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
