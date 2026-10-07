import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

// Canonical host is www — the bare domain 308-redirects to it, so every
// absolute URL we emit (canonical, hreflang, sitemap, robots) uses www.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.globalmigrationlaw.es'
).replace(/\/$/, '');

export function localizedUrl(path: string, locale: Locale) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}${path}`
    : `${SITE_URL}/${locale}${path}`;
}

export function languageAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(path, locale)])
  );
}

/** Canonical + hreflang tags for a page; `path` is "" for home or "/equipo" etc. */
export function pageAlternates(
  path: string,
  locale: Locale
): Metadata['alternates'] {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      ...languageAlternates(path),
      'x-default': localizedUrl(path, routing.defaultLocale),
    },
  };
}
