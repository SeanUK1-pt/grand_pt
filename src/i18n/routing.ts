import { defineRouting } from "next-intl/routing";

// Locale list: "en" (existing site copy) + "pt" (the dealer market this site
// serves). Not a final decision on supported languages — easy to extend by
// adding to this array and a matching src/messages/<locale>.json file.
export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
});

export type AppLocale = (typeof routing.locales)[number];
