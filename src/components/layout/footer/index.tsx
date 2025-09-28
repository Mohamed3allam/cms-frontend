import React from "react";
import { useTranslation } from "next-i18next";
import TwitterIcon from "./assets/x.svg";
import FacebookIcon from "./assets/facebook.svg";
import GoogleIcon from "./assets/google.svg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/lib/axiosInstance";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

const navLinks = [
  { name: "about-us", href: "/about" },
  { name: "our-strategy", href: "/strategy" },
  { name: "social-responsibility", href: "/social-responsibility" },
  { name: "services", href: "/services" },
  { name: "contact-us", href: "/contact" },
];

const Footer = () => {
  const { settings } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation("common");

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: { email: string },
    formikHelpers: FormikHelpers<{ email: string }>
  ) => {
    const { resetForm, setSubmitting, setStatus } = formikHelpers;

    try {
      const response = await api.post("/subscribers", {
        data: { email: values.email },
      });

      if (response?.data?.data?.id) {
        setStatus({ success: "Subscribed successfully!" });
        resetForm();
      } else {
        setStatus({ error: "Subscription failed" });
      }
    } catch (error: unknown) {
      console.error(error);

      const msg =
        (error as any)?.response?.data?.error?.message ||
        (error as any)?.response?.data?.message ||
        "Subscription failed";

      setStatus({ error: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#4B2616] py-16 px-5 lg:px-28 flex flex-col justify-center">
      <div className="w-full align-end flex flex-row-reverse border-b-2 pb-10 border-[#FFFFFF30]">
        <div className="flex flex-wrap gap-7 items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="relative flex items-center gap-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-white py-2.5 ps-3 pe-33 rounded-md outline-0 h-full w-[300px]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={isSubmitting}
                    className="absolute top-1/2 cursor-pointer   -translate-y-1/2 end-1 bg-[#4B2616] h-[90%] py-2.5 px-6 rounded-md text-white flex items-center"
                  >
                    {isSubmitting ? "..." : t("subscribe")}
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {status?.success && (
                  <p className="text-green-400 absolute top-full mt-2 text-sm">
                    {status.success}
                  </p>
                )}
                {status?.error && (
                  <p className="text-red-400 absolute top-full mt-2 text-sm">
                    {status.error}
                  </p>
                )}
              </Form>
            )}
          </Formik>

          <div className="flex gap-7 items-center">
            <span className="text-white">{t("contacts")}: </span>
            <div className="flex gap-5 items-center">
              <Link
                target="_blank"
                aria-label="Twitter"
                href={settings?.twitter || "https://twitter.com"}
              >
                <TwitterIcon />
              </Link>
              <Link
                target="_blank"
                aria-label="Facebook"
                href={settings?.facebook || "https://facebook.com"}
              >
                <FacebookIcon />
              </Link>
              <Link
                target="_blank"
                aria-label="Google"
                href={settings?.google || "https://google.com"}
              >
                <GoogleIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-8 flex flex-col lg:flex-row justify-between">
        <nav className="flex flex-col lg:flex-row gap-7">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-white">
              {t(link.name)}
            </Link>
          ))}
        </nav>
        <span className="text-white">{t("copyright")}</span>
      </div>
    </footer>
  );
};

export default Footer;
