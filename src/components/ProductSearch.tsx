import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductSearchProps {
  products: Product[];
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || ""; // Get the "query" parameter

  // Debugging log to confirm the query parameter
  console.log("Search Query from URL:", searchQuery);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  return (
    <div className="product-search">
      <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={product.image}
              alt={`Image of ${product.name}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <p className="text-lg font-semibold text-purple-600 mt-2">
                {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(
                  product.price
                )}
              </p>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">No products found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;


