import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function MegaMenu({ isMobile, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Filter out unwanted categories
  const filteredCategories = categories?.filter(cat => 
    cat.name !== "Uncategorized" && cat.name !== "All"
  ) || [];

  // Click outside handler
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  const handleClick = () => {
    setIsOpen(false);
  };

  const getCategoryUrl = (category) => {
    return `/product?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const getSubCategoryUrl = (subCategory) => {
    return `/product?subcategory=${subCategory.name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  // Desktop menu
  if (!isMobile) {
    return (
      <div
        ref={menuRef}
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 py-2 px-4 text-sm font-bold text-white hover:text-gray-100 transition-colors"
        >
          Products
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] bg-white shadow-xl rounded-lg p-4 md:p-6 
            transition-all duration-300 z-50 origin-top
            ${isOpen 
              ? "opacity-100 visible translate-y-0 scale-100" 
              : "opacity-0 invisible -translate-y-4 scale-95"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-h-[70vh] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div key={category.id} className="min-w-[200px]">
                <Link 
                  href={getCategoryUrl(category)}
                  onClick={handleClick}
                  className="font-semibold text-base text-black hover:text-orange-600 block uppercase"
                >
                  {category.name}
                </Link>
                {category.subCategories?.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link
                          href={getSubCategoryUrl(subCategory)}
                          onClick={handleClick}
                          className="text-gray-700 hover:text-orange-600 transition-colors text-sm block py-1"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // Mobile menu
  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 text-base font-bold"
      >
        <span>Products</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
  
      <div 
        className={`transition-all duration-300 bg-gray-50
          ${isOpen ? "max-h-[60vh] overflow-y-auto" : "max-h-0 overflow-hidden"}
          scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200`}
      >
        <div className="py-2">
          {filteredCategories.map((category) => (
            <div key={category.id} className="border-b last:border-b-0">
              <Link
                href={getCategoryUrl(category)}
                onClick={handleClick}
                className="block px-4 py-3 font-semibold text-gray-900 hover:text-orange-600 hover:bg-gray-100"
              >
                <span className="uppercase">{category.name}</span>
              </Link>
              {category.subCategories?.length > 0 && (
                <ul className="bg-white">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <Link
                        href={getSubCategoryUrl(subCategory)}
                        onClick={handleClick}
                        className="block py-2 px-8 text-gray-600 hover:text-orange-600 hover:bg-gray-50 transition-colors text-sm"
                      >
                        <span className="uppercase">{subCategory.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}