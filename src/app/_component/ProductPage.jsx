"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Filter, ArrowLeft, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./product-card";
import CategorySidebar from "./CategorySidebar";
import CategorySidebarDesktop from "./CategorySidebarDesktop";
import {
  fetchCategoryProducts,
  getAllCategoriesAndSubCategories,
  getSubcategoriesByCategory,
} from "@/Api";

const stripHtml = (html) => {
  return html?.replace(/<[^>]*>/g, "") || "";
};

export default function ProductPage({ initialCategory, initialSubCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("categories"); // 'categories' or 'subcategories'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

  const currentCategory = searchParams.get("category");
  const currentSubcategory = searchParams.get("subcategory");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateUrl = (params) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("subcategory");

    if (params.category) {
      newParams.set("category", params.category.toLowerCase());
    }
    if (params.subcategory) {
      const encodedSubcategory = encodeURIComponent(
        params.subcategory.toLowerCase()
      );
      newParams.set("subcategory", encodedSubcategory);
    }

    router.push(`/product?${newParams.toString()}`);
  };

  const handleCategoryClick = async (category) => {
    setLoading(true);
    try {
      const subcategoryData = await getSubcategoriesByCategory(category.name);

      if (subcategoryData.success) {
        setSelectedCategory({
          ...category,
          subCategories: subcategoryData.data.subcategories,
        });
        setViewMode("subcategories");
        updateUrl({ category: category.name });
      } else {
        console.error(
          "Failed to fetch subcategories:",
          subcategoryData.message
        );
        // Fallback to original category data
        setSelectedCategory(category);
        setViewMode("subcategories");
        updateUrl({ category: category.name });
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      // Fallback to original category data
      setSelectedCategory(category);
      setViewMode("subcategories");
      updateUrl({ category: category.name });
    } finally {
      setLoading(false);
    }
    setIsSidebarOpen(false);
    // Don't close category sidebar - keep it open
    scrollToTop();
  };

  const handleSubCategoryClick = async (subcategory) => {
    setLoading(true);
    try {
      const productData = await fetchCategoryProducts({
        subcategoryName: subcategory.name,
      });

      if (productData.success) {
        setProducts(
          productData.data.products.map((product) => ({
            ...product,
            shortDesc: stripHtml(product.shortDesc),
            description: stripHtml(product.description),
          }))
        );
        setViewMode("products");
        updateUrl({ subcategory: subcategory.name });
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
    setIsSidebarOpen(false);
    // Don't close category sidebar - keep it open
    scrollToTop();
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setViewMode("categories");
    setProducts([]);
    updateUrl({});
    scrollToTop();
  };

  const handleBackToSubcategories = () => {
    setViewMode("subcategories");
    setProducts([]);
    if (selectedCategory) {
      updateUrl({ category: selectedCategory.name });
    } else if (currentCategory) {
      updateUrl({ category: currentCategory });
    }
    scrollToTop();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryParam = searchParams.get("category");
        const subcategoryParam = searchParams.get("subcategory");

        if (subcategoryParam) {
          // Show only products for subcategory
          const decodedSubcategory = decodeURIComponent(subcategoryParam);
          const productData = await fetchCategoryProducts({
            subcategoryName: decodedSubcategory,
          });
          setProducts(
            productData.success
              ? productData.data.products.map((product) => ({
                  ...product,
                  shortDesc: stripHtml(product.shortDesc),
                  description: stripHtml(product.description),
                }))
              : []
          );
          setViewMode("products");
        } else if (categoryParam) {
          // Show only subcategories for category
          const decodedCategory = decodeURIComponent(categoryParam);

          // First fetch categories if not already loaded
          let categoryData = null;
          if (categories.length === 0) {
            categoryData = await getAllCategoriesAndSubCategories();
            if (categoryData.success) {
              const filteredCategories = categoryData.data.filter(
                (cat) => cat.name !== "Uncategorized" && cat.name !== "All"
              );
              setCategories(filteredCategories);
            }
          }

          // Find the category
          const categoriesToSearch =
            categories.length > 0
              ? categories
              : categoryData?.success
              ? categoryData.data.filter(
                  (cat) => cat.name !== "Uncategorized" && cat.name !== "All"
                )
              : [];

          let category = null;
          if (categoriesToSearch.length > 0) {
            category = categoriesToSearch.find(
              (cat) => cat.name.toLowerCase() === decodedCategory.toLowerCase()
            );
            if (!category) {
              category = categoriesToSearch.find(
                (cat) =>
                  cat.name
                    .toLowerCase()
                    .includes(decodedCategory.toLowerCase()) ||
                  decodedCategory.toLowerCase().includes(cat.name.toLowerCase())
              );
            }
            if (!category) {
              const cleanDecodedCategory = decodedCategory
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .trim();
              category = categoriesToSearch.find(
                (cat) =>
                  cat.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .trim() === cleanDecodedCategory
              );
            }
          }

          if (category) {
            const subcategoryData = await getSubcategoriesByCategory(
              category.name
            );
            setSelectedCategory({
              ...category,
              subCategories: subcategoryData.success
                ? subcategoryData.data.subcategories
                : [],
            });
            setViewMode("subcategories");
          } else {
            setSelectedCategory(null);
            setViewMode("subcategories");
          }
        } else {
          // No params: show all categories
          const categoryData = await getAllCategoriesAndSubCategories();
          if (categoryData.success) {
            const filteredCategories = categoryData.data.filter(
              (cat) => cat.name !== "Uncategorized" && cat.name !== "All"
            );
            setCategories(filteredCategories);
          }
          setViewMode("categories");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [searchParams]);

  // Only show categories if viewMode is 'categories' and no category/subcategory param
  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {category.subCategories?.length || 0} subcategories
          </p>
        </div>
      ))}
    </div>
  );

  // Only show subcategories if viewMode is 'subcategories' and selectedCategory is set
  const renderSubcategories = () => {
    if (!selectedCategory) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No category selected</p>
        </div>
      );
    }
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory.name} - Subcategories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {selectedCategory.subCategories &&
          selectedCategory.subCategories.length > 0 ? (
            selectedCategory.subCategories.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => {
                  // Navigate to the dedicated subcategory page instead of using query params
                  const encodedSubcategory = encodeURIComponent(
                    subcategory.name.toLowerCase()
                  );
                  router.push(`/product/subcategory/${encodedSubcategory}`);
                }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={subcategory.image || "/b1.jpg"}
                    alt={subcategory.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/b1.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">
                    {subcategory.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {subcategory._count?.products || 0} products
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No subcategories found for this category
            </div>
          )}
        </div>
      </div>
    );
  };

  // Only show products if viewMode is 'products'
  const renderProducts = () => (
    <div>
      <div className="mb-6">
        <button
          onClick={handleBackToSubcategories}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Subcategories
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
      </div>
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
        {products.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Category Sidebar Toggle Button */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <button
          onClick={() => setIsCategorySidebarOpen(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Menu className="h-5 w-5" />
          Browse Categories
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span
            className="cursor-pointer hover:text-orange-600"
            onClick={() => {
              updateUrl({});
              setViewMode("categories");
              setSelectedCategory(null);
              setProducts([]);
            }}
          >
            All Categories
          </span>
          {currentCategory && (
            <>
              <span>/</span>
              <span
                className="cursor-pointer hover:text-orange-600"
                onClick={() => {
                  updateUrl({ category: currentCategory });
                  setViewMode("subcategories");
                  setProducts([]);
                }}
              >
                {decodeURIComponent(currentCategory)}
              </span>
            </>
          )}
          {currentSubcategory && (
            <>
              <span>/</span>
              <span className="text-orange-600">
                {decodeURIComponent(currentSubcategory)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Desktop Breadcrumb Navigation */}
      <div className="mb-6 hidden md:flex items-center gap-2 text-sm text-gray-600">
        <span
          className="cursor-pointer hover:text-orange-600"
          onClick={() => {
            updateUrl({});
            setViewMode("categories");
            setSelectedCategory(null);
            setProducts([]);
          }}
        >
          All Categories
        </span>
        {currentCategory && (
          <>
            <span>/</span>
            <span
              className="cursor-pointer hover:text-orange-600"
              onClick={() => {
                updateUrl({ category: currentCategory });
                setViewMode("subcategories");
                setProducts([]);
              }}
            >
              {decodeURIComponent(currentCategory)}
            </span>
          </>
        )}
        {currentSubcategory && (
          <>
            <span>/</span>
            <span className="text-orange-600">
              {decodeURIComponent(currentSubcategory)}
            </span>
          </>
        )}
      </div>

      <div className="flex gap-6">
        {/* Desktop Category Sidebar - Always Visible */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <CategorySidebarDesktop />
        </div>

        {/* Mobile Category Sidebar */}
        <CategorySidebar
          isOpen={isCategorySidebarOpen}
          onClose={() => setIsCategorySidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <main className="w-full">
              {viewMode === "categories" && renderCategories()}
              {viewMode === "subcategories" && renderSubcategories()}
              {viewMode === "products" && renderProducts()}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
