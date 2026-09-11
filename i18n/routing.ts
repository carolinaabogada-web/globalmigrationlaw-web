import { defineRouting } from "next-intl/routing";

/**
 * Spanish is the primary audience (Latin Americans migrating to Spain),
 * so it stays unprefixed at the root ("/", "/especialidades", ...).
 * English lives under "/en" ("/en", "/en/especialidades", ...).
 * Route segments are identical across locales — the language switcher
 * only ever needs to add/remove the "en" prefix.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
