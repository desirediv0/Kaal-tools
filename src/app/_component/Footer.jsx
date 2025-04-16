import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-20 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Useful Links Section */}
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              Useful Links
            </h1>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              <h2 className="text-base">Home</h2>
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors"
            >
              <h2 className="text-base">About</h2>
            </Link>
            <Link
              href="/product"
              className="hover:text-gray-300 transition-colors"
            >
              <h2 className="text-base">Products</h2>
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              <h2 className="text-base">Contact</h2>
            </Link>
          </section>

          {/* Categories Column 1 */}
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              Categories
            </h1>
            {[
              "metalworking lathe accessories",
              "woodworking tools",
              "measuring & marking tools",
              "cutting tools",
              "hand tools",
              "magnetic & dressing tools",
              "vee blocks & angle plates",
            ].map((category) => (
              <Link
                key={category}
                href={`/product?category=${encodeURIComponent(category)}`}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <IoIosArrowForward className="text-orange-500" size={15} />
                <h2 className="uppercase text-sm font-normal">{category}</h2>
              </Link>
            ))}
          </section>

          {/* Categories Column 2 */}
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              More Categories
            </h1>
            {[
              "vises & milling tables",
              "indexable tools",
              "rotary tables & accessories",
              "thread repairing kits & accessories",
              "boring heads & accessories",
              "metal forming & cutting",
              "lubrication tools",
            ].map((category) => (
              <Link
                key={category}
                href={`/product?category=${encodeURIComponent(category)}`}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <IoIosArrowForward className="text-orange-500" size={15} />
                <h2 className="uppercase text-sm font-normal">{category}</h2>
              </Link>
            ))}
          </section>
          {/* Get in Touch Section with Logo */}
          <section className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              Get in Touch
            </h1>
            <Link href="/" className="flex-shrink-0 relative mb-4">
              <Image
                src="/logowhite.png"
                alt="Logo"
                width={400}
                height={100}
                className="w-auto h-20"
                priority
              />
              <span className="absolute top-7 right-16 hidden md:block text-xs font-medium">
                ®
              </span>
            </Link>
            <div className="flex gap-3">
              <IoLocationOutline size={22} className="flex-shrink-0 mt-1" />
              <p className="text-base">
                Plot No.164, Udyog Vihar Phase-6, Gurugram - 122004, Haryana
                (India)
              </p>
            </div>
            <Link
              href="mailto:sales@kaaltools.com"
              className="flex gap-3 items-center hover:text-gray-300 transition-colors"
            >
              <LuMail size={20} className="flex-shrink-0" />
              <span className="text-base">sales@kaaltools.com</span>
            </Link>
          </section>
        </div>
      </div>

      <div className="border-t border-gray-800 max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-4 text-base text-center sm:text-left">
          ©Kaal Tools 2025 | All Rights Reserved | Designed by{" "}
          <Link
            href="https://xcelb2b.com/"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Xcel B2B
          </Link>
        </div>
      </div>
    </div>
  );
}