"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "./Wrapper";

export default function AboutUs({ activePage = "about" }) {
  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className=" text-4xl font-bold text-gray-900 mb-6">About Us</h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Aimed with an invaluable legacy, contemporary approach and
              cutting-edge technology, KAAL TOOLS stands committed to always
              delivering products of Impeccable Quality to each of its valuable
              customers with customer satisfaction being a top priority.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Established in 1982, KAAL TOOLS is a third-generation family-run
              business started under the leadership of Sardar Tarlok Singh
              Kapoor. Our company's manufacturing facility & headquarters are
              located in Gurugram, Haryana (INDIA) and are a leading supplier of
              Engineering Tools & Industrial Supplies serving the international
              market for the last 42 years.
            </p>
            {activePage === "about" && (
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understanding the importance of a robust infrastructure, KAAL
                  TOOLS has a well-established state-of-the-art facility that is
                  spread across 10000 sq ft. The facility has high production
                  capacity and is managed by a professional team of skilled and
                  experienced workforce.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Since inception, our commitment towards meeting the
                  expectations of our customers has helped in gaining a vast
                  clientele all across the world. We take pride in our ability
                  to go that extra mile by providing several value-added
                  services and standing behind every product sold.
                </p>
              </div>
            )}
            {activePage === "home" && (
              <div>
                <Link
                  href="/about"
                  className="inline-block py-3 px-8 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Learn More About Us
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              alt="About KAAL TOOLS"
              height={500}
              width={700}
              src="/abs.webp"
              className="rounded-lg shadow-2xl"
            />
            <div
              className={`p-6 absolute bg-orange-500 rounded-lg text-white text-lg shadow-xl
                            ${
                              activePage === "about"
                                ? "hidden"
                                : "flex flex-col items-center justify-center"
                            }
                            left-4 bottom-4 md:left-[-30px] md:bottom-[-30px] lg:left-[-60px] lg:bottom-[-30px]`}
            >
              <span className=" font-bold">15+</span>
              <span>Years of Excellence</span>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
