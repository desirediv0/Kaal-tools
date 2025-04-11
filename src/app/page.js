import React from "react";
import { Banner } from "./_component/Banner";
import Product from "./_component/Product";
import Whychoose from "./_component/Whychoose";
import Testimonials from "./_component/Testinomials";
import NewProducts from "./_component/NewProducts";
import TopCategories from "./_component/TopCategory";

const items = [
  {
    image: "/s-1.png",
    link: "/product?category=metalworking%20lathe%20accessories",
  },
  {
    image: "/s-2.png",
    link: "/product?category=woodworking+tools"
  },
  {
    image: "/s-3.png",
    link: "/product?category=measuring%20%26%20marking%20tools"
  },
  {
    image: "/s-4.png",
    link: "/product?category=thread%20repairing%20kits%20%26%20accessories"
  },
  {
    image: "/s-5.png",
    link: "/product?category=vises%20%26%20milling%20tables"
  },
];
const items2 = [
  {
    image: "/ks2.webp",
    heading: "Power Up Your Projects with Tools You Can Count On.",
    shortdesc:
      "Discover durable, high-performance tools designed for every project. Built to last, made to deliver.",
  }
];

export default function page() {
  return (
    <>
      <Banner items={items} h={"65vh"} />
      <NewProducts />
      <TopCategories />
      <div className="my-10 md:my-20">
        <Banner items={items2} h={"55vh"} />
      </div>
      {/* <TopBrands /> */}
      <Product activepage="homepage" />
      {/* <Counter /> */}
      <Whychoose />
      {/* <Cta /> */}
      <div className="py-6"></div>
      <Testimonials />
      <div className="py-6"></div>
    </>
  );
}
