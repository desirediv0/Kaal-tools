import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 p-4 pt-10">
        <section className="flex flex-col gap-2">
          <Link href="/" className="flex-shrink-0 relative">
            <span className="absolute top-5 md:top-7 right-32 md:right-2 text-xs font-medium hidden md:block">
              ®
            </span>
            <Image
              src="/logowhite.png"
              alt="Logo"
              width={400}
              height={100}
              className="w-auto h-20 md:h-28"
              priority
            />
          </Link>
        </section>

        <section className="flex flex-col gap-2">
          <h1 className="text-2xl pb-2 font-normal">Useful Links</h1>
          <Link href="/">
            <h2>Home</h2>
          </Link>
          <Link href="/about">
            <h2>About</h2>
          </Link>
          <Link href="/product">
            <h2>Products</h2>
          </Link>
          <Link href="/contact">
            <h2>Contact</h2>
          </Link>
        </section>

        {/* First Product Column */}
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl pb-2 font-medium ">Products</h1>
          <Link
            href="/product?category=metalworking+lathe+accessories"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">
              Metalworking lathe accessories
            </h2>
          </Link>
          <Link
            href="/product?category=woodworking+tools"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">Woodworking tools</h2>
          </Link>
          <Link
            href="/product?category=measuring+%26+marking+tools"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">Measuring & marking tools</h2>
          </Link>
          <Link
            href="/product?category=cutting+tools"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">Cutting tools</h2>
          </Link>
        </section>

        {/* Second Product Column */}
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl pb-2 font-medium opacity-0">Products</h1>
          <Link
            href="/product?category=hand+tools"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">hand tools</h2>
          </Link>
          <Link
            href="/product?category=magnetic+%26+dressing+tools"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">magnetic & dressing tools</h2>
          </Link>
          <Link
            href="/product?category=vee+blocks+%26+angle+plates"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase font-normal">vee blocks & angle plates</h2>
          </Link>
          <Link
            href="/product?category=vises+%26+milling+tables"
            className="flex items-center gap-2"
          >
            <IoIosArrowForward color="var(--maincolor)" size={15} />
            <h2 className="uppercase  font-normal">vises & milling tables</h2>
          </Link>
        </section>

        <section className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl pb-2 font-medium ">Get in Touch</h1>
          <div className="grid grid-cols-7 gap-1">
            <h2 className="flex flex-wrap gap-3 items-center">
              <IoLocationOutline size={25} />
            </h2>
            <p className="col-span-6">
              Plot No.164, Udyog Vihar Phase-6, Gurugram - 122004, Haryana
              (India)
            </p>
          </div>
          <h2 className="flex gap-4 items-center">
            <LuMail size={22} /> sales@kaaltools.com
          </h2>
        </section>
      </div>

      <div className="w-full mt-8 text-lg py-4 border-t border-black max-w-7xl mx-auto text-center md:text-start">
        ©Kaal Tools 2025 | All Rights Reserved | Designed by{" "}
        <Link href="https://xcelb2b.com/">
          <span className="text-blue-600">Xcel B2B</span>
        </Link>
      </div>
    </div>
  );
}