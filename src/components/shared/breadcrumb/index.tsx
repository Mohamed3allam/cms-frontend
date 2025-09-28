import React from "react";
import bgImg from "./assets/bg.jpg";
import styles from "./styles/breadcrumb.module.css";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "next-i18next";

const BreadCrumb = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { t } = useTranslation("common");

  const handleSearchSubmit = (values: { search: string }) => {
    const searchValue = values.search.trim();

    router.push({
      pathname: "/services",
      query: { query: searchValue || "" },
    });
  };

  const renderSearchForm = () => (
    <Formik
      initialValues={{ search: (query.query as string) || "" }}
      enableReinitialize
      onSubmit={handleSearchSubmit}
    >
      {() => (
        <Form className="flex md:flex-row flex-col items-start gap-5 mt-10 w-full">
          <Field
            className="bg-transparent border-b-2 border-white outline-0 h-full py-4 px-5 w-auto md:w-xl"
            type="text"
            id="search"
            name="search"
            placeholder={t("search")}
          />
          <button
            type="submit"
            className="bg-[#4B2616] h-full py-3 px-8 rounded-md text-white flex items-center gap-2 cursor-pointer"
          >
            {t("search")}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div
      className="flex flex-col gap-1 pt-30 relative w-full h-[500px] text-white"
      style={{
        background: `url(${bgImg.src}) no-repeat center center/cover`,
      }}
    >
      <div
        className={`overlay absolute inset-0 w-full h-full ${styles.overlay}`}
      />
      <div className="w-full h-full px-10 lg:px-20 relative z-30 flex flex-col items-start justify-center">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">{t(title)}</h1>
        <p className="text-md lg:text-2xl">{t(subtitle)}</p>

        {pathname === "/services" && (
          <div className="services-search">{renderSearchForm()}</div>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;
