"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import styles from "./styles/hero.module.css";
import bgImg from "./assets/bg.jpg";
import heroImg from "./assets/hero.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRouter } from "next/router";
import { HeroSlide } from "@/types/hero";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchHeroes } from "@/store/slices/heroSlice";
import { handleImageLink } from "@/helpers/handleImage";

const Hero: React.FC = () => {
  const { locale } = useRouter();
  const dir = locale === "en" ? "ltr" : "rtl";
  const { heroSlides } = useSelector((state: RootState) => state.heroSlides);
  return (
    <section className={styles.hero}>
      <div className="absolute [inset-inline-start:50px] lg:[inset-inline-start:100px] top-1/2  flex flex-col items-center justify-center gap-15 z-30">
        <button className="swiper-button-prev-custom p-2 text-white text-4xl rounded-full shadow-lg cursor-pointer">
          ‹
        </button>
      </div>
      <div className="w-fit absolute inset-x-1/2 transform -translate-x-1/2 bottom-10 lg:inset-x-[65px] lg:top-2/3 items-center justify-center gap-15 z-30">
        <div className="custom-pagination flex flex-row lg:flex-col items-center justify-center gap-3" />
      </div>
      <div className="absolute [inset-inline-end:50px] lg:[inset-inline-end:100px] top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center z-30">
        <button className="swiper-button-next-custom p-2 text-white text-4xl rounded-full shadow-lg cursor-pointer">
          ›
        </button>
      </div>
      <Swiper
        key={dir}
        dir={dir}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          type: "bullets",
          bulletClass: styles.customBullet,
          bulletActiveClass: styles.customBulletActive,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        effect="fade"
        className={styles.mySwiper}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {heroSlides?.map((slide) => (
          <SwiperSlide key={slide?.documentId}>
            <div className="relative w-full h-full flex items-center justify-center pb-8 pt-29">
              {slide?.background &&
                (typeof slide.background === "string" &&
                (slide.background.endsWith(".mp4") ||
                  slide.background.endsWith(".webm") ||
                  slide.background.endsWith(".ogg")) ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={slide.background}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        typeof slide.background === "string"
                          ? handleImageLink(slide.background)
                          : ""
                      })`,
                    }}
                  />
                ))}
              <div
                className={`absolute w-full h-full inset-0 pointer-events-none z-[2] ${styles.overlay}`}
              />
              <div className="relative z-20 container w-[100%] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-9/12">
                <div className=" text-center md:text-left w-fit">
                  <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-white">
                    {slide?.title}
                  </h2>
                  <p className="mb-22 md:text-lg text-white">
                    {slide?.subtitle}
                  </p>
                  <a
                    href={slide?.CTAUrl}
                    className="inline-block bg-white text-[#4B2616] px-8 py-4 rounded-lg shadow-lg hover:bg-[#f3e7da] transition font-medium"
                  >
                    {slide?.CTALabel}
                  </a>
                </div>

                <div className="hidden md:flex md:w-1/3 items-center justify-end">
                  <div className=" h-64 w-80 lg:h-80 relative rounded-xl overflow-hidden shadow-lg bg-[#4B2616]">
                    {typeof slide?.image === "string" && (
                      <Image
                        src={slide?.image}
                        alt={slide?.title}
                        width={420}
                        height={420}
                        className="object-cover w-full h-full"
                        priority
                        unoptimized
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
