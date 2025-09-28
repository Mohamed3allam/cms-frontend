import React from "react";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import WhatsappIcon from "./assets/whatsapp.svg";
import CallIcon from "./assets/call.svg";
import MailIcon from "./assets/mail.svg";
import Link from "next/link";
import Image from "next/image";
import NextIcon from "./assets/next.svg";
import PrevIcon from "./assets/prev.svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const OurTeamSection = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const { teamMembers } = useSelector((state: RootState) => state.teamMembers);

  const dir = locale === "en" ? "ltr" : "rtl";
  return (
    <section className="w-full bg-[#F3F3F3] ">
      <div className="relative py-32 z-20 container w-[100%] mx-auto flex flex-col items-center justify-center gap-8 max-w-8/12 *:text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4B2615] ">
          {t("ourTeam")}
        </h2>
        <p className="text-md max-w-4/6 text-[#1E1E1E] opacity-[70%]">
          {t("ourTeamDesc")}
        </p>
        <div className="relative w-full">
          <div className="swiper-button-next-custom-team absolute cursor-pointer top-1/2 transform w-fit -translate-y-1/2 z-30  [inset-inline-end:-50px]">
            {dir === "rtl" ? <NextIcon /> : <PrevIcon />}
          </div>
          <div className="swiper-button-prev-custom-team absolute cursor-pointer top-1/2 transform w-fit -translate-y-1/2 z-30 -inset-x-[50px]">
            {dir === "rtl" ? <PrevIcon /> : <NextIcon />}
          </div>
          <Swiper
            key={dir}
            dir={dir}
            slidesPerView={3}
            spaceBetween={50}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom-team",
              prevEl: ".swiper-button-prev-custom-team",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation]}
            className="w-full"
          >
            {teamMembers?.map((member) => {
              return (
                <SwiperSlide key={member?.id}>
                  <div className="w-full flex flex-col items-center justify-center gap-3">
                    <div className=" w-full max-h-64 overflow-hidden">
                      {typeof member?.avatar === "string" && (
                        <Image
                          width={300}
                          height={200}
                          className="w-full h-full min-h-[400px] object-cover object-center bg-[#4B2615]"
                          src={member.avatar}
                          alt={member?.name || "Team Member"}
                          priority
                          unoptimized
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#4B2615]">
                      {member?.name}
                    </h3>
                    <p className="text-sm text-[#15143966]">
                      {member?.role?.toUpperCase()}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-3">
                      <Link
                        aria-label="whatsapp"
                        href={`https://wa.me/${member?.whatsapp}`}
                        target="_blank"
                      >
                        <WhatsappIcon />
                      </Link>
                      <Link
                        aria-label="call"
                        href={`tel:${member?.phone}`}
                        target="_blank"
                      >
                        <CallIcon />
                      </Link>
                      <Link
                        aria-label="email"
                        href={`mailto:${member?.email}`}
                        target="_blank"
                      >
                        <MailIcon />
                      </Link>
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

export default OurTeamSection;
