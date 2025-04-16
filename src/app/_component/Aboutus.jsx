"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "./Wrapper";

export default function AboutUs({ activePage = "about" }) {
  return (
    <section className="bg-gray-100 py-12 md:py-20 px-4 ">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  -mt-8 lg:-mt-16 ">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center ">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
            <div className="w-24 h-1 bg-orange-600 mb-8"></div>

            <div className="border-l-4  border-orange-600 pl-6 mb-8 bg-white p-4 shadow-sm ">
              <p className="text-gray-700 italic font-medium leading-relaxed">
                KAAL TOOLS (formerly ATECH TOOLS) is a third-generation family
                run business engaged in manufacturing &amp; exports of
                engineering tools &amp; industrial supplies.
              </p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              My grandfather established this business in the year 1979, he
              started as a trading company catering to the metalworking
              industry. From the very beginning, his focus wasn&#39;t just on
              transactions; it was about truly understanding what his customers
              needed. It was that dedication to excellent products and
              unwavering service that allowed him to build not just a business,
              but genuine trust and lasting customer loyalty. Under his
              guidance, the company continued to grow and evolve, and in 1985,
              we took the pivotal step of setting up our own manufacturing unit,
              specializing in making Machine Tool Accessories.
            </p>
            {activePage === "about" && (
              <>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our very first product off the line was a revolving center
                  which we made for the US market. A seemingly simple yet
                  crucial tool known for its ability to provide stable and
                  accurate support for workpieces during machining operations.
                  This early focus on fundamental precision laid the groundwork
                  for the high standards that KAAL TOOLS continues to uphold
                  today.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our factory is situated in Gurugram city (an hours drive from
                  the capital city New Delhi). With decades of manufacturing
                  experience, KAAL TOOLS has traversed a remarkable journey. We
                  have developed to become one of the leading suppliers of
                  engineering tools &amp; industrial supplies to the
                  metalworking &amp; woodworking industries around the world.
                  Today, we are proud to be recognized as one of India's leading
                  tool suppliers catering to home users and professionals.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We understand that the success of every machining endeavor
                  hinges on the reliability and accuracy of the tools employed.
                  KAAL TOOLS dedicates itself to manufacturing and supplying an
                  unparalleled inventory of robust, high- performance tools that
                  not only meet but exceed the rigorous demands of today&#39;s
                  machinists, fostering a level of confidence and dependability
                  that consistently positions us as the MACHINISTS CHOICE
                </p>
              </>
            )}
            {activePage === "home" && (
              <>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our very first product off the line was a revolving center
                  which we made for the US market. This early focus on
                  fundamental precision laid the groundwork for the high
                  standards that KAAL TOOLS continues to uphold today.
                </p>
                <div className="mt-6">
                  <Link
                    href="/about"
                    className="inline-block py-3 px-8 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Image and Info Box */}
          <div className="flex flex-col  ">
            {/* Image Container */}
            <div className="relative h-auto lg:h-[650px] flex items-center">
              <div className="bg-white p-3 rounded-lg shadow-xl w-full">
                <Image
                  alt="About KAAL TOOLS"
                  height={500}
                  width={700}
                  src="/abs.webp"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              {activePage === "home" && (
                <div className="absolute bottom-4 right-4 p-6 bg-orange-600 rounded-lg text-white text-center shadow-xl">
                  <span className="block font-bold text-3xl">45+</span>
                  <span className="text-sm">Years of Excellence</span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Commitment
              </h3>
              <p className="text-gray-700 leading-relaxed">
                In Pursuit of "excellence & perfection" we give our tools high
                accuracy, economy & longer lifeby ensuring proper heat treatment
                and inspection with sophisticated instruments under the staff of
                dedicated & Experienced Engineers so as to ensure reliable
                performance under most demanding conditions.
              </p>
              {activePage === "about" && (
                <p className="text-gray-700 mt-4 leading-relaxed">
                  Looking to the future, our commitment extends beyond just
                  providing exceptional tools. The ethics and code of conduct
                  promoted at KAAL TOOLS ensure the healthiest and most secure
                  business communication. We believe in attaining success,
                  together.
                </p>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
