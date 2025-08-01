"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner({ items, h }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const showControls = items.length > 1;

  // Create handlers to ensure proper autoplay control
  const handleMouseEnter = React.useCallback(() => {
    if (showControls && plugin.current) {
      plugin.current.stop();
    }
  }, [showControls]);

  const handleMouseLeave = React.useCallback(() => {
    if (showControls && plugin.current) {
      plugin.current.play();
    }
  }, [showControls]);

  return (
    <div className="w-full overflow-hidden relative">
      <Carousel
        plugins={showControls ? [plugin.current] : []}
        className="w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              {item.link ? (
                <Link href={item.link} className="block w-full h-full">
                  <div
                    className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] cursor-pointer"
                    style={h ? { height: h } : {}}
                  >
                    <Image
                      src={item.image}
                      alt={`Banner image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                      style={{
                        objectFit: "cover",
                      }}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 sm:p-4">
                      <section className="w-full sm:w-4/5 md:w-2/3 px-2 sm:px-0">
                        <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 text-center select-none leading-tight">
                          {item.heading ? item.heading : ""}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4 text-center select-none leading-relaxed">
                          {item.shortdesc ? item.shortdesc : ""}
                        </p>
                      </section>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                  style={h ? { height: h } : {}}
                >
                  <Image
                    src={item.image}
                    alt={`Banner image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    style={{
                      objectFit: "cover",
                    }}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 sm:p-4">
                    <section className="w-full sm:w-4/5 md:w-2/3 px-2 sm:px-0">
                      <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 text-center select-none leading-tight">
                        {item.heading}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4 text-center select-none leading-relaxed">
                        {item.shortdesc}
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
          <>
            <CarouselPrevious className="absolute text-white left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-none bg-black/20 hover:bg-black/40" />
            <CarouselNext className="absolute text-white right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-none bg-black/20 hover:bg-black/40" />
          </>
        )}
      </Carousel>
    </div>
  );
}
