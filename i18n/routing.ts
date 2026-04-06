import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  /** Every URL includes a locale: `/nl/...` or `/en/...`. */
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
