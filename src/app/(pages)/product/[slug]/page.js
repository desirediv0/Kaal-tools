"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchsingleProduct } from "@/Api";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const result = params.slug.replace(/%20/g, " ");
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProduct = await fetchsingleProduct(result);
      setProduct(fetchedProduct);
      setMainImage(fetchedProduct?.image || null);
    };
    loadProducts();
  }, [result]);

  const allImages = product
    ? [product.image, ...(product.additionalimage || [])].filter(Boolean)
    : [];

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (!product || !mainImage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative flex justify-center aspect-auto overflow-hidden">
            <Image
              src={mainImage || "/rr.png"}
              alt={product?.title || "Product Image"}
              height={300}
              width={300}
              priority={true}
            />
          </div>
          {allImages.length > 0 && (
            <Carousel className="w-full max-w-xs mx-auto" ref={emblaRef}>
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <Card className="hover:shadow-md transition-shadow duration-300">
                        <CardContent className="flex items-center justify-center p-0">
                          <Image
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            width={100}
                            height={100}
                            priority={true}
                            className="rounded-md w-auto h-auto cursor-pointer object-cover hover:opacity-80 transition-opacity duration-300"
                            onClick={() => {
                              setMainImage(image);
                              scrollTo(index);
                            }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl md: font-bold text-gray-900">
            {product?.title}
          </h1>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl md:text-3xl font-medium hover-color">
              ₹{product?.saleprice}
            </span>
            <span className="text-lg md:text-xl text-gray-500 line-through">
              ₹{product?.price}
            </span>
          </div>

          {product?.category && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-medium text-gray-900">
                Category
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[var(--lightcolor)] px-3 py-1 rounded-full text-sm font-medium border shadow-sm cursor-default">
                  {product?.category}
                </span>
              </div>
            </div>
          )}

          <p className="text-lg pb-6">{product?.shortdesc}</p>

          <Link href={`/contact?subject=${product?.title}`}>
            <button className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 text-white bg-[var(--maincolor)] rounded-lg shadow-md">
              <span>Contact Now</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <div className="border-b mb-3">
          <h2 className="text-2xl font-semibold text-gray-900 pb-3">
            Full Description
          </h2>
        </div>
        <p className="text-lg leading-relaxed">{product?.Decription}</p>
      </div>
    </div>
  );
}
