import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * All page copy is fetched from Sanity (see sanity/lib/fetch.ts), so
 * next-intl is only used here for locale negotiation/routing — there
 * are no message catalogs to load.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {},
  };
});
