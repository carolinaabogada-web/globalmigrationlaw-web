import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getSiteSettings } from '@/sanity/lib/fetch';
import { urlForImage } from '@/sanity/lib/image';
import { t, buildWhatsAppLink } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { WelcomePopup } from '@/components/layout/WelcomePopup';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { LinkedInInsightTag } from '@/components/analytics/LinkedInInsightTag';
import { EventTracker } from '@/components/analytics/EventTracker';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!routing.locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ]);

  const theme = settings?.theme;
  const themeStyle = theme
    ? `:root{--color-primary:${theme.primary};--color-primary-dark:${theme.primaryDark};--color-accent:${theme.accent};--color-accent-soft:${theme.accentSoft};--color-bg:${theme.bg};--color-bg-alt:${theme.bgAlt};--color-card-bg:${theme.cardBg};--color-text:${theme.text};--color-text-muted:${theme.textMuted};--color-text-soft:${theme.textSoft};--color-border:${theme.border};}`
    : null;

  const navItems = settings
    ? [
        { href: '/', label: t(settings.navHome, locale) || 'Home' },
        {
          href: '/especialidades',
          label: t(settings.navSpecialties, locale) || 'Specialties',
        },
        {
          href: '/quienes-somos',
          label: t(settings.navAbout, locale) || 'About Us',
        },
        { href: '/equipo', label: t(settings.navTeam, locale) || 'Our Team' },
      ]
    : [];

  const waLink = settings
    ? buildWhatsAppLink(
        settings.whatsappNumber,
        locale,
        settings.whatsappDefaultMessage,
      )
    : '#';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {themeStyle ? (
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      ) : null}
      <GoogleTagManagerNoscript />
      <div className='flex min-h-screen flex-col bg-bg text-ink'>
        <Header
          locale={locale}
          navItems={navItems}
          logoHeaderUrl={urlForImage(settings?.logoHeader)?.width(520).url()}
          logoIconUrl={urlForImage(settings?.logoIcon)?.width(92).url()}
        />
        <main className='flex-1'>{children}</main>
        <Footer
          navItems={navItems}
          logoFooterUrl={urlForImage(settings?.logoFooter)?.width(680).url()}
          copyright={t(settings?.footerCopyright, locale)}
          tagline={t(settings?.footerTagline, locale)}
        />
      </div>
      <WhatsAppFloat href={waLink} />
      <WelcomePopup
        enabled={Boolean(settings?.popupEnabled)}
        kicker={t(settings?.popupKicker, locale)}
        title={t(settings?.popupTitle, locale)}
        body={t(settings?.popupBody, locale)}
        buttonText={t(settings?.popupButton, locale)}
        waLink={waLink}
      />
      <GoogleAnalytics />
      <GoogleTagManagerScript />
      <MetaPixel />
      <LinkedInInsightTag />
      <EventTracker />
    </NextIntlClientProvider>
  );
}
