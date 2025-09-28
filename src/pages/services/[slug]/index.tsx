import { DM_Sans } from "next/font/google";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import BreadCrumb from "@/components/shared/breadcrumb";
import SingleService from "@/components/services/single-service";
import { RootState, wrapper } from "@/store";
import {
  fetchServices,
  fetchSingleService,
} from "@/store/slices/servicesSlice";
import { fetchSettings } from "@/store/slices/settingsSlice";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import api from "@/lib/axiosInstance";
import { Service } from "@/types/service";
import { i18n } from "../../../../next-i18next.config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  const { settings } = useSelector((state: RootState) => state.settings);
  const { singleService } = useSelector((state: RootState) => state.services);
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo
        title={
          settings?.seoTitle && singleService?.title
            ? `${singleService?.title} | ${settings?.seoTitle} `
            : t("services")
        }
        description={
          singleService?.description ||
          settings?.seoDescription ||
          t("description")
        }
        canonical={settings?.seoCanonical || "https://example.com"}
        openGraph={{
          title:
            `${singleService?.title} | ${settings?.seoTitle}` || t("homePage"),
          description: singleService?.description || t("description"),
          url: settings?.seoCanonical || "https://example.com",
        }}
      />
      <div
        className={`${dmSans.className} `}
        style={{
          minHeight: "150vh",
        }}
      >
        <BreadCrumb
          title={singleService?.title || t("services")}
          subtitle={singleService?.description || t("servicesDesc")}
        />
        <SingleService />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ["en", "ar"];
  try {
    const response = await api.get("/services", {
      params: { locale: "en", "fields[0]": "slug" },
    });

    const paths = locales.flatMap((locale) =>
      response.data.data.map((service: Service) => ({
        params: { slug: service.slug },
        locale,
      }))
    );

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("getStaticPaths error:", error);
    return { paths: [], fallback: "blocking" };
  }

  // return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale, params }) => {
      const currentLocale = locale || "en";
      const { slug } = params as { slug: string };

      try {
        const singleServiceResult = await store.dispatch(
          fetchSingleService({ locale: currentLocale, slug })
        );

        if (
          !singleServiceResult.payload ||
          Object.keys(singleServiceResult.payload).length === 0
        ) {
          return { notFound: true };
        }

        await store.dispatch(
          fetchServices({
            page: 1,
            limit: 12,
            searchQuery: "",
            locale: currentLocale,
          })
        );

        await store.dispatch(fetchSettings({ locale: currentLocale }));
        return {
          props: {
            ...(await serverSideTranslations(currentLocale, ["common"], {
              i18n,
            })),
          },
          revalidate: 10,
        };
      } catch (error) {
        console.error("getStaticProps error:", error);
        return { notFound: true };
      }
    }
);
