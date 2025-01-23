"use client";

import React from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100">
      <Wrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black uppercase mb-4">
            Why KAAL
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Empowering your projects with cutting-edge tools and unmatched quality
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-1/2">
            <Image
              src="/msn.webp"
              alt="Why choose KAAL TOOLS"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Quality Excellence</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Kaal, we are committed to providing tools that not only meet but exceed project standards. Our dedication to quality ensures that every product we offer is built to last, perform under all conditions, and integrate the most advanced technology available.
              </p>
              <ul className="space-y-4">
                <li className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  Exceeds industry standards with innovative designs
                </li>
                <li className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  Built for durability and exceptional performance in all conditions
                </li>
                <li className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  Incorporates cutting-edge technology for maximum efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

