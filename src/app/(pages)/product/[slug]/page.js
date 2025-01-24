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
import { ArrowLeftIcon, AwardIcon, CheckCircleIcon, GaugeIcon, HomeIcon, LayersIcon, Loader2Icon, PenToolIcon, ShieldCheckIcon, TagIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const FALLBACK_IMAGE = "/rr.png";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(FALLBACK_IMAGE);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const productFeatures = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "Premium Quality Assured"
    },
    {
      icon: <PenToolIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "Professional Grade Tools"
    },
    {
      icon: <AwardIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "Industry Leading Standards"
    },
    {
      icon: <GaugeIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "High Performance"
    }
  ];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetchsingleProduct(params.slug);
        if (response.success) {
          setProduct(response.data);
          if (response.data.image) {
            setMainImage(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${response.data.image}`);
          }
        } else {
          throw new Error(response.message || "Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
        setError(error.message || "Product not found");
        setMainImage(FALLBACK_IMAGE);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [params.slug]);

  const allImages = product?.image 
    ? [`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`]
    : [FALLBACK_IMAGE];

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
    <div className="flex items-center gap-2 mb-8 text-sm">
        <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-[var(--maincolor)]">
          <HomeIcon className="w-4 h-4" />
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative flex justify-center aspect-auto overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={mainImage}
              alt={product.title}
              height={400}
              width={400}
              priority={true}
              className="object-contain"
              onError={() => {
                setMainImage(FALLBACK_IMAGE);
              }}
            />
          </div>
          
          {allImages.length > 1 && (
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
                            onError={() => {
                              setMainImage(FALLBACK_IMAGE);
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

        {/* Product Details Section */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 border-b pb-4 uppercase">
            {product.title}
          </h1>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {productFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                {feature.icon}
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {product.categories?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-gray-900">
                <TagIcon className="w-5 h-5 text-[var(--maincolor)]" />
                <h2>Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <span key={cat.categoryId} className="flex items-center gap-1 bg-[var(--lightcolor)] px-4 py-2 rounded-full uppercase text-xs font-medium">
                    {cat.category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

       
          {product.subCategories?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-gray-900">
                <LayersIcon className="w-5 h-5 text-[var(--maincolor)]" />
                <h2>Sub Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.subCategories.map((subCat) => (
                  <span key={subCat.subCategoryId} className="flex items-center gap-1 bg-[var(--lightcolor)] px-4 py-2 rounded-full uppercase text-xs font-medium">
                    {subCat.subCategory.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="prose max-w-none bg-gray-50 p-6 rounded-lg capitalize">
            <div dangerouslySetInnerHTML={{ __html: product.shortDesc }} />
          </div>

          <Link href={`/contact?subject=${encodeURIComponent(product.title)}`}>
            <button className="flex items-center justify-center w-full gap-2 px-8 py-4 text-white bg-[var(--maincolor)] rounded-lg hover:opacity-90 transition-opacity text-lg font-medium">
              Contact Now
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>


      {/* Description Section */}
      {product.description && (
        <div className="mt-16">
          <div className="flex items-center gap-2 border-b mb-8">
            <CheckCircleIcon className="w-6 h-6 text-[var(--maincolor)]" />
            <h2 className="text-2xl font-semibold text-gray-900 pb-3">
              Description
            </h2>
          </div>
          <div className="prose max-w-none bg-gray-50 p-8 rounded-lg capitalize">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      )}
    </div>
  );
}