import type { MetadataRoute } from "next";
import { SITE_URL, languageAlternates } from "@/lib/seo";

const PATHS = ["", "/especialidades", "/equipo", "/quienes-somos"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: languageAlternates(path),
    },
  }));
}
