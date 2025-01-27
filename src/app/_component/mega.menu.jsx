import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function MegaMenu({ isMobile, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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

  const renderCategoryName = (name) => {
    return name === "Uncategorized" ? "All" : name;
  };

  const getCategoryUrl = (category) => {
    if (category.name === "Uncategorized") {
      return "/product?category=all";
    }
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
          className="flex items-center gap-1 py-1 px-4 text-sm font-bold text-white hover:text-gray-100 transition-colors"
        >
          Products
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <div className={`absolute left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-lg p-6 transition-all duration-300 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}>
         <div className="grid grid-cols-2 gap-8">
            {categories?.map((category) => (
              <div key={category.id} className={category.subCategories.length === 0 ? 'mb-0' : 'mb-4'}>
                <Link 
                  href={getCategoryUrl(category)}
                  className="font-semibold text-lg text-black hover:text-gray-900 block uppercase"
                >
                  {renderCategoryName(category.name)}
                </Link>
                {category.subCategories.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link
                          href={getSubCategoryUrl(subCategory)}
                          className="text-gray-700 hover:text-orange-800 transition-colors text-sm block uppercase"
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
        className="flex items-center justify-between w-full py-2 px-4 text-xl font-bold"
      >
        Products
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`${isOpen ? "max-h-[500px]" : "max-h-0"} overflow-hidden transition-all duration-300`}>
        {categories?.map((category) => (
          <div key={category.id} className={`py-2 px-4 ${category.subCategories.length === 0 ? 'pb-0' : 'pb-2'}`}>
            <Link
              href={getCategoryUrl(category)}
              className="font-semibold text-primary text-xl block hover:text-orange-600"
            >
              {renderCategoryName(category.name)}
            </Link>
            {category.subCategories.length > 0 && (
              <ul className="mt-1 ml-4">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link
                      href={getSubCategoryUrl(subCategory)}
                      className="block py-1 text-gray-600 hover:text-primary transition-colors text-lg"
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
  );
}