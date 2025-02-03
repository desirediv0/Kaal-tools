"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { fetchsingleProduct } from "@/Api"
import Link from "next/link"
import { CheckCircleIcon, ChevronRight, Loader2Icon, Mail, PenToolIcon, ShieldCheckIcon } from "lucide-react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

const FALLBACK_IMAGE = "https://placehold.co/600x400?text=No+Image"
const AUTO_SCROLL_INTERVAL = 3000

const getImageUrl = (filename) => {
  if (!filename) return FALLBACK_IMAGE
  if (filename.startsWith("http")) return filename
  return `https://${process.env.NEXT_PUBLIC_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_SPACES_REGION}.digitaloceanspaces.com/${filename}`
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState(FALLBACK_IMAGE)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  })

  const updateUrl = (params) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete("category")
    newParams.delete("subcategory")

    if (params.category) {
      newParams.set("category", params.category.toLowerCase())
    }
    if (params.subcategory) {
      newParams.set("subcategory", params.subcategory.toLowerCase())
    }

    router.push(`/product?${newParams.toString()}`)
  }

  const productFeatures = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "Premium Quality Assured",
    },
    {
      icon: <PenToolIcon className="w-6 h-6 text-[var(--maincolor)]" />,
      text: "Professional Grade Tools",
    },
  ]

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetchsingleProduct(params.slug)

        // Check if response is valid JSON
        if (typeof response === "string" && response.includes("<!DOCTYPE")) {
          throw new Error("Server error occurred. Please try again later.")
        }

        if (response.success) {
          setProduct(response.data)
          setMainImage(response.data.image || FALLBACK_IMAGE)
        } else {
          throw new Error(response.message || "Failed to fetch product")
        }
      } catch (error) {
        console.error("Product fetch error:", error)
        setError(
          error.message === "Failed to fetch" || error.message.includes("<!DOCTYPE")
            ? "Network error occurred. Please check your connection and try again."
            : error.message || "Product not found",
        )
        setMainImage(FALLBACK_IMAGE)
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct()
  }, [params.slug])

  // Handle image array
  const allImages = useMemo(() => {
    if (!product) return [FALLBACK_IMAGE]

    const images = []
    if (product.image) {
      images.push(product.image)
    }
    if (product.images?.length > 0) {
      const additionalImages = product.images.map((img) => getImageUrl(img.url))
      images.push(...additionalImages)
    }

    return images.length > 0 ? images : [FALLBACK_IMAGE]
  }, [product])

  // Auto scroll effect for images
  useEffect(() => {
    if (!allImages.length || allImages.length === 1) return

    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % allImages.length
      setCurrentImageIndex(nextIndex)
      setMainImage(allImages[nextIndex])
      emblaApi?.scrollTo(nextIndex)
    }, AUTO_SCROLL_INTERVAL)

    return () => clearInterval(interval)
  }, [allImages, currentImageIndex, emblaApi])

  // Handle thumbnail click
  const handleThumbnailClick = useCallback(
    (image, index) => {
      setMainImage(image)
      setCurrentImageIndex(index)
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const noSelectClass = "select-none pointer-events-none"


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="h-8 w-8 animate-spin text-[var(--maincolor)]" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">{error || "Product not found"}</h2>
          <p className="text-gray-600">
            {error?.includes("Network error")
              ? "Please check your internet connection and try again."
              : "Sorry, we couldn't find the product you're looking for."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-[var(--maincolor)] text-white rounded-lg hover:opacity-90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="flex justify-start items-center gap-4 mb-8 ">
        {/* Left Side - Categories */}
        <div className="flex items-center gap-2">
          {product.categories?.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => updateUrl({ category: cat.category.name })}
              className={`px-3 py-1 text-sm font-bold
                                     ${cat.active
                  ? 'text-[var(--maincolor)]'
                  : 'text-gray-600 hover:text-[var(--maincolor)]'} 
                                     transition-all uppercase`}
            >
              {cat.category.name}
            </button>
          ))}
        </div>

        {/* Right Side - Subcategories with "/" prefix */}
        <div className="flex items-center gap-2">
          {product.subCategories?.length > 0 && product.subCategories.map((subCat) => (
            <button
              key={subCat.subCategoryId}
              onClick={() => updateUrl({ subcategory: subCat.subCategory.name })}
              className={`px-2 py-1 text-sm font-medium flex items-center
                                     ${subCat.active
                  ? 'text-[var(--maincolor)]'
                  : 'text-gray-500 hover:text-[var(--maincolor)]'}
                                     transition-all uppercase`}
            >
              <span className="text-gray-400 mr-2">
                <ChevronRight className="w-4 h-4" />
              </span>
              {subCat.subCategory.name}
            </button>
          ))}
        </div>
      </div>

      <div


        className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={product.title}
              fill
              priority
              className={`object-contain ${noSelectClass}`}
              onError={() => setMainImage(FALLBACK_IMAGE)}
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          </div>

          {allImages.length > 1 && (
            <Carousel className="w-full max-w-xs mx-auto" ref={emblaRef}>
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <Card
                        className={`hover:shadow-md transition-all duration-300 cursor-pointer ${mainImage === image ? "ring-2 ring-[var(--maincolor)]" : ""
                          }`}
                      >
                        <CardContent className="flex aspect-square relative p-0">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${product.title} - Image ${index + 1}`}
                            fill
                            className={`rounded-md object-cover hover:opacity-80 transition-opacity duration-300 ${noSelectClass}`}
                            onClick={() => handleThumbnailClick(image, index)}
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE
                            }}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable="false"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">{product.title}</h1>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {productFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
              >
                {feature.icon}
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Short Description */}
          <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
            <div
              dangerouslySetInnerHTML={{ __html: product.shortDesc }}
            />
          </div>

          {/* Contact Button */}
          <Link href={`/contact?subject=${encodeURIComponent(product.title)}`}>
            <button className="flex items-center justify-center w-full gap-2 px-8 py-4 text-white bg-[var(--maincolor)] rounded-lg hover:opacity-90 transition-all text-lg font-medium">
              <Mail className="w-5 h-5" />
              Enquire Now
            </button>
          </Link>
        </div>
      </div>

      {/* Description Section */}
      {product.description && (
        <div className="mt-16">
          <div className="flex items-center gap-2 border-b mb-8">
            <CheckCircleIcon className="w-6 h-6 text-[var(--maincolor)]" />
            <h2 className="text-2xl font-semibold text-gray-900 pb-3">Description</h2>
          </div>
          <div className="prose max-w-none bg-gray-50 p-8 rounded-lg">
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

