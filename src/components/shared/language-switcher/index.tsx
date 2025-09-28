import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;

  const switchTo = locale === "en" ? "ar" : "en";

  const handleChange = () => {
    router.push(asPath, asPath, { locale: switchTo });
  };

  return (
    <button
      onClick={handleChange}
      className="px-4 py-2 rounded bg-brand text-dark hover:bg-brand-dark transition cursor-pointer"
    >
      {locale === "en" ? "العربية" : "En"}
    </button>
  );
}
