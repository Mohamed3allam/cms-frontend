import React from "react";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import NextIcon from "./assets/next.svg";
import PrevIcon from "./assets/prev.svg";
import styles from "./styles/clients.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const OurClientsSection = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const dir = locale === "en" ? "ltr" : "rtl";
  const { clients } = useSelector((state: RootState) => state.clients);

  return (
    <section className="w-full bg-[#4B2616] mb-10">
      <div className="relative py-32 z-20 container w-[100%] mx-auto flex flex-col items-start justify-center gap-8 max-w-10/12">
        <h2 className="text-3xl md:text-[40px] font-bold text-white ">
          {t("whatOurClientsSay")}
        </h2>
        <p className="text-md max-w-3/6 text-white opacity-[70%]">
          {t("clientsDesc")}
        </p>
        <div className="relative w-full">
          <div className="w-fit absolute z-50 -bottom-20 inset-x-1/2 transform -translate-x-1/2 lg:bottom-0 lg:inset-x-10/12 flex flex-row items-center justify-center gap-10">
            <div className="swiper-button-prev-custom bg-white rounded-full p-5 cursor-pointer">
              {dir === "rtl" ? <PrevIcon /> : <NextIcon />}
            </div>
            <div className="swiper-button-next-custom bg-white rounded-full p-5 cursor-pointer">
              {dir === "rtl" ? <NextIcon /> : <PrevIcon />}
            </div>
          </div>
          <Swiper
            key={dir}
            dir={dir}
            slidesPerView={1}
            spaceBetween={50}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
              disabledClass: styles.disabledNavigation,
            }}
            modules={[Navigation]}
            className="w-full"
          >
            {clients?.map((client) => {
              return (
                <SwiperSlide key={client?.id}>
                  <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="w-full lg:w-3/12 h-[370px] overflow-hidden bg-white">
                      {typeof client?.logo === "string" && (
                        <Image
                          width={600}
                          height={600}
                          className="w-full h-full object-contain"
                          src={client?.logo}
                          alt={client?.company}
                          priority
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-between gap-3 w-full lg:w-8/12 min-h-80">
                      <p className="text-[22px] text-white opacity-[60%]">
                        "{client?.testimonial}"
                      </p>
                      <div className="w-full">
                        <h3 className="text-[22px] font-bold text-white">
                          {client?.name}
                        </h3>
                        <p className="text-sm text-white">
                          {client?.role} / {client?.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OurClientsSection;
