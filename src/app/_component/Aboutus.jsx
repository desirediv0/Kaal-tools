"use client";

import React from "react";
import Link from "next/link";

export default function AboutUs({ activePage = "about" }) {
  return (
    <section className="max-w-7xl mx-auto py-8 px-6">
      <div className="border-b-2 border-orange-600 mb-8">
        <h1 className="text-3xl font-serif font-bold mb-4 text-center">
          About Us
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg leading-relaxed text-gray-800">
            KAAL TOOLS (formerly ATECH TOOLS) is a third-generation family run
            business engaged in manufacturing & exports of engineering tools &
            industrial supplies. My grandfather established this business in the
            year 1979, starting as a trading company catering to the
            metalworking industry. His focus wasn't just on transactions; it was
            about truly understanding what his customers needed.
          </p>
        </div>

        {activePage === "about" && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-lg leading-relaxed text-gray-800">
                Under his guidance, the company continued to grow and evolve,
                and in 1985, we took the pivotal step of setting up our own
                manufacturing unit, specializing in making Machine Tool
                Accessories. Our very first product was a revolving center for
                the US market - a crucial tool known for providing stable and
                accurate support during machining operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-lg leading-relaxed text-gray-800">
                Our factory in Gurugram city has become one of India's leading
                tool suppliers. We've developed into a premier supplier of
                engineering tools & industrial supplies to metalworking &
                woodworking industries worldwide, serving both home users and
                professionals.
              </p>
            </div>
          </>
        )}

        {activePage === "home" && (
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-orange-600 text-white hover:bg-orange-700 
                        transition duration-300 ease-in-out rounded-md font-semibold"
            >
              Discover Our Story
            </Link>
          </div>
        )}

        <div className="mt-8 border-t-2 border-orange-600 pt-6">
          <h3 className="text-2xl font-serif font-bold mb-4 text-center">
            Our Commitment
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-lg leading-relaxed text-gray-800">
              We understand that success in machining relies on tool reliability
              and accuracy. KAAL TOOLS dedicates itself to manufacturing and
              supplying robust, high-performance tools that exceed today's
              machinist demands, making us the MACHINIST'S CHOICE. Our
              commitment extends beyond tools - our ethics and code of conduct
              ensure the healthiest and most secure business communication. We
              believe in attaining success, together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}