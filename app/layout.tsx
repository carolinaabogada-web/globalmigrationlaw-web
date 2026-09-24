import type { Metadata } from 'next';
import { Public_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Public Sans and Georgia have no Arabic glyphs, so this is appended
// as a fallback in the Tailwind font stacks (tailwind.config.ts) —
// the browser renders Latin text in Public Sans/Georgia and Arabic
// text in this font automatically, per character, with no locale
// branching needed anywhere else.
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Global Migration Law',
  description: 'Immigration, nationality, and residency lawyer in Spain.',
};

// True app root: shared by both the localized site (app/[locale]/...)
// and the Sanity Studio (app/studio/...), so it stays deliberately
// thin — fonts and the <html> shell only. Site chrome (header, footer,
// WhatsApp button, analytics) lives in app/[locale]/layout.tsx so the
// Studio never renders any of it.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Deliberately always "ltr", even for Arabic: per the "text only, same
  // layout" decision, the header/footer/grids should NOT mirror. Setting
  // dir="rtl" was tried and reverted — CSS flexbox/grid main-axis order
  // is direction-relative by spec (not just physical properties like
  // ml-*/left-*), so it silently flipped the header nav, card order, etc.
  // Arabic text still displays correctly shaped/ordered within itself
  // either way (that's the Unicode bidi algorithm, independent of the
  // container's dir) — the only real cost of staying "ltr" is that
  // Arabic paragraphs align left instead of right.

  return (
    <html
      lang={locale}
      dir='ltr'
      className={`${publicSans.variable} ${notoSansArabic.variable}`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) inject attributes on <body> before React
          hydrates. Only silences attribute diffs on this one element. */}
      <body className='font-sans' suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
