import { DM_Sans } from "next/font/google";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import BreadCrumb from "@/components/shared/breadcrumb";
import SearchResultsTabs from "@/components/services/search-control";
import { RootState, wrapper } from "@/store";
import { fetchSettings } from "@/store/slices/settingsSlice";
import { fetchServices } from "@/store/slices/servicesSlice";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  const { settings } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={
          settings?.seoTitle
            ? `${settings?.seoTitle} | ${t("services")}`
            : t("services")
        }
        description={settings?.seoDescription || t("description")}
        canonical={settings?.seoCanonical || "https://example.com"}
        openGraph={{
          title: `${settings?.seoTitle} | ${t("services")}` || t("services"),
          description: settings?.seoDescription || t("description"),
          url: settings?.seoCanonical || "https://example.com",
        }}
      />
      <div
        className={`${dmSans.className} `}
        style={{
          minHeight: "150vh",
        }}
      >
        <BreadCrumb title="services" subtitle="servicesDesc" />
        <SearchResultsTabs />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale, params }) => {
      const currentLocale = locale || "en";

      await store.dispatch(
        fetchSettings({
          locale: currentLocale,
        })
      );
      await store.dispatch(
        fetchServices({
          page: 1,
          limit: 10,
          searchQuery: "",
          locale: currentLocale,
        })
      );
      return {
        props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
      };
    }
);
