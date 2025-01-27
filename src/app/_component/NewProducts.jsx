"use client";

import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { fetchProducts } from "@/Api";
import Wrapper from "./Wrapper";
import ProductCard from "./product-card";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';


export default function NewProducts() {
  const [data, setData] = useState({
    products: [],
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(true);

  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1
    }, 
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false
      })
    ]
  );

  const featuredProducts = Array.isArray(data) 
    ? data.slice(0, 10) 
    : data.products?.slice(0, 10);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await fetchProducts();
        if (Array.isArray(productData)) {
          setData(productData);
        } else {
          setData(productData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
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
            <span className="ml-4 text-xl font-medium text-black">Loading...</span>
          </div>
        ) : (
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {featuredProducts?.map((item, index) => (
                  <div 
                    key={index} 
                    className="pl-2 md:pl-4 min-w-0 
                      flex-[0_0_100%]        /* Mobile: 1 item */
                      sm:flex-[0_0_50%]      /* Small: 2 items */
                      md:flex-[0_0_33.333%]  /* Medium: 3 items */
                      lg:flex-[0_0_20%]      /* Large: 5 items */
                      xl:flex-[0_0_20%]      /* XL: 5 items */"
                  >
                    <ProductCard
                      title={item.title}
                      price={item.price}
                      saleprice={item.saleprice}
                      image={item.image}
                      tag={"NEW"}
                      href={`/product?category=all`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </section>
  );
}