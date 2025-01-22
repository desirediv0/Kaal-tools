"use client";
import React from "react";
import { ProductCard } from "./ProductCard";

export const SearchResults = ({ results, onProductClick }) => {
  if (!results || results.length === 0 || !results?.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 max-h-96 overflow-y-auto z-50">
      <div className="space-y-2 p-2">
        {results.map((product) => (
          <ProductCard
            key={product.id || product.title}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};
