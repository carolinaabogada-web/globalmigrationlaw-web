import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
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

  return (
    <html lang={locale} className={publicSans.variable}>
      <body className='font-sans'>{children}</body>
    </html>
  );
}
