"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchResults = ({ results, onProductClick, isLoading, onClearSearch }) => {
  const router = useRouter();

  const handleProductClick = (slug) => {
    onClearSearch?.();
    onProductClick?.();
    router.push(`/product/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 p-4 text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
      </div>
    );
  }

  if (!Array.isArray(results) || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 max-h-96 overflow-y-auto z-50">
      <div className="space-y-2 p-2">
        {results.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductClick(product.slug)}
            className="w-full flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
          >
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900">{product.title}</h3>
              {product.category && (
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};