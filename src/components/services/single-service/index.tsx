"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import BackIcon from "./assets/back.svg";
import Pagination from "@/components/shared/pagination";
import bgImg from "./assets/bg.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTranslation } from "next-i18next";
import RichTextRenderer from "@/components/shared/rich-text-renderer";

export default function SingleService() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const dir = locale === "en" ? "ltr" : "rtl";
  const { singleService } = useSelector((state: RootState) => state.services);

  return (
    <div className="relative">
      <div
        className="absolute w-full h-full"
        style={{
          background: `url(${bgImg.src}) center center/cover no-repeat`,
          opacity: "1.56%",
        }}
      />
      <div
        className="flex flex-col gap-6 w-full px-4 md:px-20 lg:px-28 py-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer mb-6 w-fit"
        >
          <BackIcon className={`${dir === "rtl" ? "rotate-180" : ""}`} />
          <span className="text-[#4B2615] opacity-70 text-sm sm:text-base">
            {t("back")}
          </span>
        </button>
        <div className="flex flex-col gap-6">
          <h1 className="text-[#4B2615] text-2xl sm:text-4xl font-bold">
            {singleService?.title}
          </h1>
          <RichTextRenderer content={singleService?.content || []} />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-[#4B2615] text-2xl sm:text-3xl font-bold">
            {t("relatedTeamMembers")}
          </h2>
          {singleService?.team_members?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4 pb-9 border-b border-[#4B261530]"
            >
              {typeof member.avatar === "string" && (
                <Image
                  src={member.avatar}
                  alt={member.name || "avatar"}
                  width={60}
                  height={60}
                  className="rounded-full w-[60px] h-[60px] object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-[#4B2615]">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
