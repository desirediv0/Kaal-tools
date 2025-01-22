import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const productCategories = {
  "Industrial Tools": [
    "Power Tools",
    "Hand Tools",
    "Measuring Tools",
    "Safety Equipment",
  ],
  "Construction Equipment": [
    "Concrete Tools",
    "Scaffolding",
    "Building Materials",
    "Heavy Machinery",
  ],
  "Electrical Supplies": [
    "Wiring & Cables",
    "Circuit Breakers",
    "Lighting",
    "Testing Equipment",
  ],
  "Plumbing Tools": ["Pipe Tools", "Fittings", "Drainage", "Water Systems"],
};

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
          className="flex items-center gap-1 py-1 px-4 text-sm font-bold text-white hover:text-gray-100 transition-colors"
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
                        href={`/product`}
                        className="text-gray-700 hover:text-orange-700 transition-colors text-lg"
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

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-4 text-xl font-bold"
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
            <h3 className="font-semibold text-primary text-xl">{category}</h3>
            <ul className="mt-1 ml-4">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href={`/products/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="block py-1 text-gray-600 hover:text-primary transition-colors text-lg"
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
