"use client";

import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./BannerSwiperDot";

import type { IBanner } from "@/src/types/common";

import './swiper.css'
import Link from "next/link";
export default function BannerSwiper({ banners }: { banners: IBanner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {banners.map((banner) => (
          <Link href={banner.url} target="_blank" className="embla__slide" key={banner.id}>
            <img src={banner.logo} alt={banner.title} />
            <div className="embla__slide__content">
              <h2 className="text-white font-bold text-[48px]">{banner.title}</h2>
              <p className="text-white text-[32px]">{banner.content}</p>
            </div>
          </Link>
        ))}

      </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
    </div>
  );
}
