"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "measuring & marking tools", image: "/cate/MEASURING.jpg", href: "/product?category=measuring-&-marking-tools" },
  { name: "hand tools", image: "/cate/HAND-TOOLS.jpg", href: "/product?category=hand-tools" },
  { name: "cutting tools", image: "/cate/CUTTING-TOOLS.jpeg", href: "/product?category=cutting-tools" },
  { name: "rotary tables & accessories", image: "/cate/ROTARY-TABLES.jpg", href: "/product?category=rotary-tables-&-accessories" },
  { name: "indexable tools", image: "/cate/INDEXABLE.jpg", href: "/product?category=indexable-tools" },
  { name: "vises & milling tables", image: "/cate/VISES.jpg", href: "/product?category=vises-&-milling-tables" },
  { name: "vee blocks & angle plates", image: "/cate/VEE-BLOCKS.jpg", href: "/product?category=vee-blocks-&-angle-plates" },
  { name: "boring heads & accessories", image: "/cate/BORING-HEADS-&-ACCESSORIES.jpg", href: "/product?category=boring-heads-&-accessories" },
];
export default function TopCategories() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 max-w-7xl mx-auto">
        <span className="w-full pb-12 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-black uppercase">Product Categories</h1>
          <div className="bg-[var(--maincolor)] w-44 h-1 rounded-full mt-2"></div>
        </span>
        <div className="flex flex-col gap-8">
          {/* Banners and Cards Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Banner */}
            <div className="lg:w-1/5">
              <div className="relative aspect-[4/6] overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/cate/METALWORKING-LATHE-ACCESSORIES.jpeg"
                  alt="Category Banner"
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h2 className="text-white text-lg font-bold mb-2 uppercase">
                    metalworking lathe accessories
                  </h2>
                  <Link
                    href="/product?category=metalworking-lathe-accessories"
                    className="bg-[var(--maincolor)] text-white px-4 py-2 rounded-lg text-sm text-center"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* Center Cards */}
            <div className="lg:w-3/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category, index) => (
                  <Link href={category.href} key={index} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={category.image}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-2">
                        <h3 className="text-white text-sm font-semibold uppercase">
                          {category.name}
                        </h3>
                        <p className="text-[var(--maincolor)] text-xs">View</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Banner */}
            <div className="lg:w-1/5">
              <div className="relative aspect-[4/6] overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/cate/WOODTURNING-LATHE-ACCESSORIES.jpg"
                  alt="Category Banner"
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h2 className="text-white text-lg font-bold mb-2 uppercase">
                    woodworking tools
                  </h2>
                  <Link
                    href="/product?category=woodworking-tools"
                    className="bg-[var(--maincolor)] text-white px-4 py-2 rounded-lg text-sm text-center"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
