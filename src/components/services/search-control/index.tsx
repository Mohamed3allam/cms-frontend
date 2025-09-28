"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";
import BackIcon from "./assets/back.svg";
import Pagination from "@/components/shared/pagination";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/store/slices/servicesSlice";
import { fetchTeamMembers } from "@/store/slices/teamMembersSlice";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function SearchPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { services, metadata: servicesMetadata } = useSelector(
    (state: RootState) => state.services
  );
  const { teamMembers, metadata: teamMembersMetadata } = useSelector(
    (state: RootState) => state.teamMembers
  );

  const router = useRouter();
  const { locale } = router;
  const dir = locale === "en" ? "ltr" : "rtl";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [activeTab, setActiveTab] = useState<"services" | "team">("services");

  const servicesPage = Number(searchParams.get("servicesPage") || 1);
  const servicesLimit = Number(searchParams.get("servicesLimit") || 10);

  const teamPage = Number(searchParams.get("teamPage") || 1);
  const teamLimit = Number(searchParams.get("teamLimit") || 10);

  useEffect(() => {
    dispatch(
      fetchServices({
        page: servicesPage,
        limit: servicesLimit,
        searchQuery: query,
        locale: locale || "en",
      })
    );
  }, [query, servicesPage, servicesLimit, dispatch, locale]);

  useEffect(() => {
    dispatch(
      fetchTeamMembers({
        page: teamPage,
        limit: teamLimit,
        searchQuery: query,
        locale: locale || "en",
      })
    );
  }, [query, teamPage, teamLimit, dispatch, locale]);

  const changeTab = (tab: "services" | "team") => {
    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    if (tab === "services") params.set("servicesPage", "1");
    if (tab === "team") params.set("teamPage", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      {" "}
      <div className="flex lg:flex-col gap-3 p-4 sm:p-6 bg-[#FAFAFA] h-fit mt-4 rounded-lg">
        <button
          onClick={() => changeTab("services")}
          className={`px-3 py-2 text-left text-[#4B2615] text-base sm:text-lg cursor-pointer ${
            activeTab === "services" ? "font-bold text-brown-700" : "opacity-60"
          }`}
        >
          {t("services")}
        </button>
        <button
          onClick={() => changeTab("team")}
          className={`px-3 py-2 text-left text-[#4B2615] text-base sm:text-lg cursor-pointer ${
            activeTab === "team" ? "font-bold text-brown-700" : "opacity-60"
          }`}
        >
          {t("team")}
        </button>
      </div>
      <div className="flex-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer mb-6 w-fit"
        >
          <BackIcon className={`${dir === "rtl" ? "rotate-180" : ""}`} />
          <span className="text-[#4B2615] opacity-70 text-sm sm:text-base">
            {t("back")}
          </span>
        </button>

        {activeTab === "services" && services?.length > 0 ? (
          <>
            {services?.map((service) => (
              <div
                key={service?.id || service?.title}
                className="pt-4 pb-9 border-b border-[#4B261530]"
              >
                <h3 className="font-semibold text-base sm:text-lg text-[#4B2615]">
                  {service?.title}
                </h3>
                <p className="text-sm mb-2 text-[#4B2615]">
                  {service?.description}
                </p>
                <Link
                  href={`/services/${service?.slug}`}
                  className="text-sm text-[#4B2615] underline"
                >
                  {t("readMore")}
                </Link>
              </div>
            ))}
            <Pagination
              metadata={servicesMetadata}
              options={{ showLimit: true }}
              queryKeys={{ pageKey: "servicesPage", limitKey: "servicesLimit" }}
            />
          </>
        ) : null}

        {activeTab === "team" && teamMembers.length > 0 ? (
          <>
            {teamMembers.map((member) => (
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
            <Pagination
              metadata={teamMembersMetadata}
              options={{ showLimit: true }}
              queryKeys={{ pageKey: "teamPage", limitKey: "teamLimit" }}
            />
          </>
        ) : null}

        {activeTab === "services" && services?.length === 0 && (
          <p className="text-sm sm:text-base">No results for "{query}"</p>
        )}
        {activeTab === "team" && teamMembers.length === 0 && (
          <p className="text-sm sm:text-base">No results for "{query}"</p>
        )}
      </div>
    </div>
  );
}
