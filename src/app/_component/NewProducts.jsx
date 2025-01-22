"use client";

import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { fetchProducts } from "@/Api";
import Wrapper from "./Wrapper";
import ProductCard from "./product-card";

export default function NewProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredProducts = data.slice(0, 5);

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = await fetchProducts();
      setData(productData);
      setLoading(false);
    };
    fetchProductData();
  }, []);

  return (
    <section className="w-full bg-gray-100 py-12">
      <Wrapper>
        <div className="w-full pb-12 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-black uppercase">New Arrivals</h1>
          <span className="bg-orange-500 w-44 h-1 rounded-full mt-4"></span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <Loader2Icon className="h-12 w-12 animate-spin text-orange-500" />
            <span className="ml-4 text-xl font-medium text-black">
              Loading...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 p-3">
            {featuredProducts.map((item, index) => (
              <ProductCard
                key={index}
                title={item.title}
                price={item.price}
                image={item.image}
                tag={"NEW"}
                href={`/product/${item.title}`}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </section>
  );
}
