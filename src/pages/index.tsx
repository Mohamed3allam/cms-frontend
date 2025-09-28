import { DM_Sans } from "next/font/google";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Hero from "@/components/home/hero";
import OurTeamSection from "@/components/home/our-team";
import OurClientsSection from "@/components/home/clients";
import { RootState, wrapper } from "@/store";
import { fetchHeroes } from "@/store/slices/heroSlice";
import { fetchServices } from "@/store/slices/servicesSlice";
import { fetchTeamMembers } from "@/store/slices/teamMembersSlice";
import { fetchClients } from "@/store/slices/clientsSlice";
import { fetchSettings } from "@/store/slices/settingsSlice";
import { useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { i18n } from "../../next-i18next.config";

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
            ? `${settings?.seoTitle} | ${t("homePage")}`
            : t("homePage")
        }
        description={settings?.seoDescription || t("description")}
        canonical={settings?.seoCanonical || "https://example.com"}
        openGraph={{
          title: `${settings?.seoTitle} | ${t("homePage")}` || t("homePage"),
          description: settings?.seoDescription || t("description"),
          url: settings?.seoCanonical || "https://example.com",
        }}
      />
      <div className={`${dmSans.className} `}>
        <Hero />
        <OurTeamSection />
        <OurClientsSection />
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
          fetchHeroes({
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
        await store.dispatch(
          fetchTeamMembers({
            page: 1,
            limit: 10,
            searchQuery: "",
            locale: currentLocale,
          })
        );
        await store.dispatch(
          fetchClients({
            locale: currentLocale,
          })
        );

        await store.dispatch(
          fetchSettings({
            locale: currentLocale,
          })
        );

        return {
          props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
          },
          revalidate: 10,
        };
      } catch (error) {
        console.log(error);
        return {
          props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
          },
          revalidate: 10,
        };
      }
    }
);
