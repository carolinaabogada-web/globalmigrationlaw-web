import { defineRouting } from "next-intl/routing";

/**
 * Spanish is the primary audience (Latin Americans migrating to Spain),
 * so it stays unprefixed at the root ("/", "/especialidades", ...).
 * English and Arabic live under "/en" and "/ar" ("/en/especialidades",
 * "/ar/especialidades", ...). Route segments are identical across
 * locales — the language switcher only ever needs to add/remove the
 * locale prefix.
 */
export const routing = defineRouting({
  locales: ["es", "en", "ar"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
