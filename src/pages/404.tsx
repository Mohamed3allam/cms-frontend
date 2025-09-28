import { DM_Sans } from "next/font/google";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BreadCrumb from "@/components/shared/breadcrumb";
import { RootState, wrapper } from "@/store";
import { fetchSettings } from "@/store/slices/settingsSlice";
import { fetchServices } from "@/store/slices/servicesSlice";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

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
            ? `${settings?.seoTitle} | ${t("notFound")}`
            : t("notFound")
        }
        description={settings?.seoDescription || t("description")}
        canonical={settings?.seoCanonical || "https://example.com"}
        openGraph={{
          title: `${settings?.seoTitle} | ${t("homePage")}` || t("homePage"),
          description: settings?.seoDescription || t("description"),
          url: settings?.seoCanonical || "https://example.com",
        }}
      />
      <div
        className={`${dmSans.className} `}
        style={{
          minHeight: "100vh",
        }}
      >
        <BreadCrumb title={"notFound"} subtitle={"notFoundDesc"} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale }) => {
      const currentLocale = locale || "en";

      try {
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
      } catch (error) {
        console.log(error);
        return {
          props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
          },
        };
      }
    }
);
