
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ title, image, href, tag }) => {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative h-full flex flex-col">
        <div className="absolute -left-8 top-4 rotate-[-45deg] bg-orange-500 text-white px-10 py-1 shadow-lg z-10">
          <span className="text-sm font-semibold">{tag || "New"}</span>
        </div>
        <div className="relative flex-shrink-0">
          <Image
            className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
            alt={title}
            width={800}
            height={500}
            src={image}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-sm lg:text-base font-semibold text-black line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;