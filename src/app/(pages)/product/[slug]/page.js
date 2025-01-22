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
import { useParams, useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetchsingleProduct(params.slug);
        if (response.success) {
          setProduct(response.data);
          const imageUrl = response.data.image 
            ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${response.data.image}`
            : "/rr.png"; // Fallback image
          setMainImage(imageUrl);
        } else {
          throw new Error(response.message || "Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
        setError(error.message || "Product not found");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [params.slug]);

  const allImages = product
  ? [
      product.image && `${process.env.NEXT_PUBLIC_API_URL}/public/upload/${product.image}`,
      ...(product.images || []).map(img => `${process.env.NEXT_PUBLIC_API_URL}/uploads/${img.url}`)
    ].filter(Boolean) || ["/rr.png"] 
  : [];

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          {error || "Product not found"}
        </h2>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-[var(--maincolor)] text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative flex justify-center aspect-auto overflow-hidden rounded-lg">
          <Image
                  src={mainImage}
                  alt={product.title}
                  height={400}
                  width={400}
                  priority={true}
                  className="object-contain"
                  onError={(e) => {
                    e.target.src = "/rr.png";
                    e.target.onerror = null; 
                  }}
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
                            onError={(e) => {
                              e.target.src = "/rr.png";
                              e.target.onerror = null;
                            }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
                </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </>
              )}
            </Carousel>
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl md:text-3xl font-medium text-[var(--maincolor)]">
              ₹{product.salePrice?.toLocaleString('en-IN')}
            </span>
            {product.price && (
              <span className="text-lg md:text-xl text-gray-500 line-through">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {product.categories?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-gray-900">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <span 
                    key={cat.categoryId}
                    className="bg-[var(--lightcolor)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat.category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.subCategories?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-gray-900">Sub Categories</h2>
              <div className="flex flex-wrap gap-2">
                {product.subCategories.map((subCat) => (
                  <span 
                    key={subCat.subCategoryId}
                    className="bg-[var(--lightcolor)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {subCat.subCategory.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.shortDesc }}
          />

          <Link href={`/contact?subject=${product.title}`}>
            <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 text-white bg-[var(--maincolor)] rounded-lg hover:opacity-90 transition-opacity">
              Contact Now
            </button>
          </Link>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12">
        <div className="border-b mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 pb-3">
            Description
          </h2>
        </div>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
}