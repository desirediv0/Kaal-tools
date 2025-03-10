"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "measuring & marking tools", image: "/cate/MEASURING.jpg", href: "/product?category=measuring-&-marking-tools" },
  { name: "hand tools", image: "/cate/HAND-TOOLS.jpg", href: "/product?category=hand-tools" },
  { name: "cutting tools", image: "/cate/CUTTING-TOOLS.jpeg", href: "/product?category=cutting-tools" },
  { name: "rotary tables & accessories", image: "/cate/ROTARY-TABLES.jpg", href: "/product?category=rotary-tables-&-accessories" },
  { name: "indexable tools", image: "/cate/INDEXABLE.jpeg", href: "/product?category=indexable-tools" },
  { name: "vises & milling tables", image: "/cate/VISES.jpg", href: "/product?category=vises-&-milling-tables" },
  { name: "vee blocks & angle plates", image: "/cate/VEE-BLOCKS.jpeg", href: "/product?category=vee-blocks-&-angle-plates" },
  { name: "boring heads & accessories", image: "/cate/BORING-HEADS-&-ACCESSORIES.jpg", href: "/product?category=boring-heads-&-accessories" },
];
export default function TopCategories() {
  return (
    <section className="py-6 sm:py-8 md:py-12 bg-white">
      <div className="container px-2 sm:px-4 max-w-7xl mx-auto">
        <span className="w-full pb-6 sm:pb-8 md:pb-12 flex flex-col justify-center items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase text-center">Product Categories</h1>
          <div className="bg-[var(--maincolor)] w-32 sm:w-40 md:w-44 h-1 rounded-full mt-2"></div>
        </span>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
            {/* Left Banner */}
            <div className="w-full lg:w-1/5">
              <div className="relative  sm:aspect-[3/4] lg:aspect-[4/6] overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/cate/METALWORKING-LATHE-ACCESSORIES.jpeg"
                  alt="Category Banner"
                  width={500}
                  height={500}
                  className="transition-opacity duration-300 hover:opacity-90 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4">
                  <h2 className="text-white text-base sm:text-lg font-bold mb-1 sm:mb-2 uppercase text-center">
                    metalworking lathe accessories
                  </h2>
                </div>
              </div>
            </div>

            {/* Center Cards */}
            <div className="w-full lg:w-3/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {categories.map((category, index) => (
                  <Link href={category.href} key={index} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={category.image}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 group-hover:opacity-80 "
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-1.5 sm:p-2">
                        <h3 className="text-white text-xs sm:text-sm font-semibold uppercase text-center">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Banner */}
            <div className="w-full lg:w-1/5">
              <div className="relative  sm:aspect-[3/4] lg:aspect-[4/6] overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/cate/WOODTURNING-LATHE-ACCESSORIES.jpg"
                  alt="Category Banner"
                  width={500}
                  height={500}
                  className="transition-opacity duration-300 hover:opacity-90 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4">
                  <h2 className="text-white text-base sm:text-lg font-bold mb-1 sm:mb-2 uppercase text-center">
                    woodworking tools
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
