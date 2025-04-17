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
            business engaged in manufacturing &amp; exports of engineering tools
            &amp; industrial supplies.
          </p>
          <br />
          <p className="text-lg leading-relaxed text-gray-800">
            My grandfather established this business in the year 1979, he
            started as a trading company catering to the metalworking industry.
            From the very beginning, his focus wasn&#39;t just on transactions;
            it was about truly understanding what his customers needed. It was
            that dedication to excellent products and unwavering service that
            allowed him to build not just a business, but genuine trust and
            lasting customer loyalty. Under his guidance, the company continued
            to grow and evolve, and in 1985, we took the pivotal step of setting
            up our own manufacturing unit, specializing in making Machine Tool
            Accessories.
          </p>
        </div>

        {activePage === "about" && (
          <>
            <div className="bg-white px-6 rounded-lg shadow-sm">
              <p className="text-lg leading-relaxed text-gray-800">
                Our very first product off the line was a revolving center which
                we made for the US market. A seemingly simple yet crucial tool
                known for its ability to provide stable and accurate support for
                workpieces during machining operations. This early focus on
                fundamental precision laid the groundwork for the high standards
                that KAAL TOOLS continues to uphold today.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-lg leading-relaxed text-gray-800">
                Our factory is situated in Gurugram city (an hours drive from
                the capital city New Delhi). With decades of manufacturing
                experience, KAAL TOOLS has traversed a remarkable journey. We
                have developed to become one of the leading suppliers of
                engineering tools &amp; industrial supplies to the metalworking
                &amp; woodworking industries around the world. Today, we are
                proud to be recognized as one of India’s leading tool suppliers
                catering to home users and professionals.
              </p>
              <br />
              <p className="text-lg  pt-1 leading-relaxed text-gray-800">
                We understand that the success of every machining endeavor
                hinges on the reliability and accuracy of the tools employed.
                KAAL TOOLS dedicates itself to manufacturing and supplying an
                unparalleled inventory of robust, high- performance tools that
                not only meet but exceed the rigorous demands of today&#39;s
                machinists, fostering a level of confidence and dependability
                that consistently positions us as the MACHINISTS CHOICE.
              </p>
              <br />
              <p className="text-lg  pt-1 leading-relaxed text-gray-800">
                Looking to the future, our commitment extends beyond just
                providing exceptional tools. The ethics and code of conduct
                promoted at KAAL TOOLS ensure the healthiest and most secure
                business communication. We believe in attaining success,
                together.
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
      </div>
    </section>
  );
}