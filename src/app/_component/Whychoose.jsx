"use client";

import React from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100">

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

        <div className="w-full lg:w-1/2 lg:pl-8 p-10">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              WHY KAAL
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