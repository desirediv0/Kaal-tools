"use client";

import React from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100">
      <div className="text-center mb-8 mt-4 max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-black uppercase mb-2">
          Why KAAL 
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/2">
          <Image
            src="/msn.webp"
            alt="Why choose KAAL TOOLS"
            width={500}
            height={300} 
            className="w-full md:h-96 object-cover"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 lg:pl-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 relative w-min text-nowrap">
              WHY KAAL
              <span className="absolute -top-2 -right-4 text-[10px] leading-none">®</span>
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Kaal, we are committed to providing tools that not only meet but exceed project standards. Our dedication to quality ensures that every product we offer is built to last, perform under all conditions, and integrate the most advanced technology available.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-700">
                Exceeds industry standards with innovative designs
              </li>
              <li className="text-gray-700">
                Built for durability and exceptional performance in all conditions
              </li>
              <li className="text-gray-700">
                Incorporates cutting-edge technology for maximum efficiency
              </li>
              <li className="text-gray-700">
                Exceeds industry standards with innovative designs
              </li>
              <li className="text-gray-700">
                Built for durability and exceptional performance in all conditions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}