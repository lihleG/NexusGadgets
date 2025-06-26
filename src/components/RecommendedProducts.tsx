import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface RecommendedProductsProps {
  products: Product[];
  openModal: (product: Product) => void;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products, openModal }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow p-4 hover:shadow-lg relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 rounded cursor-pointer"
              onClick={() => openModal(product)}
            />
            <h3
              className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={() => openModal(product)}
            >
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-md font-bold mt-2">R {product.price}</p>
            <p className="text-sm text-purple-600 mt-1 font-medium">
              Team Buy available
            </p>
            <button
              onClick={() => openModal(product)}
              className="mt-2 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:from-purple-700 hover:to-pink-700 shadow-md"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
