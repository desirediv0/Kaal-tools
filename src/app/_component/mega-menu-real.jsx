import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

// Create category structure from product.json data
const getProductCategories = () => {
  const categories = {};
  const products = require("/public/product.json");

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = new Set();
    }
    if (product.subcategory) {
      categories[product.category].add(product.subcategory);
    }
  });

  // Convert Sets to Arrays
  return Object.fromEntries(
    Object.entries(categories).map(([category, subcategories]) => [
      category,
      [...subcategories],
    ])
  );
};

const productCategories = getProductCategories();

export default function MegaMenu({ isMobile }) {
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

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
          className="flex items-center gap-1 py-2 px-4 hover:text-orange-500 transition-colors"
        >
          Products
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-lg p-6 transition-all duration-300 ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(productCategories).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 text-orange-500">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href={`/products/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-4"
      >
        Products
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`${
          isOpen ? "max-h-[500px]" : "max-h-0"
        } overflow-hidden transition-all duration-300`}
      >
        {Object.entries(productCategories).map(([category, items]) => (
          <div key={category} className="py-2 px-4">
            <h3 className="font-semibold text-orange-500">{category}</h3>
            <ul className="mt-1 ml-4">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href={`/products/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block py-1 text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
