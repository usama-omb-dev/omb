import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  /** Every URL includes a locale: `/en/...` or `/nl/...`. */
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
