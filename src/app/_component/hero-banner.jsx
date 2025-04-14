"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroBanner({ items }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const showControls = items.length > 1;

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
    <div className="w-full relative min-h-[400px] md:min-h-[650px] lg:min-h-[500px]">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 h-full">
        <Carousel
          plugins={showControls ? [plugin.current] : []}
          className="w-full h-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent className="h-full">
            {items.map((item, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="flex flex-col lg:grid lg:grid-cols-12 h-full items-center pt-6 px-4 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-0">
                  {/* Content Section - First on mobile */}
                  <div className="w-full lg:col-span-5 flex flex-col md:space-y-2 mt-10 text-white order-1 mb-2 md:mb-6 lg:mb-0 text-center md:text-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold uppercase break-words">
                      {item.head1}
                    </h1>
                    <h2
                      className={`text-2xl md:text-4xl lg:text-6xl ${item.bg} bg-clip-text text-transparent font-bold uppercase break-words`}
                    >
                      {item.head2}
                    </h2>
                    <h3 className="text-2xl md:text-4xl lg:text-6xl uppercase font-semibold break-words">
                      {item.head3}
                    </h3>
                    {item.btntext && (
                      <Link href={item.link} className="mt-4">
                        <Button
                          className={`${item.bg} hover:${item.bg} text-white text-base md:text-xl font-semibold font-sans rounded-none py-2 lg:py-4 uppercase max-w-md md:w-auto`}
                        >
                          {item.btntext}
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Image Section - Second on mobile */}
                  <div className="w-full lg:col-span-7  relative h-[200px] md:h-[400px] lg:h-[400px] order-2 mt-2">
                    <Image
                      src={item.image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showControls && (
            <>
              <CarouselPrevious className="absolute text-white left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-none" />
              <CarouselNext className="absolute text-white right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-none" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
}
