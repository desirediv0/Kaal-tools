"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllCategoriesAndSubCategories,
  getSubcategoriesByCategory,
} from "@/Api";

export default function CategorySidebarDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
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

          // Auto-expand the current category if it exists
          if (currentCategory) {
            const categoryToExpand = filteredCategories.find(
              (cat) => cat.name.toLowerCase() === currentCategory
            );
            if (categoryToExpand) {
              setExpandedCategory(currentCategory);
              // Fetch subcategories for the current category
              fetchSubcategoriesForCategory(categoryToExpand.name);
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

  const fetchSubcategoriesForCategory = async (categoryName) => {
    const categoryKey = categoryName.toLowerCase();

    if (!categorySubcategories[categoryKey]) {
      try {
        const subcategoryData = await getSubcategoriesByCategory(categoryName);
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
  };

  const toggleCategory = async (categoryName) => {
    const categoryKey = categoryName.toLowerCase();

    // If clicking the same category, close it
    if (expandedCategory === categoryKey) {
      setExpandedCategory(null);
    } else {
      // If clicking a different category, close the previous one and open the new one
      setExpandedCategory(categoryKey);

      // Fetch subcategories if not already loaded
      await fetchSubcategoriesForCategory(categoryName);
    }
  };

  const handleCategoryClick = async (categoryName) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("subcategory");
    newParams.set("category", categoryName.toLowerCase());
    router.push(`/product?${newParams.toString()}`);

    // Auto-expand the clicked category
    const categoryKey = categoryName.toLowerCase();
    setExpandedCategory(categoryKey);

    // Fetch subcategories if not already loaded
    await fetchSubcategoriesForCategory(categoryName);
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>

      <div className="space-y-2">
        {categories.map((category) => {
          const categoryKey = category.name.toLowerCase();
          const isExpanded = expandedCategory === categoryKey;
          const isActive = isCategoryActive(category.name);
          const subcategories = categorySubcategories[categoryKey] || [];

          return (
            <div key={category.id} className="space-y-1">
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <span className="font-medium text-base uppercase">
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
                <div className="ml-4 space-y-1">
                  {subcategories.map((subcategory) => {
                    const isSubActive = isSubcategoryActive(subcategory.name);
                    return (
                      <div
                        key={subcategory.id}
                        className={`p-2 rounded cursor-pointer transition-colors text-base ${
                          isSubActive
                            ? "bg-orange-50 text-orange-600 border border-orange-100"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleSubcategoryClick(subcategory.name)}
                      >
                        <span className="uppercase">{subcategory.name}</span>
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
  );
}
