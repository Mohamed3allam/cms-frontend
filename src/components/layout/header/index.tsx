"use client";

import React, { useEffect, useState, useRef } from "react";
import { header } from "./styles/header.styles";
import LanguageSwitcher from "@/components/shared/language-switcher";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logoImg from "./assets/logo.png";
import SearchIcon from "./assets/search.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import NextIcon from "./assets/next.svg";

const navLinks = [
  { name: "homePage", href: "/" },
  { name: "about-us", href: "/about" },
  { name: "services", href: "/services", dropdown: true },
  { name: "blogs", href: "/blogs" },
  { name: "our-team", href: "/our-team" },
  { name: "contact-us", href: "/contact" },
];

const Header = () => {
  const { services } = useSelector((state: RootState) => state.services);
  const { settings } = useSelector((state: RootState) => state.settings);

  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const router = useRouter();
  const { locale } = router;
  const dir = locale === "en" ? "ltr" : "rtl";
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  const mode = servicesOpen ? "services" : scrolled ? "scrolled" : "default";

  return (
    <header className={header({ mode })}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        <div className="w-full">
          <div className="sm:px-20 lg:px-10 flex justify-between items-center gap-2 w-full h-full">
            <div className="h-[60px] w-[140px] flex items-center justify-center">
              {typeof settings?.logo === "string" && (
                <Image
                  priority
                  width={140}
                  height={60}
                  src={settings?.logo || logoImg}
                  alt="Logo"
                />
              )}
            </div>

            <nav className="hidden xl:flex items-center gap-8">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link href={link.href} key={link.name} legacyBehavior>
                      <a
                        className={`text-center whitespace-nowrap relative text-[16px] ${
                          pathname === link.href ? "font-bold" : ""
                        }`}
                      >
                        {t(link.name)}
                      </a>
                    </Link>

                    <div
                      className={`absolute left-[50%] transform -translate-x-1/2 transition-all top-full w-[90vw] bg-[#4B2616] text-white shadow-lg ${
                        servicesOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                        {services.length > 0 &&
                          services.map((service) => (
                            <Link
                              key={service.title}
                              href={`/services/${service.slug}`}
                              legacyBehavior
                            >
                              <a className="hover:scale-105 transition-all">
                                {service.title}
                              </a>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={link.href} key={link.name} legacyBehavior>
                    <a
                      className={`text-center whitespace-nowrap relative text-[16px] ${
                        pathname === link.href ? "font-bold" : ""
                      }`}
                    >
                      {t(link.name)}
                    </a>
                  </Link>
                )
              )}
            </nav>

            <div className="hidden xl:flex items-center gap-4 relative">
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setSearchActive((prev) => !prev)}
                  className="absolute z-50 p-2 rounded-full transition cursor-pointer inset-x-3 w-fit"
                >
                  <SearchIcon />
                </button>

                <input
                  type="text"
                  placeholder={t("search") + "..."}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(
                        `/services?query=${encodeURIComponent(searchValue)}`
                      );
                      setSearchActive(false);
                    }
                  }}
                  className={`transition-all duration-300 ease-in-out bg-transparent text-white border-white pe-11 ps-11 py-2 rounded-md ml-2 outline-0 ${
                    searchActive
                      ? "w-56 opacity-100 border"
                      : "w-16 opacity-0 overflow-hidden"
                  }`}
                />
                <button
                  className={`absolute z-50 p-2 rounded-full transition cursor-pointer inset-x-[80%] w-fit ${
                    searchActive ? "opacity-100 " : "opacity-0 overflow-hidden"
                  } ${dir === "rtl" ? "" : "rotate-180"}`}
                  onClick={() => {
                    router.push(
                      `/services?query=${encodeURIComponent(searchValue)}`
                    );
                    setSearchActive(false);
                  }}
                >
                  <NextIcon />
                </button>
              </div>
              <LanguageSwitcher />
              <Link href="/book-appointment" legacyBehavior>
                <a>
                  <button className="bg-transparent px-4 py-2 min-w-[120px] font-inherit border border-main border-white rounded">
                    {t("book-appointment")}
                  </button>
                </a>
              </Link>
            </div>

            <button
              className="xl:hidden text-2xl cursor-pointer"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>

          {open && (
            <div className="fixed inset-0 z-50 flex transition-all">
              <div
                className="fixed inset-0 bg-[#000000bf] bg-opacity-40"
                onClick={() => setOpen(false)}
              ></div>

              <div className="relative w-64 bg-[#4B2616] h-full shadow-lg p-4 flex flex-col *:text-white">
                <button
                  className="absolute top-4 right-4 text-2xl cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>

                <div className="mb-15">
                  {typeof settings?.logo === "string" && (
                    <Image
                      priority
                      width={140}
                      height={60}
                      src={settings?.logo || logoImg}
                      alt="Logo"
                    />
                  )}
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link href={link.href} key={link.name} legacyBehavior>
                      <a
                        className={` ${
                          pathname === link.href ? "font-bold" : ""
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {t(link.name)}
                      </a>
                    </Link>
                  ))}
                </nav>
                <div className="relative flex items-center justify-start mt-[30px]">
                  <button
                    onClick={() => setSearchActive((prev) => !prev)}
                    className="absolute z-50 p-2 rounded-full transition cursor-pointer inset-x-3 w-fit"
                  >
                    <SearchIcon />
                  </button>

                  <input
                    type="text"
                    placeholder={t("search") + "..."}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push(
                          `/services?query=${encodeURIComponent(searchValue)}`
                        );
                        setSearchActive(false);
                      }
                    }}
                    className={`transition-all duration-300 ease-in-out bg-transparent text-white border-white pe-11 ps-11 py-2 rounded-md ml-2 outline-0 ${
                      searchActive
                        ? "w-56 opacity-100 border"
                        : "w-16 opacity-0 overflow-hidden"
                    }`}
                  />
                  <button
                    className={`absolute z-50 p-2 rounded-full transition cursor-pointer inset-x-[80%] w-fit ${
                      searchActive
                        ? "opacity-100 "
                        : "opacity-0 overflow-hidden"
                    } ${dir === "rtl" ? "" : "rotate-180"}`}
                    onClick={() => {
                      router.push(
                        `/services?query=${encodeURIComponent(searchValue)}`
                      );
                      setSearchActive(false);
                    }}
                  >
                    <NextIcon />
                  </button>
                </div>

                <div className="mt-6">
                  <LanguageSwitcher />
                  <Link href="/book-appointment" legacyBehavior>
                    <a>
                      <button className="bg-transparent px-4 py-2 min-w-[120px] font-inherit border border-main">
                        {t("book-appointment")}
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
