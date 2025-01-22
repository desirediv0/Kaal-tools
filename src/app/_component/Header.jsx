"use client";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import SearchBar from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { getAllCategoriesAndSubCategories, searchProducts } from "@/Api";
import MegaMenu from "./mega.menu";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchProducts(query);
      setSearchResults(results || []);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (path) => pathname === path;

  const handleMobileClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategoriesAndSubCategories();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={400}
              height={100}
              className="w-auto h-20 md:h-28"
              priority
            />
          </Link>

          <div className="hidden md:block flex-grow max-w-2xl mx-auto px-4">
            <SearchBar onSearch={handleSearch} />
            <SearchResults
              results={searchResults}
              onProductClick={clearSearch}
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="tel:+918800199820"
              className="flex items-center gap-2 hover:text-orange-500 transition-colors text-lg"
            >
              <Phone className="h-5 w-5" />
              <span>+91 8800199820</span>
            </a>
            <a
              href="https://wa.me/918800199820"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Get Quote</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div className="border-t bg-orange-500">
        <div className="container mx-auto px-4">
          <nav className="hidden md:block">
            <ul className="flex items-center justify-center gap-6">
              <li>
                <Link
                  href="/"
                  className={`py-1 px-4 transition-colors font-bold text-sm ${
                    isActive("/")
                      ? "text-black font-bold"
                      : "text-white hover:text-gray-100"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`py-1 px-4 transition-colors font-bold text-sm ${
                    isActive("/about")
                      ? "text-black font-bold"
                      : "text-white hover:text-gray-100"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
              <MegaMenu isMobile={false} categories={categories} />
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`py-1 px-4 transition-colors font-bold text-sm ${
                    isActive("/contact")
                      ? "text-black font-bold"
                      : "text-white hover:text-gray-100"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="border-t">
          <div className="p-4 border-b relative mx-auto max-w-xl">
            <SearchBar onSearch={handleSearch} />
            <SearchResults
              results={searchResults}
              onProductClick={clearSearch}
            />
          </div>

          <nav className="py-2">
            <ul className="space-y-2">
              <li className="border-b">
                <Link
                  href="/"
                  onClick={handleMobileClick}
                  className={`block px-4 py-2 transition-colors text-lg font-bold ${
                    isActive("/")
                      ? "text-black font-bold"
                      : "hover:text-orange-500"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="border-b">
                <Link
                  href="/about"
                  onClick={handleMobileClick}
                  className={`block px-4 py-2 transition-colors text-lg font-bold ${
                    isActive("/about")
                      ? "text-black font-bold"
                      : "hover:text-orange-500"
                  }`}
                >
                  About
                </Link>
              </li>
              <li className="border-b">
              <MegaMenu isMobile={true} categories={categories} />
              </li>
              <li className="border-b">
                <Link
                  href="/contact"
                  onClick={handleMobileClick}
                  className={`block px-4 py-2 transition-colors text-lg font-bold ${
                    isActive("/contact")
                      ? "text-black font-bold"
                      : "hover:text-orange-500"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 space-y-4 border-t">
            <a
              href="tel:+918800199820"
              className="flex items-center gap-2 hover:text-orange-500 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+91 8800199820</span>
            </a>
            <a
              href="https://wa.me/918800199820"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Get Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
