import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product-card border rounded-lg p-4 shadow-md">
    <img src={product.image} alt={product.name} className="" />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-sm text-gray-500">{product.category}</p>
    <p className="text-xl font-bold text-green-600 mt-1">R{product.price}</p>
    {product.originalPrice && (
      <p className="text-sm line-through text-gray-400">R{product.originalPrice}</p>
    )}
    <div className="mt-2">
      {product.labels.map((label, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded"
        >
          {label}
        </span>
      ))}
    </div>
  </div>
);
