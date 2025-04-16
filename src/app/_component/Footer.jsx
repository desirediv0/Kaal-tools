import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          <section className="flex flex-col gap-2 col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex-shrink-0 relative mb-4">
              <span className="absolute top-7 right-5 hidden md:block text-xs font-medium">
                ®
              </span>
              <Image
                src="/logowhite.png"
                alt="Logo"
                width={400}
                height={100}
                className="w-auto h-20"
                priority
              />
            </Link>
          </section>

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

          {/* Products Column 1 */}
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              Products
            </h1>
            <Link
              href="/product?category=metalworking+lathe+accessories"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                Metalworking lathe accessories
              </h2>
            </Link>
            <Link
              href="/product?category=woodworking+tools"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                Woodworking tools
              </h2>
            </Link>
            <Link
              href="/product?category=measuring+%26+marking+tools"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                Measuring & marking tools
              </h2>
            </Link>
            <Link
              href="/product?category=cutting+tools"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">Cutting tools</h2>
            </Link>
          </section>

          {/* Products Column 2 */}
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2 sm:block lg:hidden">
              More Products
            </h1>
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2 hidden lg:block opacity-0">
              Products
            </h1>
            <Link
              href="/product?category=hand+tools"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">hand tools</h2>
            </Link>
            <Link
              href="/product?category=magnetic+%26+dressing+tools"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                magnetic & dressing tools
              </h2>
            </Link>
            <Link
              href="/product?category=vee+blocks+%26+angle+plates"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                vee blocks & angle plates
              </h2>
            </Link>
            <Link
              href="/product?category=vises+%26+milling+tables"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <IoIosArrowForward className="text-orange-500" size={15} />
              <h2 className="uppercase text-sm font-normal">
                vises & milling tables
              </h2>
            </Link>
          </section>

          {/* Contact Section */}
          <section className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h1 className="text-xl font-medium border-b border-gray-700 pb-2 mb-2">
              Get in Touch
            </h1>
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
