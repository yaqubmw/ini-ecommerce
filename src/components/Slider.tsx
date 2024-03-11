"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  products: Product[];
}

export default function Slider({ products }: SliderProps) {
  const heroProducts = products.slice(0, 4);

  const [activeCarousel, setActiveCarousel] = useState(0);

  const carouselNext = () => {
    activeCarousel === heroProducts.length - 1
      ? setActiveCarousel(0)
      : setActiveCarousel(activeCarousel + 1);
  };
  const carouselPrev = () => {
    activeCarousel === 0
      ? setActiveCarousel(heroProducts.length - 1)
      : setActiveCarousel(activeCarousel - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCarousel(
        (prevCarousel) => (prevCarousel + 1) % heroProducts.length,
      );
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [activeCarousel]);

  return (
    <div className="w-full sm:h-screen">
      {heroProducts.map((product, index) => (
        <div
          className={`${activeCarousel === index ? "flex w-full flex-col items-center justify-between gap-4 bg-slate-800 text-primary-content sm:h-screen sm:flex-row" : "hidden"}`}
          key={index}
        >
          <div className="relative order-1 block basis-6/12 overflow-hidden object-cover object-center transition-all duration-500 sm:order-2 sm:flex sm:justify-end">
            <div className="relative z-10 h-screen w-full opacity-100 transition-all duration-500 ease-linear sm:w-10/12">
              <Image
                key={index}
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={900}
                priority
                className="h-screen object-cover object-center"
              />
            </div>
            <div className="absolute bottom-10 left-10 right-10 top-20 z-20 hidden border-4 border-white sm:block"></div>
          </div>

          <div className="relative order-2 basis-6/12 sm:order-1 sm:pb-0 sm:pr-8">
            <motion.div
              initial={{
                opacity: index === activeCarousel ? 0 : 0.5,
              }}
              animate={{
                opacity: index === activeCarousel ? 1 : 0,
              }}
              transition={{
                ease: "linear",
                duration: 2,
                x: { duration: 1 },
              }}
              className="w-full"
            >
              <div className="flex flex-col justify-normal gap-10 p-6 pb-8">
                <h1 className="relative text-pretty text-3xl font-bold leading-7">
                  {product.name}
                </h1>
                <p className="relative text-pretty text-justify text-sm leading-relaxed tracking-wide">
                  {product.description}
                </p>
                <div className="relative">
                  <Link
                    href={"/products/" + product.id}
                    className="btn btn-primary max-w-32 text-pretty text-sm text-white ring-1"
                  >
                    Check It Out!
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
