import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const PATHS = ["", "/especialidades", "/equipo", "/quienes-somos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://dcmigracionlegal.com").replace(
    /\/$/,
    ""
  );

  return PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          locale === routing.defaultLocale
            ? `${siteUrl}${path}`
            : `${siteUrl}/${locale}${path}`,
        ])
      ),
    },
  }));
}
