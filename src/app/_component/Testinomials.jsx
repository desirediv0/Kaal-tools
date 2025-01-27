"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajan Mehra",
    role: "CEO, TechInnovate",
    content:
      "KAAL TOOLS has consistently delivered top-notch quality tools that have significantly improved our production efficiency. Their commitment to innovation is truly commendable.",
    image: "/user.png",
  },
  {
    name: "Rudra Pratap",
    role: "CTO, MechaSolutions",
    content:
      "The reliability of KAAL TOOLS' products is unmatched. We've been using their tools for years, and they've never let us down, even in the most demanding conditions.",
    image: "/user.png",
  },
  {
    name: "Tarun Singh",
    role: "COO, IndustrialPro",
    content:
      "What sets KAAL TOOLS apart is their exceptional customer support. They go above and beyond to ensure we have the right tools for our specific needs. It's not just about selling products; it's about building lasting partnerships.",
    image: "/user.png",
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager, BuildRight Construction",
    content:
      "KAAL TOOLS has been instrumental in streamlining our construction processes. Their tools are not only durable but also ergonomically designed, which has significantly improved our team's efficiency and safety.",
    image: "/user.png",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      <Image
        width={60}
        height={60}
        src={testimonial.image}
        alt={testimonial.name}
        className="rounded-full object-cover"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {testimonial.name}
        </h3>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
    <div className="flex-grow relative">
      <Quote className="absolute top-0 left-0 h-6 w-6 text-[var(--maincolor)] opacity-20" />
      <p className="text-gray-700 text-base italic mt-2 pl-8">
        {testimonial.content}
      </p>
    </div>
  </div>
);

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className=" text-4xl font-bold text-gray-900 mb-4 uppercase">
            What Our Clients Say
          </h2>
          <div className="bg-[var(--maincolor)] w-32 h-1 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-6">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 text-gray-800 p-2 rounded-full focus:outline-none transition duration-300 ease-in-out -ml-4"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 text-gray-800 p-2 rounded-full focus:outline-none transition duration-300 ease-in-out -mr-4"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "bg-[var(--maincolor)]" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
