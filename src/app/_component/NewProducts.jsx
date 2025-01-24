"use client";

import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { fetchProducts } from "@/Api";
import Wrapper from "./Wrapper";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function NewProducts() {
  const [data, setData] = useState({
    products: [],
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(true);

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
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts?.map((item, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/5">
                    <ProductCard
                      title={item.title}
                      price={item.price}
                      saleprice={item.saleprice}
                      image={item.image}
                      tag={"NEW"}
                      href={`/product?category=all`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2" />
              </div>
            </Carousel>
          </div>
        )}
      </Wrapper>
    </section>
  );
}