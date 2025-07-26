"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/_component/product-card";
import { fetchCategoryProducts } from "@/Api";

export default function SubcategoryProductsPage({ params }) {
  const router = useRouter();
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Decode the slug first since it's already URL-encoded from the URL params
        const decodedSlug = decodeURIComponent(slug);
        const data = await fetchCategoryProducts({
          subcategoryName: decodedSlug,
        });
        setProducts(data.success ? data.data.products : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        Products for {decodeURIComponent(slug).replace(/-/g, " ")}
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              saleprice={product.saleprice}
              image={product.image}
              href={`/product/${product.slug}`}
              className={"bg-[#1155CC] p-2 text-center"}
              textClass={"text-white font-[400]"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
