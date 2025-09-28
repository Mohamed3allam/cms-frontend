import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "@/store";
import TopBarProgress from "react-topbar-progress-indicator";
import Loading from "@/components/shared/loading";
import nextI18NextConfig from "@config/next-i18next.config";


function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = locale || "en";

  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  TopBarProgress.config({
    barThickness: 3,
    barColors: {
      0: "#fff",
      0.5: "#a16844",
      1.0: "#4B2615",
    },
  });

  useEffect(() => {
    setLoading(true);

    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    handleComplete();

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.pathname) {
        setProgress(true);
      }
    };
    const handleComplete = () => {
      setProgress(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.pathname]);

  useEffect(() => {
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
  }, [currentLocale]);

  return (
    <>
      {progress && <TopBarProgress />}
      {<Loading loading={loading} />}
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(appWithTranslation(App, nextI18NextConfig));
