"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./product-card";
import { fetchCategoryProducts, getAllCategoriesAndSubCategories } from "@/Api";

const stripHtml = (html) => {
  return html?.replace(/<[^>]*>/g, '') || '';
};

export default function ProductPage({ initialCategory, initialSubCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [activeSubCategory, setActiveSubCategory] = useState(initialSubCategory || null);
  const [openCategory, setOpenCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateUrl = (params) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    newParams.delete('subcategory');

    if (params.category) {
      newParams.set('category', params.category.toLowerCase());
    }
    if (params.subcategory) {
      newParams.set('subcategory', params.subcategory.toLowerCase());
    }

    router.push(`/product?${newParams.toString()}`);
  };

  const handleCategory = async (category) => {
    setActiveCategory(category);
    setActiveSubCategory(null);
    updateUrl({ category });
    setIsSidebarOpen(false);
    scrollToTop();
    router.refresh()
  };

  const handleSubCategory = async (subcategory) => {
    setActiveSubCategory(subcategory);
    setActiveCategory(null);
    updateUrl({ subcategory });
    setIsSidebarOpen(false);
    scrollToTop();
    router.refresh()
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      scrollToTop();
      try {
        const [categoryData, productData] = await Promise.all([
          getAllCategoriesAndSubCategories(),
          fetchCategoryProducts({
            categoryName: searchParams.get('category'),
            subcategoryName: searchParams.get('subcategory')
          })
        ]);

        if (categoryData.success) {
          const filteredCategories = categoryData.data.filter(
            cat => cat.name !== "Uncategorized" && cat.name !== "All"
          );
          setCategories(filteredCategories);
        }


        if (!productData.success && searchParams.get('subcategory')) {
          setProducts([]);
          return;
        }

        if (productData.success) {
          setProducts(productData.data.products.map(product => ({
            ...product,
            shortDesc: stripHtml(product.shortDesc),
            description: stripHtml(product.description)
          })));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const toggleDropdown = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="lg:hidden flex items-center gap-2 mb-4 text-gray-600"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Filter className="h-5 w-5" />
        <span>Filter Products</span>
      </button>

      <div className="flex gap-6">
        <aside
          className={`${isSidebarOpen ? "block" : "hidden"
            } lg:block lg:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit`}
        >
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => {
                    handleCategory(category.name);
                    toggleDropdown(category.name);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded ${activeCategory === category.name
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="uppercase">{category.name}</span>
                    {category.subCategories.length > 0 && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openCategory === category.name ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </div>
                </button>

                {category.subCategories.length > 0 &&
                  openCategory === category.name && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {category.subCategories.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleSubCategory(sub.name)}
                            className={`w-full text-left px-2 py-1.5 rounded ${activeSubCategory === sub.name
                              ? "text-orange-600"
                              : "text-gray-600 hover:text-orange-500"
                              }`}
                          >
                            <span className="uppercase">{sub.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </aside>

        <main className="lg:w-3/4 w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
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
              {products.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}