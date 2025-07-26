"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllCategoriesAndSubCategories,
  getSubcategoriesByCategory,
} from "@/Api";

export default function CategorySidebar({ isOpen, onClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [categorySubcategories, setCategorySubcategories] = useState({});

  const currentCategory = searchParams.get("category");
  const currentSubcategory = searchParams.get("subcategory");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoryData = await getAllCategoriesAndSubCategories();
        if (categoryData.success) {
          const filteredCategories = categoryData.data.filter(
            (cat) => cat.name !== "Uncategorized" && cat.name !== "All"
          );
          setCategories(filteredCategories);

          // Auto-expand categories that have subcategories and current category
          const categoriesToExpand = new Set();

          // Add current category if present
          if (currentCategory) {
            categoriesToExpand.add(currentCategory.toLowerCase());
          }

          // Add categories that have subcategories
          filteredCategories.forEach((category) => {
            if (category.subCategories && category.subCategories.length > 0) {
              categoriesToExpand.add(category.name.toLowerCase());
            }
          });

          setExpandedCategories(categoriesToExpand);

          // Pre-load subcategories for expanded categories
          for (const category of filteredCategories) {
            if (categoriesToExpand.has(category.name.toLowerCase())) {
              try {
                const subcategoryData = await getSubcategoriesByCategory(
                  category.name
                );
                if (subcategoryData.success) {
                  setCategorySubcategories((prev) => ({
                    ...prev,
                    [category.name.toLowerCase()]:
                      subcategoryData.data.subcategories,
                  }));
                }
              } catch (error) {
                console.error("Error fetching subcategories:", error);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentCategory]);

  const toggleCategory = async (categoryName) => {
    const categoryKey = categoryName.toLowerCase();
    const newExpanded = new Set(expandedCategories);

    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);

      // Fetch subcategories if not already loaded
      if (!categorySubcategories[categoryKey]) {
        try {
          const subcategoryData = await getSubcategoriesByCategory(
            categoryName
          );
          if (subcategoryData.success) {
            setCategorySubcategories((prev) => ({
              ...prev,
              [categoryKey]: subcategoryData.data.subcategories,
            }));
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    }

    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryName) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("subcategory");
    newParams.set("category", categoryName.toLowerCase());
    router.push(`/product?${newParams.toString()}`);
    // Don't close sidebar - keep it open
  };

  const handleSubcategoryClick = (subcategoryName) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("subcategory");
    newParams.set(
      "subcategory",
      encodeURIComponent(subcategoryName.toLowerCase())
    );
    router.push(`/product?${newParams.toString()}`);
    // Don't close sidebar - keep it open
  };

  const isCategoryActive = (categoryName) => {
    return currentCategory === categoryName.toLowerCase();
  };

  const isSubcategoryActive = (subcategoryName) => {
    return (
      currentSubcategory === encodeURIComponent(subcategoryName.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filter by Category</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4">
            {categories.map((category) => {
              const categoryKey = category.name.toLowerCase();
              const isExpanded = expandedCategories.has(categoryKey);
              const isActive = isCategoryActive(category.name);
              const subcategories = categorySubcategories[categoryKey] || [];

              return (
                <div key={category.id} className="mb-2">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? "bg-orange-100 text-orange-700 border border-orange-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <span className="font-medium text-sm uppercase">
                      {category.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category.name);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {isExpanded && subcategories.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1">
                      {subcategories.map((subcategory) => {
                        const isSubActive = isSubcategoryActive(
                          subcategory.name
                        );
                        return (
                          <div
                            key={subcategory.id}
                            className={`p-2 rounded cursor-pointer transition-colors text-sm ${
                              isSubActive
                                ? "bg-orange-50 text-orange-600 border border-orange-100"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              handleSubcategoryClick(subcategory.name)
                            }
                          >
                            {subcategory.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <button
            onClick={onClose}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
