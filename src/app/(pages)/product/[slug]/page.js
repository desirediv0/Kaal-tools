"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
import { 
  ArrowLeftIcon, 
  AwardIcon, 
  CheckCircleIcon, 
  GaugeIcon, 
  HomeIcon, 
  LayersIcon, 
  Loader2Icon, 
  PenToolIcon, 
  ShieldCheckIcon, 
  TagIcon 
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image';
const AUTO_SCROLL_INTERVAL = 3000;

const getImageUrl = (filename) => {
  if (!filename) return FALLBACK_IMAGE;
  if (filename.startsWith('http')) return filename;
  return `https://${process.env.NEXT_PUBLIC_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_SPACES_REGION}.digitaloceanspaces.com/${filename}`;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(FALLBACK_IMAGE);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center"
  });

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

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetchsingleProduct(params.slug);
        
        // Check if response is valid JSON
        if (typeof response === 'string' && response.includes('<!DOCTYPE')) {
          throw new Error('Server error occurred. Please try again later.');
        }

        if (response.success) {
          setProduct(response.data);
          setMainImage(response.data.image || FALLBACK_IMAGE);
        } else {
          throw new Error(response.message || "Failed to fetch product");
        }
      } catch (error) {
        console.error('Product fetch error:', error);
        setError(
          error.message === 'Failed to fetch' || error.message.includes('<!DOCTYPE') 
            ? 'Network error occurred. Please check your connection and try again.'
            : error.message || "Product not found"
        );
        setMainImage(FALLBACK_IMAGE);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [params.slug]);

  // Handle image array
  const allImages = useMemo(() => {
    if (!product) return [FALLBACK_IMAGE];
    
    const images = [];
    if (product.image) {
      images.push(product.image);
    }
    if (product.images?.length > 0) {
      const additionalImages = product.images.map(img => getImageUrl(img.url));
      images.push(...additionalImages);
    }
    
    return images.length > 0 ? images : [FALLBACK_IMAGE];
  }, [product]);

  // Auto scroll effect for images
  useEffect(() => {
    if (!allImages.length || allImages.length === 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % allImages.length;
      setCurrentImageIndex(nextIndex);
      setMainImage(allImages[nextIndex]);
      emblaApi?.scrollTo(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [allImages, currentImageIndex, emblaApi]);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((image, index) => {
    setMainImage(image);
    setCurrentImageIndex(index);
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-[var(--maincolor)]" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            {error || "Product not found"}
          </h2>
          <p className="text-gray-600">
            {error?.includes('Network error') 
              ? 'Please check your internet connection and try again.'
              : 'Sorry, we couldn\'t find the product you\'re looking for.'}
          </p>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-[var(--maincolor)] text-white rounded-lg hover:opacity-90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 mt-8">
      {/* Breadcrumb */}
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
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              priority
              className="object-contain"
              onError={() => setMainImage(FALLBACK_IMAGE)}
            />
          </div>
          
          {allImages.length > 1 && (
            <Carousel className="w-full max-w-xs mx-auto" ref={emblaRef}>
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <Card 
                        className={`hover:shadow-md transition-all duration-300 cursor-pointer ${
                          mainImage === image ? 'ring-2 ring-[var(--maincolor)]' : ''
                        }`}
                      >
                        <CardContent className="flex aspect-square relative p-0">
                          <Image
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            fill
                            className="rounded-md object-cover hover:opacity-80 transition-opacity duration-300"
                            onClick={() => handleThumbnailClick(image, index)}
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
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
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                {feature.icon}
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-gray-900">
                <TagIcon className="w-5 h-5 text-[var(--maincolor)]" />
                <h2>Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <span 
                    key={cat.categoryId} 
                    className="flex items-center gap-1 bg-[var(--lightcolor)] px-4 py-2 rounded-full uppercase text-xs font-medium hover:bg-orange-100 transition-colors"
                  >
                    {cat.category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sub Categories */}
          {product.subCategories?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-gray-900">
                <LayersIcon className="w-5 h-5 text-[var(--maincolor)]" />
                <h2>Sub Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.subCategories.map((subCat) => (
                  <span 
                    key={subCat.subCategoryId} 
                    className="flex items-center gap-1 bg-[var(--lightcolor)] px-4 py-2 rounded-full uppercase text-xs font-medium hover:bg-orange-100 transition-colors"
                  >
                    {subCat.subCategory.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Short Description */}
          <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: product.shortDesc }} />
          </div>

          {/* Contact Button */}
          <Link href={`/contact?subject=${encodeURIComponent(product.title)}`}>
            <button className="flex items-center justify-center w-full gap-2 px-8 py-4 text-white bg-[var(--maincolor)] rounded-lg hover:opacity-90 transition-all text-lg font-medium">
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
          <div className="prose max-w-none bg-gray-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      )}
    </div>
  );
}