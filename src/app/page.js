import React from "react";
import { Banner } from "./_component/Banner";
import Product from "./_component/Product";
// import Aboutus from "./_component/Aboutus";
import Whychoose from "./_component/Whychoose";
// import Cta from "./_component/Cta";
import Testimonials from "./_component/Testinomials";
import NewProducts from "./_component/NewProducts";
// import Counter from "./_component/Counter";
// import TopBrands from "./_component/TopBrands";
import TopCategories from "./_component/TopCategory";

const items = [
  {
    image: "/ks1.webp",
    heading: "Power Up Your Projects with Tools You Can Count On.",
    shortdesc:
      "Discover durable, high-performance tools designed for every project. Built to last, made to deliver.",
  },
];
const items2 = [
  {
    image: "/ks2.webp",
    heading: "Power Up Your Projects with Tools You Can Count On.",
    shortdesc:
      "Discover durable, high-performance tools designed for every project. Built to last, made to deliver.",
  },
  {
    image: "/ks1.webp",
    heading: "Power Up Your Projects with Tools You Can Count On.",
    shortdesc:
      "Discover durable, high-performance tools designed for every project. Built to last, made to deliver.",
  },
];

export default function page() {
  return (
    <>
      <Banner items={items} />
      <NewProducts />
      <TopCategories />
      <div className="my-10 md:my-20">
        <Banner items={items2} />
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
