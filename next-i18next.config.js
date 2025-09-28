/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");


module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
};
